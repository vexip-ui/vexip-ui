# 颜色选择器 ColorPicker

提供一个选择器可用于让用户快速灵活地选择颜色值。

## 代码示例

:::demo color-picker/basis

### 基础用法

最简单的用法。

:::

:::demo color-picker/alpha

### 透明度

添加 `alpha` 属性可以开启透明度选择功能。

:::

:::demo color-picker/shortcut

### 快捷方式

添加 `shortcut` 属性可以使用快捷方式。

传入一组有效的颜色值，可以自定义快捷方式列表。

:::

:::demo color-picker/prefix

### 前置图标

设置 `prefix` 属性或者使用同名插槽，可以为选择器添加前置图标。

:::

:::demo color-picker/loading

### 加载状态

通过 `loading` 属性可以控制颜色选择器的加载状态。

如果你希望在加载中时为只读，你需要添加 `loading-lock` 属性。

:::

## API

### ColorPicker 属性

| 名称           | 类型                               | 说明                                                     | 默认值      | 始于    |
| -------------- | ---------------------------------- | -------------------------------------------------------- | ----------- | ------- |
| value          | `string`                           | 颜色选择器的值，可以使用 `v-model` 双向绑定              | `'#339af0'` | -       |
| visible        | `boolean`                          | 设置颜色控制面板的显示状态                               | `false`     | -       |
| format         | `'rgb' \| 'hsl' \| 'hsv' \| 'hex'` | 更新 value 前对颜色进行格式化的类型                      | `'rgb'`     | -       |
| size           | `small \| default \| large`        | 颜色选择器的大小                                         | `'default'` | -       |
| alpha          | `boolean`                          | 是否使用透明度选择功能                                   | `false`     | -       |
| disabled       | `boolean`                          | 是否为禁用状态                                           | `false`     | -       |
| no-input       | `boolean`                          | 是否禁用 Input 输入颜色值                                | `false`     | -       |
| shortcut       | `boolean \| string[]`              | 是否使用快捷选取颜色，传入字符串数组时可以定制化候选列表 | `false`     | -       |
| prefix         | `Record<string, any>`              | 前缀图标，使用前缀插槽时无效                             | `null`      | `2.0.0` |
| prefix-color   | `string`                           | 前缀内容的颜色，会影响前缀插槽                           | `''`        | `2.0.0` |
| suffix         | `Record<string, any>`              | 后缀图标，使用后缀插槽时无效                             | `null`      | `2.0.0` |
| suffix-color   | `string`                           | 后缀内容的颜色，会影响后缀插槽                           | `''`        | `2.0.0` |
| no-suffix      | `boolean`                          | 设置是否禁用后缀图标                                     | `false`     | `2.0.0` |
| static-suffix  | `boolean`                          | 设置后缀图标是否为静态的                                 | `false`     | `2.0.0` |
| loading        | `boolean`                          | 设置是否为加载中                                         | `false`     | `2.0.0` |
| loading-icon   | `Record<string, any>`              | 设置加载中的图标                                         | `Spinner`   | `2.0.0` |
| loading-lock   | `boolean`                          | 设置在加载中时是否为只读                                 | `false`     | `2.0.0` |
| loading-effect | `string`                           | 设置加载中图标的效果动画                                 | `false`     | `2.0.0` |
| locale         | `LocaleConfig['colorPicker']`      | 设置多语言配置                                           | `null`      | `2.1.0` |

```js
const defaultShortcuts = [
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

| 名称          | 说明                                               | 参数                                                     | 始于 |
| ------------- | -------------------------------------------------- | -------------------------------------------------------- | ---- |
| toggle        | 颜色控制面板显示状态改变时触发，返回当前状态       | `(visible: boolean)`                                     | -    |
| click-outside | 当点击控件外部时触发，无返回值                     | -                                                        | -    |
| outside-close | 当点击控件外部触发面板关闭时触发，无返回值         | -                                                        | -    |
| change        | 当选择的颜色发生变化时触发，返回格式化后的颜色值   | `(color: string \| RGBAColor \| HSLAColor \| HSVAColor)` | -    |
| shortcut      | 当使用快捷功能选取颜色时触发，返回格式化后的颜色值 | `(color: string \| RGBAColor \| HSLAColor \| HSVAColor)` | -    |
