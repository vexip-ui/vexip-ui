### Preset Types

```ts
type CountToTimingName = 'linear' | 'easeOut'
type CountToTiming = (progress: number, localStart: number, end: number, duration: number) => number
```

### CountTo Props

| Name      | Type                                 | Description                                     | Default    | Since |
| --------- | ------------------------------------ | ----------------------------------------------- | ---------- | ----- |
| start     | `number`                             | The start number                                | `0`        | -     |
| end       | `number`                             | The end number                                  | `0`        | -     |
| manual    | `boolean`                            | Play automatically after the component renders. | `false`    | -     |
| duration  | `number`                             | Duration in millisecond                         | `3000`     | -     |
| decimals  | `number`                             | The number of decimal places to show            | `0`        | -     |
| decimal   | `string`                             | The split decimal                               | `'.'`      | -     |
| separator | `string`                             | The thousand separator                          | `','`      | -     |
| prefix    | `string`                             | The prefix of displayed value                   | `''`       | -     |
| suffix    | `string`                             | The suffix of displayed value                   | `''`       | -     |
| timing    | `CountToTimingName \| CountToTiming` | The timing function of number change            | `'linear'` | -     |
