# Carousel

The carousel component can quickly build a carousel area, which is often used for flexible display of a set of horizontal content.

## Demos

:::demo carousel/basis

### Basis Usage

The default viewable area is 3 elements, which can be adjusted by setting the `view-size` property.

:::

:::demo carousel/active

### Active Element

The default slot of the Item component can obtain whether the current element handles the active state through the `active` prop.

Use this prop to easily add custom styles to active and inactive elements.

:::

:::demo carousel/album

### Album Example

Using the carousel component combined with some simple elements can achieve effects similar to photo albums and picture viewers (two-dimensional concentration detection).

:::

:::demo carousel/autoplay

### Autoplay

Add the `autoplay` prop to enable autoplay, returning to the first element when the last element is reached.

:::

:::demo carousel/lantern

### Lantern

After setting the `view-size` prop to 1, a lantern effect can be formed.

:::

:::demo carousel/loop

### Loop Carousel

Adding the `loop` prop turns on a looping carousel, where the last element joins the first element, and vice versa.

:::

:::demo carousel/vertical

### Vertical Carousel

The carousel can be vertical by adding the `vertical` prop.

:::

## API

### Carousel Props

| Name          | Type                              | Description                                                                                                                                 | Default     | Since   |
| ------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------- |
| active        | `number`                          | The currently active element, can use `v-model` two-way binding                                                                             | `0`         | -       |
| view-size     | `number`                          | The number of items that can fit in the viewport                                                                                            | `3`         | -       |
| vertical      | `boolean`                         | Set whether to enable vertical rotation mode                                                                                                | `false`     | -       |
| disabled      | `boolean`                         | Set whether is disabled                                                                                                                     | `false`     | -       |
| loop          | `boolean`                         | Whether to enable loop mode                                                                                                                 | `false`     | -       |
| arrow         | `'outside' \| 'inside' \| 'none'` | Set how the arrow is displayed                                                                                                              | `'outside'` | -       |
| arrow-trigger | `'hover' \| 'always'`             | The trigger mode of arrow display, optional values ​​are `hover`, `always`, only valid when the arrow type is `inside`                      | `'hover'`   | -       |
| autoplay      | `boolean \| number`               | Set the carousel to play automatically, the interval in milliseconds can be set when the value is passed in, the minimum valid value is 300 | `false`     | -       |
| pointer       | `'outside' \| 'inside' \| 'none'` | How to display the pointer, optional values ​​are `outside`, `inside`, `none`                                                               | `'none'`    | -       |
| speed         | `number`                          | The speed at which the element toggles the transition effect                                                                                | `300`       | -       |
| active-offset | `number`                          | The offset to mark the activation of the item, when it is 0, the first element of the default window is active                              | `0`         | -       |
| height        | `number \| string`                | In `vertical` mode, the height can be set                                                                                                   | `null`      | -       |
| ignore-hover  | `boolean`                         | Whether to ignore mouse enter when `autoplay` is enabled                                                                                    | `false`     | `2.0.3` |

### Carousel Events

| Name   | Description                                                                                                | Parameters         | Since |
| ------ | ---------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| change | Emitted when the active item changes, returns the index of the active element                              | `(active: number)` | -     |
| prev   | Emitted when the forward arrow is clicked to switch elements, returns the index of the active element      | `(active: number)` | -     |
| next   | Emitted when the back arrow or autoplay toggle element is clicked, returns the index of the active element | `(active: number)` | -     |
| select | Emitted when an element is clicked, returns the index of the clicked element                               | `(active: number)` | -     |

### Carousel Slots

| Name       | Description                                                                                                      | Parameters              | Since |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------- | ----- |
| default    | Content slot for carousel                                                                                        | -                       | -     |
| prev-arrow | The content slot of the forward scroll button, accepts a `disabled` parameter to identify whether it is disabled | `{ disabled: boolean }` | -     |
| next-arrow | The content slot of the back scroll button, accepts a `disabled` parameter to identify whether it is disabled    | `{ disabled: boolean }` | -     |
| pointer    | The content slot of the carousel marker, accepts an `active` parameter indicating whether it is active           | `{ active: boolean }`   | -     |

### CarouselItem Slots

| Name    | Description                                                                                              | Parameters            | Since |
| ------- | -------------------------------------------------------------------------------------------------------- | --------------------- | ----- |
| default | The content slot of the carousel element, accepts an `active` parameter to indicate whether it is active | `{ active: boolean }` | -     |
