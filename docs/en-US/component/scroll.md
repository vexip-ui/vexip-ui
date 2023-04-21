# Scroll

Used for content that needs to be displayed beyond an area, allowing users to scroll through.

## Demos

:::demo scroll/basis

### Basis Usage

The most common usage is to set the value of the `height` prop for Scroll. Then it can be scrolled when the height of the content exceeds this height.

:::

:::demo scroll/bar

### Scrollbar

Add the `use-y-bar` prop to add a scroll bar to the scroll area.

:::

:::demo scroll/height

### Adaptive Height

Setting `height` prop to a valid CSS height percentage value will make the scroll area adapt to the height of its parent element according to the percentage.

:::

:::demo scroll/auto

### Auto Scroll

Colleagues said that such a function is very needed.

Add the `autoplay` prop to set the scroll area to scroll automatically.

Setting the value of the `autoplay` prop to a number will automatically scroll as the number of milliseconds required for a full scroll.

:::

:::demo scroll/track

### Scrollbar Track

Adding the `use-bar-track` property enables scrollbar track interaction, making it look like a native scrollbar.

:::

:::demo scroll/horizontal

### Horizontal Scroll

To enable horizontal scroll, you need to set the `mode` prop to `horizontal` and pass a value via `width` prop.

Normally, you still need to scroll with pressing shift key. If you want to scroll directly, you can set `mode` to `horizontal-exact`.

:::

:::demo scroll/extra

### Extra Content

You can add some extra content above the scroll view via `extra` slot.

This demo shows how to create a back to top button quickly.

:::

## API

### Preset Types

```ts
interface ScrollSlotParams {
  scrollX: number,
  scrollY: number,
  percentX: number,
  percentY: number,
  enableXScroll: number,
  enableYScroll: number,
  refresh: () => void,
  scrollTo: (clientX: number, clientY: number, duration?: number) => void,
  scrollBy: (deltaX: number, deltaY: number, duration?: number) => void,
  scrollToElement: (el: string | Element, duration?: number, offset?: number) => void,
  ensureInView: (el: string | Element, duration?: number, offset?: number) => void
}
```

### Scroll Props

| Name             | Type                                                         | Description                                                                                                                                      | Default      | Since    |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | -------- |
| mode             | `'horizontal' \| 'horizontal-exact' \| 'vertical' \| 'both'` | scrolling mode                                                                                                                                   | `'vertical'` | -        |
| scroll-class     | `ClassType`                                                  | Custom class name for scroll content wrapping element                                                                                            | `null`       | -        |
| scroll-style     | `StyleType`                                                  | Custom style for scroll content wrapping element                                                                                                 | `null`       | -        |
| scroll-attrs     | `Record<string, any>`                                        | Custom attributes name for scroll content wrapping element                                                                                       | `null`       | `2.1.0`  |
| width            | `number \| string`                                           | The width of the scrolling window, only when the width of the content is greater than the width of the window can be scrolled                    | `''`         | -        |
| height           | `number \| string`                                           | The height of the scrolling window, only when the height of the content is greater than the height of the window can be scrolled                 | `''`         | -        |
| delat-x          | `number`                                                     | The distance of each horizontal scroll                                                                                                           | `20`         | -        |
| delta-y          | `number`                                                     | The distance for each vertical scroll                                                                                                            | `20`         | -        |
| disabled         | `boolean`                                                    | Set whether to disable scrolling                                                                                                                 | `false`      | -        |
| pointer          | `boolean`                                                    | Set whether to enable mouse drag scrolling                                                                                                       | `false`      | -        |
| wheel            | `boolean`                                                    | Set whether to enable wheel scrolling                                                                                                            | `true`       | -        |
| scroll-x         | `number`                                                     | Set the horizontal scroll position                                                                                                               | `0`          | -        |
| scroll-y         | `number`                                                     | Set the vertical scroll position                                                                                                                 | `0`          | -        |
| use-x-bar        | `boolean`                                                    | Set whether to use the horizontal scroll bar                                                                                                     | `false`      | -        |
| use-y-bar        | `boolean`                                                    | Set whether to use vertical scroll bar                                                                                                           | `false`      | -        |
| bar-fade         | `number`                                                     | Set the wait milliseconds to trigger the scroll bar to fade, if it is less than 300, the fade effect will be turned off                          | `1500`       | -        |
| bar-class        | `ClassType`                                                  | Set custom class name for scroll bar                                                                                                             | `null`       | -        |
| autoplay         | `boolean \| number`                                          | Set the scroll bar to scroll automatically. When a number is passed in, it will be used as the number of milliseconds required for a full scroll | `false`      | -        |
| play-waiting     | `number`                                                     | When automatic scrolling is enabled, set the number of milliseconds to pause before scrolling and after each scrolling                           | `500`        | -        |
| on-before-scroll | `(payload: { signX: number, signY: number }) => boolean`     | Set the callback before scrolling, **does not support** asynchronous functions and `Promise`, the return value is `false` will prevent scrolling | `null`       | -        |
| use-bar-track    | `boolean`                                                    | Set whether the scrollbar enables track interaction                                                                                              | `false`      | -        |
| scroll-tag       | `string`                                                     | Custom tag for scroll content wrapping element                                                                                                   | `'div'`      | `2.0.13` |

### Scroll Events

| Name             | Description                                                                                                                                      | Parameters                                                                                                                             | Since |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| scroll           | Emitted when scrolling in any interactive form                                                                                                   | `(scroll: { type?: 'vertical' \| 'horizontal', clientX: number, clientY: number, percentX: number, percnetY: number })`                | -     |
| wheel            | Emitted after scrolling with the wheel, where `sign` marks the direction of scrolling                                                            | `(scroll: { type?: 'vertical' \| 'horizontal', sign: -1 \| 1, clientX: number, clientY: number, percentX: number, percnetY: number })` | -     |
| x-enable-change  | Emitted when the active state of horizontal scrolling changes, returns the current scroll state                                                  | `(enabled: boolean)`                                                                                                                   | -     |
| y-enable-change  | Emitted when the active state of vertical scrolling changes, returns the current scroll state                                                    | `(enabled: boolean)`                                                                                                                   | -     |
| ready            | When the scroll triggers the refresh, and when the refresh is successful and about to enter the normal available state, no return value          | -                                                                                                                                      | -     |
| scroll-start     | Emitted when scrolling with pointer starts                                                                                                       | `(scroll: { clientX: number, clientY: number, percentX: number, percnetY: number })`                                                   | -     |
| scroll-end       | Emitted when scrolling with pointer ends                                                                                                         | `(scroll: { clientX: number, clientY: number, percentX: number, percnetY: number })`                                                   | -     |
| bar-scroll-start | Emitted when a scrollbar is used to trigger scrolling start, returns the currently triggered scrollbar type `vertical` or `horizontal`           | `(type: 'vertical' \| 'horizontal')`                                                                                                   | -     |
| bar-scroll-end   | Emitted when the scroll bar is used to trigger the end of the scroll, returns the currently triggered scroll bar type `vertical` or `horizontal` | `(type: 'vertical' \| 'horizontal')`                                                                                                   | -     |

### Scroll Slots

| Name    | Description                | Parameters         | Since   |
| ------- | -------------------------- | ------------------ | ------- |
| defalut | Slot for scrolling content | `ScrollSlotParams` | -       |
| extra   | Slot for extra content     | `ScrollSlotParams` | `2.1.7` |

### Scroll Methods

| Name            | Description                                      | Signature                                                             | Since |
| --------------- | ------------------------------------------------ | --------------------------------------------------------------------- | ----- |
| refresh         | Refresh the scroll, will trigger recalculation   | `() => void`                                                          | -     |
| scrollTo        | Scroll to the specified position                 | `(x: number, y: number, duration?: number) => void`                   | -     |
| scrollBy        | Scroll the specified distance                    | `(dx: number, dy: number, duration?: number) => void`                 | -     |
| scrollToElement | Scroll to the position of the specified element  | `(el: string \| Element, duration?: number, offset?: number) => void` | -     |
| ensureInView    | Ensure the provided element is in view of scroll | `(el: string \| Element, duration?: number, offset?: number) => void` | -     |
