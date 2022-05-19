## API

### 选项

| 属性          | 类型                         | 说明                                                                                   | 默认值    |
| ------------- | ---------------------------- | -------------------------------------------------------------------------------------- | --------- |
| content       | String                       | 确认框的提示内容                                                                       | ''        |
| style         | Object                       | 确认框的内联样式                                                                       | null      |
| parseHtml     | Boolean                      | 是否解析 html，开启则将 content 内容作为 html 解析                                     | false     |
| confirmType   | String                       | 确认按钮的类型，可选值为 `primary`、`success`、`warning`、`error`                      | 'primary' |
| confirmText   | String                       | 确认按钮的内容                                                                         | '确认'    |
| cancelText    | String                       | 取消按钮的内容                                                                         | '取消'    |
| icon          | String \| Object \| Function | 确认框的图标，传入对象时每个属性会对应 Icon 组件的属性，传入函数时使用 render 函数渲染 | -         |
| iconColor     | String                       | 确认框的图标的颜色                                                                     | -         |
| beforeConfirm | Function                     | 设置确认框的确认前回调，支持异步函数和 Promise，返回值为 false 会阻止关闭              | null      |
| renderer      | Function                     | 使用 Vue 的 render 函数渲染自定义内容                                                  | null      |
