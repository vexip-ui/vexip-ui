### Linker 属性

| 名称      | 类型    | 说明                                                                             | 默认值    |
| --------- | ------- | -------------------------------------------------------------------------------- | --------- |
| to        | `string`  | 链接的目标地址                                                                   | `null`      |
| type      | `'default' \| 'primary' \| 'success' \| 'error' \| 'warning' \| 'info'` | 链接的类型 | `'default'` |
| icon      | `Record<string, any>`  | 链接的前置图标                                                                   | `null`        |
| underline | `boolean` | 设置鼠标移入时是否显示下划线                                                      | `false`     |
| disabled  | `boolean` | 设置是否为禁用状态                                                               | `false`     |
| target    | `string`  | 同原生 `<a>` 标签的 `target` 属性                                              | `'_blank'` |

### Linker 事件

| 名称     | 说明                                   | 参数       |
| -------- | -------------------------------------- | ---------- |
| click | 左键点击链接时触发，返回点击的事件对象 | `(event: MouseEvent)` |

### Linker 插槽

| 名称    | 说明               | 参数 |
| ------- | ------------------ | --- |
| default | 链接的内容插槽     | - |
| icon    | 链接图标的内容插槽 | - |
