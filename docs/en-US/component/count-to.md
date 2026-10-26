# CountTo

It is used to dynamically display the change of a number, such as the number of real-time appointments, countdown, etc.

## Demos

:::demo count-to/basis

### Basis Usage

Observe how the component works by modifying various props.

:::

:::demo count-to/slots

### Prefix And Suffix

Set the values of `prefix` and `suffix` or use a slot with the same name to add front and rear contents to the component.

:::

## API

### Preset Types

```ts
type CountToTimingName = 'linear' | 'easeOut'
type CountToTiming = (progress: number, localStart: number, end: number, duration: number) => number
```

### CountTo Props

| Name      | Type                                 | Description                                           | Default    | Since |
| --------- | ------------------------------------ | ----------------------------------------------------- | ---------- | ----- |
| start     | `number`                             | The start number                                      | `0`        | -     |
| end       | `number`                             | The end number                                        | `0`        | -     |
| autoplay  | `boolean`                            | Autoplay animation when `start` or `end` has changed. | `true`     | -     |
| appear    | `boolean`                            | Play animation when compoent mount.                   | `false`    | -     |
| duration  | `number`                             | Duration in millisecond                               | `3000`     | -     |
| decimals  | `number`                             | The number of decimal places to show                  | `0`        | -     |
| decimal   | `string`                             | The split decimal                                     | `'.'`      | -     |
| separator | `string`                             | The thousand separator                                | `','`      | -     |
| prefix    | `string`                             | The prefix of displayed value                         | `''`       | -     |
| suffix    | `string`                             | The suffix of displayed value                         | `''`       | -     |
| timing    | `CountToTimingName \| CountToTiming` | The timing function of number change                  | `'linear'` | -     |

### CountTo Slots

| Name   | Description                                    | Parameters | Since |
| ------ | ---------------------------------------------- | ---------- | ----- |
| prefix | Slot for prefix content, usually a single icon | -          | -     |
| suffix | Slot for suffix content, usually a single icon | -          | -     |
