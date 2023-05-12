### Preset Types

```ts
interface NativeScrollState {
  scrollX: number,
  scrollY: number,
  percentX: number,
  percentY: number,
  enableXScroll: Readonly<boolean>,
  enableYScroll: Readonly<boolean>
}

interface NativeScrollSlotParams {
  getState: () => NativeScrollState,
  refresh: () => void,
  scrollTo: (clientX: number, clientY: number, duration?: number) => Promise<void>,
  scrollBy: (deltaX: number, deltaY: number, duration?: number) => Promise<void>,
  scrollToElement: (el: string | Element, duration?: number, offset?: number) => Promise<void>,
  ensureInView: (el: string | Element, duration?: number, offset?: number) => void
}
```

### NativeScroll Props

| Name             | Type                                                     | Description                                                                                                                                        | Default      | Since   |
| ---------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------- |
| mode             | `'horizontal' \| 'vertical' \| 'both'`                   | Set scrolling mode                                                                                                                                 | `'vertical'` | -       |
| scroll-class     | `ClassType`                                              | Custom class name for scroll content wrapping element                                                                                              | `null`       | -       |
| scroll-style     | `StyleType`                                              | Custom style for scroll content wrapping elements                                                                                                  | `null`       | -       |
| scroll-attrs     | `Record<string, any>`                                    | Custom attributes name for scroll content wrapping element                                                                                         | `null`       | `2.1.0` |
| width            | `number \| string`                                       | The width of the scrolling window, only when the width of the content is larger than the width of the window can be scrolled                       | `''`         | -       |
| height           | `number \| string`                                       | The height of the scrolling window, only when the height of the content is greater than the height of the window can be scrolled                   | `''`         | -       |
| disabled         | `boolean`                                                | Set whether to disable scrolling                                                                                                                   | `false`      | -       |
| pointer          | `boolean`                                                | Set whether to enable mouse drag scrolling. This property should not be enabled on mobile terminals to avoid conflicts with native interactions    | `false`      | -       |
| scroll-x         | `number`                                                 | Set the horizontal scroll position                                                                                                                 | `0`          | -       |
| scroll-y         | `number`                                                 | Set the vertical scroll position                                                                                                                   | `0`          | -       |
| use-x-bar        | `boolean`                                                | Set whether to use horizontal scroll bar                                                                                                           | `false`      | -       |
| use-y-bar        | `boolean`                                                | Set whether to use vertical scroll bar                                                                                                             | `false`      | -       |
| bar-fade         | `number`                                                 | Set the wait milliseconds to trigger the scroll bar fade, if it is less than `300`, turn off the fade effect                                       | `1500`       | -       |
| bar-class        | `ClassType`                                              | Set custom class name for scroll bar                                                                                                               | `null`       | -       |
| autoplay         | `boolean \| number`                                      | Set the scroll bar to scroll automatically. When a number is passed in, it will be used as the number of milliseconds required for a full scroll   | `false`      | -       |
| play-waiting     | `number`                                                 | When automatic scrolling is enabled, set the number of milliseconds to pause before scrolling and after each scrolling                             | `500`        | -       |
| on-before-scroll | `(payload: { signX: number, signY: number }) => boolean` | Set the callback before scrolling, **does not support** asynchronous functions and `Promise`, the return value is `false` ` will prevent scrolling | `null`       | -       |
| appear           | `boolean`                                                | Set whether to have a transition effect when scrolling the initial rendering, generally used when the initial scroll position is not `0`           | `false`      | -       |
| bar-duration     | `number`                                                 | Set the duration of the scrollbar transition                                                                                                       | `null`       | -       |
| use-bar-track    | `boolean`                                                | Set whether the scrollbar enables track interaction                                                                                                | `false`      | -       |

### NativeScroll Events

| Name             | Description                                                                                                                                      | Parameters                                                                                                              | Since |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | ----- |
| scroll           | Emitted when scrolling in any interactive form                                                                                                   | `(scroll: { type?: 'vertical' \| 'horizontal', clientX: number, clientY: number, percentX: number, percnetY: number })` | -     |
| scroll-start     | Emitted when scrolling with pointer starts                                                                                                       | `(scroll: { clientX: number, clientY: number, percentX: number, percnetY: number })`                                    | -     |
| scroll-end       | Emitted when scrolling with pointer ends                                                                                                         | `(scroll: { clientX: number, clientY: number, percentX: number, percnetY: number })`                                    | -     |
| x-enable-change  | Emitted when the active state of horizontal scrolling changes, returns the current scroll state                                                  | `(enabled: boolean)`                                                                                                    | -     |
| y-enable-change  | Emitted when the active state of vertical scrolling changes, returns the current scroll state                                                    | `(enabled: boolean)`                                                                                                    | -     |
| bar-scroll-start | Emitted when a scrollbar is used to trigger scrolling start, returns the currently triggered scrollbar type `vertical` or `horizontal`           | `(type: 'vertical' \| 'horizontal')`                                                                                    | -     |
| bar-scroll-end   | Emitted when the scroll bar is used to trigger the end of the scroll, returns the currently triggered scroll bar type `vertical` or `horizontal` | `(type: 'vertical' \| 'horizontal')`                                                                                    | -     |

### NativeScroll Slots

| Name    | Description                | Parameters               | Since   |
| ------- | -------------------------- | ------------------------ | ------- |
| defalut | Slot for scrolling content | `NativeScrollSlotParams` | -       |
| extra   | Slot for extra content     | `NativeScrollSlotParams` | `2.1.7` |

### NativeScroll Methods

| Name            | Description                                      | Signature                                                                      | Since   |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------------------------ | ------- |
| refresh         | Refresh the scroll, will trigger recalculation   | `() => void`                                                                   | -       |
| scrollTo        | Scroll to the specified position                 | `(x: number, y: number, duration?: number) => Promise<void>`                   | -       |
| scrollBy        | Scroll the specified distance                    | `(dx: number, dy: number, duration?: number) => Promise<void>`                 | -       |
| scrollToElement | Scroll to the position of the specified element  | `(el: string \| Element, duration?: number, offset?: number) => Promise<void>` | -       |
| ensureInView    | Ensure the provided element is in view of scroll | `(el: string \| Element, duration?: number, offset?: number) => void`          | `2.1.4` |
