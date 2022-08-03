### Preset Types

```ts
type RowGridJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
type RowGridAlign = 'top' | 'middle' | 'bottom' | 'stretch'

interface ColumnFlex {
  justify: RowGridJustify,
  align: RowGridAlign
}

interface ColumnOptions {
  span?: number,
  offset?: number,
  pull?: number,
  push?: number,
  order?: number
}
```

### Row Props

| Name        | Type                                                            | Description                                                                                               | Default   | Since |
| ----------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | --------- | ----- |
| tag         | `string`                                                        | Rendered element name                                                                                     | `'div'`   | -     |
| gap         | `number \| number[]`                                            | Grid gap, you can pass an array of `[horizontal, vertical]`                                               | `0`       | -     |
| justify     | `RowGridJustify`                                                | Horizontal alignment                                                                                      | `'start'` | -     |
| align       | `RowGridAlign`                                                  | Vertical alignment                                                                                        | `'top'`   | -     |
| column-flex | `boolean \| { justify?: RowGridJustify, align?: RowGridAlign }` | Set whether the grid below it is a flexible layout, you can pass a `{ justify, align }` for customization | `false`   | -     |

### Column Props

| Name     | Type                                                            | Description                                                                                                                                                                                                         | Default | Since |
| -------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| tag      | `string`                                                        | Rendered element name                                                                                                                                                                                               | `'div'` | -     |
| span     | `number`                                                        | The placeholder of the grid, the column is hidden when passing in `0`                                                                                                                                               | `24`    | -     |
| offset   | `number`                                                        | The left offset of the grid, the position of the offset cannot have other grids                                                                                                                                     | `null`  | -     |
| push     | `number`                                                        | The number of grid cells to move right                                                                                                                                                                              | `null`  | -     |
| pull     | `number`                                                        | The number of grid cells to shift left                                                                                                                                                                              | `null`  | -     |
| order    | `number`                                                        | The order of grid elements                                                                                                                                                                                          | `null`  | -     |
| flex     | `number` \| `string`                                            | The prop for `flex` layout, can be passed a number or a valid css length string or a valid `flex` attribute string                                                                                                  | `null`  | -     |
| xs       | `number \| ColumnOptions`                                       | When the media query is `<576px`, the placeholder of the grid, pass You can set other properties at a fine-grained level when entering an object                                                                    | `null`  | -     |
| sm       | `number \| ColumnOptions`                                       | When the media query is `≥576px`, the placeholder of the grid, pass You can set other properties at a fine-grained level when entering an object                                                                    | `null`  | -     |
| md       | `number \| ColumnOptions`                                       | When the media query is `≥768px`, the placeholder of the grid, pass You can set other properties at a fine-grained level when entering an object                                                                    | `null`  | -     |
| lg       | `number \| ColumnOptions`                                       | When the media query is `≥992px`, the placeholder of the grid, pass You can set other properties at a fine-grained level when entering an object                                                                    | `null`  | -     |
| xl       | `number \| ColumnOptions`                                       | When the media query is `≥1200px`, the placeholder of the grid, pass You can set other properties at a fine-grained level when entering an object                                                                   | `null`  | -     |
| xxl      | `number \| ColumnOptions`                                       | When the media query is `≥1600px`, the placeholder of the grid, pass You can set other properties at a fine-grained level when entering an object                                                                   | `null`  | -     |
| use-flex | `boolean \| { justify?: RowGridJustify, align?: RowGridAlign }` | Set whether the grid is a flexible layout, and when `column-flex` is enabled in the upper layer, set the flexible layout of the priority grid itself, and explicitly set it to `false` to force Disable flex layout | `null`  | -     |
