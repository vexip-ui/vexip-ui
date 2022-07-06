### Card Props

| Name          | Type   | Description                                                    | Default   | Since |
| ------------- | ------ | ------------------------------------------------------- | -------- | --- |
| title | `string` | The title of the card, invalid when using a slot | `''` | - |
| shadow | `'always' \| 'hover' \| 'never'` | Set the shadow mode of the card | `'always'` | - |
| content-style | `Record<string, any>` | Custom style for card content | `{}` | - |

### Card Slots

| Name    | Description               | Parameters | Since |
| ------- | ------------------ | --- | --- |
| default | Slot for card content | - | - |
| title | Slot for card title | - | - |
| extra | Slots for card expansions | - | - |
