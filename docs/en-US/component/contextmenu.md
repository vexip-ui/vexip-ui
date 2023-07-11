# Contextmenu

For some pages with more interactive logic, some operations can be placed in the right-click menu to facilitate quick selection by users.

## Demos

:::demo contextmenu/basis

### Basis Usage

The simplest usage is to call the menu through the `contextmenu` event callback on the element that needs to add a context menu.

Note that the `contextmenu` event needs to disable the default behavior to prevent the system menu from popping up.

:::

:::demo contextmenu/nesting

### Nesting Usage

Nested menus can be configured via the `children` option.

The Contextmenu component is encapsulated by the Dropdown component, so the key value structure returned after selecting the menu is consistent with the Dropdown component.

:::

:::demo contextmenu/example

### Comprehensive Example

This use case shows how to set custom colors, how to set custom icons, how to disable options, how to set menu shortcuts, and how to add dividers for grouping.

:::

## API

### Contextmenu Options

| Name    | Type           | Description                                                                                                                            | Default | Since |
| ------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| clientX | `number`       | Set the horizontal x position where the menu appears                                                                                   | `0`     | -     |
| clientY | `number`       | Set the vertical y position where the menu appears                                                                                     | `0`     | -     |
| appear  | `boolean`      | Same as the appear property of vue native transition, set whether the menu has a transition effect when the menu is initially rendered | `false` | -     |
| configs | `MenuConfig[]` | Set menu options, see Contextmenu configuration items below for specific properties                                                    | `[]`    | -     |

### Contextmenu Config

| Name      | Type                                 | Description                                                                       | Default | Since    |
| --------- | ------------------------------------ | --------------------------------------------------------------------------------- | ------- | -------- |
| key       | `string \| number`                   | Unique identifier of the setting menu                                             | `''`    | -        |
| label     | `string`                             | Set the label of the menu, if not set, display the key value of the menu          | `''`    | -        |
| icon      | `Record<string, any> \| (() => any)` | The icon of the menu, rendered as the render function when passed in the function | `null`  | -        |
| color     | `string`                             | The menu color                                                                    | `''`    | -        |
| iconColor | `string`                             | The color of the menu icon                                                        | `''`    | -        |
| shortcut  | `string`                             | Set the content of the shortcut key hint                                          | `''`    | -        |
| divided   | `boolean`                            | Set whether to have a dividing line                                               | `false` | -        |
| disabled  | `boolean`                            | Set whether to disable the option                                                 | `false` | -        |
| children  | `MenuConfig[]`                       | Set submenu options                                                               | `[]`    | -        |
| renderer  | `() => any`                          | Set the label render function                                                     | `null`  | `2.1.25` |
