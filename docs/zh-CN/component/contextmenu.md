# 右键菜单 Contextmenu

对于一些交互逻辑较多的页面，可以将一些操作置于右键菜单中，以方便用户快速选择。

## 代码示例

:::demo contextmenu/basis

### 基础用法

最简单的用法，在需要添加右键菜单的元素上通过 `contextmenu` 事件回调调用菜单。

需要注意的是，`contextmenu` 事件需要禁用默认行为以阻止弹出系统菜单。

:::

:::demo contextmenu/example

### 综合用例

这个用例展示了如何设置自定义颜色、如何设置自定义图标、如何禁用选项、如何设置菜单快捷键提示、如何添加分割线进行分组。

:::

:::demo contextmenu/nesting

### 嵌套菜单

通过 `children` 选项可以配置嵌套的菜单。

Contextmenu 组件是通过 Dropdown 组件封装的，因此选择菜单后返回的 key 值结构与 Dropdown 组件是一致。

:::

## API

### Contextmenu 选项

| 名称    | 类型           | 说明                                                                      | 默认值  | 始于 |
| ------- | -------------- | ------------------------------------------------------------------------- | ------- | ---- |
| clientX | `number`       | 设置菜单出现的横向 x 位置                                                 | `0`     | -    |
| clientY | `number`       | 设置菜单出现的纵向 y 位置                                                 | `0`     | -    |
| appear  | `boolean`      | 同 vue 原生 transition 的 appear 属性，设置菜单初始渲染时是否具有过渡效果 | `false` | -    |
| configs | `MenuConfig[]` | 设置菜单选项，具体属性参考下方 Contextmenu 配置项                         | `[]`    | -    |

### Contextmenu 配置项

| 名称      | 类型                                 | 说明                                        | 默认值  | 始于 |
| --------- | ------------------------------------ | ------------------------------------------- | ------- | ---- |
| key       | `string \| number`                   | 设置菜单的唯一标识                          | `''`    | -    |
| label     | `string`                             | 设置菜单的标签，未设置时则显示菜单的 key 值 | `''`    | -    |
| icon      | `Record<string, any> \| (() => any)` | 菜单的图标，传入函数时作为 render 函数渲染  | `null`  | -    |
| color     | `string`                             | 菜单的颜色                                  | `''`    | -    |
| iconColor | `string`                             | 菜单的图标的颜色                            | `''`    | -    |
| shortcut  | `string`                             | 设置快捷键提示内容                          | `''`    | -    |
| divided   | `boolean`                            | 设置是否具有分割线                          | `false` | -    |
| disabled  | `boolean`                            | 设置是否禁用选项                            | `false` | -    |
| children  | `MenuConfig[]`                       | 设置子菜单的选项                            | `[]`    | -    |
