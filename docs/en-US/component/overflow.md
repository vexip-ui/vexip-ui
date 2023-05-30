# Overflow

## Demos

:::demo overflow/basis

### Basis Usage

Simplest usage.

:::

:::demo overflow/no-items

### Not Pass Items

Child elements can be rendered directly through the default slot when the `items` prop is not used.

:::

:::demo overflow/max-count

### Max Count

The maximum number items displayed can be manually controlled via the `max-count` prop.

:::

:::demo overflow/suffix

### Suffix Content

The suffix content can be added via the `suffix` slot, and the content added in this way can be maintained in the layout scope of Overflow.

:::

## API

### Overflow Props

| Name      | Type                         | Description                                                                                                                                              | Default | Since    |
| --------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| items     | `Array<Record<string, any>>` | Options to set child elements                                                                                                                            | `[]`    | -        |
| tag       | `string`                     | Set the tag to render                                                                                                                                    | `'div'` | -        |
| attr-flag | `boolean \| string`          | Set whether to use the html attribute to mark without directly modifying the style, you can pass a string to specify the attribute name                  | `false` | -        |
| static    | `boolean`                    | Set whether the child element is static, after setting it will not observe its resize                                                                    | `false` | -        |
| max-count | `number`                     | Set the maximum number of display items. When it is 0, it will be dynamically calculated according to the width to ensure that items display in one line | `0`     | `2.0.19` |

### Overflow Events

| Name        | Description                                  | Parameters            | Since |
| ----------- | -------------------------------------------- | --------------------- | ----- |
| rest-change | Emitted when the number of overflows changes | `(rest: number)`      | -     |
| toggle      | Emitted when the overflow state changes      | `(overflow: boolean)` | -     |

### Overflow Slots

| Name    | Description                                                                      | Parameters                                     | Since    |
| ------- | -------------------------------------------------------------------------------- | ---------------------------------------------- | -------- |
| default | Slot for child elements, no params when not using the `items` prop               | `{ item: Record<string, any>, index: number }` | -        |
| counter | The Slot of the counter, accepts the number of overflows, only allow single root | `{ count: number }`                            | -        |
| suffix  | The Slot of suffix content                                                       | -                                              | `2.0.19` |
