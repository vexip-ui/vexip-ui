# 表单 Form

用于需要收集、验证一些信息的时候，快速创建表单域。

:::warning
在 FormItem 组件下，我们约定最多只有一个顶层控件类组件（即 **表单** 组件分类下除 Form 以外的组件），在这个约定下 FormItem 会自动为其下的控件组件实现数据的双向绑定、状态同步等。
:::

在使用 `model` 属性初始化表单时，可直接传入一个空对象，组件内部会自动初始化字段默认值，不过类型仍需要你自己定义。

```vue
<template>
  <Form :model="model"></Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface Model {
  name: string
}

const model = reactive({} as Model)
</script>
```

## 代码示例

:::demo form/basis

### 基础用法

一个综合的表单示例。

:::

:::demo form/validate

### 自定义验证

设置 `rules` 属性的值可以自定义每个字段的校验规则。

也可以单独为一个 FormItem 组件单独设置 `rules` 属性来进行校验。

:::

:::demo form/manual

### 手动验证

通过 Form 组件实例的 `validate` 方法可以手动触发表单验证。

:::

:::demo form/label

### 标签对齐

通过 `label-align` 属性可以改变表单标签的位置。

:::

:::demo form/inline

### 行内表单

添加 `inline` 属性可以使表单变为行内布局。

:::

:::demo form/size

### 表单大小

通过 `size` 属性可以改变其下所有控件的大小，包括按钮。

:::

:::demo form/help-tip

### 帮助提示

通过 `help` 属性添加一些帮助信息，用以辅助表单的输入。

或者使用同名插槽进行定制化，如果这还不够的话你应该使用 `label` 插槽。

:::

:::demo form/disabled

### 禁用表单

添加 `disabled` 属性可以禁用其下所有控件，包括按钮。

:::

:::demo form/loading

### 表单加载中

添加 `loading` 属性可以使其下所有控件进入加载状态，包括按钮。

:::

:::demo form/dynamic

### 动态项

这个示例演示了如何动态地控制表单项的增减与删除。

:::

:::demo form/pure

### 纯净字段

由于约定了一个 FormItem 下最多只有一个控件组件，因为在多控件组合时你可能希望 FormItem 不要渲染额外的样式。

在添加 `prue` 属性后 FormItem 便会直接渲染默认插槽的内容。

:::

:::demo form/native

### 原生表单

设置 `action` 属性的值可以使用原生的表单提交。

:::

:::demo form/layout

### 表单布局

表单内置了行布局（一维栅格）的大部分功能，因此你可以像使用行布局组件那样使用它。

:::

## API

### 预设类型

```ts
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
type ValidatorResult = boolean | string | Error | Promise<boolean | string | Error>

interface Rule<T = any> {
  required?: boolean,
  type?: Types,
  length?: number,
  range?: Range,
  strict?: boolean,
  enums?: T[],
  message?: string,
  validator?(value: T, model: Record<string, any>): ValidatorResult
}
```

### Form 属性

| 名称          | 类型                                   | 说明                                                                    | 默认值      | 始于    |
| ------------- | -------------------------------------- | ----------------------------------------------------------------------- | ----------- | ------- |
| method        | `'get' \| 'post' \| 'put' \| 'delete'` | 设置原生 form 对象的 method 值，需要在设置了 action 后才生效            | `'post'`    | -       |
| action        | `string`                               | 设置原生 form 标签的 action 值                                          | `null`      | -       |
| model         | `Record<string, any>`                  | 表单的数据源                                                            | `{}`        | -       |
| rules         | `Record<string, any>`                  | 表单的验证规则                                                          | `{}`        | -       |
| label-width   | `number \| 'auto'`                     | 表单标签的宽度                                                          | `'auto'`    | -       |
| lablel-align  | `'right' \| 'top' \| 'left'`           | 表单标签的对齐位置                                                      | `'right'`   | -       |
| all-required  | `boolean`                              | 设置表单内容是否全部必填                                                | `false`     | -       |
| label-suffix  | `string`                               | 表单标签的后置内容，比如 `:`                                            | `''`        | -       |
| hide-asterisk | `boolean`                              | 设置是否隐藏必填星号                                                    | `false`     | -       |
| validate-all  | `boolean`                              | 设置表单验证时是否进行所有规则验证 (默认每个字段遇到错误就停止后续验证) | `false`     | -       |
| hide-label    | `boolean`                              | 设置是否隐藏表单标签，常用在登陆表单                                    | `false`     | -       |
| disabled      | `boolean`                              | 设置是否禁用表单下的所有控件                                            | `false`     | `2.0.0` |
| loading       | `boolean`                              | 设置表单下的所有控件是否为加载状态                                      | `false`     | `2.0.0` |
| size          | `'small' \| 'default' \| 'large'`      | 设置表单下的所有控件的大小                                              | `'default'` | `2.0.0` |
| inline        | `boolean`                              | 设置表单是否为行内布局                                                  | `false`     | `2.0.0` |
| gap           | `number \| number[]`                   | 栅格间隔，参考 Row 组件同名属性                                         | `[8, 0]`    | `2.0.0` |
| justify       | `RowGridJustify`                       | 水平排列方式，参考 Row 组件同名属性                                     | `'start'`   | `2.0.0` |
| align         | `RowGridAlign`                         | 垂直对齐方式，参考 Row 组件同名属性                                     | `'top'`     | `2.0.0` |

### Form 方法

| 名称             | 说明                                 | 签名                                               | 始于 |
| ---------------- | ------------------------------------ | -------------------------------------------------- | ---- |
| validate         | 对表单的所有字段进行验证             | `() => Promise<string[]>`                          | -    |
| validateFields   | 根据属性对表单指定的字段进行验证     | `(props: string \| string[]) => Promise<string[]>` | -    |
| reset            | 对表单的所有字段进行重置             | `() => void`                                       | -    |
| resetFields      | 根据属性对表单指定的字段进行重置     | `(props: string \| string[]) => void`              | -    |
| clearError       | 清除表单的所有错误信息               | `() => void`                                       | -    |
| clearFieldsError | 根据属性清除表单指定的字段的错误信息 | `(props: string \| string[]) => void`              | -    |

### Form 插槽

| 名称    | 说明           | 参数 | 始于 |
| ------- | -------------- | ---- | ---- |
| default | 表单内容的插槽 | -    | -    |

### FormItem 属性

| 名称             | 类型                   | 说明                                                                 | 默认值       | 始于    |
| ---------------- | ---------------------- | -------------------------------------------------------------------- | ------------ | ------- |
| label            | `string`               | 表单字段的标签                                                       | `''`         | -       |
| prop             | `string`               | 表单字段的属性                                                       | `''`         | -       |
| rules            | `Rule \| Rule[]`       | 表单字段的验证规格                                                   | `[]`         | -       |
| label-width      | `number`               | 表单字段标签的宽度                                                   | `null`       | -       |
| required         | `boolean`              | 设置字段是否必填                                                     | `false`      | -       |
| html-for         | `string`               | 原生 `<label>` 的 `for` 属性                                         | `null`       | -       |
| default-value    | `unknown`              | 设置字段的默认值                                                     | `null`       | -       |
| hide-error-tip   | `boolean`              | 设置是否隐藏错误提示                                                 | `false`      | -       |
| validate-all     | `boolean`              | 设置验证时是否进行所有规则验证，未设置时将继承 Form 组件的同名属性值 | `null`       | -       |
| hide-asterisk    | `boolean`              | 设置是否隐藏必填星号，未设置时将继承 Form 组件的同名属性值           | `null`       | -       |
| hide-label       | `boolean`              | 设置是否隐藏表单标签，未设置时将继承 Form 组件的同名属性值           | `null`       | -       |
| action           | `boolean`              | 设置是否为纯操作 FormItem，若为是则样式变位内容居中并无下边距        | `false`      | -       |
| error-transition | `string`               | 错误提示的过渡效果名称                                               | `'vxp-fade'` | -       |
| help             | `string`               | 设置字段的帮助信息                                                   | `''`         | `2.0.0` |
| locale           | `LocaleConfig['form']` | 设置多语言配置                                                       | `null`       | `2.1.0` |

> 支持的 Column 组件的属性包括：span、offset、push、pull、order、flex、xs、sm、md、lg、xl、xxl

### FormItem 插槽

| 名称    | 说明               | 参数            | 始于    |
| ------- | ------------------ | --------------- | ------- |
| default | 字段内容的插槽     | -               | -       |
| label   | 字段标签内容的插槽 | -               | -       |
| help    | 字段帮助信息的插槽 | -               | `2.0.0` |
| error   | 错误内容提示的插槽 | `(tip: string)` | -       |

### FormSubmit 属性

> FormSubmit 组件为 Button 组件的再封装，支持 Button 组件的绝大部分属性，下方只列出 Submit 组件特有的属性。

| 名称             | 类型                   | 说明                                                                    | 默认值          | 始于    |
| ---------------- | ---------------------- | ----------------------------------------------------------------------- | --------------- | ------- |
| type             | `string`               | 同 Button 组件的 `type` 属性，但默认值不同                              | `'primary'`     | -       |
| label            | `string`               | 设置提交按钮的内容，使用插槽时将会失效                                  | `locale.submit` | -       |
| on-before-submit | `() => unknown`        | 设置表单提交前回调，支持异步函数和 Promise，返回值为 `false` 会阻止提交 | `null`          | -       |
| locale           | `LocaleConfig['form']` | 设置多语言配置                                                          | `null`          | `2.1.0` |

### FormSubmit 事件

| 名称   | 说明                                                                 | 参数                 | 始于 |
| ------ | -------------------------------------------------------------------- | -------------------- | ---- |
| submit | 即将发生提交跳转前的事件回调，无返回值，触发该事件则说明提交未被阻止 | -                    | -    |
| error  | 提交前，表单验证发生错误时触发，返回验证的错误信息                   | `(errors: string[])` | -    |

### FormReset 属性

> FormReset 组件为 Button 组件的再封装，支持 Button 组件的绝大部分属性，下方只列出 Reset 组件特有的属性。

| 名称            | 类型                   | 说明                                                                    | 默认值         | 始于    |
| --------------- | ---------------------- | ----------------------------------------------------------------------- | -------------- | ------- |
| text            | `string`               | 设置重置按钮的内容，使用插槽时将会失效                                  | `locale.reset` | -       |
| on-before-reset | `() => unknown`        | 设置表单提交前回调，支持异步函数和 Promise，返回值为 `false` 会阻止提交 | `null`         | -       |
| locale          | `LocaleConfig['form']` | 设置多语言配置                                                          | `null`         | `2.1.0` |

### FormReset 事件

| 名称  | 说明                                                                 | 参数 | 始于 |
| ----- | -------------------------------------------------------------------- | ---- | ---- |
| reset | 即将发生提交重置前的事件回调，无返回值，触发该事件则说明重置未被阻止 | -    | -    |
