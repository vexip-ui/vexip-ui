# ResizeObserver

## Demos

:::demo resize-observer/basis

### Simple Example

Try to resize this element.

:::

## API

### ResizeObserver Props

| Name      | Type                                  | Description                                                                                                                               | Default | Since   |
| --------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| on-resize | `(entry: ResizeObserverEntry) => any` | The callback when resized                                                                                                                 | `null`  | -       |
| throttle  | `boolean \| number`                   | Set whether to enable the throttling of the callback, the number of milliseconds of throttling can be customized when passing in a number | `false` | -       |
| disabled  | `boolean`                             | Set whether to disable                                                                                                                    | `false` | `2.2.8` |
