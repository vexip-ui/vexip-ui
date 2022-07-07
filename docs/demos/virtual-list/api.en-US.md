### VirtualList Props

| Name           | Type                         | Description                                                                                                            | Default | Since |
| -------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| items          | `Record<string, any>[]`      | The array of elements                                                                                                  | `[]`    | -     |
| item-size      | `number`                     | Set the size of the element, the fixed height of the element when `item-fixed` is `true`, otherwise the minimum height | `36`    | -     |
| item-fixed     | `boolean`                    | Set whether the element is fixed height                                                                                | `false` | -     |
| id-key         | `string`                     | Set the `id` key name of the element                                                                                   | `'id'`  | -     |
| default-key-at | `number \| string \| symbol` | Set the `id` of the element where the virtual list stays by default                                                    | `null`  | -     |
| buffer-size    | `number`                     | Set the number of buffer elements before and after the visible area                                                    | `5`     | -     |
| list-tag       | `string`                     | The tag name of the list element                                                                                       | `'div'` | -     |
| items-tag      | `string`                     | The tag name of the elements wrapper element                                                                           | `'ul'`  | -     |
| items-attrs    | `Record<string, any>`        | The html attributes of elements wrapper element                                                                        | `null`  | -     |
