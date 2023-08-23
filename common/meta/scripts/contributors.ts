import { resolve } from 'node:path'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'

import { components as allComponents, logger, outputDir } from './utils'

interface ContributorInfo {
  component: string,
  login: string,
  name: string,
  email: string,
  url: string,
  avatarUrl: string
}

interface FetchOptions {
  paths: { component: string, path: string, cursor?: string }[]
}

interface PageInfo {
  hasNextPage: boolean,
  endCursor: string
}

interface Node {
  author: {
    user: ContributorInfo
  }
}

interface FetchResponse {
  repository: {
    object: {
      [key in string]: {
        pageInfo: PageInfo,
        nodes: Node[]
      }
    }
  }
}

const GRAPHQL_URL = 'https://api.github.com/graphql'

async function graphql<Result>(query: string) {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    },
    body: JSON.stringify({ query })
  })

  const result = await response.json().catch((error: string) => {
    logger.error(error as unknown as string)
    process.exit(1)
  })

  if (result.error?.length) {
    for (const error of result.error) {
      logger.errorText(error.message)
    }

    logger.error('Request failed due to above response errors.')
    process.exit(1)
  }

  return result.data as Result
}

const nodeFlag: Record<string, string[]> = {}

const OWNER = 'vexip-ui'
const REPO = 'vexip-ui'
const BRANCH = 'main'

async function fetchContributors(fetchOptions: FetchOptions) {
  const { paths } = fetchOptions
  const contributors: ContributorInfo[] = []
  const endCursorList: FetchOptions['paths'] = []

  // build GraphQL query to get contributors info of related
  // files of each component under default branch
  const query = `
    query {
      repository(owner: "${OWNER}", name: "${REPO}") {
        object(expression: "${BRANCH}") {
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
                nodes {
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
              }`
              })
              .join('\n')}
          }
        }
      }
    }
  `

  const response = await graphql<FetchResponse>(query)

  const target = response?.repository?.object || {}

  for (let i = 0, len = paths.length; i < len; ++i) {
    const pageInfo: PageInfo = target?.[`path${i}`]?.pageInfo || {}
    const nodes: Node[] = target?.[`path${i}`]?.nodes || []
    const component = paths[i].component

    for (const node of nodes) {
      const author: ContributorInfo = node?.author?.user || {}

      if (author.url) {
        if (!nodeFlag[component].includes(author.url)) {
          contributors.push({
            component,
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
    contributors.push(...(await fetchContributors({ paths: endCursorList })))

    return contributors
  }

  return contributors
}

function chunk<T>(array: T[], size = 1) {
  size = Math.max(Math.floor(size), 0)
  const length = array == null ? 0 : array.length

  if (!length || size < 1) {
    return []
  }

  const result: T[][] = new Array(Math.ceil(length / size))

  let index = 0
  let resIndex = 0

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size))
  }

  return result
}

async function main() {
  const startTime = Date.now()

  if (process.env.DEV) {
    (await import('dotenv')).config()
  }

  if (!process.env.GITHUB_TOKEN) {
    logger.error('Need GITHUB_TOKEN To Generate Contributors')
    logger.ln()
    process.exit(1)
  }

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }

  const contributors: Record<string, Omit<ContributorInfo, 'component'>[]> = {}
  const fetchData: FetchOptions = {
    paths: []
  }

  for (const component of allComponents) {
    nodeFlag[component] = []
    fetchData.paths.push(
      ...[
        { path: `components/${component}`, component },
        { path: `style/${component}.scss`, component },
        { path: `docs/demos/${component}`, component }
      ]
    )
  }

  const chunkPathsList = chunk(fetchData.paths, 200)

  for (const chunkPaths of chunkPathsList) {
    const fetchData = {
      paths: chunkPaths
    }

    await fetchFn(fetchData)
  }

  async function fetchFn(fetchData: FetchOptions) {
    const resultData = await fetchContributors(fetchData)

    for (let i = 0; i < resultData.length; i++) {
      const resData: Omit<ContributorInfo, 'component'> = {} as Omit<ContributorInfo, 'component'>

      for (const key in resultData[i]) {
        if (!key.includes('component')) {
          (resData as any)[key] = (resultData[i] as any)[key]
        }
      }

      const component = resultData[i].component
      const contributorInfo = contributors[component]

      if (contributorInfo) {
        contributorInfo.push(...[resData])
        continue
      }
      contributors[component] = [resData]
    }
  }

  writeFileSync(resolve(outputDir, 'contributors.json'), JSON.stringify(contributors))
  logger.success(`Generated contributors meta data in ${Date.now() - startTime}ms`)
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
