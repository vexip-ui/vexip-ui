### FullScreen Slots

| Name    | Description                                                                                                                       | Parameters | Since |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----- |
| default | You can get `enter`, `exit` and `toggle` methods, the usage of these please reference [`FullScreen Methods`](#fullscreen-methods) | -          | -     |

### FullScreen Methods

| Name   | Description                   | Signature                                                 | Since |
| ------ | ----------------------------- | --------------------------------------------------------- | ----- |
| enter  | Enter to the full screen mode | `(mode?: 'window' \| 'browser', zIndex?: number) => void` | -     |
| exit   | Exit the full screen mode     | `() => void`                                              | -     |
| toggle | Toggle for the screen mode    | `(mode?: 'window' \| 'browser') => void`                  | -     |
