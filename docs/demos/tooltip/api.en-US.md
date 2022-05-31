### Tooltip 属性

| 名称            | 类型              | 说明                                                                                                      | 默认值     |
| --------------- | ----------------- | --------------------------------------------------------------------------------------------------------- | ---------- |
| visible         | Boolean           | 气泡框的显示状态，可以使用 v-model 双向绑定                                                               | false      |
| trigger         | String            | 下拉菜单的触发方式，可选值为 `hover`、`click`、`csutom`，当为 `custom` 时，所有情景都需要手动控制 visible | 'hover'    |
| placement       | String            | 气泡框出现的位置，可选值同 Popper.js                                                                      | 'top'      |
| outside-close   | Boolean           | 设置是否可以通过点击外部关闭                                                                              | true       |
| no-hover        | Boolean           | 设置是否让气泡框变得无法捕捉                                                                              | false      |
| tip-class       | String \| Object  | tip 内容的自定义类名                                                                                      | null       |
| disabled        | Boolean           | 设置是否禁用气泡框，禁用后将不显示任何内容                                                                | false      |
| theme           | String            | 设置气泡的主题，可选值为 `light`、`dark`                                                                  | 'light'    |
| transfer        | Boolean \| String | 设置气泡的渲染位置，开启但未指定有效选择器时默认渲染至 body                                               | false      |
| transition-name | String            | 设置气泡的显示隐藏过渡效果                                                                                | 'vxp-fade' |

### Tooltip 事件

| 名称             | 说明                                                 | 参数    |
| ---------------- | ---------------------------------------------------- | ------- |
| toggle        | 当气泡框的显示状态改变时触发，返回当前的状态         | visible |
| outside-close | 当点击了元素外部进行了下拉菜单的关闭时触发，无返回值 | -       |

### Tooltip 插槽

| 名称    | 说明                 |
| ------- | -------------------- |
| default | 触发气泡框内容的插槽 |
| tip     | 气泡框内容的插槽     |
