### Layout Props

| Name          | Type                   | Description                                                                                                                    | Default            | Since |
| ------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ----- |
| no-aside      | `boolean`              | Set whether to disable the sidebar                                                                                             | `false`            | -     |
| footer        | `boolean`              | Set whether to use footer                                                                                                      | `false`            | -     |
| tag           | `string`               | Set rendering behavior                                                                                                         | `'section'`        | -     |
| menus         | `MenuOptions[]`        | Set menu options                                                                                                               | `[]`               | -     |
| menu-props    | `AsideMenuProps`       | Set menu properties                                                                                                            | `null`             | -     |
| logo          | `string`               | Set Logo image address                                                                                                         | `''`               | -     |
| sign-name     | `string`               | Set the sign                                                                                                                   | `''`               | -     |
| config        | `('nav' \| 'color')[]` | Set configuration options for user drop-down panels                                                                            | `['nav', 'color']` | -     |
| user          | `HeaderUser`           | Set user information                                                                                                           | `null`             | -     |
| actions       | `HeaderAction[]`       | Set the action options of the user drop-down panel                                                                             | `[]`               | -     |
| reduced       | `boolean`              | Set whether the sidebar is reduced or not, you can use `v-model` two-way binding                                               | `false`            | -     |
| avatar-circle | `boolean`              | Set whether the user avatar is circular                                                                                        | `false`            | -     |
| sign-type     | `'aside' \| 'header'`  | Set the block where the sign is located                                                                                        | `'aside'`          | -     |
| header-fixed  | `boolean \| string`    | Set the header to be fixed, you can pass a breakpoint or media query string, and it will be fixed when the query is satisfied  | `'lg'`             | -     |
| aside-fixed   | `boolean \| string`    | Set the sidebar to be fixed, you can pass a breakpoint or media query string, and it will be fixed when the query is satisfied | `'lg'`             | -     |
| copyright     | `string`               | Set the copyright information of the footer                                                                                    | `''`               | -     |
| links         | `FooterLink[]`         | Set footer link options                                                                                                        | `[]`               | -     |

### Layout Events

| Name           | Description                                                                       | Parameters                                   | Since |
| -------------- | --------------------------------------------------------------------------------- | -------------------------------------------- | ----- |
| reduced-change | Emitted when the sidebar reduced state changes, returns the current reduced state | `(target: boolean)`                          | -     |
| sign-click     | Emitted when the sign is clicked                                                  | `(event: MouseEvent)`                        | -     |
| menu-select    | Emitted when the menu is selected                                                 | `(label: string, meta: Record<string, any>)` | -     |
| user-action    | Emitted when the user dropdown panel action is clicked                            | `(label: string, meta: Record<string, any>)` | -     |

### Layout Slots

| Name             | Description                                                                                                 | Parameters                                                                                                                                              | Since |
| ---------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| sign             | The content slot for the sign, by default on the `header-left` or `aside-top` slot depending on `sign-type` | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                         | -     |
| header           | The slot of the header, use it to cover the entire header                                                   | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                         | -     |
| header-left      | Slot on the left side of the header                                                                         | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) = > void }` | -     |
| header-main      | Slot in the center of the header                                                                            | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }`  | -     |
| header-right     | Slot on the right side of the header                                                                        | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) = > void }` | -     |
| header-user      | Slot for header user                                                                                        | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }`  | -     |
| aside            | The slot for the banner, using it will cover the entire sidebar                                             | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                         | -     |
| aside-top        | Slot for the upper sidebar                                                                                  | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void }`                                                | -     |
| aside-main       | Slot in the center of the sidebar                                                                           | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void }`                                                | -     |
| aside-bottom     | Slot in the lower part of the sidebar                                                                       | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void }`                                                | -     |
| aside-expand     | The sidebar triggers the slot to retract the popped handle                                                  | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void }`                                                | -     |
| default          | slot for the main page, use it to cover the entire main page                                                | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                         | -     |
| main             | Slot for the main page                                                                                      | -                                                                                                                                                       | -     |
| footer           | Footer's slot, use it to cover the entire footer                                                            | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                         | -     |
| footer-links     | Slot for footer links                                                                                       | -                                                                                                                                                       | -     |
| footer-copyright | Slot for footer copyright information                                                                       | -                                                                                                                                                       | -     |
