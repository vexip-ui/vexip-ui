### Linker 属性

| 名称      | 类型    | 说明                                                                             | 默认值    |
| --------- | ------- | -------------------------------------------------------------------------------- | --------- |
| to        | String  | 链接的目标地址                                                                   | null      |
| type      | String  | 链接的类型，可选值为 `default`、`primary`、`success`、`error`、`warning`、`info` | 'default' |
| icon      | String  | 链接的图标名称                                                                   | ''        |
| underline | Boolean | 设置 hover 时是否显示下划线                                                      | false     |
| disabled  | Boolean | 设置是否为禁用状态                                                               | false     |
| target    | String  | 同原生 `<a></a>` 标签的 target 属性                                              | '\_blank' |

### Linker 事件

| 名称     | 说明                                   | 参数       |
| -------- | -------------------------------------- | ---------- |
| click | 左键点击链接时触发，返回点击的事件对象 | clickEvent |

### Linker 插槽

| 名称    | 说明               |
| ------- | ------------------ |
| default | 链接的内容插槽     |
| icon    | 链接图标的内容插槽 |
