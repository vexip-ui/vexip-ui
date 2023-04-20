# Tooltip

## Demos

It is used for expanding information that needs to pop up around a specific element.

:::demo tooltip/basis

### Basis Usage

Simplest usage.

:::

:::demo tooltip/no-arrow

### No Arrow

Its arrow can be disbaled via adding `no-arrow` prop.

:::

:::demo tooltip/placement

### Placement

You can set the tip appear placement via the `placement` prop.

:::

:::demo tooltip/position

### Manual Location

Passing an `{ x: number, y: number }` object via the `virtual` prop can manually control the position of tooltip.

In this way, you need to manually control the visible of tooltip.

:::

:::demo tooltip/raw

### Without Style

Render tip content directly without internal styles via adding `raw` prop.

:::

:::demo tooltip/reverse

### Reverse Theme

The reverse color theme will be enabled through adding `reverse` prop.

:::

:::demo tooltip/trigger

### Trigger Method

Change the trigger method via the `trigger` prop.

:::

:::demo tooltip/trigger-width

### Use Trigger Width

Simplest usage.

:::

:::demo tooltip/virtual-el

### External Element

You can pass an external element to trigger the tooltip via the `virtual` prop.

:::

:::demo tooltip/wrapper

### Use Wrapper

Add the `wrapper` prop to create a wrapping element, you also can passing a string to customize the rendered tag.

:::

## API

### Tooltip Props

| Name            | Type                                                              | Description                                                                                    | Default      | Since   |
| --------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------ | ------- |
| visible         | `boolean`                                                         | The display state of the tip, you can use `v-model` two-way binding                            | `false`      | -       |
| trigger         | `'hover' \| 'click' \| 'focus' \| 'custom'`                       | The trigger method of the tooltip, when it is `custom`, it need to manually controll `visible` | `'hover'`    | -       |
| placement       | `Placement`                                                       | The position where the tip appears, the optional value is the same as Popper.js                | `'top'`      | -       |
| outside-close   | `boolean`                                                         | Set whether to close by clicking outside                                                       | `true`       | -       |
| no-hover        | `boolean`                                                         | Set whether to make the tip unhoverable                                                        | `false`      | -       |
| tip-class       | `ClassType`                                                       | Custom class name for the tip                                                                  | `null`       | -       |
| tip-style       | `StyleType`                                                       | Custom styles for the tip                                                                      | `null`       | `2.0.0` |
| disabled        | `boolean`                                                         | Set whether to disable                                                                         | `false`      | -       |
| reverse         | `boolean`                                                         | Set whether to use reverse theme                                                               | `false`      | `2.0.0` |
| transfer        | `boolean \| string`                                               | Set the rendering place of tip. When set to `true`, it will render to `<body>` by default      | `false`      | -       |
| transition-name | `string`                                                          | Set the transition to show and hide the tip                                                    | `'vxp-fade'` | -       |
| wrapper         | `boolean \| string`                                               | Set whether to render a wrappering element                                                     | `false`      | `2.0.0` |
| no-arrow        | `boolean`                                                         | Set whether to disable arrow of tip                                                            | `false`      | `2.0.0` |
| raw             | `boolean`                                                         | Set whether to render tip without internal styles                                              | `false`      | `2.0.0` |
| tip-alive       | `boolean`                                                         | Set whether the tip will not be removed when hidden                                            | `false`      | `2.0.0` |
| width           | `number \| 'trigger' \| 'auto'`                                   | Set the width of the tip, can using trigger width when be set to `'trigger'`                   | `'auto'`     | `2.0.0` |
| virtual         | `{ $el: HTMLElement } \| HTMLElement \| { x: number, y: number }` | Set the virtual reference                                                                      | `null`       | `2.0.0` |

### Tooltip Events

| Name          | Description                                                                         | Parameters           | Since |
| ------------- | ----------------------------------------------------------------------------------- | -------------------- | ----- |
| toggle        | Emitted when the display state of the tip changes, returns the current state        | `(visible: boolean)` | -     |
| tip-enter     | Emitted when the mouse moves into the tip, no return value                          | -                    | -     |
| tip-leave     | Emitted when the mouse moves out of the tip, no return value                        | -                    | -     |
| click-outside | Emitted when the outside of the element is clicked, no return value                 | -                    | -     |
| outside-close | Emitted when the tooltip is closed by clicking outside the element, no return value | -                    | -     |

### Tooltip Slots

| Name    | Description                                       | Parameters | Since |
| ------- | ------------------------------------------------- | ---------- | ----- |
| default | The slot that triggers the content of the balloon | -          | -     |
| tip     | Slot for the content of the balloon               | -          | -     |
