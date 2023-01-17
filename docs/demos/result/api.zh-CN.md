### Result 属性

| 名称 | 类型 | 说明 | 默认值 | 始于 |
| ---- | ---- | ---- | ------ | ---- |
| type          | `'info' \| 'success' \| 'warning' \| 'error'` | 结果图标的类型                                                                                          | `'info'` | -       |
| size         | `'small' \| 'default' \| 'large'`                                       | 自定义大小                                                                 | `'default'` | -       |
| title         | `string`                                      | 结果的标题，当使用插槽时无效                     | `''`     | -       |
| description      | `string`                                     | 结果的描述内容，当使用插槽时无效         | `''`     | -       |
| icon-color    | `string`                                      | 设置图标的颜色                    | `''`     | -       |                                                          | `''`    

### Result 插槽

| 名称 | 说明 | 参数 | 始于 |
| ---- | ---- | ---- | ---- |
| icon | 自定义图标或其他内容              | -          | -     |
| title   | 自定义标题内容        | -          | -     |
| description   | 自定义描述内容        | -          | -     |
| extra   | 自定义额外内容，你可以设置按钮之类的东西      | -          | -     |