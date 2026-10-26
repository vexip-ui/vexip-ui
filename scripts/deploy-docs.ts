import { logger } from '@vexip-ui/scripts'

async function main() {
  const baseUrl = 'https://api.github.com/repos/vexip-ui/vexip-ui/merges'
  const mainBranch = 'main'
  const deployBranch = 'docs-deploy'

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ base: deployBranch, head: mainBranch }),
  })

  await response.json()
}

main().catch(error => {
  logger.error(error)
  process.exit(1)
})
