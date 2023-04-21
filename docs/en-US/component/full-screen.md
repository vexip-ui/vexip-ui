# FullScreen

This component will help you quickly display some content in full screen.

## Demos

:::demo fullscreen/basis

### Basis Usage

You can get `exit`, `enter` and `toggle` methods via `v-slot` to control the content you want in full screen.

:::

:::demo fullscreen/ref

### Ref Usage

You can also get component instance via `ref` and trigger `exit`, `enter` and `toggle` method through it.

:::

:::demo fullscreen/tooltip

### Basis Usage

If you want to use components with `transfer` prop like Tooltip, Modal, etc., you need to make sure that the target of `transfer` prop is inside the FullScreen component.

:::

## API

### FullScreen Slots

| Name    | Description                                                                                                                     | Parameters          | Since |
| ------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ----- |
| default | You can get `enter`, `exit` and `toggle` methods, the usage of these please reference [FullScreen Methods](#fullscreen-methods) | `{ full: boolean }` | -     |

### FullScreen Methods

| Name   | Description                   | Signature                                                 | Since |
| ------ | ----------------------------- | --------------------------------------------------------- | ----- |
| enter  | Enter to the full screen mode | `(mode?: 'window' \| 'browser', zIndex?: number) => void` | -     |
| exit   | Exit the full screen mode     | `() => void`                                              | -     |
| toggle | Toggle for the screen mode    | `(mode?: 'window' \| 'browser') => void`                  | -     |
