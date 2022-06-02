### Form 属性

| 名称            | 类型    | 说明                                                                                                   | 默认值  | 始于 |
| --------------- | ------- | ------------------------------------------------------------------------------------------------------ | ------- | --- |
| method          | `'get' \| 'post' \| 'put' \| 'delete'`  | 设置原生 form 对象的 method 值，需要在设置了 action 后才生效 | `'post'`  | - |
| action          | `string`  | 设置原生 form 标签的 action 值                                                                         | `null`    | - |
| model           | `Record<string, any>`  | 表单的数据源                                                                                           | `{}`      | - |
| rules           | `Record<string, any>`  | 表单的验证规则                                                                                         | `{}`      | - |
| label-width     | `number`  | 表单标签的宽度                                                                                         | `80`      | - |
| lablel-position | `'right' \| 'top' \| 'left'`  | 表单标签的位置                                                      | `'right'` | - |
| all-required    | `boolean` | 设置表单内容是否全部必填                                                                               | `false`   | - |
| label-suffix    | `string`  | 表单标签的后置内容，比如 `:`                                                                           | `''`      | - |
| hide-asterisk   | `boolean` | 设置是否隐藏必填星号                                                                                   | `false`   | - |
| validate-all    | `boolean` | 设置表单验证时是否进行所有规则验证 (默认每个字段遇到错误就停止后续验证)                                | `false`   | - |
| hide-label      | `boolean` | 设置是否隐藏表单标签，常用在登陆表单                                                                   | `false`   | - |

### Form 方法

| 名称             | 说明                                                             | 签名            | 始于 |
| ---------------- | ---------------------------------------------------------------- | --------------- | --- |
| validate         | 对表单的所有字段进行验证         | `() => Promise<string[]>`        | - |
| validateFields   | 根据属性对表单指定的字段进行验证 | `(props: string \| string[]) => Promise<string[]>` | - |
| reset            | 对表单的所有字段进行重置                                         | `() => void`               | - |
| resetFields      | 根据属性对表单指定的字段进行重置                                 | `(props: string \| string[]) => void`           | - |
| clearError       | 清除表单的所有错误信息                                           | `() => void`               | - |
| clearFieldsError | 根据属性清除表单指定的字段的错误信息                             | `(props: string \| string[]) => void`           | - |

### Form 插槽

| 名称    | 说明           | 参数 | 始于 |
| ------- | -------------- | --- | --- |
| default | 表单内容的插槽 | - | - |

### FormItem 属性

| 名称           | 类型            | 说明                                                                 | 默认值 | 始于 |
| -------------- | --------------- | -------------------------------------------------------------------- | ------ | --- |
| label          | `string`          | 表单字段的标签                                                       | `''`     | - |
| prop           | `string`          | 表单字段的属性                                                       | `''`     | - |
| rules          | `Rule \| Rule[]` | 表单字段的验证规格                                                   | `[]`     | - |
| label-width    | `number`          | 表单字段标签的宽度                                                   | `null`   | - |
| required       | `boolean`         | 设置字段是否必填                                                     | `false`  | - |
| html-for       | `string`          | 原生 `<label>` 的 `for` 属性                                               | `null`   | - |
| default-value  | `unknown`             | 设置字段的默认值                                                     | `null`   | - |
| hide-error-tip | `boolean`         | 设置是否隐藏错误提示                                                 | `false`  | - |
| validate-all   | `boolean`         | 设置验证时是否进行所有规则验证，未设置时将继承 Form 组件的同名属性值 | `null`   | - |
| hide-asterisk  | `boolean`         | 设置是否隐藏必填星号，未设置时将继承 Form 组件的同名属性值           | `null`   | - |
| hide-label     | `boolean`         | 设置是否隐藏表单标签，未设置时将继承 Form 组件的同名属性值           | `null`   | - |
| action         | `boolean`         | 设置是否为纯操作 FormItem，若为是则样式变位内容居中并无下边距            | `false`  | - |
| error-transition | `string` | 错误提示的过渡效果名称 | `'vxp-fade'` | - |

`Rule` 相关的类型定义：

```ts
type Trigger = 'blur' | 'change'
type Types =
  | 'string'
  | 'number'
  | 'boolean'
  | 'int'
  | 'float'
  | 'array'
  | 'object'
  | 'date'
  | 'url'
  | 'color'
  | 'email'
type Range = [number, number]
type ValidatorReslut = boolean | string | Error | Promise<boolean | string | Error>
interface Rule<T = any> {
  trigger?: Trigger,
  required?: boolean,
  type?: Types,
  length?: number,
  range?: Range,
  strict?: boolean,
  enums?: T[],
  message?: string,
  validator?(value: T, model: Record<string, any>): ValidatorReslut
}
```

### FormItem 插槽

| 名称    | 说明               | 参数 | 始于 |
| ------- | ------------------ | --- | --- |
| default | 字段内容的插槽     | - | - |
| label   | 字段标签内容的插槽 | - | - |
| error   | 错误内容提示的插槽 | `(tip: string)` | - |

### FormSubmit 属性

> FormSubmit 组件为 Button 组件的再封装，支持 Button 组件的绝大部分属性，下方只列出 Submit 组件特有的属性。

| 名称          | 类型     | 说明                                                                  | 默认值    | 始于 |
| ------------- | -------- | --------------------------------------------------------------------- | --------- | --- |
| type          | `string`   | 同 Button 组件的 `type` 属性，但默认值不同                              | `'primary'` | - |
| label          | `string`   | 设置提交按钮的内容，使用插槽时将会失效                                | `locale.submit`      | - |
| on-before-submit | `() => unknown` | 设置表单提交前回调，支持异步函数和 Promise，返回值为 `false` 会阻止提交 | `null`      | - |

### FormSubmit 事件

| 名称      | 说明                                                                 | 参数   | 始于 |
| --------- | -------------------------------------------------------------------- | ------ | --- |
| submit | 即将发生提交跳转前的事件回调，无返回值，触发该事件则说明提交未被阻止 | -      | - |
| error  | 提交前，表单验证发生错误时触发，返回验证的错误信息                   | `(errors: string[])` | - |

### FormReset 属性

> FormReset 组件为 Button 组件的再封装，支持 Button 组件的绝大部分属性，下方只列出 Reset 组件特有的属性。

| 名称         | 类型     | 说明                                                                  | 默认值 | 始于 |
| ------------ | -------- | --------------------------------------------------------------------- | ------ | --- |
| text         | `string`   | 设置重置按钮的内容，使用插槽时将会失效                                | `locale.reset`   | - |
| on-before-reset | `() => unknown` | 设置表单提交前回调，支持异步函数和 Promise，返回值为 `false` 会阻止提交 | `null`   | - |

### FormReset 事件

| 名称     | 说明                                                                 | 参数 | 始于 |
| -------- | -------------------------------------------------------------------- | ---- | --- |
| reset | 即将发生提交重置前的事件回调，无返回值，触发该事件则说明重置未被阻止 | -    | - |
