### Preset Types

```ts
type TabNavAlign = 'left' | 'center' | 'right'
type TabNavPlacement = 'top' | 'right' | 'bottom' | 'left'
```

### Tabs Props

| Name      | Type               | Description                                                         | Default  | Since    |
| --------- | ------------------ | ------------------------------------------------------------------- | -------- | -------- |
| card      | `boolean`          | Set whether to enable card mode in the tab bar                      | `false`  | -        |
| active    | `string \| number` | Set the currently active tab, you can use `v-model` two-way binding | `''`     | -        |
| align     | `TabNavAlign`      | Set the alignment of the tab items                                  | `'left'` | `2.0.11` |
| placement | `TabNavPlacement`  | Set the placement of the tab items                                  | `'top'`  | `2.0.13` |
| show-add  | `boolean`          | Set whether to display the add button                               | `false`  | `2.0.13` |
| closable  | `boolean`          | Set whether to display the close button                             | `false`  | `2.0.13` |

### Tabs Events

| Name   | Description                                                                        | Parameters                  | Since    |
| ------ | ---------------------------------------------------------------------------------- | --------------------------- | -------- |
| change | Emitted when the active tab changes, returns the label of the currently active tab | `(label: string \| number)` | -        |
| add    | Emitted when the add button is clicked                                             | -                           | `2.0.13` |
| close  | Emitted when the close button is clicked, returns the label of the closed tab      | `(label: string \| number)` | `2.0.13` |

### TabNav Slots

| Name    | Description                      | Parameters | Since    |
| ------- | -------------------------------- | ---------- | -------- |
| default | Slot of tab tabs content         | -          | -        |
| prefix  | Slot of nav prefix extra content | -          | `2.0.7`  |
| suffix  | Slot of nav suffix extra content | -          | `2.0.7`  |
| add     | Slot of add button content       | -          | `2.0.13` |

### TabPanel Props

| Name     | Type               | Description                             | Default | Since    |
| -------- | ------------------ | --------------------------------------- | ------- | -------- |
| label    | `string \| number` | Unique index of the tab                 | `''`    | -        |
| name     | `string`           | The name of the tab                     | `''`    | `2.0.13` |
| disabled | `boolean`          | Set whether to disable the tab          | `false` | -        |
| icon     | `string`           | Set the front icon for the tab          | `''`    | -        |
| closable | `boolean`          | Set whether to display the close button | `false` | `2.0.13` |

### TabPanel Events

| Name   | Description                                                                                 | Parameters          | Since |
| ------ | ------------------------------------------------------------------------------------------- | ------------------- | ----- |
| change | Emitted when the active state of the tab changes, returns whether the current tab is active | `(active: boolean)` | -     |
