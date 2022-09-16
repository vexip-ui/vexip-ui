### Preset Types

```ts
import type { RouteLocationRaw } from 'vue-router'

interface MenuOptions {
  label: string,
  icon?: Record<string, any>,
  iconProps?: IconMinorProps,
  name?: string,
  disabled?: boolean,
  group?: boolean,
  meta?: Record<string, any>,
  route?: RouteLocationRaw,
  children?: MenuOptions[]
}
```

### Menu Props

| Name          | Type                                               | Description                                                                                                                     | Default      | Since   |
| ------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------- |
| active        | `string`                                           | Set the default active menu                                                                                                     | `null`       | -       |
| accordion     | `boolean`                                          | Set whether to enable accordion mode. In this mode, only one menu at the same level can be expanded                             | `0`          | -       |
| marker-type   | `'top' \| 'right' \| 'bottom' \| 'left' \| 'none'` | Set the marker type of the selected menu                                                                                        | `'right'`    | -       |
| reduced       | `boolean`                                          | set menu search or not                                                                                                          | `false`      | -       |
| horizontal    | `boolean`                                          | Set whether the menu is horizontal                                                                                              | `false`      | -       |
| group-type    | `'collapse' \| 'dropdown'`                         | Submenu form in expanded state                                                                                                  | `'collapse'` | -       |
| theme         | `'light' \| 'dark'`                                | set the theme of the menu                                                                                                       | `'light'`    | -       |
| tooltip-theme | `'light' \| 'dark'`                                | Set the theme of the menu bubble tip                                                                                            | `'dark'`     | -       |
| transfer      | `boolean \| string`                                | Set the `transfer` property of the MenuItem under it, the priority is higher when the MenuItem sets this property alone         | `false`      | -       |
| options       | `MenuOptions[]`                                    | Set configuration of the menu                                                                                                   | `[]`         | `2.0.0` |
| router        | `Router`                                           | Set the Router object and its routes will be parsed automatically and generate the menus, will use `options` to be parsed first | `null`       | `2.0.0` |
| manual-route  | `boolean`                                          | Whether it is set to manual route mode, route changes will not be processed automatically after it is enabled                   | `false`      | `2.0.0` |

### Menu Events

| Name   | Description                                                                                              | Parameters                                   | Since |
| ------ | -------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ----- |
| select | Emitted when the menu is selected, returns the label of the selected menu                                | `(label: string, meta: Record<string, any>)` | -     |
| expand | Emitted when the menu is expanded (submenu), returns the label of the menu of the expanded group         | `(label: string, meta: Record<string, any>)` | -     |
| reduce | Emitted when the menu is collapsed group (submenu), returns the label of the menu in the collapsed group | `(label: string, meta: Record<string, any>)` | -     |

### MenuItem Props

| Name            | Type                  | Description                                                                                                                                                                                                              | Default | Since   |
| --------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------- |
| label           | `string`              | Unique identifier for the menu                                                                                                                                                                                           | `null`  | -       |
| icon            | `string`              | Set the icon of the menu, the icon of the menu shrinking state needs to be set through this property or the slot with the same name                                                                                      | `null`  | -       |
| icon-props      | `IconProps`           | Set the props of the menu icon                                                                                                                                                                                           | `null`  | `2.0.0` |
| disabled        | `boolean`             | Set whether the menu is disabled                                                                                                                                                                                         | `false` | -       |
| transfer        | `boolean \| string`   | When the child element is in the drop-down state, set the rendering position of its child element. When set to `true`, it will render to `<body>` by default                                                             | `false` | -       |
| transition-name | `string`              | When the child element is in the drop-down state, set the transition effect of the child element. If it is not set, it will take the value of `'vxp-drop'` or `'vxp-zoom'` according to whether it is a horizontal menu. | `null`  | -       |
| meta            | `Record<string, any>` | Set meta data of the menu                                                                                                                                                                                                | `null`  | `2.0.0` |
| children        | `MenuOptions[]`       | Set configuration of the menu children                                                                                                                                                                                   | `[]`    | `2.0.0` |
| route           | `RouteLocationRaw`    | Set the route associated with the menu. If the Router object is set, it will automatically handle the change of the route by default                                                                                     | `null`  | `2.0.0` |

### MenuItem Slots

| Name    | Description                   | Parameters | Since |
| ------- | ----------------------------- | ---------- | ----- |
| default | Content slot for menu         | -          | -     |
| icon    | Icon content slot for menu    | -          | -     |
| group   | Submenu content slot for menu | -          | -     |

### MenuGroup Props

| Name     | Type            | Description                             | Default | Since   |
| -------- | --------------- | --------------------------------------- | ------- | ------- |
| label    | `string`        | The Group name                          | `''`    | -       |
| children | `MenuOptions[]` | Set configuration of the group children | `[]`    | `2.0.0` |
