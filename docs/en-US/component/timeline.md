# Timeline

It is often used to show some content step by step.

## Demos

:::demo timeline/basis

### Basis Usage

Simplest usage.

:::

:::demo timeline/pending

### Pending

Adding the `pending` prop makes the last node appear as in-progress.

:::

:::demo timeline/flip

### Content Flip

Add the `flip` prop to quickly place the node content on the other side.

:::

:::demo timeline/alternate

### Alternate Mode

There was a demand for design like this, and it was born.

:::

:::demo timeline/horizontal

### Horizontal

Add the `horizontal` prop to make the timeline horizontal.

In both-sides mode, if you don't want the component to automatically calculate the height, then you can give an inline style height yourself.

:::

## API

### Timeline Props

| Name           | Type               | Description                                                                           | Default | Since    |
| -------------- | ------------------ | ------------------------------------------------------------------------------------- | ------- | -------- |
| pending        | `boolean`          | Set whether the timeline is pending                                                   | `false` | -        |
| ~~both-sides~~ | `boolean`          | Set whether to enable both sides mode                                                 | `false` | -        |
| dashed         | `boolean`          | Set whether the timeline is dashed                                                    | `false` | -        |
| lineColor      | `string`           | Set the color of the timeline                                                         | `null`  | -        |
| spacing        | `number \| string` | Set the spacing between time nodes, you can pass a number or a legal css length value | `null`  | -        |
| flip           | `boolean`          | Set whether to flip the content                                                       | `false` | `2.0.18` |
| horizontal     | `boolean`          | Set whether the timeline is horizontal                                                | `false` | `2.0.18` |
| alternate      | `boolean`          | Set whether to enable alternate mode                                                  | `false` | `2.1.23` |

### Timeline Events

| Name         | Description                                                                      | Parameters                  | Since |
| ------------ | -------------------------------------------------------------------------------- | --------------------------- | ----- |
| signal-click | Emitted when a timeline node is clicked, returns the `label` of the clicked node | `(label: string \| number)` | -     |

### TimelineItem Props

| Name      | Type                                                           | Description                                                                           | Default     | Since |
| --------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------- | ----- |
| type      | `'default' \| 'success' \| 'error' \| 'warning' \| 'disabled'` | Time node type                                                                        | `'default'` | -     |
| color     | `string`                                                       | You can specify a custom color for the node                                           | `''`        | -     |
| label     | `number \| string`                                             | Set the `label` of the node, useful when listening for node click events              | `null`      | -     |
| dashed    | `boolean`                                                      | Set whether the line of the time node is dashed                                       | `false`     | -     |
| lineColor | `string`                                                       | Set the line color of the time node                                                   | `null`      | -     |
| spacing   | `number \| string`                                             | Set the spacing between time nodes, you can pass a number or a legal css length value | `null`      | -     |

### TimelineItem Events

| Name         | Description                                                          | Parameters                  | Since |
| ------------ | -------------------------------------------------------------------- | --------------------------- | ----- |
| signal-click | Emitted when a timeline node is clicked, returns the current `label` | `(label: string \| number)` | -     |
