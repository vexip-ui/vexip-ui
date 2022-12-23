### CountTo Props

| Name      | Type     | Description                                     | Default                        | Since |
| --------- | -------- | ----------------------------------------------- | ------------------------------ | ----- |
| start     | number   | The start number of `CountTo`                   |                                | 2.1.0 |
| end       | number   | The end number of `CountTo`                     |                                | 2.1.0 |
| autoplay  | boolean  | Play automatically after the component renders. | `true`                         | 2.1.0 |
| duration  | number   | Duration in millisecond                         | `3000`                         | 2.1.0 |
| decimals  | number   | The number of decimal places to show            | `0`                            | 2.1.0 |
| decimal   | string   | The split decimal                               | `'.'`                          | 2.1.0 |
| separator | string   | Thousand separator                              | `,`                            | 2.1.0 |
| prefix    | string   | The prefix of displayed value                   | `''`                           | 2.1.0 |
| suffix    | string   | The suffix of displayed value                   | `''`                           | 2.1.0 |
| useEasing | boolean  | Is use easing function                          | `true`                         | 2.1.0 |
| easingFn  | Function | The easing function                             | `countToEasingFnUtils.easeOut` | 2.1.0 |
