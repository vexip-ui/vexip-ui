### Toast 方法

组件实例内提供了 5 种基础的打开吐司提示的方法：

- `this.$toast.open(content[, duration] | options)`
- `this.$toast.info(content[, duration] | options)`
- `this.$toast.success(content[, duration] | options)`
- `this.$toast.warning(content[, duration] | options)`
- `this.$toast.error(content[, duration] | options)`

> 在使用组合式 api 时需要 `import { Toast } from 'vexip-ui'` 后使用 `Toast.open(...)`。

此外，还提供了手动关闭吐司的方法：

- `this.$toast.close()`

在打开吐司的方法调用后会返回一个函数，该函数也可以用于手动关闭提示：

```ts
const cancel = this.$toast.open(options)

// 立即关闭吐司
cancel()
```

需要修改组件的默认属性值时，可以这样做：

```ts
this.$toast.config(options)
```

有时需要创建多个吐司管理器以便于管理各类吐司提示：

```ts
// 这是一个全新的吐司组件
const topToast = this.$toast.clone()

topToast.config({ position: 'top' })
```

或者在引入组件时进行克隆：

```ts
import { createApp } from 'vue'
import { Toast } from 'vexip-ui'

const topToast = Toast.clone()

topToast.config({ position: 'top' })
createApp().use(topToast, { property: '$topToast' })
```

### Toast 选项

| 名称           | 类型                                             | 说明                         | 默认值       | 始于 |
| -------------- | ------------------------------------------------ | ---------------------------- | ------------ | ---- |
| type           | `'success' \| 'warning' \| 'error' \| 'loading'` | 吐司提示的类型               | `''`         | -    |
| content        | `string`                                         | 吐司提示的内容               | `''`         | -    |
| icon           | `Record<string, any> \| (() => any)`             | 吐司提示的图标               | `null`       | -    |
| iconProps      | `IconMinorProps`                                 | 吐司提示的图标属性           | `{}`         | -    |
| position       | `'top' \| 'center' \| 'bottom'`                  | 吐司提示的位置               | `'center'`   | -    |
| transitionName | `string`                                         | 吐司提示的过渡效果           | `'vxp-ease'` | -    |
| closable       | `boolean`                                        | 是否可以点击关闭吐司提示     | `false`      | -    |
| maskClose      | `boolean`                                        | 是否可以点击遮罩关闭吐司提示 | `false`      | -    |
| showMask       | `boolean`                                        | 是否有隐形遮罩               | `false`      | -    |
| maskClass      | `ClassType`                                      | 遮罩的自定义类名             | `null`       | -    |
| maskStyle      | `StyleType`                                      | 遮罩的自定义样式             | `null`       | -    |
| onClose        | `() => void`                                     | 吐司提示关闭时的回调方法     | `null`       | -    |
