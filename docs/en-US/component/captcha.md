# Captcha ^[Since v2.3.0](!s)

In some cases, it's necessary to prevent script and robot behaviors as much as possible, and captcha will be used.

## Demos

:::demo captcha/basis

### Basis Usage

Simplest usage.

Validation can be reset by calling the `reset` method of the component instance.

:::

:::demo captcha/remote

### Remote Captcha

It is unreliable to verify in front-end, so usually we will send the result to the remote to captcha.

We can use the `on-before-test` prop to send to the front-end result to remote, and use the remote returns as result.

:::

:::demo captcha/refresh

### Refresh Image

By listening to the `refresh` event, we can change the image from the remote when the user clicks the refresh button.

:::

:::demo captcha/point

### Pointe Type

Set the `type` prop to `'point'` to use a captcha that to point specific elements on image.

When using this type, you need to specify the letters that need to be pointed sequentially via the `texts` prop.

When remote is not used, the component will internally randomly distribute the letters in the image based on the `texts` prop.

:::

:::demo captcha/remote-point

### Remote Point Type

Similarly, if you want more reliable captcha, you need to use the power of the server.

When using point type captcha, you need to add the `remote-point` prop to enable remote mode.

At the same time, you need to specify the `on-before-test` prop and complete the remote captcha logic.

:::

:::demo captcha/trigger

### Use Trigger

Add the `use-trigger` prop to trigger captcha using a trigger.

The size of the trigger can be specified via the `trigger-size` prop, or a custom trigger can be customized using the `trigger` slot.

:::

:::demo captcha/slider

### Slider Captcha

In some cases only simple verification is required, the CaptchaSlider component can be used alone.

:::

## API

### Preset Types

```ts
type CaptchaType = 'slide' | 'point'

type CaptchaBeforeTest =
  | ((percent: number, matched: boolean) => unknown)
  | ((positions: number[]) => unknown)
```

### Captcha Props

| Name           | Type                              | Description                                                                                                                              | Default       | Since |
| -------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----- |
| type           | `CaptchaType`                     | Set the interaction type of captcha                                                                                                      | `'slide'`     | -     |
| slide-target   | `number \| number[]`              | Set the slide target position, the second item is the vertical position when passing in the array                                        | `null`        | -     |
| title          | `string`                          | Set the title of captcha                                                                                                                 | `null`        | -     |
| tip            | `string`                          | Set the tip of captcha                                                                                                                   | `null`        | -     |
| success-tip    | `string`                          | Set the tip when the captcha is successful                                                                                               | `null`        | -     |
| image          | `string`                          | Set an image for captcha                                                                                                                 | `null`        | -     |
| tolerance      | `number`                          | Set the error tolerance allowed for the captcha target position                                                                          | `null`        | -     |
| canvas-size    | `number[]`                        | Set canvas size                                                                                                                          | `[1000, 600]` | -     |
| refresh-icon   | `VueComponent`                    | Set refresh icon                                                                                                                         | `null`        | -     |
| disabled       | `boolean`                         | Set whether to disable the captcha                                                                                                       | `false`       | -     |
| loading        | `boolean`                         | Set whether the captcha is loading                                                                                                       | `false`       | -     |
| loading-icon   | `VueComponent`                    | Set loading icon                                                                                                                         | `null`        | -     |
| loading-effect | `string`                          | Set the effect animation for the loading icon                                                                                            | `null`        | -     |
| on-before-test | `CaptchaBeforeTest`               | Set the callback before test, support async function and Promise, when returning a boolean value, it will be directly used as the result | `null`        | -     |
| texts          | `string[]`                        | Set the letters to be pointed in sequence                                                                                                | `[]`          | -     |
| fail-limit     | `number`                          | Set the limit count of captcha failures, which needs to be refreshed after reaching or exceeding                                         | `0`           | -     |
| remote-point   | `boolean`                         | Whether to use remote point captcha                                                                                                      | `false`       | -     |
| use-trigger    | `boolean`                         | Whether to use trigger                                                                                                                   | `false`       | -     |
| trigger-size   | `'small' \| 'default' \| 'large'` | Set the size of the trigger                                                                                                              | `'default'`   | -     |
| trigger-text   | `string`                          | Set the content in the trigger                                                                                                           | `null`        | -     |
| transfer       | `boolean \| string`               | Set the rendering place of panel. When set to `true`, it will render to `<body>` by default                                              | `false`       | -     |
| hide-delay     | `number`                          | When using trigger, set the number of milliseconds to delay hiding the panel after successful captcha                                    | `3000`        | -     |

### Captcha Events

| Name       | Description                                | Parameters          | Since |
| ---------- | ------------------------------------------ | ------------------- | ----- |
| success    | Emitted when captcha succeeds              | `(percent: number)` | -     |
| fail       | Emitted when captcha fails                 | -                   | -     |
| drag-start | Emitted when sliding started               | `(percent: number)` | -     |
| drag       | Emitted when sliding                       | `(percent: number)` | -     |
| drag-end   | Emitted when sliding ended                 | `(percent: number)` | -     |
| refresh    | Emitted when the refresh button is clicked | -                   | -     |

### Captcha Slots

| Name         | Description                                                                                          | Parameters                               | Since |
| ------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----- |
| title        | Slot for captcha title content                                                                       | `{ success: boolean }`                   | -     |
| refresh      | Slot for the refresh button of captcha                                                               | -                                        | -     |
| tip          | Slot for the tip in the captcha slider                                                               | `{ success: boolean }`                   | -     |
| texts        | Slot of the letters need to point in sequence, you still need to pass the `texts` prop when using it | `{ texts: string[] }`                    | -     |
| loading-icon | Slot for loading icon                                                                                | -                                        | -     |
| trigger      | Slot for trigger content                                                                             | `{ visible: boolean, success: boolean }` | -     |

### CaptchaSlide Props

| Name           | Type                                             | Description                                                                                                                              | Default     | Since |
| -------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----- |
| size           | `'small' \| 'default' \| 'large'`                | Set the size of the slider                                                                                                               | `'default'` | -     |
| target         | `number`                                         | Set the target position, usually no need to modify                                                                                       | `100`       | -     |
| tip            | `string`                                         | Set the tip of slider                                                                                                                    | `null`      | -     |
| success-tip    | `string`                                         | Set the tip when captcha is successful                                                                                                   | `null`      | -     |
| tolerance      | `number`                                         | Set the error tolerance allowed for the captcha target position                                                                          | `1`         | -     |
| disabled       | `boolean`                                        | Set whether to disable slider                                                                                                            | `false`     | -     |
| loading        | `boolean`                                        | Set whether it is loading                                                                                                                | `false`     | -     |
| loading-icon   | `Record<string, any>`                            | Set the loading icon                                                                                                                     | `null`      | -     |
| loading-lock   | `boolean`                                        | Whether to set read-only when loading                                                                                                    | `false`     | -     |
| loading-effect | `string`                                         | Set the effect animation for the loading icon                                                                                            | `null`      | -     |
| on-before-test | `(percent: number, matched: boolean) => unknown` | Set the callback before test, support async function and Promise, when returning a boolean value, it will be directly used as the result | `null`      | -     |

### CaptchaSlide Events

| Name       | Description                   | Parameters          | Since |
| ---------- | ----------------------------- | ------------------- | ----- |
| success    | Emitted when captcha succeeds | `(percent: number)` | -     |
| fail       | Emitted when captcha fails    | -                   | -     |
| drag-start | Emitted when sliding started  | `(percent: number)` | -     |
| drag       | Emitted when sliding          | `(percent: number)` | -     |
| drag-end   | Emitted when sliding ended    | `(percent: number)` | -     |
