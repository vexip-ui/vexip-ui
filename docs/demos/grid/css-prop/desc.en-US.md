### Custom Grid

The `rows` and `columns` properties of the Grid component can be passed to numerically customize the size of the template rows and template columns of the grid.

If this doesn't satisfy you, these two properties also support passing in strings and arrays at the same time. When passing in a string, it will be directly assigned to the corresponding `grid-template` style attribute, and when passing in an array, it will be assembled and reassembled. Assignment.

Note 1: The default unit of numeric elements in an array is `fr`.

Note 2: The default width of the Cell component is `24`. When the `columns` property of the Grid is explicitly set, if this is a number, the default width of the Cell component will correspond to it, otherwise it will become ` 1`.
