### Progress Props

| Name         | Type                        | Description                                                                                            | Default    | Since |
| ------------ | --------------------------- | ----------------------------------------------------------------------------------------------- | --------- | --- |
| percentage   | `number`                      | 当前的进度百分比，取值为 `0` ~ `100`                                                                | `0`         | - |
| stroke-width | `number`                      | 进度条的填充宽度                                                                                | `8`         | - |
| info-type    | `'outside' \| 'inside' \| 'bubble' \| 'bubble-top' \| 'bubble-bottom' \| 'none'`                      | 进度条信息的类型 | `'outside'` | - |
| stroke-color | `string \| [string, string] \| ((percentage: number) => string \| [string, string])` | 进度条的填充颜色，传入数组时会使用线性渐变                                                      | `null`      | - |
| activated    | `boolean`                                                                            | 设置进度条是否处于激活状态                 | `false`     | `2.0.0` |

### Progress Slots

| Name    | Description                     | Parameters | Since |
| ------- | ------------------------ | --- | --- |
| default | 进度信息的自定义内容插槽 | - | - |
