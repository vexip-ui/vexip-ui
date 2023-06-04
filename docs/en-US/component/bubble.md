# Bubble

## Demos

:::demo bubble/basis

### Basis Usage

Just put a bubble.

:::

:::demo bubble/background

### Background Color

The color of bubble can be specified by setting the value of the `background` prop.

:::

:::demo bubble/example

### A Example

A sad chat.

:::

## API

### Bubble Props

| Name          | Type                | Description                                                                                       | Default   | Since |
| ------------- | ------------------- | ------------------------------------------------------------------------------------------------- | --------- | ----- |
| placement     | `Placement`         | The position of the bubble box, the optional value is the same as Popper.js                       | `'right'` | -     |
| background    | `string`            | The background color of the bubble                                                                | `''`      | -     |
| shadow        | `boolean \| string` | Whether the bubble uses shadow, when passed in string, it will be used as the color of the shadow | `false`   | -     |
| content-class | `ClassType`         | Custom class name for bubble content                                                              | `null`    | -     |

### Bubble Slots

| Name    | Description                        | Parameters | Since |
| ------- | ---------------------------------- | ---------- | ----- |
| default | Slot for the content of the bubble | -          | -     |
