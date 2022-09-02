### Collapse Props

| Name       | Type                                       | Description                                                                                     | Default   | Since |
| ---------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------- | --------- | ----- |
| expanded   | `string \| number \| (string \| number)[]` | Set the label value of the expanded panel, can be passed in an array when not in accordion mode | `null`    | -     |
| card       | `boolean`                                  | Set whether to be in card mode                                                                  | `false`   | -     |
| accordion  | `boolean`                                  | Set whether to accordion mode                                                                   | `false`   | -     |
| arrow-type | `'right' \| 'left' \| 'none'`              | Sets the type of the panel's indicator arrow                                                    | `'right'` | -     |
| ghost      | `boolean`                                  | Set whether to set borderless mode                                                              | `false`   | -     |

### Collapse Events

| Name   | Description                                                                                | Parameters                         | Since |
| ------ | ------------------------------------------------------------------------------------------ | ---------------------------------- | ----- |
| change | Emitted when the expanded panel changes, returns the label of the currently expanded panel | `(expanded: (string \| number)[])` | -     |

### CollapsePanel Props

| Name          | Type                          | Description                                            | Default   | Since |
| ------------- | ----------------------------- | ------------------------------------------------------ | --------- | ----- |
| label         | `string \| number`            | The label value of panel, unique within the same group | `null`    | -     |
| title         | `string`                      | The title of the panel                                 | `''`      | -     |
| disabled      | `boolean`                     | Set whether the panel is disabled                      | `false`   | -     |
| content-style | `Record<string, any>`         | The styles the content of the panel                    | `null`    | -     |
| expanded      | `boolean`                     | Set whether the panel is expanded                      | `false`   | -     |
| card          | `boolean`                     | Set whether to be in card mode                         | `false`   | -     |
| arrow-type    | `'right' \| 'left' \| 'none'` | Set the type of the panel's indicator arrow            | `'right'` | -     |
| icon          | `string`                      | Sets the subordinate icon for the panel title          | `''`      | -     |
| ghost         | `boolean`                     | Set whether to be in borderless mode                   | `false`   | -     |

### CollapsePanel Slots

| Name    | Description                | Parameters | Since |
| ------- | -------------------------- | ---------- | ----- |
| default | Content slot for the panel | -          | -     |
| title   | Title slot for the panel   | -          | -     |

### CollapseTransition Props

| Name        | Type                                | Description                                                                              | Default         | Since |
| ----------- | ----------------------------------- | ---------------------------------------------------------------------------------------- | --------------- | ----- |
| appear      | `boolean`                           | Set whether will be passed to vue native transition component                            | `false`         | -     |
| mode        | `'in-out' \| 'out-in' \| 'default'` | The transition mode, optional values are `default`, `out-in`, `in-out`                   | `'default '`    | -     |
| horizontal  | `boolean`                           | Set whether to fold horizontally                                                         | `false`         | -     |
| duration    | `number`                            | Set the duration of the folding transition effect in milliseconds, not less than `200ms` | `250`           | -     |
| timing      | `string`                            | The timing function to set transition effect                                             | `'ease-in-out'` | -     |
| fade-effect | `boolean`                           | Set whether to have fade-in effect when folding                                          | `false`         | -     |

> The CollapseTransition component supports 'before-enter', 'enter', 'after-enter', 'before-leave', 'leave', 'after-leave' events.
