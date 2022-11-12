### FullScreen Slots

| Name    | Description                                                                                                                       | Parameters | Since |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----- |
| default | you can get `enter`, `exit` and `toggle` methods, the usage of these please reference [`FullScreen Methods`](#fullscreen-methods) | -          | -     |

### FullScreen Methods

| Name   | Description                   | Signature                                                | Since |
| ------ | ----------------------------- | -------------------------------------------------------- | ----- |
| enter  | enter to the full screen mode | `(mode: 'window' \| 'browser', zIndex?: number) => void` | -     |
| exit   | exit the full screen mode     | `() => void`                                             | -     |
| toggle | toggle for the screen mode    | `(mode: 'window' \| 'browser') => void`                  | -     |
