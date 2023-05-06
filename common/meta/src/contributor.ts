import { resolve } from 'node:path'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { logger, components as allComponents } from '../../../scripts/utils'

const __dirname = resolve(fileURLToPath(import.meta.url), '..')
const pathOutput = resolve(__dirname, '../dist')

interface ContributorInfo {
  login: string,
  name: string,
  email: string,
  url: string,
  avatarUrl: string
}

interface FetchOptions {
  component: string,
  paths: { path: string, cursor?: string }[]
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

const nodeFlag: Record<string, string[]> = {}
const url = 'https://api.github.com/graphql'
const OWENER = 'vexip-ui'
const REPO = 'vexip-ui'
let token: string

async function fetchContributors(fetchOptions: FetchOptions): Promise<ContributorInfo[]> {
  const { component, paths } = fetchOptions
  const contributors: ContributorInfo[] = []
  const endCursorList: FetchOptions['paths'] = []

  // 构建 GraphQL 查询，以获取 main 分支下 components 文件夹内各组件贡献者信息
  const query = `
    query {
      repository(owner: "${OWENER}", name: "${REPO}") {
        defaultBranchRef {
          target {
            ... on Commit {
              ${paths
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

  for (let i = 0, len = paths.length; i < len; ++i) {
    const pageInfo: PageInfo = target?.[`path${i}`]?.pageInfo || {}
    const edgesList: EdgesList = target?.[`path${i}`]?.edges || []

    for (const { node } of edgesList) {
      const author: ContributorInfo = node?.author?.user || {}

      if (author.url) {
        if (!nodeFlag[component].includes(author.url)) {
          contributors.push({
            login: author.login,
            name: author.name,
            email: author.email,
            url: author.url,
            avatarUrl: author.avatarUrl
          })
          nodeFlag[component].push(author.url)
        }
      }
    }

    if (pageInfo.hasNextPage) {
      endCursorList.push({ ...paths[i], cursor: pageInfo.endCursor })
    }
  }

  if (endCursorList.length) {
    const nextContributors = await fetchContributors({ component, paths: endCursorList })
    contributors.concat(nextContributors)
    return contributors
  }

  return contributors
}

async function main() {
  if (process.env.DEV) {
    (await import('dotenv')).config()
    token = process.env.GITHUB_TOKEN!
  }

  if (!token) {
    logger.error('Need GITHUB_TOKEN To Generate Contributors')
    logger.ln()
    process.exit(1)
  }

  const contributors: Record<string, ContributorInfo[]> = {}

  if (!existsSync(pathOutput)) {
    mkdirSync(pathOutput)
  }

  for (const component of allComponents) {
    const fetchList: FetchOptions = {
      component,
      paths: [
        { path: `components/${component}` },
        { path: `style/${component}.scss` },
        { path: `docs/demos/${component}` }
      ]
    }

    nodeFlag[component] = []
    contributors[component] = await fetchContributors(fetchList)
  }

  writeFileSync(resolve(pathOutput, 'contributors.json'), JSON.stringify(contributors))
  logger.success('Generated Contributors Metadata')
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
