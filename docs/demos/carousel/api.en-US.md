### Carousel Props

| Name          | Type                              | Description                                                                                                                                 | Default     | Since |
| ------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----- |
| active        | `number`                          | The currently active element, can use `v-model` two-way binding                                                                             | `0`         | -     |
| view-size     | `number`                          | The number of items that can fit in the viewport                                                                                            | `3`         | -     |
| vertical      | `boolean`                         | Set whether to enable vertical rotation mode                                                                                                | `false`     | -     |
| disabled      | `boolean`                         | Set whether is disabled                                                                                                                     | `false`     | -     |
| loop          | `boolean`                         | Whether to enable loop mode                                                                                                                 | `false`     | -     |
| arrow         | `'outside' \| 'inside' \| 'none'` | Set how the arrow is displayed                                                                                                              | `'outside'` | -     |
| arrow-trigger | `'hover' \| 'always'`             | The trigger mode of arrow display, optional values ​​are `hover`, `always`, only valid when the arrow type is `inside`                      | `'hover'`   | -     |
| autoplay      | `boolean \| number`               | Set the carousel to play automatically, the interval in milliseconds can be set when the value is passed in, the minimum valid value is 300 | `false`     | -     |
| pointer       | `'outside' \| 'inside' \| 'none'` | How to display the pointer, optional values ​​are `outside`, `inside`, `none`                                                               | `'none'`    | -     |
| speed         | `number`                          | The speed at which the element toggles the transition effect                                                                                | `300`       | -     |
| active-offset | `number`                          | The offset to mark the activation of the item, when it is 0, the first element of the default window is active                              | `0`         | -     |
| height        | `number` \| `string`              | In `vertical` mode, the height can be set                                                                                                   | `null`      | -     |

### Carousel Events

| Name   | Description                                                                                                | Parameters         | Since |
| ------ | ---------------------------------------------------------------------------------------------------------- | ------------------ | ----- |
| change | Emitter when the active item changes, returns the index of the active element                              | `(active: number)` | -     |
| prev   | Emitter when the forward arrow is clicked to switch elements, returns the index of the active element      | `(active: number)` | -     |
| next   | Emitter when the back arrow or autoplay toggle element is clicked, returns the index of the active element | `(active: number)` | -     |
| select | Emitter when an element is clicked, returns the index of the clicked element                               | `(active: number)` | -     |

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
