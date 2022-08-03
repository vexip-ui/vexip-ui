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
