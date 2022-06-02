### Card Props

| Name          | Type   | Description                                                    | Default   | Since |
| ------------- | ------ | ------------------------------------------------------- | -------- | --- |
| title         | `string` | 卡片的标题，当使用插槽时无效                            | `''`       | - |
| shadow        | `'always' \| 'hover' \| 'never'` | 设置卡片的阴影模式 | `'always'` | - |
| content-style | `Record<string, any>` | 卡片内容的自定义样式                                    | `{}`       | - |

### Card Slots

| Name    | Description               | Parameters | Since |
| ------- | ------------------ | --- | --- |
| default | 卡片内容的插槽     | - | - |
| title   | 卡片标题的插槽     | - | - |
| extra   | 卡片拓展内容的插槽 | - | - |
