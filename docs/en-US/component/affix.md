# Affix

Used to fix a element to a specific area.

## Demos

:::demo affix/basis alive

### Basis Usage

Holds the element at the top of the page.

:::

:::demo affix/target alive

### Specify Container

You can fix the element inside the specified container by `target` prop, and it will be hidden if it goes beyond the container.

:::

:::demo affix/position alive

### Fixed Position

Change the fixed position of the element by setting the `position` prop.

:::

### Affix Props

| Name       | Type                | Description                                                                                                                                                                  | Default | Since |
| ---------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| `offset`   | `number`            | Set the offset when fixed                                                                                                                                                    | `0`     | -     |
| `position` | `'bottom' \| 'top'` | Set the fixed position                                                                                                                                                       | `top`   | -     |
| `target`   | `unknown`           | Specifies the container, when passed in a string, it will try to select an element as a selector, and when passed in a function, the return value will be used as an element | `null`  | -     |
| `z-index`  | `number`            | set the z-index of a fixed element                                                                                                                                           | `100`   | -     |

### Affix Events

| Name     | Description                      | Parameters                                         | Since |
| -------- | -------------------------------- | -------------------------------------------------- | ----- |
| `change` | Emitted when fixed state changed | `(fixed: boolean)`                                 | -     |
| `scroll` | Emitted when scrolling           | `(payload: { scrollTop: number, fixed: boolean })` | -     |

### Affix Slots

| Name      | Description                    | Parameters | Since |
| --------- | ------------------------------ | ---------- | ----- |
| `default` | Content that needs to be fixed | -          | -     |

### Affix Methods

| Name     | Description                  | Parameters   | Since |
| -------- | ---------------------------- | ------------ | ----- |
| `update` | Manually update Affix status | `() => void` | -     |
