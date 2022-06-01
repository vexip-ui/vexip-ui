### ColorPicker 属性

| 名称          | 类型    | 说明                                                                     | 默认值          |
| ------------- | ------- | ------------------------------------------------------------------------ | --------------- |
| value         | `string`  | 颜色选择器的值，可以使用 v-model 双向绑定                                | `'#339af0'`       |
| visible       | `boolean` | 设置颜色控制面板的显示状态                                               | `false`           |
| format        | `'rgb' \| 'hsl' \| 'hsv' \| 'hex'`  | 更新 value 前对颜色进行格式化的类型 | `'rgb'`           |
| size          | `small \| default \| large`  | 颜色选择器的大小                    | `'default'`       |
| alpha         | `boolean` | 是否使用透明度选择功能                                                   | `false`           |
| disabled      | `boolean` | 是否为禁用状态 (未实现)                                                  | `false`           |
| no-input      | `boolean` | 是否禁用 Input 输入颜色值                                                | `false`           |
| shortcut      | `boolean` | 是否使用快捷选取颜色                                                     | `false`           |
| shortcut-list | `string[]`   | 快捷选取颜色的候选列表                                                   | `defaultShotcuts` |
| disable-validate | `boolean`                           | 是否禁用触发表单字段验证                                                         | `false`                 |

```js
const defaultShotcuts = [
  '#2d8cf0',
  '#19be6b',
  '#ff9900',
  '#ed4014',
  '#00b5ff',
  '#19c919',
  '#f9e31c',
  '#ea1a1a',
  '#9b1dea',
  '#00c2b1',
  '#ac7a33',
  '#1d35ea',
  '#8bc34a',
  '#f16b62',
  '#ea4ca3',
  '#0d94aa',
  '#febd79',
  '#5d4037',
  '#00bcd4',
  '#f06292',
  '#cddc39',
  '#607d8b',
  '#000000',
  '#ffffff'
]
```

### ColorPicker 事件

| 名称             | 说明                                                             | 参数           |
| ---------------- | ---------------------------------------------------------------- | -------------- |
| toggle        | 颜色控制面板显示状态改变时触发，返回当前状态                     | `(visible: boolean)`        |
| click-outside | 当点击控件外部时触发，无返回值                       | -              |
| outside-close | 当点击控件外部触发面板关闭时触发，无返回值                       | -              |
| change        | 当选择的颜色发生变化时触发，返回格式化后的颜色值                 | `(color: string \| RGBAColor \| HSLAColor \| HSVAColor)` |
| shortcut      | 当使用快捷功能选取颜色时触发，返回格式化后的颜色值 | `(color: string \| RGBAColor \| HSLAColor \| HSVAColor)`           |
