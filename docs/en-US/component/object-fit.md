# ObjectFit Adaptive Layout ==!s|2.3.39==

A component that implements the object-fit functionality for non-replaceable elements.

A responsive layout container component that automatically adjusts content size based on parent container dimensions while maintaining aspect ratio.

## Basic Example

:::demo object-fit/basis

### Basic Usage

The ObjectFit component automatically scales content to fit the parent container while maintaining the specified aspect ratio.

:::

## Advanced Example

:::demo object-fit/advanced

### Advanced Usage

Reject mobile adaptation code.

You can develop H5 pages using absolute units, achieving 1:1 design restoration. If you have pages exported from design drafts, you can also develop quickly.

:::

## API

### Preset Types

```ts
interface ObjectFitExposed {
  currentWidth: number,
  currentHeight: number,
  scaleX: number,
  scaleY: number,
}
```

### ObjectFit Props

| Name     | Type                                                       | Description                                   | Default  |
| -------- | ---------------------------------------------------------- | --------------------------------------------- | -------- |
| width    | `number`                                                   | Original width of the content                 | `100`    |
| height   | `number`                                                   | Original height of the content                | `100`    |
| fit      | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | How the content resizes to fit its container  | `'none'` |
| is-scale | `boolean`                                                  | Whether to apply scaling transform to content | `false`  |

### ObjectFit Slots

| Name    | Description       | Parameters | Since |
| ------- | ----------------- | ---------- | ----- |
| default | Content to render | -          | -     |

### ObjectFit Exposed

| Name          | Type     | Description                     | Since |
| ------------- | -------- | ------------------------------- | ----- |
| currentWidth  | `number` | Current calculated width        | -     |
| currentHeight | `number` | Current calculated height       | -     |
| scaleX        | `number` | Current horizontal scale factor | -     |
| scaleY        | `number` | Current vertical scale factor   | -     |
