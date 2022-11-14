### Timeline Props

| Name       | Type               | Description                                                                           | Default | Since |
| ---------- | ------------------ | ------------------------------------------------------------------------------------- | ------- | ----- |
| pending    | `boolean`          | Set whether the timeline is pending                                                   | `false` | -     |
| both-sides | `boolean`          | Set whether to enable both sides mode                                                 | `false` | -     |
| dashed     | `boolean`          | Set whether the timeline is dashed                                                    | `false` | -     |
| lineColor  | `string`           | Set the color of the timeline                                                         | `null`  | -     |
| spacing    | `number \| string` | Set the spacing between time nodes, you can pass a number or a legal css length value | `null`  | -     |

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
