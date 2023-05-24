# Tag

## Demos

:::demo tag/basis

### Basis Usage

Create tags of different types by setting the value of the `type` prop to `primary`, `success`, `error`, `warning`, or be the default type when not set.

:::

:::demo tag/circle

### Circle Tag

Add the `circle` prop to set the label to be a rounded label.

:::

:::demo tag/closable

### Closable

Adding the `closable` prop can make the label display the close button, and the closing event can be used to realize the increase or decrease of the label.

:::

:::demo tag/simple

### Simple Mode

Add the `simple` prop to enable simple mode, which uses light tones and is commonly used on simple style pages.

:::

:::demo tag/size

### Different Sizes

The size of the label can be adjusted by setting the value of the `size` prop, which also adjusts the font size of the label.

:::

:::demo tag/type

### Preset Colors

In addition to the basic state types, there are also built-in color types for quickly generating labels of various colors.

:::

:::demo tag/custom

### Custom Color

You can custom the major color throught the `color` prop.

:::

:::demo tag/extra

### Extra Content

The `prefix` and `suffix` props can be used to insert extra content before and after respectively.

:::

## API

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
