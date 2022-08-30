### Bubble Props

| Name          | Type                                | Description                                                                                       | Default   | Since |
| ------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------- | --------- | ----- |
| placement     | `Placement`                         | The position of the bubble box, the optional value is the same as Popper.js                       | `'right'` | -     |
| background    | `string`                            | The background color of the bubble                                                                | `''`      | -     |
| shadow        | `boolean \| string`                 | Whether the bubble uses shadow, when passed in string, it will be used as the color of the shadow | `false`   | -     |
| content-class | `string \| Record<string, boolean>` | Custom class name for bubble content                                                              | `null`    | -     |

### Bubble Slots

| Name    | Description                        | Parameters | Since |
| ------- | ---------------------------------- | ---------- | ----- |
| default | Slot for the content of the bubble | -          | -     |
