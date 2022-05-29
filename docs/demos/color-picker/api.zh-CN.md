## API

### 属性

| 名称          | 类型    | 说明                                                                     | 默认值          |
| ------------- | ------- | ------------------------------------------------------------------------ | --------------- |
| value         | String  | 颜色选择器的值，可以使用 v-model 双向绑定                                | '#339af0'       |
| visible       | Boolean | 设置颜色控制面板的显示状态                                               | false           |
| format        | String  | 更新 value 前对颜色进行格式化的类型，可选值为 `rgb`、`hsl`、`hsv`、`hex` | 'rgb'           |
| size          | String  | 颜色选择器的大小，可选值为 `small`、`default`、`large`                   | 'default'       |
| alpha         | Boolean | 是否使用透明度选择功能                                                   | false           |
| disabled      | Boolean | 是否为禁用状态 (未实现)                                                  | false           |
| no-input      | Boolean | 是否禁用 Input 输入颜色值                                                | false           |
| shortcut      | Boolean | 是否使用快捷选取颜色                                                     | false           |
| shortcut-list | Array   | 快捷选取颜色的候选列表                                                   | DefaultShotcuts |

### 事件

| 名称             | 说明                                                             | 参数           |
| ---------------- | ---------------------------------------------------------------- | -------------- |
| on-toggle        | 颜色控制面板显示状态改变时触发，返回当前状态                     | visible        |
| on-outside-close | 当点击控件外部触发面板关闭时触发，无返回值                       | -              |
| on-change        | 当选择的颜色发生变化时触发，返回格式化后的颜色值                 | formattedColor |
| on-shortcut      | 当使用快捷功能选取颜色时触发，返回一个 { r，g，b，a } 的颜色对象 | rgba           |
