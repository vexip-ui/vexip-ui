### Preset Types

```ts
type TabNavAlign = 'left' | 'center' | 'right'
type TabNavPlacement = 'top' | 'right' | 'bottom' | 'left'

interface TabNavItemOptions {
  label: string | number,
  content?: string,
  icon?: Record<string, any>,
  disabled?: boolean,
  closable?: boolean,
  onToggle?: (active: boolean) => void
}

type TabNavOptions = TabNavItemOptions | string | number
```

### TabNav Props

| Name      | Type               | Description                                                            | Default  | Since    |
| --------- | ------------------ | ---------------------------------------------------------------------- | -------- | -------- |
| active    | `string \| number` | Set the currently active navigation, can use `v-model` two-way binding | `null`   | -        |
| card      | `boolean`          | Set whether to enable card mode                                        | `false`  | -        |
| options   | `TabNavOptions[]`  | Quick set tab items, invalid after using slot                          | `[]`     | `2.0.7`  |
| align     | `TabNavAlign`      | Set the alignment of the tab items                                     | `'left'` | `2.0.11` |
| placement | `TabNavPlacement`  | Set the placement of the tab items                                     | `'top'`  | `2.0.13` |
| show-add  | `boolean`          | Set whether to display the add button                                  | `false`  | `2.0.13` |
| closable  | `boolean`          | Set whether to display the close button                                | `false`  | `2.0.13` |

### TabNav Events

| Name   | Description                                                                               | Parameters                  | Since    |
| ------ | ----------------------------------------------------------------------------------------- | --------------------------- | -------- |
| change | Emitted when the active navigation changes, returns the label of the currently active tab | `(label: string \| number)` | -        |
| add    | Emitted when the add button is clicked                                                    | -                           | `2.0.13` |
| close  | Emitted when the close button is clicked, returns the label of the closed tab             | `(label: string \| number)` | `2.0.13` |

### TabNav Slots

| Name    | Description                  | Parameters | Since    |
| ------- | ---------------------------- | ---------- | -------- |
| default | Slot of tab nav content      | -          | -        |
| prefix  | Slot of prefix extra content | -          | `2.0.7`  |
| suffix  | Slot of suffix extra content | -          | `2.0.7`  |
| add     | Slot of add button content   | -          | `2.0.13` |

### TabNavItem Props

| Name     | Type               | Description                                                    | Default | Since    |
| -------- | ------------------ | -------------------------------------------------------------- | ------- | -------- |
| label    | `string \| number` | Unique index for navigation, internal `index` value if not set | `null`  | -        |
| disabled | `boolean`          | Set whether to disable this navigation                         | `false` | -        |
| icon     | `string`           | set the front icon for navigation                              | `''`    | -        |
| closable | `boolean`          | Set whether to display the close button                        | `false` | `2.0.13` |

### TabNavItem Events

| Name   | Description                                                                     | Parameters          | Since |
| ------ | ------------------------------------------------------------------------------- | ------------------- | ----- |
| toggle | Emitted when the navigation is selected, returns whether it is currently active | `(active: boolean)` | -     |
