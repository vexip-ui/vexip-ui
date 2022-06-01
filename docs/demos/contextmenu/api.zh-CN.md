### Contextmenu 选项

| 名称    | 类型    | 说明                                                                      | 默认值 |
| ------- | ------- | ------------------------------------------------------------------------- | ------ |
| clientX | `number`  | 设置菜单出现的横向 x 位置                                                 | `0`      |
| clientY | `number`  | 设置菜单出现的纵向 y 位置                                                 | `0`      |
| appear  | `boolean` | 同 vue 原生 transition 的 appear 属性，设置菜单初始渲染时是否具有过渡效果 | `false`  |
| configs | `MenuConfig[]`   | 设置菜单选项，具体属性参考下方 Contextmenu 配置项                                        | `[]`     |

### Contextmenu 配置项

| 名称      | 类型                         | 说明                                                                                 | 默认值 |
| --------- | ---------------------------- | ------------------------------------------------------------------------------------ | ------ |
| key       | `string \| number`             | 设置菜单的唯一标识                                                                   | `''`     |
| label     | `string`                       | 设置菜单的标签，未设置时则显示菜单的 key 值                                          | `''`      |
| icon      | `Record<string, any> \| (() => any)` | 菜单的图标，传入函数时作为 render 函数渲染 | `null`      |
| color     | `string`                       | 菜单的颜色                                                                           | `''`      |
| iconColor | `string`                       | 菜单的图标的颜色                                                                     | `''`      |
| shortcut  | `string`                       | 设置快捷键提示内容                                                                   | `''`      |
| divided   | `boolean`                      | 设置是否具有分割线                                                                   | `false`  |
| disabled  | `boolean`                      | 设置是否禁用选项                                                                     | `false`  |
| children  | `MenuConfig[]`                        | 设置子菜单的选项                                                                     | `[]`     |
