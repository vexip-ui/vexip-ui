# Affix

Fixes a page element to a specific visible area.

## Demos

:::demo affix/basis

### Basis Usage

Holds the element at the top of the page.

:::

:::demo affix/target

### Target Container

Fixes the element inside the specified container by the `target` prop, and hides it if it goes beyond the container.

:::

:::demo affix/position

### Fixed Position

Change the fixed position of an element with the `position` prop.

:::

### Affix Props

| Name       | Type              | Description                     | Default | Since |
| ---------- | ----------------- | ------------------------------- | ------- | ----- |
| `offset`   | number            | offset position                 | `0`     | -     |
| `position` | 'bottom' \| 'top' | position of affix               | `top`   | -     |
| `target`   | string            | target container (CSS selector) | `''`    | -     |
| `z-index`  | number            | z-index of affix                | `100`   | -     |

### Affix Events

| Name      | Description                       | Parameters                                         | Since |
| --------- | --------------------------------- | -------------------------------------------------- | ----- |
| `changed` | triggers when fixed state changed | `(fixed: boolean)`                                 | -     |
| `scroll`  | triggers when scrolling           | `(payload: { scrollTop: number, fixed: boolean })` | -     |

### Affix Slots

| Name      | Description     | Parameters | Since |
| --------- | --------------- | ---------- | ----- |
| `default` | default content | -          | -     |

### Affix Methods

| Name     | Description        | Parameters   | Since |
| -------- | ------------------ | ------------ | ----- |
| `update` | update affix state | `() => void` | -     |
