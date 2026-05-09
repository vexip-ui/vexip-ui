# ObjectFit ==!s|2.4.0==

A component that implements CSS `object-fit` functionality for non-replaced elements.

A responsive layout container component that automatically adjusts content size based on parent container dimensions while maintaining aspect ratio.

:::warning
You can drag the bottom-right corner in examples to resize and observe the effect.
:::

## Basic Example

:::demo object-fit/basis

### Basic Usage

The ObjectFit component automatically scales content to fit the parent container while maintaining the specified aspect ratio.

:::

:::demo object-fit/scale

### Content Scaling

Use the `scale` property to control whether the content scales within the container. The example adds a background color to the scaled area.

:::

:::demo object-fit/position

### Object Positioning

Use the `position` property to adjust the initial position of the content within the container, such as `top left` for top-left alignment.

The position parameter is consistent with the CSS `object-position` parameter, and its default value is center.

:::

:::demo object-fit/h5

### Mobile Example

Reject mobile adaptation code

Develop H5 pages using absolute units to achieve 1:1 design fidelity. Pages exported from design tools can also be quickly developed.

:::

## API

### Preset Types

```ts
export type ObjectFitValue = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
export type ObjectFitPosition = 'top' | 'bottom' | 'left' | 'right' | 'center' | 'top left' | 'top right' | 'bottom left' | 'bottom right' | (string & {})
```

### ObjectFit Props

| Name           | Type                | Description                      | Default    |
| -------------- | ------------------- | -------------------------------- | ---------- |
| width          | `number`            | Original width of content        | `100`      |
| height         | `number`            | Original height of content       | `100`      |
| fit            | `ObjectFitValue`    | How content resizes to container | `'none'`   |
| position       | `ObjectFitPosition` | Initial position of content      | `'center'` |
| scale-disabled | `boolean`           | Whether to apply scale transform | `false`    |

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
