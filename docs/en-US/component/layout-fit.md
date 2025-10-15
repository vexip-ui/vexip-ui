# LayoutFit

A responsive layout container component that automatically adjusts content size based on parent container dimensions while maintaining aspect ratio.

## Demos

:::demo layout-fit/basis

### Basis Usage

The LayoutFit component automatically scales content to fit within the parent container while maintaining the specified aspect ratio.

:::

## API

### Preset Types

```ts
import type { ResizeInfo } from '@juggle/resize-observer'

interface LayoutFitExposed {
  currentWidth: number,
  currentHeight: number,
  scaleX: number,
  scaleY: number,
}
```

### LayoutFit Props

| Name     | Type                                                       | Description                                            | Default  |
| -------- | ---------------------------------------------------------- | ------------------------------------------------------ | -------- |
| width    | `number`                                                   | The original width of the content                      | `100`    |
| height   | `number`                                                   | The original height of the content                     | `100`    |
| fit      | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | How the content should be resized to fit its container | `'none'` |
| is-scale | `boolean`                                                  | Whether to apply scaling transformation to the content | `false`  |

### LayoutFit Events

| Name   | Description                           | Parameters                                                                                                                                                                  | Since |
| ------ | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| resize | Emitted when the container is resized | `(data: { contentWidth: number, contentHeight: number, scaleX: number, scaleY: number, innerWidth: number, innerHeight: number, _entries: ResizeObserverEntry[] }) => void` | -     |

### LayoutFit Slots

| Name    | Description           | Parameters | Since |
| ------- | --------------------- | ---------- | ----- |
| default | The content to render | -          | -     |

### LayoutFit Exposed

| Name          | Type     | Description                         | Since |
| ------------- | -------- | ----------------------------------- | ----- |
| currentWidth  | `number` | The current calculated width        | -     |
| currentHeight | `number` | The current calculated height       | -     |
| scaleX        | `number` | The current horizontal scale factor | -     |
| scaleY        | `number` | The current vertical scale factor   | -     |
