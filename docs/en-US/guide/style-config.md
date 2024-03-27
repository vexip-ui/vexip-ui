# Style Config

Vexip UI use `sass` to write styles and it generates a series of preset `css` variables, via some named rules it is easy to configure.

## Import Styles

Normally, import `css` style:

```ts
import 'vexip-ui/css/index.css'
import 'vexip-ui/themes/dark/index.css' // Not needed when not use dark theme
```

If you like, you can import `sass` style:

Import in `sass`：

```scss
// style/index.scss
// you can omit index.scss in scss
@use 'vexip-ui/style';
@use 'vexip-ui/style/dark'; // Not needed when not use dark theme
```

```ts
import './style/index.scss'
```

import in `ts` (Not recommended):

```ts
import 'vexip-ui/style/index.scss'
import 'vexip-ui/style/dark/index.scss' // Not needed when not use dark theme
```

With reference to the built-in dark theme preset styles, you can define your own theme (Maybe will make a theme generator in the future).

:::info
The above content is to import all styles, see [Getting Started](./getting-started) chapter for on-demand import.
:::

## Preset Variables

There are many preset `css` variables which starts with `--vxp-`:

```css
.element {
  color: var(--vxp-color-primary-base);
  border: var(--vxp-border-base);
}
```

At this point you can open the developer tools and view the preset variables in `:root`.

Preset variables for each component are defined on the `.vxp-[component]-vars` class name, the `[component]` is the kebab case name of components.

The regular names of preset variables in components mostly follow rule `--[prefix]-[component]-[?element]-[color|bg-color|b-color|s-color]-[?state]`:

- `prefix` is the prefix, the default is `vxp`
- `component` is the kebab case name of component
- `element` optional, is the element that the variable acts on
- `color` is a variable for the color
- `bg-color` is a variable for background color
- `b-color` is a variable for border color
- `s-color` is a variable for the shadow color
- `state` optional, is a variable for a component or feature in a specific state

There are also some variables that are used on layout, which are inconsistent with this rule. Some of the remaining variables will also difference from this rule due to semantics.

You can change these css variables by any way you like.

## Edit Via Sass

### Import Directly

You can edit the `sass` variables via using `@use...with`:

```scss
// style/index.scss
@use 'vexip-ui/style' with (
  $color-map: (
    primary: (
      base: #845ef7
    )
  )
);
```

Then import style in entry file:

```ts
import './style/index.scss'

import { createApp } from 'vue'
import { install } from 'vexip-ui'

createApp(App).use(install).mount('#app')
```

The full `sass` variables can be found in [here](https://github.com/vexip-ui/vexip-ui/blob/main/style/design/variables.scss).

### Import On Demand

If you are using on demand import, some extra configuration is required. Here we take Vite as an example, and the same applies to Webpack.

First, you need to prepare a separate file, and use `@forward...with` to modify variables:

```scss
// style/variables.scss
@forward 'vexip-ui/style/design' with (
  $color-map: (
    primary: (
      base: #845ef7
    )
  )
);
```

Then add following in `vite.config.ts`:

```ts
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const vxpStylePresetRE = /vexip-ui\/style(?:\/dark)?\/preset/

const basePath = '@/style/variables.scss'
// const darkPath = '@/style/dark-variables.scss'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: (code: string, path: string) => {
          // tampering references to variables file in base style
          if (vxpStylePresetRE.test(path)) {
            // if (path.includes('dark')) {
            //   return code.replace('@use \'./variables.scss\' as *;', `@use '${darkPath}' as *;`)
            // }

            return code.replace('@use \'./design/variables.scss\' as *;', `@use '${basePath}' as *;`)
          }

          return code
        }
      }
    }
  }
})
```

## Transition Effects

After import style, you can directly use some transition effects built in Vexip UI:

```vue
<template>
  <Transition name="vxp-fade">
    <div v-if="active"></div>
  </Transition>
</template>
```

The list of common transition effects is as follows:

- `vxp-drop` expands down or collapses up
- `vxp-fade` fades in and out
- `vxp-ease` fades in and out and zooms in and out slightly
- `vxp-move-top` moves in from top to bottom
- `vxp-move-right` moves in from right to left
- `vxp-move-bottom` moves in from bottom to top
- `vxp-move-left` moves in from left to right
- `vxp-zoom` fades in and out and zooms in and out significantly

## Rollback Logical

In order to support i18n, Vexip UI provides RTL (right-to-left) features, and the style of components is wrote in [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values).

However, some [older modern browsers](https://caniuse.com/css-logical-props) do not support logical properties. To work on these browsers, you need to use the PostCSS plugin to restore logical properties to normal properties.

Install plugin:

```sh
pnpm i -D @vexip-ui/plugins
```

Add following in `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import { transformLogical } from '@vexip-ui/plugins'

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        transformLogical({
          // rtl: true,
          replace: true
        })
      ]
    }
  }
})
```
