# @vexip-ui/scripts

This package provides common scripts for vexip-ui components, it is published as a package that can be used standalone.

## Install

```sh
pnpm i -D @vexip-ui/scripts
```

## Usage

### Release

Refer to Vexip UI [release script](https://github.com/vexip-ui/vexip-ui/blob/main/scripts/release.ts).

```ts
import { logger, release, run } from '@vexip-ui/scripts'

release({
  pkgDir: 'Absolute package directory path',
  // isDryRun: true,
  // preId: 'beta'
  // publish: true,
  runTest: () => run('pnpm', ['test']),
  runBuild: () => run('pnpm', ['build']),
  runChangelog: () => run('pnpm', ['changelog'])
}).catch(error => {
  logger.error(error)
  process.exit(1)
})
```

### Publish

Refer to Vexip UI [publish script](https://github.com/vexip-ui/vexip-ui/blob/main/scripts/publish.ts).

```ts
import { logger, publish } from '@vexip-ui/scripts'

publish({
  pkgDir: 'Absolute package directory path'
  // isDryRun: false,
  // releaseTag: 'bete'
}).catch(error => {
  logger.error(error)
  process.exit(1)
})
```
