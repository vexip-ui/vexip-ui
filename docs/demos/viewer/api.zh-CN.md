### Viewer 属性

| 名称 | 类型 | 说明 | 默认值 | 始于 |
| ---- | ---- | ---- | ------ | ---- |
| move-disabled | `boolean` | 设置是否禁用移动功能 | `false` | - |
| zoom-disabled | `boolean` | 设置是否禁用缩放功能 | `false` | - |
| zoom-delta | `number` | 设置每次缩放的变化量 | `0.15` | - |
| rotate-disabled | `boolean` | 设置是否禁用旋转功能 | `false` | - |
| rotate-delta | `number` | 设置每次旋转的变化量 | `90` | - |
| full-disabled | `boolean` | 设置是否禁用全屏功能 | `false` | - |
| toolbar-placement | `ToolbarPlacement` | 设置工具栏的位置 | `'bottom'` | - |
| actions | `ToolbarAction[]` | 添加自定义的操作按钮 | `[]` | - |
| toolbar-fade | `boolean \| number` | 设置触发工具栏是否渐隐，传入数字时可以设置渐隐的等待毫秒 | `false` | - |

一些内置的类型：

```ts
type ToolbarPlacement =
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

enum InternalActionName {
  RotateRight = 'rotateRight',
  RotateLeft = 'rotateLeft',
  ZoomIn = 'zoomIn',
  ZoomOut = 'zoomOut',
  FullScreen = 'fullScreen',
  FullScreenExit = 'fullScreenExit',
  Reset = 'reset'
}

interface ViewerState {
  x: number,
  y: number,
  zoom: number,
  rotate: number,
  full: boolean,
  moving: boolean,
  [custom: string]: unknown
}

interface ToolbarAction {
  name: string,
  icon: Record<string, any> | ((data: { state: ViewerState }) => any),
  process: (state: ViewerState) => void,
  title?: string | ((state: ViewerState) => string),
  iconScale?: number | ((state: ViewerState) => number),
  divided?: boolean | ((state: ViewerState) => boolean),
  hidden?: boolean | ((state: ViewerState) => boolean),
  disabled?: boolean | ((state: ViewerState) => boolean)
}
```

### Viewer 事件

| 名称 | 说明 | 参数 | 始于 |
| ---- | ---- | ---- | ---- |
| move-start | 开始移动时触发，返回查看器的状态 | `(state: ViewerState)` | - |
| move | 移动时触发，返回查看器的状态 | `(state: ViewerState)` | - |
| move-end | 移动结束时触发，返回查看器的状态 | `(state: ViewerState)` | - |
| wheel | 滚动时触发，返回方向标记和查看器状态 | `(sign: -1 | 1, state: ViewerState)` | - |
| rotate | 旋转时触发，返回变化量和查看器状态 | `(delta: number, state: ViewerState)` | - |
| zoom | 缩放时触发，返回变化量和查看器状态 | `(delta: number, state: ViewerState)` | - |
| full | 切换全屏时触发，返回当前全屏状态和查看器状态 | `(active: boolean, state: ViewerState)` | - |
| reset | 重置时触发，返回查看器状态 | `(state: ViewerState)` | - |

### Viewer 插槽

| 名称 | 说明 | 参数 | 始于 |
| ---- | ---- | ---- | ---- |
| default | 需要查看的内容 | - | - |
