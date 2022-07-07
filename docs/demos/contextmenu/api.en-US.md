### Contextmenu Options

| Name    | Type    | Description                                                                      | Default | Since |
| ------- | ------- | ------------------------------------------------------------------------- | ------ | --- |
| clientX | `number` | Set the horizontal x position where the menu appears | `0` | - |
| clientY | `number` | Set the vertical y position where the menu appears | `0` | - |
| appear | `boolean` | Same as the appear property of vue native transition, set whether the menu has a transition effect when the menu is initially rendered | `false` | - |
| configs | `MenuConfig[]` | Set menu options, see Contextmenu configuration items below for specific properties | `[]` | - |

### Contextmenu Config

| Name      | Type                         | Description                                                                                 | Default | Since |
| --------- | ---------------------------- | ------------------------------------------------------------------------------------ | ------ | --- |
| key | `string \| number` | Unique identifier of the setting menu | `''` | - |
| label | `string` | Set the label of the menu, if not set, display the key value of the menu | `''` | - |
| icon | `Record<string, any> \| (() => any)` | The icon of the menu, rendered as the render function when passed in the function | `null` | - |
| color | `string` | The menu color | `''` | - |
| iconColor | `string` | The color of the menu icon | `''` | - |
| shortcut | `string` | Set the content of the shortcut key hint | `''` | - |
| divided | `boolean` | Set whether to have a dividing line | `false` | - |
| disabled | `boolean` | Set whether to disable the option | `false` | - |
| children | `MenuConfig[]` | Set submenu options | `[]` | - |
