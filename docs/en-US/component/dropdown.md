# Dropdown

展示一组折叠的下拉菜单。

## Demos

:::demo dropdown/basis

### Basis Usage

Simplest dropdown menu.

:::

:::demo dropdown/nesting

### Nesting Usage

Dropdown can be nested to achieve cascading effects.

:::

:::demo dropdown/custom

### Custom Content

In addition to using the built-in components, you can customize the content of the slot.

:::

## API

### Dropdown Props

| Name          | Type                             | Description                                                                                                        | Default    | Since    |
| ------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- | -------- |
| visible       | `boolean`                        | The expanded state of the dropdown menu, you can use `v-model` two-way binding                                     | `false`    | -        |
| label         | `string \| number`               | Index of item when nested                                                                                          | `null`     | -        |
| outside-close | `boolean`                        | Set whether to close by clicking outside                                                                           | `true`     | -        |
| trigger       | `'hover' \| 'click' \| 'csutom'` | The trigger method of the dropdown menu, when it is `custom`, all scenarios need to be manually controlled visible | `'hover'`  | -        |
| placement     | `Placement`                      | The position of the menu list, the optional value is the same as Popper.js                                         | `'bottom'` | -        |
| transfer      | `boolean \| string`              | Set the rendering position of the menu list. When set to `true`, it will render to `<body>` by default             | `false`    | -        |
| meta          | `Record<string, any>`            | The meta data for dropdown, used when nesting                                                                      | `null`     | `2.0.0`  |
| alive         | `boolean`                        | When enabled, the dropdown menu will only be hidden when is closed                                                 | `false`    | `2.1.13` |
| custom        | `boolean`                        | Whether custom dropdown content, it will disable nested process after it is enabled                                | `false`    | `2.1.22` |

### Dropdown Events

| Name          | Description                                                                                                                                                                                         | Parameters                                                     | Since |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ----- |
| toggle        | Emitted when the expanded state of the dropdown menu changes, returns the current state                                                                                                             | `(visible: boolean)`                                           | -     |
| select        | Emitted when the lower-level item of the drop-down menu is selected, returns the label of the selected item, if it is nested, the multi-level values will be returned together by '-' concatenation | `(labels: (string \| number)[], metas: Record<string, any>[])` | -     |
| outside-click | Emitted when the outside of the element is clicked, no return value                                                                                                                                 | -                                                              | -     |
| outside-close | Emitted when the drop-down menu is closed by clicking outside the element, no return value                                                                                                          | -                                                              | -     |

### Dropdown Slots

| Name    | Description                                                                                  | Parameters | Since |
| ------- | -------------------------------------------------------------------------------------------- | ---------- | ----- |
| default | The part of the dropdown that triggers the state change                                      | -          | -     |
| drop    | The candidate list of the drop-down menu, generally undertaken by the DropdownList component | -          | -     |

### DropdownItem Props

| Name     | Type                  | Description                                                                                                   | Default | Since   |
| -------- | --------------------- | ------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| label    | `string \| number`    | The unique index of the option, if not set, the option's textContent value will be used during initialization | `null`  | -       |
| disabled | `boolean`             | Set whether to disable the option                                                                             | `false` | -       |
| selected | `boolean`             | Set whether to be selected                                                                                    | `false` | -       |
| divided  | `boolean`             | Set whether to add a dividing line, after setting it will add a dividing line below the options               | `false` | -       |
| meta     | `Record<string, any>` | The meta data for dropdown item                                                                               | `null`  | `2.0.0` |

### DropdownItem Events

| Name   | Description                                                          | Parameters                  | Since |
| ------ | -------------------------------------------------------------------- | --------------------------- | ----- |
| select | Emitted when the option is selected, returns the label of the option | `(label: string \| number)` | -     |
