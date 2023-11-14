# Breadcrumb

Displays the current page's position in the system hierarchy, and can go back up.

## Demos

:::demo breadcrumb/basis

### Basis Usage

Simplest usage.

:::

:::demo breadcrumb/options

### Using Options

Breadcrumb items can be quickly created via the `options` prop.

:::

:::demo breadcrumb/border

### Border Mode

Add the `border` prop to enable border mode.

:::

:::demo breadcrumb/separator

### Separator

The separator can be customized for all Items via the `separator` slot.

Of course, you can also choose to use the slot of the same name of the Item to customize the separator individually.

:::

:::demo breadcrumb/example

### File Navigation

A use case similar to the breadcrumb navigation at the top of the Windows system file manager.

:::

:::demo breadcrumb/router

### Use Router

==!s|2.2.0==

Passing a `vue-router` Router object through the `router` prop can quickly create breadcrumbs based on the routes.

When using router, each `route.meta` is assumed to be parsed as a option.

Configure `route.meta.menu` to `false` to exclude a route when parsing.

:::

## API

### Preset Types

```ts
interface BreadcrumbOptions {
  label: string,
  name?: string | (() => string)
}
```

### Breadcrumb Props

| Name      | Type                              | Description                                                                                                                       | Default | Since   |
| --------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| separator | `string`                          | Set the breadcrumb separator                                                                                                      | `'/'`   | -       |
| border    | `boolean`                         | Set whether to enable border mode                                                                                                 | `false` | -       |
| options   | `(string \| BreadcrumbOptions)[]` | Shortcut to set child elements, invalid after using slots                                                                         | `[]`    | -       |
| router    | `Router`                          | Set the Router object and its routes will be parsed automatically and generate the breadcrumbs, will use `options` to parse first | `null`  | `2.2.0` |

### Breadcrumb Events

| Name            | Description                                                                                                                       | Parameters                  | Since |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----- |
| select          | Emitted when a child element is clicked, returns the element's label (index)                                                      | `(label: string \| number)` | -     |
| separator-click | Emitted when the separator of a child element is clicked, returns the label (index) of the element, usually used with border mode | `(label: string \| number)` | -     |

### Breadcrumb Slots

| Name      | Description                              | Parameters                                     | Since   |
| --------- | ---------------------------------------- | ---------------------------------------------- | ------- |
| default   | child elements of the breadcrumb         | -                                              | -       |
| separator | Slot for custom separator content        | `{ label: string \| number }`                  | -       |
| item      | Slot for each child element individually | `{ option: BreadcrumbOptions, index: number }` | `2.2.0` |

### BreadcrumbItem Props

| Name  | Type               | Description                                                                 | Default | Since |
| ----- | ------------------ | --------------------------------------------------------------------------- | ------- | ----- |
| label | `string \| number` | The unique label of the element, the built-in index will be used if not set | `null`  | -     |

### BreadcrumbItem Events

| Name            | Description                                                                 | Parameters                  | Since |
| --------------- | --------------------------------------------------------------------------- | --------------------------- | ----- |
| select          | Emitted when an element is clicked, returns the element's label             | `(label: string \| number)` | -     |
| separator-click | Emitted when an element's separator is clicked, returns the element's label | `(label: string \| number)` | -     |

### BreadcrumbItem Slots

| Name      | Description                           | Parameters | Since |
| --------- | ------------------------------------- | ---------- | ----- |
| default   | The content of the breadcrumb element | -          | -     |
| separator | Slot for custom separator content     | -          | -     |
