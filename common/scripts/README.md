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
  // preId: 'beta',
  // publish: true,
  // updateVersionByType: 'patch',
  runTest: () => run('pnpm', ['test']),
  runBuild: () => run('pnpm', ['build']),
  runChangelog: () => run('pnpm', ['changelog'])
}).catch(error => {
  logger.error(error)
  process.exit(1)
})
```

#### updateVersionByType

When specified, the version will be automatically bumped based on the type instead of prompting for selection.

| Type         | Stable Version           | Pre-release Version                                    |
| ------------ | ------------------------ | ------------------------------------------------------ |
| `patch`      | `1.0.0` → `1.0.1`        | `1.0.0-beta.1` → `1.0.1-beta.0`                        |
| `minor`      | `1.0.0` → `1.1.0`        | `1.0.0-beta.1` → `1.1.0-beta.0`                        |
| `major`      | `1.0.0` → `2.0.0`        | `1.0.0-beta.1` → `2.0.0-beta.0`                        |
| `release`    | `1.0.0` → `1.0.1`        | `1.0.0-beta.1` → `1.0.0` (release to stable)           |
| `prerelease` | `1.0.0` → `1.0.1-beta.0` | `1.0.0-beta.1` → `1.0.0-beta.2` (continue pre-release) |

Combine with `preId` to specify the pre-release identifier (defaults to the current preId or `beta`).

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
