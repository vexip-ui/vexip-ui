# Breadcrumb

## Demos

Displays the current page's position in the system hierarchy, and can go back up.

:::demo breadcrumb/basis

### Basis Usage

Simplest usage.

:::

:::demo breadcrumb/border

### Border Mode

Add the `border` prop to enable border mode.

:::

:::demo breadcrumb/example

### File Navigation

A use case similar to the breadcrumb navigation at the top of the Windows 10 file manager.

:::

:::demo breadcrumb/options

### Using Options

Breadcrumb items can be quickly created via the `options` prop.

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

| Name      | Type                              | Description                                               | Default | Since |
| --------- | --------------------------------- | --------------------------------------------------------- | ------- | ----- |
| separator | `string`                          | Set the breadcrumb separator                              | `'/'`   | -     |
| border    | `boolean`                         | Set whether to enable border mode                         | `false` | -     |
| options   | `(string \| BreadcrumbOptions)[]` | Shortcut to set child elements, invalid after using slots | `[]`    | -     |

### Breadcrumb Events

| Name            | Description                                                                                                                       | Parameters                  | Since |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----- |
| select          | Emitted when a child element is clicked, returns the element's label (index)                                                      | `(label: string \| number)` | -     |
| separator-click | Emitted when the separator of a child element is clicked, returns the label (index) of the element, usually used with border mode | `(label: string \| number)` | -     |

### Breadcrumb Slots

| Name      | Description                       | Parameters                  | Since |
| --------- | --------------------------------- | --------------------------- | ----- |
| default   | child elements of the breadcrumb  | -                           | -     |
| separator | Slot for custom separator content | `(label: string \| number)` | -     |

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
