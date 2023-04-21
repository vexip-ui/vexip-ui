# Ellipsis

This can be used when there is a piece of text that is too long to fit.

## Demos

:::demo ellipsis/basis

### Basis Usage

The simplest usage, it will be displayed as omitted content when the length of the content exceeds the width of the wrapping element.

And the full content will be displayed through Tooltip when the mouse is moved in.

:::

:::demo ellipsis/max-lines

### Max Lines

The max lines to be displayed can be set via the `max-lines` prop. The multi-line mode will be enabled when the prop is set to a valid number.

:::

## API

### Ellipsis Props

| Name            | Type                | Description                                                                                                                                      | Default      | Since |
| --------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | ----- |
| placement       | `Placement`         | Set the position of the prompt bubble, the optional value is the same as Popper.js                                                               | `'top'`      | -     |
| transfer        | `boolean \| string` | Set the rendering position of the prompt bubble. When set to `true`, it will render to `<body>` by default                                       | `'body'`     | -     |
| no-hover        | `boolean`           | Set whether to make the prompt bubble unhoverable                                                                                                | `false`      | -     |
| transition-name | `string`            | Set the transition effect of showing and hiding the prompt gas                                                                                   | `'vxp-fade'` | -     |
| tooltip-theme   | `string`            | Set the theme of the tooltip, optional values are `light`, `dark`                                                                                | `'dark'`     | -     |
| tip-class       | `ClassType`         | Custom class name for tip content                                                                                                                | `null`       | -     |
| max-lines       | `number`            | Set the max displayed lines, The multi-line mode will be enabled when passing an integer greater then `0`. It is powered by `-webkit-line-clamp` | `null`       | -     |
