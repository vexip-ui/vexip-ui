### TabNav Props

| Name   | Type               | Description                                                            | Default | Since |
| ------ | ------------------ | ---------------------------------------------------------------------- | ------- | ----- |
| active | `string \| number` | Set the currently active navigation, can use `v-model` two-way binding | `null`  | -     |
| card   | `boolean`          | Set whether to enable card mode                                        | `false` | -     |

### TabNav Events

| Name   | Description                                                                                     | Parameters                  | Since |
| ------ | ----------------------------------------------------------------------------------------------- | --------------------------- | ----- |
| change | Emitted when the active navigation changes, returns the name of the currently active navigation | `(label: string \| number)` | -     |

### TabNavItem Props

| Name     | Type               | Description                                                    | Default | Since |
| -------- | ------------------ | -------------------------------------------------------------- | ------- | ----- |
| label    | `string \| number` | Unique index for navigation, internal `index` value if not set | `null`  | -     |
| disabled | `boolean`          | Set whether to disable this navigation                         | `false` | -     |
| icon     | `string`           | set the front icon for navigation                              | `''`    | -     |

### TabNavItem Events

| Name   | Description                                                                     | Parameters          | Since |
| ------ | ------------------------------------------------------------------------------- | ------------------- | ----- |
| toggle | Emitted when the navigation is selected, returns whether it is currently active | `(active: boolean)` | -     |
