import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import glob from 'fast-glob'
import { logger } from '../../../scripts/utils'

const __dirname = path.resolve(fileURLToPath(import.meta.url), '..')
const pathOutput = path.resolve(__dirname, '../dist')
const root = path.resolve(__dirname, '../../..')

interface ContributorInfo {
  login: string,
  name: string,
  email: string,
  url: string,
  avatarUrl: string
}

interface FetchItemType {
  compName: string,
  path: string,
  cursor?: string
}

interface PageInfo {
  hasNextPage: boolean,
  endCursor: string
}

interface FetchResponse {
  data: {
    repository: {
      defaultBranchRef: {
        target: {
          [key in string]: {
            pageInfo: PageInfo,
            edges: EdgesList
          }
        }
      }
    }
  }
}

interface Node {
  node: {
    author: {
      user: ContributorInfo
    }
  }
}

type EdgesList = Node[]

type FetchContributorsOptions = FetchItemType[]

const nodeFlag: Record<string, string[]> = {}
const url = 'https://api.github.com/graphql'
const OWENER = 'vexip-ui'
const REPO = 'vexip-ui'
const token = process.env.GITHUB_TOKEN

async function fetchContributors(
  fetchOptions: FetchContributorsOptions
): Promise<ContributorInfo[]> {
  const contributors: ContributorInfo[] = []
  const endCursorList: FetchItemType[] = []
  const compName = fetchOptions[0].compName

  // 构建 GraphQL 查询，以获取 main 分支下 components 文件夹内各组件贡献者信息
  const query = `
    query {
      repository(owner: "${OWENER}", name: "${REPO}") {
        defaultBranchRef {
          target {
            ... on Commit {
              ${fetchOptions
                .map(({ path, cursor }, index) => {
                  return `path${index}: history(first: 100, path: "${path}"${
                    cursor ? ', after: ' + cursor : ''
                  }) {
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                  edges {
                    node {
                      author {
                        user {
                          login
                          name
                          email
                          url
                          avatarUrl
                        }
                      }
                    }
                  }
                }`
                })
                .join('\n')}
            }
          }
        }
      }
    }
  `

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query })
  })

  const { data } = (await response.json().catch((error: string) => {
    logger.error(error as unknown as string)
    process.exit(1)
  })) as FetchResponse

  const target = data?.repository?.defaultBranchRef?.target || {}

  for (const fetchIndex in fetchOptions) {
    const pageInfo: PageInfo = target?.[`path${fetchIndex}`]?.pageInfo || {}
    const edgesList: EdgesList = target?.[`path${fetchIndex}`]?.edges || []

    for (const { node } of edgesList) {
      const author: ContributorInfo = node?.author?.user || {}

      if (author.url) {
        if (!nodeFlag[compName].includes(author.url)) {
          contributors.push({
            login: author.login,
            name: author.name,
            email: author.email,
            url: author.url,
            avatarUrl: author.avatarUrl
          })
          nodeFlag[compName].push(author.url)
        }
      }
    }

    if (pageInfo.hasNextPage) {
      endCursorList.push({ ...fetchOptions[fetchIndex], cursor: pageInfo.endCursor })
    }
  }

  if (endCursorList.length) {
    const nextContributors = await fetchContributors(endCursorList)
    contributors.concat(nextContributors)
    return contributors
  }

  return contributors
}

async function getComponents() {
  return glob('*', {
    cwd: path.resolve(root, 'components'),
    onlyDirectories: true
  })
}

async function main() {
  if (!token) {
    logger.error('Need GITHUB_TOKEN To Generate Contributors')
    logger.ln()
    process.exit(1)
  }

  const components = await getComponents()
  const contributors: Record<string, ContributorInfo[]> = {}

  if (!existsSync(pathOutput)) {
    mkdirSync(pathOutput)
  }

  for (const comp of components) {
    const fetchList = [
      { compName: comp, path: `components/${comp}` },
      { compName: comp, path: `style/${comp}.scss` }
    ] as FetchContributorsOptions

    nodeFlag[comp] = [] as string[]
    contributors[comp] = await fetchContributors(fetchList)
  }

  writeFileSync(path.resolve(pathOutput, 'contributors.json'), JSON.stringify(contributors))
  logger.success('Generated Contributors Metadata')
}

main()
