# Result

It is usually used to provide user feedback on operation results or exceptions.

## Demos

:::demo result/basis

### Basis Usage

Set the result type via `type` prop, and different types have different built-in icon and color.

:::

:::demo result/size

### Different Sizes

Set the value of the `size` prop to adjust the size of result, it will adjust the font size of the icon, title and description.

:::

:::demo result/custom

### Custom Content

Set customize result content via slots.

:::

## API

### Preset Types

```ts
type ResultType = 'primary' | 'info' | 'success' | 'warning' | 'error'
```

### Result Props

| Name        | Type                              | Description                                                                           | Default     | Since |
| ----------- | --------------------------------- | ------------------------------------------------------------------------------------- | ----------- | ----- |
| type        | `ResultType`                      | Set the type of result icon, not effect when using the `icon` prop or the `icon` slot | `'primary'` | -     |
| size        | `'small' \| 'default' \| 'large'` | Set the size of the result, which will affect the icon and font size in it            | `'default'` | -     |
| title       | `string`                          | Set the title of the result, it will be invalid after using the same name slot        | `''`        | -     |
| description | `string`                          | Set the description of the result, it will be invalid after using the same name slot  | `''`        | -     |
| icon        | `VueComponent`                    | Set the custom icon                                                                   | `''`        | -     |
| icon-color  | `string`                          | Set the color of the result icon                                                      | `''`        | -     |

### Result Slots

| Name        | Description                                                        | Parameters | Since |
| ----------- | ------------------------------------------------------------------ | ---------- | ----- |
| icon        | The slot for the icon, you can put any content                     | -          | -     |
| title       | The slot for title                                                 | -          | -     |
| description | The slot for description                                           | -          | -     |
| extra       | The slot for extra content, usually some action buttons are placed | -          | -     |
