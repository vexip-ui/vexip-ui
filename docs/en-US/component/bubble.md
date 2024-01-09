# Bubble

Normally used as a chat dialog or tooltip.

When used as a tooltip, we usually use it with [Floating UI](https://floating-ui.com/), and the arrow element can be obtained via the `arrow` property of the component instance.

## Demos

:::demo bubble/basis

### Basis Usage

Just put a bubble.

:::

:::demo bubble/placement

### Bubble Position

The position of the bubble can be set by `placement` prop.

:::

:::demo bubble/types

### Bubble Types

==!s|2.2.0==

Different types of bubbles can be created by setting the `type` prop to `primary`, `info`, `success`, `warning` and `error`.

:::

:::demo bubble/background

### Background Color

If the built-in types do not satisfy you, you can customize the background color by setting the `background` prop.

Note that after the `background` is set, the content color becomes white by default, which can be overridden by style.

:::

:::demo bubble/example

### An Example

A sad chat.

:::

## API

### Bubble Props

| Name          | Type                | Description                                                                                                                         | Default     | Since   |
| ------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| placement     | `Placement`         | The position of the bubble, the optional value is the same as [floating-ui](https://floating-ui.com/docs/computePosition#placement) | `'right'`   | -       |
| type          | `BubbleType`        | The type of the bubble                                                                                                              | `'default'` | `2.2.0` |
| background    | `string`            | The background color of the bubble                                                                                                  | `''`        | -       |
| shadow        | `boolean \| string` | Whether the bubble uses shadow, when passed in string, it will be used as the color of the shadow                                   | `false`     | -       |
| content-class | `ClassType`         | Custom class name for bubble content                                                                                                | `null`      | -       |

### Bubble Slots

| Name    | Description                        | Parameters | Since |
| ------- | ---------------------------------- | ---------- | ----- |
| default | Slot for the content of the bubble | -          | -     |
