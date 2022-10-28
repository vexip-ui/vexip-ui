### Preset Types

```ts
type TabNavAlign = 'left' | 'center' | 'right'

interface TabNavItemOptions {
  label: string | number,
  content?: string,
  icon?: Record<string, any>,
  disabled?: boolean,
  onToggle?: (active: boolean) => void
}

type TabNavOptions = TabNavItemOptions | string | number
```

### TabNav Props

| Name    | Type               | Description                                                            | Default  | Since    |
| ------- | ------------------ | ---------------------------------------------------------------------- | -------- | -------- |
| active  | `string \| number` | Set the currently active navigation, can use `v-model` two-way binding | `null`   | -        |
| card    | `boolean`          | Set whether to enable card mode                                        | `false`  | -        |
| options | `TabNavOptions[]`  | Quick set tab items, invalid after using slot                          | `[]`     | `2.0.7`  |
| align   | `TabNavAlign`      | Set the alignment of the tab items                                     | `'left'` | `2.0.11` |

### TabNav Events

| Name   | Description                                                                                     | Parameters                  | Since |
| ------ | ----------------------------------------------------------------------------------------------- | --------------------------- | ----- |
| change | Emitted when the active navigation changes, returns the name of the currently active navigation | `(label: string \| number)` | -     |

### TabNav Slots

| Name    | Description                  | Parameters | Since   |
| ------- | ---------------------------- | ---------- | ------- |
| default | Slot of tab nav content      | -          | -       |
| prefix  | Slot of prefix extra content | -          | `2.0.7` |
| suffix  | Slot of suffix extra content | -          | `2.0.7` |

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
