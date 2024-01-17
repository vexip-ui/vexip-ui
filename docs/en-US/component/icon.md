# Icon

:::info
Since `v2.3`, Vexip UI uses [lucide](https://lucide.dev/) to provide components' internal icons.
:::

Vexip UI provides `@vexip-ui/icons` as the icon library, which is based on the free icons of [Font Awesome](https://fontawesome.com/) 6.x and encapsulates its SVG into Vue components.

You can look up the icons directly on this [page](https://fontawesome.com/search?m=free) (they have always named the icons weird).

Of course you can place any SVG content directly under the Icon component slot. If you want to change internal icons of components, please refer to [Global Config](/en-US/guide/global-config#internal-icons).

:::warning
All built-in icons of Font Awesome are scaled by 0.85x by default in this library, the original icons are a bit large.
:::

Icon component name is transformed according to certain rules from the original name which in the search page:

- Normally, icon is default from solid type, it is changed to pascal-case from kebab-case (eg. `angle-down` -> `AngleDown`)
- If you want to use the `regular` or `brands` types, you can add a suffix `R` or `B` in the end of component name (eg. `regular/bell` -> `BellR`, `brands/github` -> `GithubB`)
- Some icons start with number, you need to add a prefix `I` in the front of component name (eg. `7` -> `I7`, `brands/500px` -> `I500pxB`)

## Demos

:::demo icon/basis

### Basis Usage

You can drop the SVG component to the `icon` prop, or you can put it directly under the default slot.

:::

:::demo icon/color

### Change Color

==!s|2.2.5==

The color of the icon can be quickly modified via the `color` prop.

:::

:::demo icon/scale

### Scale Icon

Set the `scale` prop to scale Icon.

You can also directly specify the size of the icon by setting a legal CSS value through the `size` prop.

:::

:::demo icon/spin

### Spin Effect

Set `effect` prop to `spin-in` or `spin-out` to spin the icon.

:::

:::demo icon/pulse

### Pulse Effect

Set the `effect` prop to `pulse-in` or `pulse-out` to make the icon have a pulse effect.

:::

:::demo icon/flip

### Flip Effect

The flip effect of the icon can be set via the `flip` prop.

:::

:::demo icon/rotate

### Rotate

==!s|2.2.5==

A move command?

:::

:::demo icon/package

### Different Types

By default, the icons under `solid` are used directly.

If you want to use other icon sets, please refer to the description of the naming conversion rules at the top.

:::

:::demo icon/custom

### Custom Icon

You can put any SVG content under the icon default slot.

:::

:::demo icon/renderer

### Custom Render

==!s|2.2.11==

If the above does not meet your needs, you can specify a custom renderer through the `renderer` prop.

Note that if you use renderer prop, you need to process all the features by yourself.

Refer to [Global Config](/en-US/guide/global-config), you can even completely replace the rendering logic of the icons inside the library.

:::

## API

### Preset Types

```ts
type IconEffect = 'spin-in' | 'spin-out' | 'pulse-in' | 'pulse-out' | string
type IconRenderer = (
  props: Omit<IconProps, 'renderer'>,
  attrs: Record<string, any>,
  renderDefault: () => any
) => any
```

### Icon Props

| Name     | Type                                   | Description                                         | Default | Since    |
| -------- | -------------------------------------- | --------------------------------------------------- | ------- | -------- |
| icon     | `VueComponent`                         | Set `<svg>` vue component                           | `null`  | `2.0.0`  |
| scale    | `number \| string`                     | Set the scaling of the icon                         | `1`     | -        |
| flip     | `'horizontal' \| 'vertical' \| 'both'` | Set whether the icon is flipped                     | `null`  | -        |
| title    | `string`                               | Set the title prop of the icon                      | `''`    | -        |
| effect   | `IconEffect`                           | Set effect animation name or a customize class name | `null`  | `2.1.0`  |
| size     | `string`                               | Set the size of the icon                            | `null`  | `2.2.5`  |
| color    | `string`                               | Set the color of the icon                           | `null`  | `2.2.5`  |
| rotate   | `number \| string`                     | Set rotate angle of the icon                        | `null`  | `2.2.5`  |
| renderer | `IconRenderer`                         | Customized render method                            | `null`  | `2.2.11` |
