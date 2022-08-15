### Ellipsis 属性

| 名称            | 类型             | 说明                                         | 默认值     | 始于 |
| --------------- | ---------------- | -------------------------------------------- | ---------- | --- |
| placement       | `Placement`           | 设置提示气泡出现的位置，可选值同 Popper.js   | `'top'`      | - |
| transfer        | `boolean \| string`           | 设置提示气泡渲染位置，设置为 `true` 时默认渲染至 `<body>`        | `'body'`     | - |
| no-hover        | `boolean`          | 设置是否让提示气泡变得无法捕捉               | `false`      | - |
| transition-name | `string`           | 设置提示气的显示隐藏过渡效果                 | `'vxp-fade'` | - |
| tooltip-theme   | `string`           | 设置提示气泡的主题，可选值为 `light`、`dark` | `'dark'`     | - |
| tip-class       | `string \| Record<string, boolean>` | 提示内容的自定义类名                         | `null`       | - |
| max-lines       | `number` |  设置最大行数，传入一个大于 0 的整数后将开启多行模式，其实现基于 `-webkit-line-clamp`       | `null`       | - |

