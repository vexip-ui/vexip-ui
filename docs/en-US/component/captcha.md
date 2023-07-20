# Captcha ^[Since v2.2.0](!s)

## Demos

:::demo captcha/basis

### Basis Usage

Simplest usage.

Validation can be reset by calling the `reset` method of the component instance.

:::

:::demo captcha/remote

### Remote Verification

It is unreliable to verify in front-end, so usually we will send the result to the remote for verification.

We can use the `on-before-test` prop to send to the remote for verification, and use the remote returns as result.

:::

:::demo captcha/refresh

### Refresh Image

By listening to the `refresh` event, we can change the image from the remote when the user clicks the refresh button.

:::

:::demo captcha/slider

### Slider Captcha

In some cases only simple verification is required, the CaptchaSlider component can be used alone.

:::

## API

### Captcha Props

| Name           | Type                                             | Description                                                                                                                              | Default       | Since |
| -------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------- | ----- |
| slide-target   | `number \| number[]`                             | Set the slide target position, the second item is the vertical position when passing in the array                                        | `null`        | -     |
| title          | `string`                                         | Set the title of captcha                                                                                                                 | `null`        | -     |
| tip            | `string`                                         | Set the tip for captcha                                                                                                                  | `null`        | -     |
| success-tip    | `string`                                         | Set the tip when the captcha is successful                                                                                               | `null`        | -     |
| image          | `string`                                         | Set an image for captcha                                                                                                                 | `null`        | -     |
| tolerance      | `number`                                         | Set the error tolerance allowed for the captcha target position                                                                          | `null`        | -     |
| canvas-size    | `number[]`                                       | Set canvas size                                                                                                                          | `[1000, 600]` | -     |
| refresh-icon   | `Record<string, any>`                            | Set refresh icon                                                                                                                         | `null`        | -     |
| disabled       | `boolean`                                        | Set whether to disable the captcha                                                                                                       | `false`       | -     |
| loading        | `boolean`                                        | Set whether the captcha is loading                                                                                                       | `false`       | -     |
| loading-icon   | `Record<string, any>`                            | Set loading icon                                                                                                                         | `null`        | -     |
| loading-lock   | `boolean`                                        | Whether to set read-only when loading                                                                                                    | `false`       | -     |
| loading-effect | `string`                                         | Set the effect animation for the loading icon                                                                                            | `null`        | -     |
| on-before-test | `(percent: number, matched: boolean) => unknown` | Set the callback before test, support async function and Promise, when returning a boolean value, it will be directly used as the result | `null`        | -     |

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

| Name    | Description                            | Parameters             | Since |
| ------- | -------------------------------------- | ---------------------- | ----- |
| title   | Slot for captcha title content         | `{ success: boolean }` | -     |
| refresh | Slot for the refresh button of captcha | -                      | -     |
| tip     | Slot for the tip in the captcha slider | `{ success: boolean }` | -     |
