### Notice Methods

There are 5 basic methods of opening a notice within a component instance:

- `this.$notice.open(title[, content][, duration] | options)`
- `this.$notice.info(title[, content][, duration] | options)`
- `this.$notice.success(title[, content][, duration] | options)`
- `this.$notice.warning(title[, content][, duration] | options)`
- `this.$notice.error(title[, content][, duration] | options)`

And a composite method of opening the notice:

- `this.$notice.judge(state, successTitle | successOptions, errorTitle | errorOptions[, duration])`

> `Notice.open(...)` is required after `import { Message } from 'vexip-ui'` when using the composition api.

In addition, two methods to manually close the notice are provided:

- `this.$notice.close(key)`
- `this.$notice.clear()`

> When `this.$notice.close()` is called directly without passing a key, it has the same effect as `this.$notice.clear()`.

After the method call to open the message will return a function that can be used to manually close the message that was just opened:

```js
const cancel = this.$notice.open(options)

// close the notice immediately
cancel()
```

When you need to modify the default value of options, you can do this:

```js
// In addition to the option value, you can also modify placement to
// 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' to change
// the position of the message
this.$notice.config({ placement, ...options })
```

Sometimes it is necessary to create multiple notice managers to manage various types of messages:

```js
// This is a new notice manager
const myNotice = this.$notice.clone()

myNotice.config({ placement: 'bottom-right' })
```

Or clone when importing the component:

```js
import { createApp } from 'vue'
import { Notice } from 'vexip-ui'

const myNotice = Notice.clone()

myNotice.config({ placement: 'bottom-right' })
createApp().use(myNotice, { property: '$myNotice' })
```

### Notice Options

| Name       | Type                                          | Description                                                                                                | Default | Since    |
| ---------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------- | -------- |
| type       | `'info' \| 'success' \| 'warning' \| 'error'` | The type of notice                                                                                         | `''`    | -        |
| title      | `string`                                      | The title of the notice                                                                                    | `''`    | -        |
| content    | `string`                                      | The content of the notice                                                                                  | `''`    | -        |
| key        | `number \| string`                            | The unique index of the hint, if not set, the built-in index will be used                                  | `''`    | -        |
| className  | `string \| Record<string, boolean>`           | Custom class for the notice                                                                                | `null`  | -        |
| style      | `Record<string, any>`                         | Inline style for the notice                                                                                | `null`  | -        |
| duration   | `number`                                      | The duration of the notice in milliseconds, if set to less than 500, it will not automatically close       | `4000`  | -        |
| background | `boolean \| string`                           | Whether to display the background color, the color can be customized when a valid color value is passed in | `false` | -        |
| color      | `boolean \| string`                           | Whether to set the color of the font, you can customize the color when a valid color value is passed in    | `false` | -        |
| titleColor | `string`                                      | Set the color of the notice title font individually                                                        | `''`    | -        |
| closable   | `boolean`                                     | whether there is a close button to close                                                                   | `false` | -        |
| icon       | `Record<string, any> \| (() => any)`          | The prefix icon of the notice, rendered as the render function when passed to the function                 | `null`  | -        |
| iconColor  | `string`                                      | The color of the prefix icon, after setting it will override the default setting of `type`                 | `''`    | -        |
| renderer   | `() => any`                                   | Render custom content using Vue's render function                                                          | `null`  | -        |
| marker     | `boolean`                                     | Set whether to show side marker                                                                            | `false` | -        |
| parseHtml  | `boolean`                                     | Whether to parse title and content as html                                                                 | `false` | `2.0.14` |
