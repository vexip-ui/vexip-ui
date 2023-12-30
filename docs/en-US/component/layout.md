# Layout

This is a progressive layout component with strong business logic that can be customized to varying degrees as needed.

:::warning
In production practice, multiple Layout should not be used in an application, and Layout should fill the window.
:::

Normally, the main content of the Layout is scrolled on the element corresponding to the `main` slot. If you want the scrolling to occur on the browser window, you can add the `fit-window` prop.

If you want the main content to be a fixed area and want to add scrollable wrap element by yourself, you can add the `fix-main` prop (refer to the **Fixed Main** demo below).

## Demos

:::demo layout/basis

### Basis Usage

Usually, you only need to provide some basic configuration for quick layout.

:::

:::demo layout/actions

### User Actions

Custom user actions can be quickly configured via the `actions` prop.

:::

:::demo layout/footer

### Add Footer

Add the `footer` prop to add a footer, and combine the `copyright` and `links` props to quickly configure the footer content.

:::

:::demo layout/fixed-main

### Fixed Main

In some cases, you can add the `fixed-main` prop if you want the main is fixed, like canvas.

:::

:::demo layout/no-aside

### No Aside

Add the `no-aside` prop to remove the sidebar, in this case the menu will inside the header.

:::

:::demo layout/adjust

### Adjust Size

The header height and aside width can be easily adjusted via CSS variables.

:::

:::demo layout/media

### Media Query

By default, the behavior of the header and aside will change at the `lg` breakpoint, the header will be collapsed after the main content is scrolled, and the aside will be directly collapsed and expanded through the handler.

These behaviors can be customized via the `header-fixed` and `aside-fixed` props.

When passing a boolean value, you can explicitly specify whether the header and aside are always fixed or not, and you can also pass a breakpoint or media query string to specify when the behavior change should occur.

When passing a string, there are two special values `max` and `min`, which are equivalent to `true` and `false`.

:::

:::demo layout/custom-header

### Custom Header

Maybe you want to customize the content of the header, you can do that easily with slots.

:::

:::demo layout/custom-aside

### Custom Aside

Maybe you want to customize the content of the aside, you can do that easily with slots.

:::

:::demo layout/slots

### Various Slots

There are various slots within the component that provide to custom content. Some nested slots are not shown here, see Layout slots for details.

:::

:::demo layout/fit-window

### Fit Window

Add the `fit-window` prop to fit the layout to the browser window.

After adding, the internal scroll component will be disabled, the layout will follow the browser window scroll, and better scroll interaction can be obtained on the mobile.

:::

## API

### Preset Types

```ts
import type { Router } from 'vue-router'
import type { IconMinorProps, MenuGroupType, MenuMarkerType } from 'vexip-ui'

type LayoutSignType = 'aside' | 'header'
type LayoutConfig = 'nav' | 'color' | 'theme'
type LayoutSection =
  | 'wrapper'
  | 'section'
  | 'header'
  | 'headerLeft'
  | 'headerMain'
  | 'headerRight'
  | 'headerUser'
  | 'sidebar'
  | 'aside'
  | 'asideTop'
  | 'asideMain'
  | 'asideBottom'
  | 'expandHandler'
  | 'main'
  | 'footer'
  | 'footerLinks'
  | 'copyright'
  | 'scrollbar'

type LayoutInnerClass = Partial<Record<LayoutSection, ClassType>>

interface LayoutMenuProps {
  accordion?: boolean,
  markerType?: MenuMarkerType,
  groupType?: MenuGroupType,
  tooltipTheme?: TooltipTheme,
  router?: Router,
  manualRoute?: boolean
}

interface LayoutHeaderAction {
  label: string,
  icon?: Record<string, any>,
  iconProps?: IconMinorProps,
  name?: string,
  disabled?: boolean,
  divided?: boolean,
  meta?: Record<string, any>
}

interface LayoutUser {
  name: string,
  email?: string,
  avatar?: string | Record<string, any>
}

interface LayoutFooterLink {
  name: string,
  subname?: string,
  icon?: Record<string, any>,
  iconProps?: IconMinorProps,
  to?: string,
  target?: string,
  children?: Array<Omit<LayoutFooterLink, 'children'>>
}

interface LayoutSlotParams {
  expanded: boolean,
  reduced: boolean,
  toggleExpanded: (expanded?: boolean) => void,
  toggleReduced: (reduced: boolean) => void
}

interface LayoutHeaderSlotParams extends LayoutSlotParams {
  handleColorChange: (color: string) => void,
  toggleUserDropped: (dropped?: boolean) => void
}
```

### Layout Props

| Name             | Type                     | Description                                                                                                                                             | Default                                                              | Since    |
| ---------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | -------- |
| no-aside         | `boolean`                | Set whether to disable the aside                                                                                                                        | `false`                                                              | -        |
| footer           | `boolean`                | Set whether to use footer                                                                                                                               | `false`                                                              | -        |
| tag              | `string`                 | Set rendering tag                                                                                                                                       | `'section'`                                                          | -        |
| menus            | `MenuOptions[]`          | Set menu options                                                                                                                                        | `[]`                                                                 | -        |
| menu-props       | `AsideMenuProps`         | Set menu props, refer to [Menu Props](/en-US/component/menu#menu-props)                                                                                 | `null`                                                               | -        |
| logo             | `string`                 | Set Logo image address                                                                                                                                  | `''`                                                                 | -        |
| sign-name        | `string`                 | Set the sign                                                                                                                                            | `''`                                                                 | -        |
| config           | `LayoutConfig[]`         | Set configuration options for user drop-down panels                                                                                                     | `['nav', 'theme', 'color']`                                          | -        |
| user             | `HeaderUser`             | Set user information                                                                                                                                    | `null`                                                               | -        |
| actions          | `HeaderAction[]`         | Set the action options of the user drop-down panel                                                                                                      | `[]`                                                                 | -        |
| expanded         | `boolean`                | When the aside is not fixed, set whether the aside is expanded, can use `v-model` two-way binding                                                       | `false`                                                              | `2.1.19` |
| reduced          | `boolean`                | Set whether the aside is reduced or not, can use `v-model` two-way binding                                                                              | `false`                                                              | -        |
| avatar-circle    | `boolean`                | Set whether the user avatar is circular                                                                                                                 | `false`                                                              | -        |
| sign-type        | `'aside' \| 'header'`    | Set the block where the sign is located, can use `v-model` two-way binding                                                                              | `'aside'`                                                            | -        |
| header-fixed     | `boolean \| string`      | Set whether the header is fixed, can pass a breakpoint or media query string, and it will be fixed when the query is matched                            | `'lg'`                                                               | -        |
| aside-fixed      | `boolean \| string`      | Set whether the aside is fixed, can pass a breakpoint or media query string, and it will be fixed when the query is matched                             | `'lg'`                                                               | -        |
| copyright        | `string`                 | Set the copyright information of the footer                                                                                                             | `''`                                                                 | -        |
| links            | `FooterLink[]`           | Set footer link options                                                                                                                                 | `[]`                                                                 | -        |
| colors           | `string[]`               | Set candidates for theme color                                                                                                                          | `['#339af0', '#f03e3e', '#be4bdb', '#7950f2', '#1b9e44', '#f76707']` | -        |
| color            | `string`                 | Set the currently selected theme color, can use `v-model` two-way binding                                                                               | `''`                                                                 | -        |
| mini-header-sign | `boolean \| string`      | Set whether to simplify the sign in header, can pass in a breakpoint or a media query string, and it will be simplified when the query is matched       | `lg`                                                                 | -        |
| vertical-links   | `boolean \| string`      | Set whether the link of the footer is vertical, you can pass in a breakpoint or a media query string, and it will be vertical when the query is matched | `md`                                                                 | -        |
| locale           | `LocaleConfig['layout']` | Set the locale config                                                                                                                                   | `null`                                                               | `2.1.0`  |
| dark-mode        | `boolean`                | Manually set current theme mode, except init, it will dynamically modify the class name on `<html>` when changed, can use `v-model` two-way binding     | `null`                                                               | `2.1.1`  |
| fixed-main       | `boolean`                | Set whether the main is fixed                                                                                                                           | `false`                                                              | `2.1.14` |
| fit-window       | `boolean`                | When enabled, layout will fit the browser window and remove built-in scroll                                                                             | `false`                                                              | `2.1.24` |
| inner-classes    | `LayoutInnerClass`       | Set custom class names for inner elements                                                                                                               | `{}`                                                                 | `2.1.24` |
| no-header        | `boolean`                | Set whether to disable the header                                                                                                                       | `false`                                                              | `2.2.7`  |

### Layout Events

| Name            | Description                                                         | Parameters                                   | Since    |
| --------------- | ------------------------------------------------------------------- | -------------------------------------------- | -------- |
| expanded-change | Emitted when the expanded of the aside changed                      | `(expanded: boolean)`                        | `2.1.19` |
| reduced-change  | Emitted when the aside reduced state changed                        | `(target: boolean)`                          | -        |
| sign-click      | Emitted when the sign is clicked                                    | `(event: MouseEvent)`                        | -        |
| menu-select     | Emitted when the menu is selected                                   | `(label: string, meta: Record<string, any>)` | -        |
| user-action     | Emitted when the user dropdown panel action is clicked              | `(label: string, meta: Record<string, any>)` | -        |
| nav-change      | Emitted when the navigation type is changed via the config panel    | `(type: LayoutSignType)`                     | -        |
| color-change    | Emitted when the theme color is changed via the configuration panel | `(color: string)`                            | -        |
| toggle-theme    | Emitted when changing theme mode via config panel                   | `(isDark: boolean)`                          | `2.1.0`  |
| content-resize  | Emitted when content resized                                        | -                                            | `2.1.23` |

### Layout Slots

| Name             | Description                                                                                     | Parameters                                                                                                                                              | Since   |
| ---------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| sign             | Slot for the sign, by default on the `header-left` or `aside-top` slot depending on `sign-type` | `LayoutSlotParams`                                                                                                                                      | -       |
| header           | Slot of the header, use it to cover the entire header                                           | `LayoutSlotParams`                                                                                                                                      | -       |
| header-left      | Slot for the left of header                                                                     | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) = > void }` | -       |
| header-main      | Slot for the center of header                                                                   | `LayoutHeaderSlotParams`                                                                                                                                | -       |
| header-right     | Slot for the right of header                                                                    | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) = > void }` | -       |
| header-user      | Slot for the user dropdown of header                                                            | `LayoutHeaderSlotParams`                                                                                                                                | -       |
| header-avatar    | Slot for the user avatar of header                                                              | `LayoutHeaderSlotParams`                                                                                                                                | `2.0.7` |
| aside            | Slot for aside, using it will cover the entire aside                                            | `LayoutSlotParams`                                                                                                                                      | -       |
| aside-top        | Slot for the top of aside                                                                       | `LayoutSlotParams`                                                                                                                                      | -       |
| aside-main       | Slot for the center of aside                                                                    | `LayoutSlotParams`                                                                                                                                      | -       |
| aside-bottom     | Slot for the bottom of aside                                                                    | `LayoutSlotParams`                                                                                                                                      | -       |
| aside-expand     | Slot of handler that trigger aside expanded                                                     | `LayoutSlotParams`                                                                                                                                      | -       |
| default          | Slot for the main page, use it to cover the entire main page                                    | `LayoutSlotParams`                                                                                                                                      | -       |
| main             | Slot for the main page                                                                          | -                                                                                                                                                       | -       |
| footer           | Slot for footer , use it to cover the entire footer                                             | `LayoutSlotParams`                                                                                                                                      | -       |
| footer-links     | Slot for footer links                                                                           | -                                                                                                                                                       | -       |
| footer-copyright | Slot for footer copyright information                                                           | -                                                                                                                                                       | -       |

### Layout Methods

| Name              | Description                                  | Parameters                | Since   |
| ----------------- | -------------------------------------------- | ------------------------- | ------- |
| expandMenuByLabel | Expand the inner menu according to the label | `(label: string) => void` | `2.0.2` |

### LayoutHeader Props

| Name          | Type                     | Description                                   | Default                                                                     | Since   |
| ------------- | ------------------------ | --------------------------------------------- | --------------------------------------------------------------------------- | ------- |
| tag           | `string`                 | Set the rendered tag                          | `header`                                                                    | -       |
| logo          | `string`                 | Set Logo image address                        | `''`                                                                        | -       |
| sign-name     | `string`                 | set the sign                                  | `''`                                                                        | -       |
| user          | `LayoutUser`             | Set user information                          | `{ name: '' }`                                                              | -       |
| user-dropped  | `boolean`                | Set whether the user-dropped panel is open    | `false`                                                                     | -       |
| avatar-circle | `boolean`                | Set whether the user avatar is circular       | `false`                                                                     | -       |
| config        | `LayoutConfig[]`         | Set config options for user dropdown panel    | `['nav', 'color']`                                                          | -       |
| actions       | `LayoutHeaderAction[]`   | Set action options of the user dropdown panel | `[{ label: 'signOut', name: locale.signOut, icon: ArrowRightFromBracket }]` | -       |
| sign-type     | `LayoutSignType`         | Set the block where the sign is located       | `'aside'`                                                                   | -       |
| colors        | `string[]`               | Set candidates for theme color                | `['#339af0', '#f03e3e', '#be4bdb', '#7950f2', '#1b9e44', '#f76707']`        | -       |
| color         | `string`                 | Set the currently selected theme color        | `''`                                                                        | -       |
| menus         | `MenuOptions[]`          | Set menu options                              | `[]`                                                                        | -       |
| menu-props    | `LayoutMenuProps`        | Set menu properties                           | `null`                                                                      | -       |
| locale        | `LocaleConfig['layout']` | Set the locale config                         | `null`                                                                      | `2.1.0` |

### LayoutHeader Events

| Name            | Description                                                         | Parameters                                   | Since    |
| --------------- | ------------------------------------------------------------------- | -------------------------------------------- | -------- |
| nav-change      | Emitted when the navigation type is changed via the config panel    | `(type: LayoutSignType)`                     | -        |
| color-change    | Emitted when the theme color is changed via the configuration panel | `(color: string)`                            | -        |
| user-action     | Emitted when the user dropdown panel action is clicked              | `(label: string, meta: Record<string, any>)` | -        |
| sign-click      | Emitted when the sign is clicked                                    | `(event: MouseEvent)`                        | -        |
| dropped-change  | Emitted when the user drop-down panel is opened or closed           | `(target: boolean)`                          | -        |
| expanded-change | Emitted when the expanded of the aside changed                      | `(expanded: boolean)`                        | `2.1.19` |
| reduced-change  | Emitted when the aside reduced changed                              | `(reduced: boolean)`                         | -        |
| menu-select     | Emitted when the menu is selected                                   | `(label: string, meta: Record<string, any>)` | -        |
| toggle-theme    | Emitted when changing theme mode via config panel                   | `(isDark: boolean)`                          | `2.1.0`  |

### LayoutHeader Slots

| Name    | Description                          | Parameters               | Since |
| ------- | ------------------------------------ | ------------------------ | ----- |
| left    | Slot for the left of header          | `LayoutHeaderSlotParams` | -     |
| default | Slot for the center of header        | `LayoutHeaderSlotParams` | -     |
| right   | Slot for the right of header         | `LayoutHeaderSlotParams` | -     |
| user    | Slot for the user dropdown of header | `LayoutHeaderSlotParams` | -     |

### LayoutAside Props

| Name       | Type                  | Description                                                                                                                     | Default   | Since    |
| ---------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| tag        | `string`              | Set the rendered tag                                                                                                            | `aside`   | -        |
| expanded   | `boolean`             | When the aside is not fixed, set whether the aside is expanded, can use `v-model` two-way binding                               | `false`   | -        |
| reduced    | `boolean`             | Set whether the aside is reduced, can use `v-model` two-way binding                                                             | `false`   | -        |
| menus      | `MenuOptions[]`       | Set menu options                                                                                                                | `[]`      | -        |
| menu-props | `LayoutMenuProps`     | Set menu properties                                                                                                             | `null`    | -        |
| logo       | `string`              | Set Logo image address                                                                                                          | `''`      | -        |
| sign-name  | `string`              | Set the sign                                                                                                                    | `''`      | -        |
| fixed      | `string`              | Set whether the aside is fixed, you can pass a breakpoint or media query string, and it will be fixed when the query is matched | `'lg'`    | -        |
| sign-type  | `'aside' \| 'header'` | Set the block where the sign is located, aside top will be adjusted if it's not equal to `'aside'`                              | `'aside'` | `2.1.23` |

### LayoutAside Events

| Name            | Description                                    | Parameters                                   | Since |
| --------------- | ---------------------------------------------- | -------------------------------------------- | ----- |
| expanded-change | Emitted when the expanded of the aside changed | `(expanded: boolean)`                        | -     |
| reduced-change  | Emitted when the aside reduced changed         | `(reduced: boolean)`                         | -     |
| sign-click      | Emitted when the sign is clicked               | `(event: MouseEvent)`                        | -     |
| menu-select     | Emitted when the menu is selected              | `(label: string, meta: Record<string, any>)` | -     |

### LayoutAside Slots

| Name    | Description                                 | Parameters         | Since |
| ------- | ------------------------------------------- | ------------------ | ----- |
| top     | Slot for the top of aside                   | `LayoutSlotParams` | -     |
| default | Slot for the center of aside                | `LayoutSlotParams` | -     |
| bottom  | Slot for the bottom of aside                | `LayoutSlotParams` | -     |
| expand  | Slot of handler that trigger aside expanded | `LayoutSlotParams` | -     |

### LayoutMain Props

| Name  | Type      | Description                   | Default | Since    |
| ----- | --------- | ----------------------------- | ------- | -------- |
| tag   | `string`  | Set the rendered tag          | `aside` | -        |
| fixed | `boolean` | Set whether the main is fixed | `false` | `2.1.14` |

### LayoutFooter Props

| Name           | Type                 | Description                                                                                                                                             | Default  | Since |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----- |
| tag            | `string`             | Set the rendered tag                                                                                                                                    | `footer` | -     |
| copyright      | `string`             | Set the copyright information of the footer                                                                                                             | `''`     | -     |
| links          | `LayoutFooterLink[]` | Set footer link options                                                                                                                                 | `[]`     | -     |
| vertical-links | `boolean \| string`  | Set whether the link of the footer is vertical, you can pass in a breakpoint or a media query string, and it will be vertical when the query is matched | `md`     | -     |

### LayoutFooter Slots

| Name      | Description                           | Parameters | Since |
| --------- | ------------------------------------- | ---------- | ----- |
| links     | Slot for footer links                 | -          | -     |
| copyright | Slot for footer copyright information | -          | -     |
