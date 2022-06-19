### Tooltip Props

| Name            | Type              | Description                                                                                                      | Default     | Since |
| --------------- | ----------------- | --------------------------------------------------------------------------------------------------------- | ---------- | --- |
| visible         | `boolean`           | 气泡框的显示状态，可以使用 `v-model` 双向绑定                                                               | `false`      | - |
| trigger         | `'hover' \| 'click' \| 'custom'`            | 下拉菜单的触发方式，当为 `custom` 时，所有情景都需要手动控制 `visible` | `'hover'`    | - |
| placement       | `Placement`            | 气泡框出现的位置，可选值同 Popper.js                                                                      | `'top'`      | - |
| outside-close   | `boolean`           | 设置是否可以通过点击外部关闭                                                                              | `true`       | - |
| no-hover        | `boolean`           | 设置是否让气泡框变得无法捕捉                                                                              | `false`      | - |
| tip-class       | `string` \| Object  | 气泡框内容的自定义类名                                                                                      | `null`       | - |
| disabled        | `boolean`           | 设置是否禁用气泡框，禁用后将不显示任何内容                                                                | `false`      | - |
| theme           | `'light' \| 'dark'`            | 设置气泡的主题                                                               | `'light'`    | - |
| transfer        | `boolean \| string` | 设置气泡的渲染位置，设置为 `true` 时默认渲染至 `<body>`                                               | `false`      | - |
| transition-name | `string`            | 设置气泡的显示隐藏过渡效果                                                                                | `'vxp-fade'` | - |

### Tooltip Events

| Name             | Description                                                 | Parameters    | Since |
| ---------------- | ---------------------------------------------------- | ------- | --- |
| toggle        | 当气泡框的显示状态改变时触发，返回当前的状态         | `(visible: boolean)` | - |
| tip-enter | 当鼠标移入气泡框时触发，无返回值 | - | - |
| tip-leave | 当鼠标移出气泡框时触发，无返回值 | - | - |
| click-outside | 当点击了元素外部时触发，无返回值 | -       | - |
| outside-close | 当点击了元素外部进行了下拉菜单的关闭时触发，无返回值 | -       | - |

### Tooltip Slots

| Name    | Description                 | Parameters | Since |
| ------- | -------------------- | --- | --- |
| default | 触发气泡框内容的插槽 | - | - |
| tip     | 气泡框内容的插槽     | - | - |
