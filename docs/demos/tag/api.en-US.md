### Tag Props

| Name         | Type    | Description                                                                                                                                                                                         | Default    | Since |
| ------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --- |
| type         | `'default' \| 'primary' \| 'success' \| 'error' \| 'warning' \| 'lime' \| 'pink' \| 'magenta' \| 'tomato' \| 'orange' \| 'cyan' \| 'navy' \| 'gold' \| 'purple'`  | 设置标签的类型，包含状态类型和颜色类型  | `'default'` | - |
| size         | `'small' \| 'default' \| 'large'`  | 标签的大小，与其他组件不同的是，该属性会同时改变标签字体大小                                                                                           | `'default'` | - |
| border       | `boolean` | 设置标签是否具有边框                                                                                                                                                                         | `false`     | - |
| closable     | `boolean` | 设置标签是否具有关闭功能                                                                                                                                                                     | `false`     | - |
| color        | `string`  | 设置标签的自定义颜色，其优先级高于 `type` 预设类型                                                                                                                                           | `null`      | - |
| border-color | `string`  | 设置标签的边框颜色                                                                                                                                                                           | `null`      | - |
| simple       | `boolean` | 设置标签是否为简约模式                                                                                                                                                                       | `false`     | - |
| circle       | `boolean` | 设置标签是否为圆角标签                                                                                                                                                                       | `false`     | - |

### Tag Events

| Name     | Description                                         | Parameters | Since |
| -------- | -------------------------------------------- | ---- | --- |
| close | 当标签可关闭，并点击关闭按钮时触发，无返回值 | -    | - |

### Tag Slots

| Name    | Description           | Parameters | Since |
| ------- | -------------- | --- | --- |
| default | 标签内容的插槽 | - | - |
