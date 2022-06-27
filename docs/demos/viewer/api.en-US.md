### Viewer Props

| Name | Type | Description | Default | Since |
| ---- | ---- | ----------- | ------- | ----- |
| move-disabled | `boolean` | Set whether to disable the move function | `false` | - |
| zoom-disabled | `boolean` | Set whether to disable zoom function | `false` | - |
| zoom-delta | `number` | Set the amount of change per zoom | `0.15` | - |
| rotate-disabled | `boolean` | Set whether to disable rotation | `false` | - |
| rotate-delta | `number` | Set the delta per rotation | `90` | - |
| full-disabled | `boolean` | Set whether to disable full screen function | `false` | - |
| toolbar-placement | `ToolbarPlacement` | Set the position of the toolbar | `'bottom'` | - |
| actions | `ToolbarAction[]` | Add custom action buttons | `[]` | - |
| toolbar-fade | `boolean \| number` | Set whether to trigger the toolbar to fade or not. When passing in a number, you can set the wait milliseconds for fade | `false` | - |

Some internal types:

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

### Viewer Events

| Name | Description | Parameters | Since |
| ---- | ----------- | ---------- | ----- |
| move-start | Emitted when a move starts, returns the state of the viewer | `(state: ViewerState)` | - |
| move | Emitted when moving, returns the state of the viewer | `(state: ViewerState)` | - |
| move-end | Emitted when the move ends, returns the state of the viewer | `(state: ViewerState)` | - |
| wheel | Emitted when scrolling, returns the direction sign and viewer state | `(sign: -1 | 1, state: ViewerState)` | - |
| rotate | Emitted when rotated, returns delta and viewer state | `(delta: number, state: ViewerState)` | - |
| zoom | Emitted when zooming, returns delta and viewer state | `(delta: number, state: ViewerState)` | - |
| full | Emitted when switching to full screen, returns the current full screen state and viewer state | `(active: boolean, state: ViewerState)` | - |
| reset | Emitted when reset, returns to the viewer state | `(state: ViewerState)` | - |

### Viewer Slots

| Name | Description | Parameters | Since |
| ---- | ----------- | ---------- | ----- |
| default | The slot of conten which need to view | - | - |
