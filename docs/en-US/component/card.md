# Card

## Demos

A basic container that can carry content such as text, lists, pictures, paragraphs, etc. It is often used for a group of content that needs to be browsed centrally.

:::demo card/basis

### Basis Usage

A little card with title and content.

:::

:::demo card/extra

### Extra Content

Adding an `extra` slot allows you to add top-right custom content, typically used to add action buttons.

:::

:::demo card/shadow

### Shadow Mode

Set the value of the `shadow` prop to adjust the shadow mode of the card.

:::

## API

### Card Props

| Name          | Type                             | Description                                      | Default    | Since |
| ------------- | -------------------------------- | ------------------------------------------------ | ---------- | ----- |
| title         | `string`                         | The title of the card, invalid when using a slot | `''`       | -     |
| shadow        | `'always' \| 'hover' \| 'never'` | Set the shadow mode of the card                  | `'always'` | -     |
| content-style | `Record<string, any>`            | Custom style for card content                    | `{}`       | -     |

### Card Slots

| Name    | Description               | Parameters | Since |
| ------- | ------------------------- | ---------- | ----- |
| default | Slot for card content     | -          | -     |
| title   | Slot for card title       | -          | -     |
| extra   | Slots for card expansions | -          | -     |
