# Viewer 查看器 ==!s|2.0.0==

可以用来便捷查看一些东西，比如图片等。

## 代码示例

:::demo viewer/basis

### 基础用法

最简单的用法。

:::

:::demo viewer/modal

### 结合模态框

某些时候会结合模态框一起使用。

:::

:::demo viewer/switch

### 切换内容

这个示例演示了如何切换查看器的内容。

:::

:::demo viewer/toolbar

### 工具栏位置

通过 `toolbar-placement` 属性可以将工具栏放在一个合适的位置。

:::

:::demo viewer/static

### 无过渡

有时候你可能希望变化来得更直接一些，那么可以禁用过渡效果。

:::

:::demo viewer/actions

### 自定义操作

通过 `actions` 属性可以添加自定义的操作配置项。

随后可以通过 `action-layout` 属性修改操作按钮的布局。

:::

## API

### 预设类型

```ts
type ViewerToolbarPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
type ViewerPresetAction =
  | 'rotate-right'
  | 'rotate-left'
  | 'flip-x'
  | 'flip-y'
  | 'zoom-in'
  | 'zoom-out'
  | 'full-screen'
  | 'reset'
type ViewerActionName = ViewerPresetAction | (string & {})
type ViewerActionLayout = ViewerActionName[][]

interface ViewerState {
  x: number,
  y: number,
  zoom: number,
  rotate: number,
  flipX: boolean,
  flipY: boolean,
  full: boolean,
  moving: boolean,
  [custom: string]: unknown
}

interface ViewerToolbarAction {
  name: string,
  process: (state: ViewerState) => void,
  icon?: Record<string, any> | (() => any),
  iconRenderer?: (data: { state: ViewerState }) => any,
  class?: ClassType | ((state: ViewerState) => string),
  title?: string | ((state: ViewerState) => string),
  iconScale?: number | ((state: ViewerState) => number),
  iconStyle?: StyleType | ((state: ViewerState) => StyleType),
  /** @deprecated */
  divided?: boolean | ((state: ViewerState) => boolean),
  hidden?: boolean | ((state: ViewerState) => boolean),
  disabled?: boolean | ((state: ViewerState) => boolean)
}
```

### Viewer 属性

| 名称              | 类型                     | 说明                                                                        | 默认值     | 始于    |
| ----------------- | ------------------------ | --------------------------------------------------------------------------- | ---------- | ------- |
| move-disabled     | `boolean`                | 是否禁用移动功能                                                            | `false`    | -       |
| zoom-disabled     | `boolean`                | 是否禁用缩放功能                                                            | `false`    | -       |
| zoom-delta        | `number`                 | 设置每次缩放的变化量                                                        | `0.15`     | -       |
| zoom-min          | `number`                 | 可缩放的最小比例                                                            | `0.1`      | -       |
| zoom-max          | `number`                 | 可缩放的最大比例                                                            | `Infinity` | -       |
| flip-disabled     | `boolean`                | 是否禁用镜像翻转功能                                                        | `false`    | -       |
| rotate-disabled   | `boolean`                | 是否禁用旋转功能                                                            | `false`    | -       |
| rotate-delta      | `number`                 | 设置每次旋转的变化量                                                        | `90`       | -       |
| full-disabled     | `boolean`                | 是否禁用全屏功能                                                            | `false`    | -       |
| toolbar-placement | `ToolbarPlacement`       | 设置工具栏的位置                                                            | `'bottom'` | -       |
| actions           | `ToolbarAction[]`        | 添加自定义的操作按钮                                                        | `[]`       | -       |
| toolbar-fade      | `boolean \| number`      | 设置触发工具栏是否渐隐，传入数字时可以设置渐隐的等待毫秒                    | `false`    | -       |
| locale            | `LocaleConfig['viewer']` | 设置多语言配置                                                              | `null`     | `2.1.0` |
| no-transition     | `boolean`                | 是否禁用过渡效果                                                            | `false`    | -       |
| center-scale      | `boolean`                | 是否以内容的中心点作为缩放的中心                                            | `false`    | `2.3.2` |
| action-layout     | `ViewerActionLayout`     | 配置操作按钮的布局，为空时将使用默认布局，并将 `actions` 的操作按钮置于最后 | `[]`       | `2.3.2` |

### Viewer 事件

| 名称       | 说明                                         | 参数                                    | 始于 |
| ---------- | -------------------------------------------- | --------------------------------------- | ---- |
| move-start | 开始移动时触发，返回查看器的状态             | `(state: ViewerState)`                  | -    |
| move       | 移动时触发，返回查看器的状态                 | `(state: ViewerState)`                  | -    |
| move-end   | 移动结束时触发，返回查看器的状态             | `(state: ViewerState)`                  | -    |
| wheel      | 滚动时触发，返回方向标记和查看器状态         | `(sign: -1 \| 1, state: ViewerState)`   | -    |
| rotate     | 旋转时触发，返回变化量和查看器状态           | `(delta: number, state: ViewerState)`   | -    |
| zoom       | 缩放时触发，返回变化量和查看器状态           | `(delta: number, state: ViewerState)`   | -    |
| full       | 切换全屏时触发，返回当前全屏状态和查看器状态 | `(active: boolean, state: ViewerState)` | -    |
| reset      | 重置时触发，返回查看器状态                   | `(state: ViewerState)`                  | -    |

### Viewer 插槽

| 名称    | 说明           | 参数 | 始于 |
| ------- | -------------- | ---- | ---- |
| default | 需要查看的内容 | -    | -    |
