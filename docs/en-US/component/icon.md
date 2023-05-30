# Icon

Vexip UI uses `@vexip-ui/icons` as the icon library, which is based on the free icons of [Font Awesome](https://fontawesome.com/) 6.x and encapsulates its svg into vue components.

You can look up the icons directly on this [page](https://fontawesome.com/search?m=free) (they have always named the icons weird).

Of course you can place any svg content directly under the Icon component slot. If you want to change internal icons of components, please refer to [Global Config](/en-US/guide/global-config#internal-icons).

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

You can drop the svg component to the `icon` prop, or you can put it directly under the default slot.

:::

:::demo icon/scale

### Scale Icon

Set the `scale` prop to scale Icon.

:::

:::demo icon/spin

### Spin Effect

Set `effect` prop to `spin-in` or `spin-out` to spin the icon.

:::

:::demo icon/pulse

### Pulse Effect

Set the `effect` prop to `pulse-in` or `pulse-out` to make the icon have a pulse effect.

:::

:::demo icon/package

### Different Types

By default, the icons under `solid` are used directly.

If you want to use other icon sets, please refer to the description of the naming conversion rules at the top.

:::

:::demo icon/custom

### Custom Icon

You can put any svg content under the icon default slot.

:::

## API

### Preset Types

```ts
type IconEffect = 'spin-in' | 'spin-out' | 'pulse-in' | 'pulse-out' | string
```

### Icon Props

| Name      | Type                                   | Description                                         | Default | Since   |
| --------- | -------------------------------------- | --------------------------------------------------- | ------- | ------- |
| icon      | `Record<string, any>`                  | Set `<svg>` vue component                           | `null`  | `2.0.0` |
| scale     | `number`                               | Used to adjust icon size                            | `1`     | -       |
| ~~spin~~  | `boolean \| 'in' \| 'out'`             | Set whether the icon is spin                        | `false` | -       |
| ~~pulse~~ | `boolean \| 'in' \| 'out'`             | Set whether the icon has a pulse effect             | `false` | -       |
| flip      | `'horizontal' \| 'vertical' \| 'both'` | Set whether the icon is flipped                     | `null`  | -       |
| title     | `string`                               | Set the title prop of the icon                      | `''`    | -       |
| effect    | `IconEffect`                           | Set effect animation name or a customize class name | `null`  | `2.1.0` |
