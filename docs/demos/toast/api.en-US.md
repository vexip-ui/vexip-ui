### Toast Methods

There are 5 basic methods to open the toast within a component instance:

- `this.$toast.open(content[, duration] | options)`
- `this.$toast.info(content[, duration] | options)`
- `this.$toast.success(content[, duration] | options)`
- `this.$toast.warning(content[, duration] | options)`
- `this.$toast.error(content[, duration] | options)`

> Use `Toast.open(...)` after `import { Toast } from 'vexip-ui'` when using composition api.

In addition, there is also a method to manually close the toast:

- `this.$toast.close()`

A function is returned after the method call to open the toast, which can also be used to manually close the toast:

```ts
const cancel = this.$toast.open(options)

// Immediately close the toast
cancel()
```

When you need to modify the default value of toast options, you can do this:

```ts
this.$toast.config(options)
```

Sometimes it is necessary to create multiple toast managers to manage various toast:

```ts
// This is a new toast manager
const topToast = this.$toast.clone()

topToast.config({ position: 'top' })
```

Or clone when importing the component:

```ts
import { createApp } from 'vue'
import { Toast } from 'vexip-ui'

const topToast = Toast.clone()

topToast.config({ position: 'top' })
createApp().use(topToast, { property: '$topToast' })
```

### Toast Options

| Name           | Type                                             | Description                                                             | Default      | Since    |
| -------------- | ------------------------------------------------ | ----------------------------------------------------------------------- | ------------ | -------- |
| type           | `'success' \| 'warning' \| 'error' \| 'loading'` | type of toast                                                           | `''`         | -        |
| content        | `string`                                         | The content of the toast                                                | `''`         | -        |
| icon           | `Record<string, any> \| (() => any)`             | Icon for the toast                                                      | `null`       | -        |
| iconProps      | `IconMinorProps`                                 | Icon props for toast icon                                               | `{}`         | -        |
| position       | `'top' \| 'center' \| 'bottom'`                  | Position of toast                                                       | `'center'`   | -        |
| transitionName | `string`                                         | Transition name of toast                                                | `'vxp-ease'` | -        |
| closable       | `boolean`                                        | Whether to enable click to close the toast                              | `false`      | -        |
| maskClose      | `boolean`                                        | Whether to enable click the mask to close the toast                     | `false`      | -        |
| showMask       | `boolean`                                        | Whether there has an invisible mask                                     | `false`      | -        |
| maskClass      | `ClassType`                                      | Custom classes of the mask                                              | `null`       | -        |
| maskStyle      | `StyleType`                                      | Custom styles for the mask                                              | `null`       | -        |
| parseHtml      | `boolean`                                        | Whether to parse html, if enabled, the `content` will be parsed as html | `false`      | `2.0.14` |
| onClose        | `() => void`                                     | The callback method when the toast is closed                            | `null`       | -        |
