# Notice

It is often used to globally display some heavyweight interactive feedback information, such as specific error information when an operation fails.

## Demos

:::demo notice/basis

### Basis Usage

Open a text-only notice with the `open` method.

This method can receive a string or object, which will be used as the notice content when passed in. The passed object can control the notice attribute in a finer-grained manner. For specific optional attributes, please refer to the api description.

Depending on the presence or absence of the `title` and `content` options, the component will be rendered into three states: normal, title only, and content only.

:::

:::demo notice/type

### Notice Types

The notice with preset type can be opened by calling different methods.

There are currently four built-in preset types in the component, which are opened by calling `info`, `success`, `warning`, and `error` respectively.

:::

:::demo notice/style

### Preset Style

Set the `color` option to `true` to make the preset types notice has a colorful text.

Set the `background` option to `true` to make the preset type notice havs a background color.

When the preset color does not meet the requirements, you can pass in a valid color value to realize color customization.

To set the color of the title independently, set the `titleColor` option to a valid color value.

:::

:::demo notice/close

### Closable

Set the `closable` option to `true` to make notice can be manually closed.

:::

:::demo notice/duration

### Change Duration

The duration of the notice can be adjusted by setting the `duration` option.

When set to `0`, the notice will not be closed automatically, you need to set it closeable or manual control it to close.

:::

:::demo notice/icon

### Custom Icon

Set the `icon` option to set the prefix icon of the notice.

Set the `iconColor` option to set the color of the notice prefix icon.

When more fine-grained control over the icon is required, the `icon` option can be set to function as a custom rendering method.

:::

:::demo notice/render

### Render Method

A custom rendering method for notice can be set via the `renderer` option.

:::

:::demo notice/position

### Custom Placement

The `placement` option can be configured via the `config` method to change where the notice appears.

There are four optional positions, top-left, top-right, bottom-left and bottom-right.

:::

:::demo notice/live-on-enter

### Live on Enter

==!s|2.2.11==

Setting the `liveOnEnter` option to `true` prevents the notice automatically closing when it is hovered.

The auto-shutdown timer will restart after the hover is over.

:::

## API

### Notice Methods

There are some basic methods of opening a notice within a component instance:

- `Notice.open(title[, content][, duration] | options)`
- `Notice.primary(title[, content][, duration] | options)`
- `Notice.info(title[, content][, duration] | options)`
- `Notice.success(title[, content][, duration] | options)`
- `Notice.warning(title[, content][, duration] | options)`
- `Notice.error(title[, content][, duration] | options)`

And a composite method of opening the notice:

- `Notice.judge(state, successTitle | successOptions, errorTitle | errorOptions[, duration])`

> `Notice.open(...)` is required after `import { Message } from 'vexip-ui'` when using the composition api.

In addition, two methods to manually close the notice are provided:

- `Notice.close(key)`
- `Notice.clear()`

> When `Notice.close()` is called directly without passing a key, it has the same effect as `Notice.clear()`.

After the method call to open the message will return a function that can be used to manually close the message that was just opened:

```ts
const cancel = Notice.open(options)

// close the notice immediately
cancel()
```

When you need to modify the default value of options, you can do this:

```ts
// In addition to the option value, you can also modify placement to
// 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' to change
// the position of the message
Notice.config({ placement, ...options })
```

Sometimes it is necessary to create multiple notice managers to manage various types of messages:

```ts
// This is a new notice manager
const myNotice = Notice.clone()

myNotice.config({ placement: 'bottom-right' })
```

Or clone when importing the component:

```ts
import { createApp } from 'vue'
import { Notice } from 'vexip-ui'

const myNotice = Notice.clone()

myNotice.config({ placement: 'bottom-right' })
createApp().use(myNotice, { property: '$myNotice' })
```

In some cases, notices need to be displayed on full-screen elements. The rendering position of the component can be moved by:

```ts
Notice.transferTo('#a-new-place')

// re-transfer to body
Notice.transferTo(document.body)
```

### Preset Types

```ts
type NoticeType = 'primary' | 'info' | 'success' | 'warning' | 'error'
```

### Notice Options

| Name        | Type                                 | Description                                                                                                | Default | Since    |
| ----------- | ------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------- | -------- |
| type        | `NoticeType`                         | The type of notice                                                                                         | `null`  | -        |
| title       | `string`                             | The title of the notice                                                                                    | `''`    | -        |
| content     | `string`                             | The content of the notice                                                                                  | `''`    | -        |
| key         | `number \| string`                   | The unique index of the hint, if not set, the built-in index will be used                                  | `''`    | -        |
| className   | `ClassType`                          | Custom class for the notice                                                                                | `null`  | -        |
| style       | `StyleType`                          | Inline style for the notice                                                                                | `null`  | -        |
| duration    | `number`                             | The duration of the notice in milliseconds, if set to less than 500, it will not automatically close       | `4000`  | -        |
| background  | `boolean \| string`                  | Whether to display the background color, the color can be customized when a valid color value is passed in | `false` | -        |
| color       | `boolean \| string`                  | Whether to set the color of the font, you can customize the color when a valid color value is passed in    | `false` | -        |
| titleColor  | `string`                             | Set the color of the notice title font individually                                                        | `''`    | -        |
| closable    | `boolean`                            | whether there is a close button to close                                                                   | `false` | -        |
| icon        | `Record<string, any> \| (() => any)` | The prefix icon of the notice, rendered as the render function when passed to the function                 | `null`  | -        |
| iconColor   | `string`                             | The color of the prefix icon, after setting it will override the default setting of `type`                 | `''`    | -        |
| renderer    | `() => any`                          | Render custom content using Vue's render function                                                          | `null`  | -        |
| marker      | `boolean`                            | Set whether to show side marker                                                                            | `false` | -        |
| parseHtml   | `boolean`                            | Whether to parse title and content as html                                                                 | `false` | `2.0.14` |
| liveOnEnter | `boolean`                            | Make the notice not automatically closed when it is hovered                                                | `false` | `2.2.11` |
