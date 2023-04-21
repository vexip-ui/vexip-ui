# Grid

A grid layout component that defines area blocks based on rows and columns for quickly creating robust criss-cross layouts.

Compared with the grid layout of Row and Column, although Grid and Cell can create complex layouts more flexibly, their limitation is that they cannot be mixed with other components under the Grid component.

## Demos

:::demo grid/basis

### Basis Usage

Single row grid layout.

Using a Grid component and a set of Cell components, you can create a basic grid system.

:::

:::demo grid/css-prop

### Custom Grid

The `rows` and `columns` properties of the Grid component can be passed to numerically customize the size of the template rows and template columns of the grid.

If this doesn't satisfy you, these two properties also support passing in strings and arrays at the same time. When passing in a string, it will be directly assigned to the corresponding `grid-template` style attribute, and when passing in an array, it will be assembled and reassembled. Assignment.

Note 1: The default unit of numeric elements in an array is `fr`.

Note 2: The default width of the Cell component is `24`. When the `columns` property of the Grid is explicitly set, if this is a number, the default width of the Cell component will correspond to it, otherwise it will become ` 1`.

:::

:::demo grid/gap

### Grid Gap

Gap can be added to the grid by setting the `gap` property of the Grid component.

Pass in an array to control the horizontal and vertical spacing separately.

:::

:::demo grid/position

### Free Layout

The Cell component has three properties in the vertical and horizontal directions: `top`, `bottom`, `height` and `left`, `right`, `width`.

Both directions can be positioned for the grid by setting two of these properties.

:::

## API

### Grid Props

| Name         | Type                                                                                                                                 | Description                                                                                                                                                                                         | Default     | Since |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----- |
| tag          | `string`                                                                                                                             | Rendered element name                                                                                                                                                                               | `'div'`     | -     |
| gap          | `number \| number[]`                                                                                                                 | Grid gap, you can pass an array of `[horizontal, vertical]`                                                                                                                                         | `0`         | -     |
| rows         | `number \| string \| (number \| string)[]`                                                                                           | Set the template row of the grid, same as `grid-template-rows`, pass the number as the number of rows and use `repeat` Processing, the default unit of number elements in the array is `fr`         | `'none'`    | -     |
| columns      | `number \| string \| (number \| string)[]`                                                                                           | Set the template columns of the grid, same as `grid-template-columns`, pass the number as the number of rows and use `repeat` Processing, the default unit of numeric elements in the array is `fr` | `24`        | -     |
| auto-rows    | `number \| string \| (number \| string)[]`                                                                                           | Set the grid's auto-rows, same as `grid-auto-rows`, when passing numbers and the default unit of number elements in the array for `fr`                                                              | `'auto'`    | -     |
| auto-columns | `number \| string \| (number \| string)[]`                                                                                           | Set the automatic row of the grid, same as `grid-auto-columns`, when passing numbers and the default unit of number elements in the array for `fr`                                                  | `'auto'`    | -     |
| dense        | `boolean`                                                                                                                            | Set whether to enable dense mode, after which it will fill in the blank positions as much as possible                                                                                               | `false`     | -     |
| justify      | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'`                                                | Fills the container horizontally so this property won't work unless you manually set a fixed width for some of the columns                                                                          | `'start'`   | -     |
| align        | `'top' \| 'middle' \| 'bottom' \| 'stretch'`                                                                                         | Vertical alignment                                                                                                                                                                                  | `'stretch'` | -     |
| cell-flex    | `boolean \| { justify?: 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between', align?: 'top' \| ' middle' \| 'bottom' }` | Set whether the grid below it is a flexible layout, you can pass a `{ justify, align }` for customization                                                                                           | `false`     | -     |

### Cell Props

| Name     | Type                                                                                                                                                   | Description                                                                                                                                                                                                              | Default  | Since |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- | ----- |
| tag      | `string`                                                                                                                                               | Rendered element name                                                                                                                                                                                                    | `'div'`  | -     |
| top      | `number \| string`                                                                                                                                     | Set the top border of the grid, the starting value when passing a number is `0`                                                                                                                                          | `'auto'` | -     |
| left     | `number \| string`                                                                                                                                     | Set the left border of the grid, the starting value is `0`                                                                                                                                                               | `'auto'` | -     |
| width    | `number`                                                                                                                                               | Set the width of the grid, the default is to occupy a full line, and it will have a different default performance according to the `columns` of the superior grid                                                        | `null`   | -     |
| height   | `number`                                                                                                                                               | Set the height of the grid, the default is one line                                                                                                                                                                      | `1`      | -     |
| right    | `number \| string`                                                                                                                                     | Set the right border of the grid, starting with `0` when passing in a number, should only be determined by the two properties of `left`, `right` and `width` horizontal properties of the grid                           | `''`     | -     |
| bottom   | `number \| string`                                                                                                                                     | Set the lower boundary of the grid. When a number is passed in, the starting value is `0`, which should only be determined by the two properties of `top`, `bottom` and `height` vertical properties of the grid         | `''`     | -     |
| xs       | `number \| { top?: number \| string, left?: number \| string, width?: number, height?: number, right?: number \| string, bottom?: number \| string } ` | When the media query is `<576px`, the width of the grid takes place. When passing in an object, you can set other properties in a fine-grained manner                                                                    | `null`   | -     |
| sm       | `number \| { top?: number \| string, left?: number \| string, width?: number, height?: number, right?: number \| string, bottom?: number \| string } ` | When the media query is `≥576px`, the width of the grid takes place. When passing in an object, you can set other properties in a fine-grained manner                                                                    | `null`   | -     |
| md       | `number \| { top?: number \| string, left?: number \| string, width?: number, height?: number, right?: number \| string, bottom?: number \| string } ` | When the media query is `≥768px`, the width of the grid takes place. When an object is passed in, other properties can be set in fine-grained size                                                                       | `null`   | -     |
| lg       | `number \| { top?: number \| string, left?: number \| string, width?: number, height?: number, right?: number \| string, bottom?: number \| string } ` | When the media query is `≥992px`, the width of the grid takes place. When an object is passed in, you can set other properties in a fine-grained manner                                                                  | `null`   | -     |
| xl       | `number \| { top?: number \| string, left?: number \| string, width?: number, height?: number, right?: number \| string, bottom?: number \| string } ` | When the media query is `≥1200px`, the width of the grid takes place. When an object is passed in, you can set other properties in a fine-grained manner                                                                 | `null`   | -     |
| xxl      | `number \| { top?: number \| string, left?: number \| string, width?: number, height?: number, right?: number \| string, bottom?: number \| string } ` | When the media query is `≥1600px`, the width of the grid takes place. When an object is passed in, you can set other properties in a fine-grained manner                                                                 | `null`   | -     |
| use-flex | `boolean \| { justify?: 'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between', align?: 'top' \| ' middle' \| 'bottom' }`                   | Set whether the grid is a flexible layout, and when `cell-flex` is enabled on the upper layer, the flexible layout setting of the priority grid itself is explicitly set to `false` flex layout can be forcibly disabled | `null`   | -     |
