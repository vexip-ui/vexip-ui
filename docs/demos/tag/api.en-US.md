### Preset Types

```ts
type TagState = 'default' | 'primary' | 'info' | 'success' | 'error' | 'warning'

type TagNamedColor =
  | 'lime'
  | 'pink'
  | 'magenta'
  | 'tomato'
  | 'orange'
  | 'cyan'
  | 'navy'
  | 'gold'
  | 'purple'

type TagType = TagState | TagNamedColor
```

### Tag Props

| Name         | Type                              | Description                                                                                      | Default     | Since   |
| ------------ | --------------------------------- | ------------------------------------------------------------------------------------------------ | ----------- | ------- |
| type         | `TagType`                         | Set the type of the tag, including state type and color type                                     | `'default'` | -       |
| size         | `'small' \| 'default' \| 'large'` | The size of the tag, unlike other components, this property will also change the label font size | `'default'` | -       |
| border       | `boolean`                         | Set whether the tag has a border                                                                 | `false`     | -       |
| closable     | `boolean`                         | Set whether the tag has a close function                                                         | `false`     | -       |
| color        | `string`                          | Set the custom color of the tag, which takes precedence over the `type` preset type              | `null`      | -       |
| simple       | `boolean`                         | Set whether the tag is in simple mode                                                            | `false`     | -       |
| circle       | `boolean`                         | Set whether the tag is a rounded label                                                           | `false`     | -       |
| prefix       | `string \| number`                | Set the prefix content of the tag                                                                | `''`        | `2.1.0` |
| prefix-bg    | `string`                          | Set the background color of the tag prefix content                                               | `''`        | `2.1.0` |
| prefix-color | `string`                          | Set the color of the tag prefix content                                                          | `''`        | `2.1.0` |
| suffix       | `string \| number`                | Set the front content of the tag                                                                 | `''`        | `2.1.0` |
| suffix-bg    | `string`                          | Set the background color of the front content of the tag                                         | `''`        | `2.1.0` |
| suffix-color | `string`                          | Set the color of the front content of the tag                                                    | `''`        | `2.1.0` |

### Tag Events

| Name  | Description                                                                         | Parameters | Since |
| ----- | ----------------------------------------------------------------------------------- | ---------- | ----- |
| close | Emitted when the tab can be closed and the close button is clicked, no return value | -          | -     |

### Tag Slots

| Name    | Description            | Parameters | Since |
| ------- | ---------------------- | ---------- | ----- |
| default | Slot for label content | -          | -     |
