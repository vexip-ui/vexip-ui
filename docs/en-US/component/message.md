# Message

It is often used to globally display some lightweight interactive feedback information, such as operation success or failure, etc.

## Demos

:::demo message/basis

### Basis Usage

Open a plain text message reminder with the `open` method.

This method can receive a string or object, which will be used as the message content when passing in the string, and the incoming object can control the message properties in a finer-grained manner.

:::

:::demo message/type

### Message Types

The messages with preset type can be opened by calling different methods.

There are currently four built-in preset types in the component, which are opened by calling `info`, `success`, `warning`, and `error` respectively.

:::

:::demo message/style

### Preset Style

Set the `color` option to `true` to make the preset type message has a colorful text.

Set the `background` option to `true` to make the preset type message has a background color.

When the preset color does not meet the requirements, you can pass in a valid color value to realize color customization.

:::

:::demo message/close

### Closable

Set the `closable` option to `true` to make open messages manually closed.

Also, this example shows how to use the Message component in a composition API.

:::

:::demo message/duration

### Change Duration

The duration of the message can be adjusted by setting the `duration` option.

When set to `0`, the message will not be closed automatically, you need to set it closeable or manual control it to close.

:::

:::demo message/icon

### Custom Icon

Set the `icon` option to set the prefix icon of the message.

Set the `iconColor` option to set the color of the message prefix icon.

When you need more fine-grained control over the icon, the `icon` option can be set to function as a custom rendering method.

:::

:::demo message/render

### Render Method

A custom rendering method for message can be set via the `renderer` option.

Often it is better to use with `tsx`.

:::

:::demo message/live-on-enter

### Live on Enter

^[Since v2.2.11](!s)

Setting the `liveOnEnter` option to `true` prevents the message automatically closing when it is hovered.

The auto-shutdown timer will restart after the hover is over.

:::

## API

### Message Methods

There are 5 basic methods of opening a message within a component instance:

- `this.$message.open(content[, duration] | options)`
- `this.$message.info(content[, duration] | options)`
- `this.$message.success(content[, duration] | options)`
- `this.$message.warning(content[, duration] | options)`
- `this.$message.error(content[, duration] | options)`

And a composite method of opening the message:

- `this.$message.judge(state, successContent | successOptions, errorContent | errorOptions[, duration])`

> `Message.open(...)` is required after `import { Message } from 'vexip-ui'` when using the composition api.

In addition, two methods to manually close the message are provided:

- `this.$message.close(key)`
- `this.$message.clear()`

> When `this.$message.close()` is called directly without passing a key, it has the same effect as `this.$message.clear()`.

After the method call to open the message will return a function that can be used to manually close the message that was just opened:

```js
const cancel = this.$message.open(options)

// close the message immediately
cancel()
```

When you need to modify the default value of options, you can do this:

```js
// In addition to the option value, you can also modify placement
// to 'top' | 'bottom' to change the position of the message
this.$message.config({ placement, ...options })
```

Sometimes it is necessary to create multiple message managers to manage various types of messages:

```js
// This is a new message manager
const myMessage = this.$message.clone()

myMessage.config({ placement: 'bottom' })
```

Or clone when importing the component:

```js
import { createApp } from 'vue'
import { Message } from 'vexip-ui'

const myMessage = Message.clone()

myMessage.config({ placement: 'bottom' })
createApp().use(myMessage, { property: '$myMessage' })
```

### Message Options

| Name        | Type                                          | Description                                                                                                | Default | Since    |
| ----------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------- | -------- |
| type        | `'info' \| 'success' \| 'warning' \| 'error'` | The type of message                                                                                        | `''`    | -        |
| content     | `string`                                      | The content of the message                                                                                 | `''`    | -        |
| key         | `number \| string`                            | The unique index of the message, if not set, the built-in index will be used                               | `''`    | -        |
| className   | `string \| Record<string, unknown>`           | Custom class for the message                                                                               | `null`  | -        |
| style       | `Record<string, any>`                         | Inline style for the message                                                                               | `null`  | -        |
| duration    | `number`                                      | Message duration in milliseconds, set to less than `500` to not close automatically                        | `3000`  | -        |
| background  | `boolean \| string`                           | Whether to display the background color, the color can be customized when a valid color value is passed in | `false` | -        |
| color       | `boolean \| string`                           | Whether to set the color of the font, you can customize the color when a valid color value is passed in    | `false` | -        |
| closable    | `boolean`                                     | Whether there is a close button to close                                                                   | `false` | -        |
| icon        | `Record<string, any> \| (() => any)`          | The prefix icon of message, rendered as render function when passed in function                            | `null`  | -        |
| iconColor   | `string`                                      | The color of the prefix icon, after setting it will override the default setting of `type`                 | `''`    | -        |
| renderer    | `() => any`                                   | Render custom content using Vue's render function                                                          | `null`  | -        |
| parseHtml   | `boolean`                                     | Whether to parse content as html                                                                           | `false` | `2.0.14` |
| liveOnEnter | `boolean`                                     | Make the message not automatically closed when it is hovered                                               | `false` | `2.2.11` |
