# Button

The basic general component is used to mark a set of operation commands, which are triggered by the user's click, respond to the user and complete the corresponding business logic.

## Demos

:::demo button/basis

### Button Type

By setting the `type` prop to: `primary`, `info`, `success`, `warning` and `error` to create button with different types.

:::

:::demo button/disabled

### Disabled Button

Adding the `disabled` prop to make the button disabled.

:::

:::demo button/simple

### Simple Button

Simple buttons use light tones and are often used on minimalist pages.

:::

:::demo button/ghost

### Ghost Button

The ghost button turns the background transparent and is often used on colored backgrounds.

:::

:::demo button/text

### Text Button

Adding the `text` prop to make the button look like normal text.

With the `tag` prop, you can make it look like a normal link.

:::

:::demo button/dashed

### Dashed Button

Add the `dashed` prop can change button to dashed.

:::

:::demo button/badge

### Inner Badge

The inner badge can be set via the `badge` prop.

:::

:::demo button/size

### Button Size

There are three built-in sizes, which are set by `size`.

:::

:::demo button/icon

### Add Icon

When you need to embed an icon inside a button, you can pass the icon component directly into the `icon` prop.

If you don't mind the trouble, you can also use the Icon component directly in the slot.

:::

:::demo button/loading

### Loading Button

Adding the `loading` prop to make the button in loading.

:::

:::demo button/custom

### Custom Color

You can custom the major color through the `color` prop.

:::

:::demo button/group

### Button Group

Using ButtonGroup can easily combine multiple buttons, which are mostly used in a series of functional button layouts.

The ButtonGroup size and type can be set uniformly, and you can also set the type of each Button individually.

:::

## API

### Preset Types

```ts
type ButtonType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
type ButtonAttrType = 'button' | 'submit' | 'reset'
```

### Button Props

| Name           | Type                              | Description                                                                   | Default     | Since   |
| -------------- | --------------------------------- | ----------------------------------------------------------------------------- | ----------- | ------- |
| type           | `ButtonType`                      | Set the button type                                                           | `'default'` | -       |
| simple         | `boolean`                         | Once set, the button will change to a minimalist style in light colors        | `false`     | -       |
| ghost          | `boolean`                         | Once set, the button will be styled with a transparent background color       | `false`     | -       |
| text           | `boolean`                         | Set whether it is a text button                                               | `false`     | `2.0.0` |
| dashed         | `boolean`                         | Set whether it is a dashed button                                             | `false`     | `2.0.0` |
| size           | `'small' \| 'default' \| 'large'` | The size of the button                                                        | `'default'` | -       |
| disabled       | `boolean`                         | Set whether it is disabled                                                    | `false`     | -       |
| loading        | `boolean`                         | Set whether it is loading                                                     | `false`     | -       |
| circle         | `boolean`                         | Set whether it is circular                                                    | `false`     | -       |
| icon           | `VueComponent`                    | Auxiliary icon of the button, it will switch to the loading icon when loading | `''`        | -       |
| loading-icon   | `VueComponent`                    | Set whether to be read-only when loading                                      | `Spinner`   | -       |
| loading-effect | `string`                          | Set the effect animation for the loading icon                                 | `false`     | -       |
| button-type    | `ButtonAttrType`                  | Set the `type` attribute of the native `<button>`                             | `'button'`  | -       |
| block          | `boolean`                         | Whether it is a block-level element, the width becomes 100% after setting     | `false`     | -       |
| color          | `string`                          | Set the major color of the button                                             | `null`      | `2.0.0` |
| tag            | `string`                          | Set button rendering tag                                                      | `'button'`  | `2.0.0` |
| no-pulse       | `boolean`                         | Set whether to disable the pulse effect after clicking                        | `false`     | `2.0.0` |
| badge          | `number \| string`                | set inner badge content                                                       | `null`      | `2.0.4` |

### Button Events

| Name  | Description                                                               | Parameters            | Since |
| ----- | ------------------------------------------------------------------------- | --------------------- | ----- |
| click | Emitted when the button is left clicked, returns the clicked event object | `(event: MouseEvent)` | -     |

### Button Slots

| Name    | Description                                                            | Parameters | Since   |
| ------- | ---------------------------------------------------------------------- | ---------- | ------- |
| default | Content slot for button                                                | -          | -       |
| icon    | Slot for button prefix icon                                            | -          | `2.0.0` |
| loading | Loading icon slot, used when you need more custom loading icon effects | -          | -       |
