## API

### 属性

| 属性        | 类型             | 说明                                                   | 默认值    |
| ----------- | ---------------- | ------------------------------------------------------ | --------- |
| checked     | Boolean          | 复选框的勾选状态，可以使用 v-model 双向绑定            | false     |
| label       | String           | 复选框的标签值，使用插槽后失效                         | null      |
| value       | String \| Number | 复选框关联的值，一般配合 group 使用，在 group 内应唯一 | null      |
| label-class | String \| Object | 标签元素的类名                                         | null      |
| size        | Boolean          | 复选框的大小，可选值为 `small`、`default`、`large`     | 'default' |
| disabled    | Boolean          | 是否为禁用状态                                         | false     |
| border      | Boolean          | 是否设置外边框                                         | false     |
| control     | Boolean          | 设置为控制性质，一般配合 group 使用                    | false     |
| partial     | Boolean          | 是否为部分选择状态，control 为 `true` 时有效           | false     |

### 事件

| 事件      | 说明                                     | 参数    |
| --------- | ---------------------------------------- | ------- |
| on-change | 在复选框勾选状态改变时触发，返回勾选状态 | checked |

### Group 属性

| 属性     | 类型    | 说明                                                                                | 默认值    |
| -------- | ------- | ----------------------------------------------------------------------------------- | --------- |
| value    | Array   | 复选框组被选中的 label 值组成的数组，可以使用 v-model 双向绑定                      | []        |
| vertical | Boolean | 是否为纵向排列                                                                      | false     |
| size     | String  | 组内复选框的大小，可选值为 `small`、`default`、`large`，会覆盖复选框单独设置的 size | 'default' |
| state    | String  | 复选框组的状态，可选值为 `default`、`success`、`error`、`warning`                   | 'default' |
| disabled | Boolean | 组内复选框是否为禁用状态，会覆盖复选框单独设置的 disabled                           | false     |
| border   | Boolean | 组内复选框是否设置外边框                                                            | false     |
| options  | Array   | 设置选子复选框的选项，一般用于简单快速生成复选框组，使用插槽后失效                  | []        |

### Group 事件

| 事件      | 说明                                                      | 参数  |
| --------- | --------------------------------------------------------- | ----- |
| on-change | 在复选框勾选状态改变时触发，返回勾选的复选框的 label 数组 | value |
