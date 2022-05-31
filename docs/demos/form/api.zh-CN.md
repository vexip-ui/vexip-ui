### Form 属性

| 名称            | 类型    | 说明                                                                                                   | 默认值  |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------ | ------- |
| method          | String  | 设置原生 form 对象的 method 值， 可选值为 `get`、`post`、`put`、`delete`，需要在设置了 action 后才生效 | 'post'  |
| action          | String  | 设置原生 form 标签的 action 值                                                                         | null    |
| model           | Object  | 表单的数据源                                                                                           | {}      |
| rules           | Object  | 表单的验证规则                                                                                         | {}      |
| label-width     | Number  | 表单标签的宽度                                                                                         | 80      |
| lablel-position | String  | 表单标签的位置，可选值为 `top`、`right`、`left`                                                        | 'right' |
| all-required    | Boolean | 设置表单内容是否全部必填                                                                               | false   |
| label-suffix    | String  | 表单标签的后置内容，比如 `:`                                                                           | ''      |
| hide-asterisk   | Boolean | 设置是否隐藏必填星号                                                                                   | false   |
| validate-all    | Boolean | 设置表单验证时是否进行所有规则验证 (默认每个字段遇到错误就停止后续验证)                                | false   |
| hide-label      | Boolean | 设置是否隐藏表单标签，常用在登陆表单                                                                   | false   |

### Form 方法

| 名称             | 说明                                                             | 参数            |
| ---------------- | ---------------------------------------------------------------- | --------------- |
| validate         | 对表单的所有字段进行验证，可以传入回调函数或使用 Promise         | callback        |
| validateFields   | 根据属性对表单指定的字段进行验证，可以传入回调函数或使用 Promise | props, callback |
| reset            | 对表单的所有字段进行重置                                         | -               |
| resetFields      | 根据属性对表单指定的字段进行重置                                 | props           |
| clearError       | 清除表单的所有错误信息                                           | -               |
| clearFieldsError | 根据属性清除表单指定的字段的错误信息                             | props           |

### Form 插槽

| 名称    | 说明           |
| ------- | -------------- |
| default | 表单内容的插槽 |

### FormItem 属性

| 名称           | 类型            | 说明                                                                 | 默认值 |
| -------------- | --------------- | -------------------------------------------------------------------- | ------ |
| label          | String          | 表单字段的标签                                                       | ''     |
| prop           | String          | 表单字段的属性                                                       | ''     |
| rules          | Object \| Array | 表单字段的验证规格                                                   | []     |
| label-width    | Number          | 表单字段标签的宽度                                                   | null   |
| required       | Boolean         | 设置字段是否必填                                                     | false  |
| html-for       | String          | 原生 label 的 for 属性                                               | null   |
| default-value  | Any             | 设置字段的默认值                                                     | null   |
| hide-error-tip | Boolean         | 设置是否隐藏错误提示                                                 | false  |
| validate-all   | Boolean         | 设置验证时是否进行所有规则验证，未设置时将继承 Form 组件的同名属性值 | null   |
| hide-asterisk  | Boolean         | 设置是否隐藏必填星号，未设置时将继承 Form 组件的同名属性值           | null   |
| hide-label     | Boolean         | 设置是否隐藏表单标签，未设置时将继承 Form 组件的同名属性值           | null   |
| action         | Boolean         | 设置是否为纯操作 Item，若为是则样式变位内容居中并无下边距            | false  |

### FormItem 插槽

| 名称    | 说明               |
| ------- | ------------------ |
| default | 字段内容的插槽     |
| label   | 字段标签内容的插槽 |
| error   | 错误内容提示的插槽 |

### FormSubmit 属性

> FormSubmit 组件为 Button 组件的再封装，支持 Button 组件的绝大部分属性，下方只列出 Submit 组件特有的属性。

| 名称          | 类型     | 说明                                                                  | 默认值    |
| ------------- | -------- | --------------------------------------------------------------------- | --------- |
| type          | String   | 同 Button 组件的 type 属性，但默认值不同                              | 'primary' |
| text          | String   | 设置提交按钮的内容，使用插槽时将会失效                                | null      |
| on-before-submit | Function | 设置表单提交前回调，支持异步函数和 Promise，返回值为 false 会阻止提交 | null      |

### FormSubmit 事件

| 名称      | 说明                                                                 | 参数   |
| --------- | -------------------------------------------------------------------- | ------ |
| submit | 即将发生提交跳转前的事件回调，无返回值，触发该事件则说明提交未被阻止 | -      |
| error  | 提交前，表单验证发生错误时触发，返回验证的错误信息                   | errors |

### FormReset 属性

> FormReset 组件为 Button 组件的再封装，支持 Button 组件的绝大部分属性，下方只列出 Reset 组件特有的属性。

| 名称         | 类型     | 说明                                                                  | 默认值 |
| ------------ | -------- | --------------------------------------------------------------------- | ------ |
| text         | String   | 设置重置按钮的内容，使用插槽时将会失效                                | null   |
| on-before-reset | Function | 设置表单提交前回调，支持异步函数和 Promise，返回值为 false 会阻止提交 | null   |

### FormReset 事件

| 名称     | 说明                                                                 | 参数 |
| -------- | -------------------------------------------------------------------- | ---- |
| reset | 即将发生提交重置前的事件回调，无返回值，触发该事件则说明重置未被阻止 | -    |
