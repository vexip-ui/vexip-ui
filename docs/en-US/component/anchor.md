# Anchor

Often used to quickly locate a certain position on the page.

## Demos

:::demo anchor/basis

### Basis Usage

For basic usage, sublinks can be added using the `group` slot.

:::

:::demo anchor/marker

### Marker

Adding `marker` prop will mark the currently active anchor link with a marker point.

:::

:::demo anchor/example

### Example

This is a standalone complete use case.

It can be combined with Scroll or NativeScrolling components, of course native scrolling is also possible.

:::

:::demo anchor/options

### Options

If you want to keep things simple, you can use the `options` prop to generate anchors.

:::

## API

### Preset Types

```ts
interface AnchorLinkOptions {
  to: string,
  label: string,
  title?: string,
  children?: AnchorLinkOptions[]
}
```

### Anchor Props

| Name            | Type                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Default | Since   |
| --------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ------- |
| active          | `string`              | The currently active anchor, can use `v-model` two-way binding                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `''`    | -       |
| viewer          | `unknown`             | Set the container of the anchor point. When a string is passed in, it will try to select the element as a selector. When the value is `root`, it will get the root component. When the function is passed in, the return value will be used as the element. When the correct element cannot be obtained, the parent component will be traversed upward by default, trying to find the (Native)Scroll component or the (Native)Scroll component whose with `'scroll'` ref as the container, otherwise use the component's `$el` | `null`  | -       |
| offset          | `number`              | Set the offset of the anchor scroll capture                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `8`     | -       |
| marker          | `boolean`             | Set whether to use marker to mark the currently active anchor                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `false` | -       |
| scroll-duration | `number`              | Set the scroll duration of the container when the anchor is clicked, in milliseconds                                                                                                                                                                                                                                                                                                                                                                                                                                           | `500`   | -       |
| options         | `AnchorLinkOptions[]` | Quickly generate anchors with options                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | `[]`    | `2.0.0` |
| force-active    | `boolean`             | When enabled, will force positioning whether the selected anchor is already active                                                                                                                                                                                                                                                                                                                                                                                                                                             | `false` | `2.0.0` |

### Anchor Events

| Name   | Description                                                                                                                                | Parameters         | Since |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ----- |
| change | Emitted when the anchor point is changed, returns the currently active anchor point, or an empty string if there is no active anchor point | `(active: string)` | -     |

### Anchor Slots

| Name    | Description                                     | Parameters | Since |
| ------- | ----------------------------------------------- | ---------- | ----- |
| default | Anchor's content slot                           | -          | -     |
| marker  | Activates the content slot of the anchor marker | -          | -     |

### AnchorLink Props

| Name  | Type     | Description                                                                  | Default | Since |
| ----- | -------- | ---------------------------------------------------------------------------- | ------- | ----- |
| to    | `string` | The element id pointed to by the anchor link lock, which must start with `#` | `''`    | -     |
| title | `string` | The title of the anchor link, same as the native `title` attribute           | `''`    | -     |

### AnchorLink Slots

| Name    | Description                           | Parameters | Since |
| ------- | ------------------------------------- | ---------- | ----- |
| default | content slot for anchor links         | -          | -     |
| group   | Slots for child links of anchor links | -          | -     |
