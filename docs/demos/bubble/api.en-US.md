### Bubble Props

| Name          | Type              | Description                                           | Default |
| ------------- | ----------------- | ---------------------------------------------- | ------ |
| placement     | `Placement`            | 气泡框出现的位置，可选值同 Popper.js           | `'right'`  |
| background    | `string`            | 气泡的背景颜色                                 | `''`    |
| shadow        | `boolean \| string` | 气泡是否使用阴影，传入字符串时会作为阴影的颜色 | `false`  |
| content-class | `string \| Record<string, boolean>`  | 气泡内容的自定义类名                           | `null`   |

### Bubble Slots

| Name    | Description             | Parameters |
| ------- | ---------------- | --- |
| default | 气泡的内容的插槽 | - |
