# Scrollbar

## Demos

:::demo scrollbar/basis

### Basis Usage

It's a bit cumbersome to use alone, requiring manual synchronization of scroll position information.

:::

:::demo scrollbar/track

### Scrollbar Track

As with the basic usage, add a `use-track` prop and you will have an interactive track.

:::

:::demo scrollbar/style

### Change Styles

The width, bar color and track color of the scrollbar can be adjusted by `width`, `bar-color` and `track-color` props respectively.

:::

## API

### Scrollbar Props

| Name        | Type                                     | Description                                                                                                                                | Default   | Since |
| ----------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ----- |
| placement   | `'top' \| 'right' \| 'bottom' \| 'left'` | Scrollbar placement                                                                                                                        | `'right'` | -     |
| scroll      | `number`                                 | Set the scroll position of the scroll bar, percentage                                                                                      | `0`       | -     |
| bar-length  | `number`                                 | The length of the scroll bar (height when vertical), the unit is percentage, optional value `1` ~ `99`                                     | `35`      | -     |
| appear      | `boolean`                                | Set whether the scrollbar transitions are enabled on initial render                                                                        | `false`   | -     |
| fade        | `number`                                 | Set the milliseconds to wait for the scroll bar to fade, if it is less than `300`, the fade effect is turned off                           | `1500`    | -     |
| bar-color   | `string`                                 | The background color of the scroll bar                                                                                                     | `null`    | -     |
| disabled    | `boolean`                                | Set scrollbar disabled state                                                                                                               | `false`   | -     |
| wrapper     | `string \| HTMLElement`                  | Pass in an id selector or a Node object, set the container of the scroll bar, used to sense mouse movement to show and hide the scroll bar | `null`    | -     |
| duration    | `number`                                 | Set the duration of the scroll bar transition effect in milliseconds                                                                       | `null`    | -     |
| use-track   | `boolean`                                | Set whether to enable scrollbar track interaction                                                                                          | `false`   | -     |
| track-speed | `number`                                 | Set the basic movement speed of clicking on the track to trigger scrolling, the unit is percentage, the optional value is `1` ~ `9`        | `2`       | -     |

### Scrollbar Events

| Name         | Description                                                                                        | Parameters          | Since |
| ------------ | -------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| scroll-start | Emitted when the scroll bar is about to be scrolled, returns the current scroll position (percent) | `(percent: number)` | -     |
| scroll       | Emitted when scrolling with the scroll bar, returns the current scroll position (percent)          | `(percent: number)` | -     |
| scroll-end   | Emitted when you stop scrolling with the scroll bar, returns the current scroll position (percent) | `(percent: number)` | -     |
