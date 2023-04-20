# Space

## Demos

Quickly provide uniform spacing for a range of elements.

:::demo space/basis

### Basis Usage

Simplest usage.

:::

:::demo space/layout

### Various Layout

The horizontal alignment can be set with `justify`, and the vertical alignment can also be set with `align`.

:::

:::demo space/size

### Different Sizes

There are three built-in sizes, which can be set via `size` prop, or you can pass in numbers or array to customize.

:::

:::demo space/vertical

### Vertical

Add the `vertical` prop to achieve vertical layout.

:::

## API

### Space Props

| Name         | Type                                                                                  | Description                                                                                                                                                             | Default            | Since |
| ------------ | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| vertical     | `boolean`                                                                             | Set whether to vertical layout                                                                                                                                          | `false`            | -     |
| inline       | `boolean`                                                                             | Set whether is inline element                                                                                                                                           | `false`            | -     |
| tag          | `string`                                                                              | Set the tag to render                                                                                                                                                   | `'div'`            | -     |
| align        | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'`                             | Set the vertical alignment                                                                                                                                              | `'stretch'`        | -     |
| justify      | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | Set the horizontal alignment                                                                                                                                            | `'start'`          | -     |
| no-wrap      | `boolean`                                                                             | Set whether not to wrap                                                                                                                                                 | `false`            | -     |
| size         | `'small' \| 'default' \| 'large' \| number \| [number, number]`                       | Set the size of sapcing, can set a number to specify spacing, or set a array to control horizontal and vertical spacing respectively                                    | `'default'`        | -     |
| item-style   | `string \| Record<string, any>`                                                       | Custom styles for child items                                                                                                                                           | `null`             | -     |
| gap-disabled | `boolean`                                                                             | Set whether to disabled the `gap` prop, will use padding and margin to implement spacing after disabled, by default it will be judged according to brower compatibility | `flexGapSupported` | -     |

### Space Slots

| Name    | Description                     | Parameters | Since |
| ------- | ------------------------------- | ---------- | ----- |
| default | content what needs to be spaced | -          | -     |
