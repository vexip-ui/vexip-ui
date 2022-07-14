### Overflow Props

| Name        | Type                         | Description                                                                                                                             | Default | Since |
| ----------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| items       | `Array<Record<string, any>>` | Options to set child elements                                                                                                           | `[]`    | -     |
| tag         | `string`                     | Set the tag to render                                                                                                                   | `'div'` | -     |
| attr-flag   | `boolean \| string`          | Set whether to use the html attribute to mark without directly modifying the style, you can pass a string to specify the attribute name | `false` | -     |
| static      | `boolean`                    | Set whether the child element is static, after setting it will not observe its reszie                                                   | `false` | -     |
| get-counter | `() => HTMLElement \| null`  | Get the counter element that records the number of overflows                                                                            | `null`  | -     |

### Overflow Events

| Name        | Description                                  | Parameters            | Since |
| ----------- | -------------------------------------------- | --------------------- | ----- |
| rest-change | Emitter when the number of overflows changes | `(rest: number)`      | -     |
| toggle      | Emitter when the overflow state changes      | `(overflow: boolean)` | -     |

### Overflow Slots

| Name    | Description                                                        | Parameters                                     | Since |
| ------- | ------------------------------------------------------------------ | ---------------------------------------------- | ----- |
| default | Slot for child elements, no params when not using the `items` prop | `{ item: Record<string, any>, index: number }` | -     |
| counter | The Slot of the counter, accepts the number of overflows           | `{ count: number }`                            |
