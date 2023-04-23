import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import glob from 'fast-glob'
import { logger } from '../../../scripts/utils'

const __dirname = path.resolve(fileURLToPath(import.meta.url), '..')
const pathOutput = path.resolve(__dirname, '../dist')
const root = path.resolve(__dirname, '../../..')
const OWENER = 'vexip-ui'
const REPO = 'vexip-ui'

interface ContributorInfo {
  login: string,
  name: string,
  email: string,
  url: string,
  avatarUrl: string
}
interface NodeInfo {
  url: string
}

const nodeFlag: Record<string, NodeInfo[]> = {}

async function fetchContributors(
  owner: string,
  repo: string,
  compName: string,
  cursor = ''
): Promise<ContributorInfo[]> {
  const url = 'https://api.github.com/graphql'
  const contributors: ContributorInfo[] = []
  const token = ''

  // 构建 GraphQL 查询，以获取 main 分支下 components 文件夹内各组件贡献者信息
  const query = `
    query {
      repository(owner: "${owner}", name: "${repo}") {
        defaultBranchRef {
          target {
            ... on Commit {
              history(first: 100, path: "components/${compName}"${
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
              }
            }
          }
        }
      }
    }
  `

  if (!token) {
    logger.error('Need GITHUB_TOKEN To Generate Contributors')
    logger.ln()
    process.exit(1)
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query })
  })

  const { data = {} } = await response.json().catch(error => {
    logger.error(error as unknown as string)
    process.exit(1)
  })

  const target = data?.repository?.defaultBranchRef?.target || {}
  const pageInfo = target?.history?.pageInfo || {}
  const edgesList = target?.history?.edges || []

  for (const { node } of edgesList) {
    const author = node?.author?.user || {}

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
    const nextContributors = await fetchContributors(OWENER, REPO, compName, pageInfo.endCursor)
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
  const components = await getComponents()
  const contributors: Record<string, ContributorInfo[]> = {}

  if (!existsSync(pathOutput)) {
    mkdirSync(pathOutput)
  }

  for (const comp of components) {
    nodeFlag[comp] = [] as NodeInfo[]
    contributors[comp] = await fetchContributors(OWENER, REPO, comp)
  }

  writeFileSync(path.resolve(pathOutput, 'contributors.json'), JSON.stringify(contributors))
  logger.success('Generated Contributors Metadata')
}

main()
