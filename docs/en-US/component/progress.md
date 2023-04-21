# Progress

## Demos

:::demo progress/basis

### Basis Usage

The basic usage, pass in a value of `0` ~ `100` via `percentage` prop.

:::

:::demo progress/bubble

### Tooltip

Setting the value of the `info-type` prop can make progress indicators into bubbles.

:::

:::demo progress/color

### Progress Bar Color

The color of the progress bar can be changed via the `stroke-color` prop.

This prop supports passing in a valid color value, an array of colors, or a function that returns the first two values.

:::

:::demo progress/text

### Progress Content

The content of the progress prompt can be customized through the default slot.

:::

:::demo progress/activated

### Activated State

Adding the `activated` prop makes the progress bar activated.

:::

## API

### Progress Props

| Name         | Type                                                                                 | Description                                                                                 | Default      | Since   |
| ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- | ------------ | ------- |
| percentage   | `number`                                                                             | The current percentage of progress, ranging from `0` ~ `100`                                | `0`          | -       |
| stroke-width | `number`                                                                             | The stroke width of the progress bar                                                        | `8`          | -       |
| info-type    | `'outside' \| 'inside' \| 'bubble' \| 'bubble-top' \| 'bubble-bottom' \| 'none'`     | The type of progress bar info                                                               | `'outside' ` | -       |
| stroke-color | `string \| [string, string] \| ((percentage: number) => string \| [string, string])` | The fill color of the progress bar, a linear gradient will be used when passing in an array | `null`       | -       |
| activated    | `boolean`                                                                            | Set whether the progress bar is active                                                      | `false`      | `2.0.0` |

### Progress Slots

| Name    | Description                                  | Parameters | Since |
| ------- | -------------------------------------------- | ---------- | ----- |
| default | Custom content slot for progress information | -          | -     |
