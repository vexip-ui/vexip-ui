### Contextmenu 选项

| 名称    | 类型    | 说明                                                                      | 默认值 |
| ------- | ------- | ------------------------------------------------------------------------- | ------ |
| clientX | Number  | 设置菜单出现的横向 x 位置                                                 | -      |
| clientY | Number  | 设置菜单出现的纵向 y 位置                                                 | -      |
| appear  | Boolean | 同 vue 原生 transition 的 appear 属性，设置菜单初始渲染时是否具有过渡效果 | false  |
| configs | Array   | 设置菜单选项，具体属性参考菜单配置                                        | []     |

### Contextmenu 配置项

| 名称      | 类型                         | 说明                                                                                 | 默认值 |
| --------- | ---------------------------- | ------------------------------------------------------------------------------------ | ------ |
| key       | String \| Number             | 设置菜单的唯一标识                                                                   | -      |
| label     | String                       | 设置菜单的标签，未设置时则显示菜单的 key 值                                          | -      |
| icon      | String \| Object \| Function | 菜单的图标，传入对象时每个属性会对应 Icon 组件的属性，传入函数时使用 render 函数渲染 | -      |
| color     | String                       | 菜单的颜色                                                                           | -      |
| iconColor | String                       | 菜单的图标的颜色                                                                     | -      |
| shortcut  | String                       | 设置快捷键提示内容                                                                   | -      |
| divided   | Boolean                      | 设置是否具有分割线                                                                   | false  |
| disabled  | Boolean                      | 设置是否禁用选项                                                                     | false  |
| children  | Array                        | 设置子菜单的选项                                                                     | []     |
