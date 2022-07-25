### Tabs Props

| Name   | Type               | Description                                                         | Default | Since |
| ------ | ------------------ | ------------------------------------------------------------------- | ------- | ----- |
| card   | `boolean`          | Set whether to enable card mode in the navigation bar               | `false` | -     |
| active | `string \| number` | Set the currently active tab, you can use `v-model` two-way binding | `''`    | -     |

### Tabs Events

| Name   | Description                                                                        | Parameters                  | Since |
| ------ | ---------------------------------------------------------------------------------- | --------------------------- | ----- |
| change | Emitted when the active tab changes, returns the label of the currently active tab | `(label: string \| number)` | -     |

### TabPanel Props

| Name     | Type               | Description                            | Default | Since |
| -------- | ------------------ | -------------------------------------- | ------- | ----- |
| label    | `string \| number` | Unique index of the navigation page    | `''`    | -     |
| disabled | `boolean`          | Set whether to disable this navigation | `false` | -     |
| icon     | `string`           | Set the front icon for navigation      | `''`    | -     |

### TabPanel Events

| Name   | Description                                                                                 | Parameters          | Since |
| ------ | ------------------------------------------------------------------------------------------- | ------------------- | ----- |
| change | Emitted when the active state of the tab changes, returns whether the current tab is active | `(active: boolean)` | -     |
