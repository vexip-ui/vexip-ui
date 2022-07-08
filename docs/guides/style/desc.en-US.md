# Style Config

Vexip UI use `sass` to write styles and it generates a series of preset `css` variables, via some named rules it is easy to configure.

## Import Styles

Normally, import styles via the `css` files：

```ts
import 'vexip-ui/css/index.css'
import 'vexip-ui/themes/dark/index.css' // Not needed when not use dark theme
```

If you like, you can also import via the `sass` files:

在 `sass` 中引入：

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
import 'vexip-ui/style/dark/preset.scss' // Not needed when not use dark theme
```

With reference to the built-in dark theme preset styles, you can define your own theme. Maybe will make a theme generator in the future.

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
- `compoennt` is the kebab case name of component
- `element` optional, is the element that the variable acts on
- `color` is a variable for the color
- `bg-color` is a variable for background color
- `b-color` is a variable for border color
- `s-color` is a variable for the shadow color
- `state` optional, is a variable for a component or feature in a specific state

There are also some variables that use on layout, which are inconsistent with this rule. Some of the remaining variables will also difference from this rule due to semantics.

## Edit Via Sass

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

Then import styles in entry file:

```ts
import './style/index.scss'

import { createApp } from 'vue'
import { install } from 'vexip-ui'

createApp(App).use(install).mount('#app')
```

The full `sass` variables can be found in [here](https://github.com/qmhc/vexip-ui/blob/main/style/design/variables.scss).
