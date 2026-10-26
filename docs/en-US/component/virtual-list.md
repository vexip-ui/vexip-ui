# VirtualList

## Demos

:::demo virtual-list/basis

### Simple Example

Renders a list of `10000` elements.

Since the height of elements is not fixed, each element will calculate its real height for correction after rendering, so the scrollbar may jitter during scrolling.

:::

:::demo virtual-list/fixed

### Fixed Height

Renders a list of `10000` elements with a fixed height.

:::

:::demo virtual-list/default-key-at

### Default At

You can use the `default-key-at` prop to specify the element to scroll to initially.

:::

## API

### VirtualList Props

| Name           | Type                         | Description                                                                                                                       | Default | Since    |
| -------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------- | -------- |
| items          | `Record<string, any>[]`      | The array of elements                                                                                                             | `[]`    | -        |
| item-size      | `number`                     | Set the size of the element, the fixed height of the element when `item-fixed` is `true`, otherwise the minimum height            | `36`    | -        |
| item-fixed     | `boolean`                    | Set whether the element is fixed height                                                                                           | `false` | -        |
| id-key         | `string`                     | Set the `id` key name of the element                                                                                              | `'id'`  | -        |
| default-key-at | `number \| string \| symbol` | Set the `id` of the element where the virtual list stays by default                                                               | `null`  | -        |
| buffer-size    | `number`                     | Set the number of buffer elements before and after the visible area                                                               | `5`     | -        |
| list-tag       | `string`                     | The tag name of the list element                                                                                                  | `'div'` | -        |
| items-tag      | `string`                     | The tag name of the elements wrapper element                                                                                      | `'ul'`  | -        |
| items-attrs    | `Record<string, any>`        | The html attributes of elements wrapper element                                                                                   | `null`  | -        |
| hide-bar       | `boolean`                    | Set whether the scroll bar is hidden                                                                                              | `false` | `2.1.30` |
| lock-items     | `boolean`                    | Disable elements resize callback, which is used to improve performance when elements change height in transition                  | `false` | `2.1.30` |
| autoplay       | `boolean \| number`          | Enable automatically scroll, when a number is passed in, it will be used as the number of milliseconds required for a full scroll | `false` | -        |
| ignore-resize  | `boolean`                    | Whether to ignore elements resize                                                                                                 | `false` | `2.2.18` |
| disabled       | `boolean`                    | Whether to disable virtual scroll, ~~it~~ will be rendering as a normal list if true                                              | `false` | `2.3.7`  |

### NativeScroll Methods

| Name              | Description                                                                         | Signature                                                              | Since |
| ----------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----- |
| refresh           | Refresh the virtual list, which will trigger the recalculation of the scroll height | `() => void`                                                           | -     |
| scrollTo          | Scroll to the specified position                                                    | `(top: number, behavior?: ScrollBehavior) => void`                     | -     |
| scrollBy          | Scroll the specified distance                                                       | `(delta: number, behavior?: ScrollBehavior) => void`                   | -     |
| scrollToKey       | Scroll to the position of the element corresponding to the specified key            | `(key: number \| string \| symbol, behavior?: ScrollBehavior) => void` | -     |
| scrollToIndex     | Scroll to the position of the element corresponding to the specified index          | `(index: number, behavior?: ScrollBehavior) => void`                   | -     |
| ensureIndexInView | Ensure that the element corresponding to the provided key is in view of scroll      | `(index: number, behavior?: ScrollBehavior) => void`                   | -     |
| ensureKeyInView   | Ensure that the element corresponding to the provided index is in view of scroll    | `(key: number \| string \| symbol, behavior?: ScrollBehavior) => void` | -     |
