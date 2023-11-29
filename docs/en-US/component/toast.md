# Toast

## Demos

:::demo toast/basis

### Basis Usage

Open a plain text toast reminder with the `open` method.

This method can receive a string or object, which will be used as the toast content when passing in the string, and the incoming object can control the toast properties in a finer-grained manner.

:::

:::demo toast/type

### Toast Types

The toast with preset type can be opened by calling different methods.

There are currently four built-in preset types in the component, which are opened by calling `success`, `warning`, `error` and `loading` respectively.

The `loading` method contains an invisible mask by default, which blocks the interaction of the page.

:::

:::demo toast/position

### Position

The position of the toast can be controlled by the `position` option, which are top, center and bottom.

:::

:::demo toast/close

### Closable

Set the `closable` option to `true` to make toast clickable to close.

Also, this example shows how to use the Toast component in a composition API.

:::

:::demo toast/duration

### Change Duration

The duration of the toast can be adjusted by setting the `duration` option.

When set to `0`, the toast will not be closed automatically, you need to set it closeable or manual control it to close.

:::

:::demo toast/mask

### Invisibility Mask

Set the `closable` option to `true` to make toast clickable to close.

Also, this example shows how to use the Toast component in a composition API.

:::

:::demo toast/icon

### Custom Icon

Set the `icon` option to set the front icon of the toast.

Set the `iconProps` option to set the props of the toast icon.

When you need more fine-grained control over the icon, the icon option can be set to function as a custom rendering method.

:::

:::demo toast/render

### Render Method

A custom rendering method for toast can be set via the `renderer` option.

Often it is better to use with `tsx`.

:::

## API

### Toast Methods

There are 5 basic methods to open the toast within a component instance:

- `Toast.open(content[, duration] | options)`
- `Toast.info(content[, duration] | options)`
- `Toast.success(content[, duration] | options)`
- `Toast.warning(content[, duration] | options)`
- `Toast.error(content[, duration] | options)`

> Use `Toast.open(...)` after `import { Toast } from 'vexip-ui'` when using composition api.

In addition, there is also a method to manually close the toast:

- `Toast.close()`

A function is returned after the method call to open the toast, which can also be used to manually close the toast:

```ts
const cancel = Toast.open(options)

// Immediately close the toast
cancel()
```

When you need to modify the default value of toast options, you can do this:

```ts
Toast.config(options)
```

Sometimes it is necessary to create multiple toast managers to manage various toast:

```ts
// This is a new toast manager
const topToast = Toast.clone()

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

In some cases, toast needs to be displayed on full-screen elements. The rendering position of the component can be moved by:

```ts
Toast.transferTo('#a-new-place')

// re-transfer to body
Toast.transferTo(document.body)
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
