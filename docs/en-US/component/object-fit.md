# ObjectFit Adaptive Layout ==!s|2.3.39==

A component that implements CSS `object-fit` functionality for non-replaced elements.

A responsive layout container component that automatically adjusts content size based on parent container dimensions while maintaining aspect ratio.

The `position` parameter corresponds to CSS's `object-position` parameter, with a default value of 'center'.

:::warning
You can drag the bottom-right corner in examples to resize and observe the effect.
:::

## Basic Example

:::demo object-fit/basis

### Basic Usage

The ObjectFit component automatically scales content to fit the parent container while maintaining the specified aspect ratio.

:::

## Advanced Example

:::demo object-fit/advanced

### Advanced Usage

:::

## Mobile Example

:::demo object-fit/h5

### Mobile Usage

Reject mobile adaptation code

Develop H5 pages using absolute units to achieve 1:1 design fidelity. Pages exported from design tools can also be quickly developed.

:::

## API

### Preset Types

```ts
interface ObjectFitExposed {
  innerWidth: number,
  innerHeight: number,
  wrapperWidth: number,
  wrapperHeight: number,
  scaleX: number,
  scaleY: number,
}
```

### ObjectFit Props

| Name     | Type                                                       | Description                      | Default    |
| -------- | ---------------------------------------------------------- | -------------------------------- | ---------- |
| width    | `number`                                                   | Original width of content        | `100`      |
| height   | `number`                                                   | Original height of content       | `100`      |
| fit      | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | How content resizes to container | `'none'`   |
| position | `string`                                                   | Initial position of content      | `'center'` |
| is-scale | `boolean`                                                  | Whether to apply scale transform | `true`     |

### ObjectFit Slots

| Name    | Description       | Params | Since |
| ------- | ----------------- | ------ | ----- |
| default | Content to render | -      | -     |

### ObjectFit Exposed

| Name          | Type     | Description                         | Since |
| ------------- | -------- | ----------------------------------- | ----- |
| innerWidth    | `number` | Current calculated inner width      | -     |
| innerHeight   | `number` | Current calculated inner height     | -     |
| wrapperWidth  | `number` | Current calculated container width  | -     |
| wrapperHeight | `number` | Current calculated container height | -     |
| scaleX        | `number` | Current horizontal scale factor     | -     |
| scaleY        | `number` | Current vertical scale factor       | -     |
