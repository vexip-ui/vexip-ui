# Spin

## Demos

Enable fast switching of the loading state for a block.

It is often used in situations where data rendering or asynchronous processing takes a long time to avoid users being unable to obtain effective feedback for a long time.

:::demo spin/basis

### Basis Usage

In the simplest usage, control the loading state via the `active` prop.

:::

:::demo spin/delay

### Delay Switch

Control the delay time for loading state changes by setting the `delay` prop.

When `true` is passed in, `500ms` delay of showing and disappearing will be enabled by default, and the number of milliseconds can be controlled by passing in a number.

When you want to obtain different delay durations for display and disappearance, you can pass in an array containing two numbers for separate control.

:::

:::demo spin/directive

### Directive

Use the `v-loading` directive to quickly add a loading state to an element.

When it is inconvenient to modify the root element of the parent component and does not require a high degree of customization, the use of directives can effectively reduce the complexity of the code.

:::

:::demo spin/inner

### Inner Spin

Inner mode can be enabled by setting the `inner` prop.

It is often used in situations where it is inconvenient to modify the root element of the parent component and a certain degree of customization is required.

:::

## API

### Spin Props

| Name            | Type                            | Description                                                                                                                                                                                                                         | Default      | Since   |
| --------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------- |
| active          | `boolean`                       | The active state of spin                                                                                                                                                                                                            | `false`      | -       |
| icon            | `Record<string, any>`           | Icon displayed during loading, invalid after using slot                                                                                                                                                                             | `Spinner`    | -       |
| ~~spin~~        | `boolean`                       | Set the loading icon to use the spin animation, by default it is a pulse animation, if further customization is required, the slot should be used                                                                                   | `false`      | -       |
| inner           | `boolean`                       | Set whether it is an inline loading effect, generally used when it is not convenient to modify the parent root element                                                                                                              | `false`      | -       |
| delay           | `boolean \| number \| number[]` | Set the number of milliseconds for delay display or disappearance during loading. When true is passed in, the default is 500ms delay. Passing in an array can control the display and disappearance delay milliseconds respectively | `false`      | -       |
| tip             | `string`                        | Set the tip content during loading                                                                                                                                                                                                  | `''`         | -       |
| mask-color      | `string`                        | Set the mask base color in loading                                                                                                                                                                                                  | `''`         | -       |
| transition-name | `string`                        | Set the transition effect to appear during loading                                                                                                                                                                                  | `'vxp-fade'` | `2.0.0` |
| icon-effect     | `string`                        | Set the effect animation for the icon                                                                                                                                                                                               | `'pulse-in'` | `2.1.4` |

### Spin Slots

| Name    | Description                                                                       | Parameters | Since |
| ------- | --------------------------------------------------------------------------------- | ---------- | ----- |
| default | Slot to add the content of the loading effect, invalid when inner mode is enabled | -          | -     |
| icon    | Slot for loading icon content                                                     | -          | -     |
| tip     | Slot for loading tip content                                                      | -          | -     |

### Spin Directives

| Name      | Description                                                                                                                                                                 | Parameters                        | Since |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----- |
| v-loading | Used to quickly add a loading effect to an element, receive a boolean value to mark whether to activate the loading effect, or pass in Spin props for further customization | `(binding: boolean \| SpinProps)` | -     |
