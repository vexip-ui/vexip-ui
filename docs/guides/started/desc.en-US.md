# Getting Start

Through this chapter, you will know how to quickly start using Vexip UI.

> Before starting, you need to have learned [Vue3](https://v3.cn.vuejs.org/).

## Install Vexip UI

Run following command in your project:

```sh
# yarn
yarn add vexip-ui

# pnpm
pnpm install vexip-ui
```

## Import Directly

Vexip UI already has the ability of tree-shaking. You can directly import components where you need to use them, and only those components you used will be packaged.

```vue
<template>
  <Button>Get Stared</Button>
</template>

<script setup lang="ts">
import 'vexip-ui/css/preset.css'
import 'vexip-ui/css/button.css'

import { Button } from 'vexip-ui'
</script>
```

But you can see that you need to import style files for each component separately by this way.

For the high compression ratio and convenience, you can directly import all styles at the top level:

```ts
import 'vexip-ui/css/index.css'
```

If you also don't care about the package size at all, or you use almost all components, you can choose to import all components globally:

```ts
import 'vexip-ui/css/index.css'

import { createApp } from 'vue'
import { install } from 'vexip-ui'
import App from './app.vue'

createApp(App).use(install)
```

## Import Automatically

When on demand import, we can automatically import styles via some plugins.

### Vite

On demand import can more concise with the help of the Vite plugin [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import).

Install plugin:

```sh
pnpm i -D vite-plugin-style-import
```

Add following in `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin } from 'vite-plugin-style-import'

export default defineConfig({
  plugins: [
    vue(),
    createStyleImportPlugin({
      include: ['**/*.ts', '**/*.vue'],
      libs: [
        {
          libraryName: 'vexip-ui',
          esModule: true,
          base: 'vexip-ui/css/preset.css',
          resolveStyle: name => `vexip-ui/css/${name}.css`
        }
      ]
    })
  ]
})
```

### Webpack

On demand import can more concise with the help of the Webpack plugin [babel-plugin-import](https://github.com/ant-design/babel-plugin-import).

Install plugin:

```sh
pnpm i -D babel-plugin-import
```

Add following in `babel.config.js`:

```js
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vexip-ui',
        transformToDefaultImport: false,
        customName: () => 'vexip-ui',
        styleLibraryDirectory: 'css',
        style: name => `${name}.css`
      }
    ]
  ]
}
```

Due to plugin limitations, you still need to manually import `vexip-ui/css/preset.css`.

## Global Types Infer

If the components are imported globally, add the `compilerOptions.type` option in your project's `tsconfig.json` file to quickly get global types infer:

```json
{
  "compilerOptions": {
    "types": ["vexip-ui/types"]
  }
}
```

## Full Compoennts List

You can check full components list [here](https://github.com/qmhc/vexip-ui/blob/main/components/index.ts#L105).
