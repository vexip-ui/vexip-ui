# ResizeObserver

## Demos

:::demo resize-observer/basis

### Simple Example

Try to resize this element.

:::

:::demo resize-observer/directive

### Use Directive

Use the `v-resize` directive to quickly add resize callback to element.

:::

## API

### Preset Types

```ts
type ResizeHandler = (entry: ResizeObserverEntry) => any

interface VResizeOptions {
  handler: ResizeHandler,
  throttle?: boolean | number,
  disabled?: boolean
}
```

### ResizeObserver Props

| Name      | Type                                  | Description                                                                                                                               | Default | Since   |
| --------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| on-resize | `(entry: ResizeObserverEntry) => any` | The callback when resized                                                                                                                 | `null`  | -       |
| throttle  | `boolean \| number`                   | Set whether to enable the throttling of the callback, the number of milliseconds of throttling can be customized when passing in a number | `false` | -       |
| disabled  | `boolean`                             | Set whether to disable                                                                                                                    | `false` | `2.2.8` |

### ResizeObserver Directives

| Name     | Description                                                                      | Parameters                                   | Since   |
| -------- | -------------------------------------------------------------------------------- | -------------------------------------------- | ------- |
| v-resize | Used to quickly add resize callback to element, support the `.throttle` modifier | `(binding: ResizeHandler \| VResizeOptions)` | `2.3.0` |
