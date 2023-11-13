# Pagination

Use pagination to separate long lists, loading only one page at a time.

## Demos

:::demo pagination/basis

### Basis Usage

Basic pagination.

:::

:::demo pagination/more

### Many Pages

The ellipsis is used when there are too many pages.

:::

:::demo pagination/style

### Different Styles

Adding the `background` prop makes pagination items to have background color.

Add the `no-border` prop to disable borders on pagination items.

:::

:::demo pagination/size

### Different Sizes

Three built-in sizes, set via `size` prop, can be set by yourself if they are not enough.

:::

:::demo pagination/disabled

### Disabled

Add `disabled` prop to disable the pagination.

:::

:::demo pagination/plugin

### Internal Plugins

Plugins can be added via the `plugins` prop, including: adjusting the number of pages per page, displaying the total number of items, and quickly jumping to pages.

The order within the array determines where the plugin renders, with a null value indicating where the pager is located.

:::

:::demo pagination/item-tag

### Custom Tags

==!s|2.2.0==

The tag of the elements can be customized through the `list-tag` and `item-tag` props.

When `list-tag` is not specified, it will take `'ul'` or `'div'` depending on whether `item-tag` is `'li'`.

:::

:::demo pagination/slots

### Using Slots

Components provide several slots for customization.

Using slots allow you to combine Pagination with components like RouterLink or NuxtLink.

:::

## API

### Pagination Props

| Name            | Type                                                  | Description                                                                                                     | Default             | Since    |
| --------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------- | -------- |
| total           | `number`                                              | Set the total number of data                                                                                    | `0`                 | -        |
| size            | `'small' \| 'default' \| 'large'`                     | Set page item size                                                                                              | `'default'`         | -        |
| no-border       | `boolean`                                             | Set whether page numbers disable borders                                                                        | `false`             | -        |
| background      | `boolean`                                             | Set whether the page has a background color                                                                     | `false`             | -        |
| page-size       | `number`                                              | Set the number of data bars displayed per page, can use `v-model` two-way binding                               | `10`                | -        |
| size-options    | `number[]`                                            | Option to display number of items per page, for page-count plugin                                               | `[10, 20, 50, 100]` | -        |
| ~~max-count~~   | `number`                                              | Set the count limit of items, the min value is 7, if the limit is exceeded, it will be processed as an ellipsis | `7`                 | -        |
| item-count      | `number`                                              | Set the count limit of items, the min value is 7, if the limit is exceeded, it will be processed as an ellipsis | `7`                 | `2.2.1`  |
| active          | `number \| string`                                    | current active page number, starting from 1, can use `v-model` two-way binding                                  | `1`                 | -        |
| disabled        | `boolean`                                             | set whether to disable the pager                                                                                | `false`             | -        |
| disable-item    | `(page: number) => boolean`                           | Set the judgment method of disabled page number                                                                 | `[]`                | -        |
| turn-page-count | `number`                                              | Set the number of pages to turn for a big page turn                                                             | `5`                 | -        |
| plugins         | `('total' \| 'jump' \|'size' \| undefined \| null)[]` | Set the plugins and where they render                                                                           | `[]`                | `2.0.8`  |
| no-title        | `boolean`                                             | Set whether disable page items title attribute                                                                  | `false`             | `2.0.11` |
| locale          | `LocaleConfig['pagination']`                          | Set the locale config                                                                                           | `null`              | `2.1.0`  |
| item-tag        | `string`                                              | Set tag for the pagination items                                                                                | `'li'`              | `2.2.0`  |
| list-tag        | `string`                                              | Set tag for the pagination list                                                                                 | `null`              | `2.2.0`  |

### Pagination Events

| Name             | Description                                                                                     | Parameters           | Since |
| ---------------- | ----------------------------------------------------------------------------------------------- | -------------------- | ----- |
| change           | Emitted when the page number changes, returns the current page number                           | `(active: number)`   | -     |
| page-size-change | Emitted when the number of items per page changes, returns the current number of items per page | `(pageSize: number)` | -     |

### Pagination Slots

| Name      | Description                          | Parameters                                           | Since   |
| --------- | ------------------------------------ | ---------------------------------------------------- | ------- |
| prev      | Slot for page forward button         | `(disabled: boolean)`                                | -       |
| next      | Slot for page back button            | `(disabled: boolean)`                                | -       |
| item      | Slot for page number display content | `(page: number, disabled: boolean, active: boolean)` | -       |
| prev-jump | Slot for page forward jump button    | `(disabled: boolean, entered: boolean)`              | `2.2.0` |
| next-jump | Slot for page back jump button       | `(disabled: boolean, entered: boolean)`              | `2.2.0` |
