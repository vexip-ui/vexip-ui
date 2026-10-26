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

> There are also some variables that are used on layout, which are inconsistent with this rule. Some of the remaining variables will also difference from this rule due to semantics.

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

If you also want to independently modify the preset variables for the dark mode, you need to create an additional file:

```scss
// style/dark-variables.scss
@forward 'vexip-ui/style/dark/variables' with (
  $color-map: (
    primary: (
      base: #654ea7
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

:::info
If you are using unplugin-vue-components, don't forget to specify the `importStyle: 'sass'` option for VexipUIResolver.
:::

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

## Theme Switching

Vexip UI provides the `useTheme` function for theme switching. This function comes from the `@vexip-ui/hooks` package and helps you implement dynamic theme switching functionality.

### Basic Usage

```ts
import { useTheme } from '@vexip-ui/hooks'

// Usage in components
const { theme } = useTheme()

// theme is a reactive reference representing the currently active theme name
console.log(theme.value)
```

### Theme Registration

Before using the theme switching functionality, you need to register available themes:

```ts
import { addActiveThemes, setActiveThemes } from '@vexip-ui/hooks'

// Add themes
addActiveThemes(['light', 'dark'])

// Or use more detailed configuration
addActiveThemes([
  {
    name: 'light',
    rootClass: 'theme-light',
    varsClass: 'vxp-theme-vars-light',
  },
  {
    name: 'dark',
    rootClass: 'theme-dark',
    varsClass: 'vxp-theme-vars-dark',
  },
])

// Reset and set themes
setActiveThemes(['light', 'dark'])
```

### Theme Configuration Options

Each theme can be configured with the following options:

- `name`: Unique name of the theme
- `rootClass`: Class name applied to the HTML root element, defaults to the same as name
- `varsClass`: Class name containing theme variables, defaults to `vxp-theme-vars-${rootClass}`

### Implementing Theme Switching

With Vue's reactivity system, you can easily implement theme switching functionality:

```vue
<template>
  <div>
    <p>Current theme: {{ theme }}</p>
    <button @click="toggleTheme">
      Toggle Theme
    </button>
  </div>
</template>

<script setup>
import { useTheme } from '@vexip-ui/hooks'
import { watch } from 'vue'

// Register themes
addActiveThemes(['light', 'dark'])

const { theme } = useTheme()

// Watch for theme changes
watch(theme, (newTheme) => {
  console.log(`Theme changed to: ${newTheme}`)

  // You can perform other operations here, such as updating local storage
  localStorage.setItem('preferred-theme', newTheme)
})

// Theme toggle function
function toggleTheme() {
  // Toggle based on current theme
  const html = document.documentElement

  if (theme.value === 'light') {
    html.classList.remove('light')
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
    html.classList.add('light')
  }
}
</script>
```

This approach allows you to easily implement multi-theme switching functionality and integrate with other systems (such as the operating system's dark mode).

### Dark Mode

First, you can create a toggle to control the dark mode class name.

> If you only need dark mode, simply add a class named 'dark' to the html element.

```html
  <html class="dark">
    <head></head>
    <body></body>
  </html>
```

> If you want to dynamically toggle dark mode, you can also use [useDark | VueUse](https://vueuse.org/core/useDark/) to implement it.
