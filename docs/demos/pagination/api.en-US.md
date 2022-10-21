### Pagination Props

| Name            | Type                                                  | Description                                                                                                | Default             | Since   |
| --------------- | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| total           | `number`                                              | Set the total number of data                                                                               | `0`                 | -       |
| size            | `'small' \| 'default' \| 'large'`                     | Set page item size                                                                                         | `'default'`         | -       |
| no-border       | `boolean`                                             | Set whether page numbers have borders                                                                      | `false`             | -       |
| background      | `boolean`                                             | Set whether the page has a background color                                                                | `false`             | -       |
| page-size       | `number`                                              | Set the number of data bars displayed per page, can use `v-model` two-way binding                          | `10`                | -       |
| size-options    | `number[]`                                            | Option to display number of items per page, for page-count plugin                                          | `[10, 20, 50, 100]` | -       |
| max-count       | `number`                                              | Set the page number limit, the minimum is 7, if the limit is exceeded, it will be processed as an ellipsis | `7`                 | -       |
| active          | `number \| string`                                    | current active page number, starting from 1, can use `v-model` two-way binding                             | `1`                 | -       |
| disabled        | `boolean`                                             | set whether to disable the pager                                                                           | `false`             | -       |
| disable-item    | `(page: number) => boolean`                           | Set the judgment method of disabled page number                                                            | `[]`                | -       |
| turn-page-count | `number`                                              | Set the number of pages to turn for a big page turn                                                        | `5`                 | -       |
| ~~page-jump~~   | `boolean`                                             | Whether to enable the page jump plugin                                                                     | `false`             | -       |
| ~~page-count~~  | `boolean`                                             | Whether to enable the plugin to switch the number of items per page                                        | `false`             | -       |
| ~~page-total~~  | `boolean`                                             | Whether to enable the plugin to display the total number of entries                                        | `false`             | -       |
| plugins         | `('total' \| 'jump' \|'size' \| undefined \| null)[]` | Set the plugins and where they render                                                                      | `[]`                | `2.0.8` |

### Pagination Events

| Name             | Description                                                                                     | Parameters           | Since |
| ---------------- | ----------------------------------------------------------------------------------------------- | -------------------- | ----- |
| change           | Emitted when the page number changes, returns the current page number                           | `(active: number)`   | -     |
| page-size-change | Emitted when the number of items per page changes, returns the current number of items per page | `(pageSize: number)` | -     |

### Pagination Slots

| Name | Description                          | Parameters       | Since |
| ---- | ------------------------------------ | ---------------- | ----- |
| prev | Slot for page forward button         | -                | -     |
| next | Slot for page back button            | -                | -     |
| item | Slot for page number display content | `(page: number)` | -     |
