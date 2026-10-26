# FullScreen ==!s|2.1.0==

This component will help you quickly display some content in full screen.

## Demos

:::demo full-screen/basis

### Basis Usage

You can get `exit`, `enter` and `toggle` methods via `v-slot` to control the content you want in full screen.

:::

:::demo full-screen/ref

### Ref Usage

You can also get component instance via `ref` and trigger `exit`, `enter` and `toggle` method through it.

:::

:::demo full-screen/tooltip

### Full Screen Popper

If you want to use components with `transfer` prop like Tooltip, Modal, etc., you need to make sure that the target of `transfer` prop is inside the FullScreen component.

:::

## API

### Preset Types

```ts
interface FullScreenSlotParams {
  full: false | FullScreenType,
  placeId: string,
  enter: (type?: FullScreenType, zIndex?: number) => Promise<void>,
  exit: () => Promise<void>,
  toggle: (type?: FullScreenType, zIndex?: number) => Promise<void>
}
```

### FullScreen 属性

| Name | Type     | Description       | Default | Since   |
| ---- | -------- | ----------------- | ------- | ------- |
| tag  | `string` | Set rendering tag | `'div'` | `2.2.9` |

### FullScreen Slots

| Name    | Description                                      | Parameters             | Since |
| ------- | ------------------------------------------------ | ---------------------- | ----- |
| default | Slot for content needs to be show in full screen | `FullScreenSlotParams` | -     |

### FullScreen Methods

| Name   | Description                   | Signature                                                   | Since |
| ------ | ----------------------------- | ----------------------------------------------------------- | ----- |
| enter  | Enter to the full screen mode | `(type?: FullScreenType, zIndex?: number) => Promise<void>` | -     |
| exit   | Exit the full screen mode     | `() => Promise<void>`                                       | -     |
| toggle | Toggle for the screen mode    | `(type?: FullScreenType, zIndex?: number) => Promise<void>` | -     |
