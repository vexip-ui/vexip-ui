# Highlight

To highlight specific content in a piece of text, it is often used to quickly highlight keywords after retrieving the text content.

## Demos

:::demo highlight/basis

### Basis Usage

Render the original content via the `content` prop and highlight content matching the keywords via the `key-words` property.

:::

:::demo highlight/light

### Custom Highlight

Highlight content can be customized via the `light` slot.

You also can use the default slot for rendering unhighlighted content if you also want to customize it.

:::

## API

### Highlight Props

| Name        | Type       | Description                                | Default | Since |
| ----------- | ---------- | ------------------------------------------ | ------- | ----- |
| content     | `string`   | Set the highlighted original content       | `''`    | -     |
| key-words   | `string[]` | Set keywords to search and highlight       | `[]`    | -     |
| ignore-case | `boolean`  | Set whether to ignore case when retrieving | `false` | -     |

### Highlight Slots

| Name    | Description                                                                    | Parameters         | Since |
| ------- | ------------------------------------------------------------------------------ | ------------------ | ----- |
| default | Slot for unhighlighted content, receiving object returns unhighlighted content | `{ text: string }` | -     |
| light   | Slot for highlighted content, receiving object returns highlighted content     | `{ text: string }` | -     |
