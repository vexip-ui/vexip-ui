### Modal 属性

| 名称         | 类型                   | 说明                                                                                                                | 默认值 |
| ------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------- | ------ |
| active       | Boolean                | 设置模态框是否显示，可以使用 v-model 双向绑定                                                                       | false  |
| width        | Number                 | 设置模态框的初始宽度                                                                                                | 600    |
| height       | Number \| String       | 设置模态框的初始高度，为 'auto' 时自动计算，否则需传入数字类型                                                      | 'auto' |
| top          | Number \| String       | 设置模态框距离顶部的初始距离，为 auto 时自动居中，否则需传入数字类型                                                | 100    |
| left         | Number \| String       | 设置模态框距离左侧的初始距离，为 auto 时自动居中，否则需传入数字类型                                                | 'auto' |
| bottom       | Number \| String       | 设置模态框距离底部的初始距离，为 auto 时自动计算，否则需传入数字类型                                                | 'auto' |
| title        | String                 | 设置模态框的标题                                                                                                    | ''     |
| closable     | Boolean                | 设置是否具有关闭按钮                                                                                                | true   |
| mask-close   | Boolean                | 设置是否可以点击遮罩层关闭                                                                                          | true   |
| inner        | Boolean                | 设置是否为一个内联的抽屉，开启后定位从 fixed 变位 absolute                                                          | false  |
| modal-class  | String \| Object       | 模态框的自定义类名                                                                                                  | null   |
| no-footer    | 是否禁用底部的操作按钮 | false                                                                                                               |
| hide-mask    | Boolean                | 设置是否隐藏遮罩层                                                                                                  | false  |
| transfer     | Boolean \| String      | 设置模态框的渲染位置，开启但未指定有效选择器时默认渲染至 body                                                       | false  |
| before-close | Function               | 设置模态框的关闭前回调，接收一个标识区分是确认或是取消触发的关闭，支持异步函数和 Promise，返回值为 false 会阻止关闭 | null   |
| draggable    | Boolean                | 设置模态框是否可以拖拽                                                                                              | false  |
| resizable    | Boolean                | 设置模态框是否可以改变大小                                                                                          | false  |
| loading      | Boolean                | 设置模态框的确认按钮是否为加载状态                                                                                  | false  |
| min-width    | Number                 | 设置模态框的的最小宽度，主要用于设置了 `resizable`                                                                  | 150    |
| min-height   | Number                 | 设置模态框的的最小高度，主要用于设置了 `resizable`                                                                  | 120    |

### Modal 事件

| 名称            | 说明                                                   | 参数              |
| --------------- | ------------------------------------------------------ | ----------------- |
| on-toggle       | 当模态框的激活状态改变时触发，返回当前的激活状态       | active            |
| on-ok           | 当点击了底部的确定按钮时触发，无返回值                 | -                 |
| on-cancel       | 当点击了底部的取消按钮时触发，无返回值                 | -                 |
| on-close        | 当用关闭功能触发关闭时触发，无返回值                   | -                 |
| on-show         | 当抽屉打开后，过渡效果结束后触发，无返回值             | -                 |
| on-hide         | 当模态框关闭后，过渡效果结束，完全消失时触发，无返回值 | -                 |
| on-drag-start   | 当将要开始拖拽时触发，无返回值                         | -                 |
| on-drag-move    | 当正在拖拽时触发，返回一个包含位置信息的对象           | { top, left }     |
| on-drag-end     | 当结束拖拽时触发，无返回值                             | -                 |
| on-resize-start | 当抽屉将要开始调整大小时触发，无返回值                 | -                 |
| on-resize-move  | 当抽屉正在调整大小时触发，返回一个包含抽屉宽高的对象   | { width, height } |
| on-resize-end   | 当抽屉结束调整大小时触发，无返回值                     | -                 |

### Modal 插槽

| 名称    | 说明             |
| ------- | ---------------- |
| default | 模态框的内容插槽 |
| close   | 关闭按钮的插槽   |
| header  | 模态框的头部插槽 |
| footer  | 模态框的底部插槽 |
