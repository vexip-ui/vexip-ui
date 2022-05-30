### Button 属性

| 名称         | 类型    | 说明                                                                                             | 默认值    |
| ------------ | ------- | ------------------------------------------------------------------------------------------------ | --------- |
| type         | String  | 按钮类型，可选值为 `default`、`primary`、`dsahed`、`text`、`info`、`success`、`warning`、`error` | 'default' |
| simple       | Boolean | 开启后，按钮将变为浅色系的简约风格                                                               | false     |
| ghost        | Boolean | 开启后，按钮将变成背景颜色透明的样式                                                             | false     |
| size         | String  | 按钮的大小，可选值为 `small`、`default`、`large`                                                 | 'default' |
| disabled     | Boolean | 设置是否为禁用状态                         设置                                                          | false     |
| loading      | Boolean | 设置是否为加载状态                         设置                                                          | false     |
| circle       | Boolean | 设置是否为圆形按钮                                                                                   | false     |
| icon         | Object  | 按钮的辅助图标，加载状态时会切换为加载图标                                                       | ''        |
| loading-icon | String  | 加载状态时显示的图标，具有脉冲效果                                                               | 'spinner' |
| loading-spin | Boolean | 开启后，加载中图标原有的脉冲效果将变位旋转效果                                                   | false     |
| button-type  | String  | 设置原生 button 的 type 属性                                                                     | 'button'  |
| block        | Boolean | 是否为块级元素，设置后宽度变为 `100%`                                  | false     |
| color   | String  | 设置按钮的主题色                                                                               | null      |

### Button 事件

| 名称     | 说明                                    | 参数       |
| -------- | --------------------------------------- | ---------- |
| click | 左键点击按钮时触发， 返回点击的事件对象 | clickEvent |

### Button 插槽

| 名称    | 说明                                             |
| ------- | ------------------------------------------------ |
| default | 按钮的内容插槽                                   |
| loading | 加载图标的插槽，需要更多定制化加载图标效果时使用 |
