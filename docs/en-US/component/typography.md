# Typography

## Demos

Vexip UI provides some text components with basic style.

:::demo typography/basis

### Basis Usage

Vexip UI has built-in components with the same name as tags to quickly apply styles.

:::

:::demo typography/text

### Text Components

Provides different styles of text.

The shortcut components P and Strong can be used when creating paragraphs or bolding text.

:::

:::demo typography/title

### Title Components

Quickly create different levels of headings, if you want to be faster, you can use H1, H2, H3, H4, H5, H6 shortcut components.

:::

:::demo typography/title-marker

### Title Marker

Adding the `marker` prop can quickly add a marker to the title, although it may not be useful.

By default, the type of marker will follow the type of Title. If this does not meet your needs, you can use the `marker-type` prop to specify the type of marker or customize a color.

:::

## API

### Preset Types

```ts
type TypographyType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
type TitleLevel = 1 | 2 | 3 | 4 | 5 | 6
```

### Text Props

| Name      | Type             | Description                                                        | Default     | Since |
| --------- | ---------------- | ------------------------------------------------------------------ | ----------- | ----- |
| type      | `TypographyType` | Set the type of text                                               | `'default'` | -     |
| tag       | `string`         | Set the rendered tag                                               | `'span'`    | -     |
| delete    | `boolean`        | Whether to add a strikethrough, the label after setting is `<del>` | `false`     | -     |
| strong    | `boolean`        | Whether is bold                                                    | `false`     | -     |
| italic    | `boolean`        | Whether is italic                                                  | `false`     | -     |
| underline | `boolean`        | Whether to add underline                                           | `false`     | -     |
| code      | `boolean`        | Whether is code, after setting the label is `<code>`               | `false`     | -     |
| mark      | `boolean`        | Whether to add mark background color                               | `false`     | -     |
| disabled  | `boolean`        | Whether is disabled                                                | `false`     | -     |
| keyboard  | `boolean`        | Whether to add keyboard key styles                                 | `false`     | -     |
| thin      | `boolean`        | Thin font, conflicts with `strong`                                 | `false`     | -     |
| reversed  | `boolean`        | Set whether the font color is reversed                             | `false`     | -     |

> P and Strong are shortcut components of Text.

### Title Props

| Name        | Type             | Description                                                          | Default     | Since |
| ----------- | ---------------- | -------------------------------------------------------------------- | ----------- | ----- |
| type        | `TypographyType` | Set the type of title                                                | `'default'` | -     |
| level       | `TitleLevel`     | Set the level of the title                                           | `5`         | -     |
| top         | `boolean`        | Whether it is a top title, the top margin is `0`                     | `false`     | -     |
| marker      | `boolean`        | Whether to add a marker                                              | `false`     | -     |
| aligned     | `boolean`        | Set whether to align with the marker after adding                    | `false`     | -     |
| thin        | `boolean`        | Thin title                                                           | `false`     | -     |
| marker-type | `string`         | Set the type of marker individually, support to pass in custom color | `null`      | -     |

> H1, H2, H3, H4, H5, H6 are shortcut components of Title.

### Blockquote Props

| Name | Type             | Description                | Default     | Since |
| ---- | ---------------- | -------------------------- | ----------- | ----- |
| type | `TypographyType` | Set the type of blockquote | `'default'` | -     |

### OL Props

| Name | Type                              | Description                       | Default | Since |
| ---- | --------------------------------- | --------------------------------- | ------- | ----- |
| type | `'a' \| 'A' \| 'i' \| 'I' \| '1'` | Set the type of the serial number | `'1'`   | -     |

### UL Props

| Name       | Type     | Description        | Default    | Since |
| ---------- | -------- | ------------------ | ---------- | ----- |
| list-style | `string` | set li marker type | `'circle'` | -     |
