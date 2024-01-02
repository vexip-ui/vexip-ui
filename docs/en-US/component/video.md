# Video ==!s|2.3.0==

Quickly create a series of controls for video playing.

:::info
It is only used to provide convenient interactive controls for video playing and does not involve video stream processing.
:::

## Demos

:::demo video/basis

### Basis Usage

Simplest usage.

:::

:::demo video/no-controls

### No Controls

The controls bar can be hidden by adding the `no-controls` prop.

:::

:::demo video/poster

### Poster

You can add a poster to the video using the `poster` prop.

:::

:::demo video/controls

### Control Layout

The control layout can be configured through the `control-layout` prop, which is divided into three parts: `left`, `right` and `center`, each part receives an array of control names.

Controls are divided into two types: preset controls and custom controls. The `VideoPresetControl` type defines the name of the preset control, while the name of the custom control is determined by the user.

After configuring a custom control, you need to define the content of the control yourself through the `control-[name]` slot, where `[name]` is the name of the control.

The VideoControl component makes it easier to create custom controls.

:::

:::demo video/segments

### Segment Video

A set of segments can be configured for the video through the `segments` prop.

:::

:::demo video/src-list

### Multiple Videos

The addresses of multiple videos can be passed in through the `src-list` prop.

After setting this prop, the switching video processing inside the component will be enabled, that is, clicking the previous or next button will trigger the switching of the video.

The `update:src` event is also emitted when switching, which means that two-way binding can be used on the `src` prop.

:::

:::demo video/player-slot

### Player Slot

The content of the player can be customized through the `player` slot, which will replace the entire original `<video>` tag.

After using this slot, since the internal `<video>` tag is replaced, it is necessary to pass in an object of the `<video>` via the `video` prop to maintain correct linkage within the component.

If it is not passed in, the component will automatically query the first `<video>` tag under it after mounted.

:::

## API

### Preset Types

```ts
type VideoPresetControl =
  | 'play'
  | 'play-prev'
  | 'play-next'
  | 'refresh'
  | 'timer'
  | 'play-rate'
  | 'flip'
  | 'volume'
  | 'pip'
  | 'full-window'
  | 'full-browser'
type VideoShortcutOptions = Partial<Record<VideoPresetControl, string>>
type VideoControlName = VideoPresetControl | (string & {})
type VideoControlConfig = VideoControlName | [VideoControlName, any]

interface VideoControlLayout {
  left?: VideoControlConfig[],
  center?: VideoControlConfig[],
  right?: VideoControlConfig[]
}

interface VideoPlayRate {
  label?: string,
  value: number
}

type VideoControlType = 'button' | 'select' | 'panel'

interface VideoControlOption {
  value: string | number,
  label?: string,
  selectedLabel?: string,
  disabled?: boolean,
  divided?: boolean,
  title?: string
}

interface VideoSegment {
  time: number,
  title?: string
}
```

### Video Props

| Name           | Type                          | Description                                                                                                  | Default                     | Since |
| -------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------- | ----- |
| src            | `string`                      | Set the video address, you can use `v-model` two-way binding                                                 | `''`                        | -     |
| src-list       | `string[]`                    | Set the addresses of multiple videos. After setting, the internal switching video processing will be enabled | `null`                      | -     |
| no-controls    | `boolean`                     | Whether to disable controls                                                                                  | `false`                     | -     |
| video-attrs    | `Record<string, any>`         | Set the attributes of the `<video>` tag                                                                      | `null`                      | -     |
| time           | `number`                      | Set the playback time of the video, you can use `v-model` two-way binding                                    | `0`                         | -     |
| volume         | `number`                      | Set the volume of the video, you can use `v-model` two-way binding                                           | `1`                         | -     |
| play-rate      | `number`                      | Set the video playback rate, you can use `v-model` two-way binding                                           | `1`                         | -     |
| play-rates     | `(number \| VideoPlayRate)[]` | Set the candidate play rate                                                                                  | `[0.5, 1, 1.25, 1.5, 2]`    | -     |
| control-layout | `VideoControlLayout`          | Configure the layout of the control                                                                          | `videoDefaultControlLayout` | -     |
| poster         | `string`                      | Set the address of the video cover                                                                           | `''`                        | -     |
| video          | `HTMLVideoElement`            | Can manually pass in an html object of the `<video>` tag, often used with the `player` slot                  | `null`                      | -     |
| segments       | `(number \| VideoSegment)[]`  | Set the segment information of the video                                                                     | `[]`                        | -     |
| loading        | `boolean`                     | Set whether the video is loading                                                                             | `false`                     | -     |
| loading-icon   | `Record<string, any>`         | Set the loading icon                                                                                         | `null`                      | -     |
| loading-effect | `string`                      | Set the effect animation of the loading icon                                                                 | `null`                      | -     |
| shortcuts      | `VideoShortcutOptions`        | Configure shortcut keys for preset controls                                                                  | `{}`                        | -     |

### Video Events

| Name          | Description                                                    | Parameters                               | Since |
| ------------- | -------------------------------------------------------------- | ---------------------------------------- | ----- |
| play          | Emitted whenever the video starts playing                      | -                                        | -     |
| pause         | Emitted whenever the video is paused                           | -                                        | -     |
| ended         | Emitted when video playback ends                               | -                                        | -     |
| time-change   | Emitted when the playback time of the video changes            | `(time: number)`                         | -     |
| rate-change   | Emitted when the playback rate of the video changes            | `(rate: number)`                         | -     |
| volume-change | Emitted when the volume of the video changes                   | `(volume: number)`                       | -     |
| toggle-flip   | Emitted when the video's mirroring status changes              | `(flip: boolean)`                        | -     |
| toggle-pip    | Emitted when the picture-in-picture state of the video changes | `(pip: boolean)`                         | -     |
| toggle-full   | Emitted when the full-screen state of the video changes        | `(full: false \| 'window' \| 'browser')` | -     |
| prev          | Emitted when the previous video button is clicked              | -                                        | -     |
| next          | Emitted when the next video button is clicked                  | -                                        | -     |
| refresh       | Emitted when the refresh button is clicked                     | -                                        | -     |

### Video Slots

| Name           | Description                                                                                                                      | Parameters            | Since |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- | --------------------- | ----- |
| control-[name] | The slot of the custom control, where `[name]` is the name passed in the `control-layout` property other than the preset control | -                     | -     |
| player         | Slot for player content, which will replace the entire `<video>` tag                                                             | -                     | -     |
| default        | Default slot, add content under the `<video>` tag                                                                                | -                     | -     |
| poster         | Slot for poster content                                                                                                          | -                     | -     |
| state          | Slot for video status flag                                                                                                       | `{ active: boolean }` | -     |
| loading        | Slot for video loading icon                                                                                                      | -                     | -     |
| extra          | Slot for extra content that will be added at the end of the wrapper element                                                      | -                     | -     |

### VideoControl Props

| Name      | Type                               | Description                                                                                                        | Default    | Since |
| --------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- | ----- |
| type      | `VideoControlType`                 | Set the type of control                                                                                            | `'button'` | -     |
| label     | `string`                           | Set the label of the control when the type is `'button'`                                                           | `''`       | -     |
| tipClass  | `ClassType`                        | Set the custom class name of the popper tip                                                                        | `null`     | -     |
| disabled  | `boolean`                          | Set whether it is disabled                                                                                         | `false`    | -     |
| shortcut  | `string`                           | Set the shortcut key of the control, pressing the shortcut key when the player is focused will trigger the control | `''`       | -     |
| focusable | `boolean`                          | Whether the control is focusable                                                                                   | `false`    | -     |
| value     | `number \| string`                 | Set the value of the control when the type is `'select'`                                                           | `null`     | -     |
| options   | `(string \| VideoControlOption)[]` | Set the options of the control when the type is `'select'`                                                         | `[]`       | -     |

### VideoControl Events

| Name   | Description                                                     | Parameters                     | Since |
| ------ | --------------------------------------------------------------- | ------------------------------ | ----- |
| click  | Emitted when the control is clicked                             | -                              | -     |
| enter  | Emitted when the mouse moves into the control                   | -                              | -     |
| leave  | Emitted when the mouse moves out of the control                 | -                              | -     |
| focus  | Emitted when the control is focused                             | `(event: FocusEvent)`          | -     |
| blur   | Emitted when the control is out of focus                        | `(event: FocusEvent)`          | -     |
| select | When the type is `'select'`, emitted when an option is selected | `(option: VideoControlOption)` | -     |

### VideoControl Slots

| Name     | Description                                                 | Parameters                                                         | Since |
| -------- | ----------------------------------------------------------- | ------------------------------------------------------------------ | ----- |
| selected | Slot for selected label content                             | `{ option: VideoControlOption }`                                   | -     |
| default  | Slot for the control content                                | -                                                                  | -     |
| label    | Slot for the button tip content when the type is `'button'` | -                                                                  | -     |
| panel    | Slot for the control panel when the type is not `'button'`  | -                                                                  | -     |
| option   | Slot for the option content when the type is `'select'`     | `{ option: VideoControlOption, index: number, selected: boolean }` | -     |
