# 视频 Video ==!s|2.3.0==

快速为视频播放创建一系列控件。

:::info
仅用于为视频播放提供便捷的交互控件，并不涉及视频流处理的相关内容。
:::

## Demos

:::demo video/basis

### 基础用法

最简单的用法。

:::

:::demo video/no-controls

### 无控件

添加 `no-controls` 属性后可以隐藏控件栏。

:::

:::demo video/poster

### 封面

通过 `poster` 属性可以为视频添加一个封面。

:::

:::demo video/controls

### 控件布局

通过 `control-layout` 属性可以配置控件布局，其中分为了 `left`、`right` 和 `center` 三个部分，每个部分接收一个控件名称的数组。

控件分为了预设控件和自定义控件两种，`VideoPresetControl` 类型定义了预设控件的名称，自定义控件的名称则是由用户决定。

在配置了自定义控件后，需要通过 `control-[name]` 插槽自行定义控件的内容，其中 `[name]` 为控件名称。

借助 VideoControl 组件可以更便捷地创建自定义控件。

:::

:::demo video/segments

### 分段视频

通过 `segments` 属性可以为视频配置一组分段信息。

:::

:::demo video/src-list

### 多个视频

通过 `src-list` 属性可以传入多个视频的地址。

设置了该属性后，将会启用组件内部的切换视频处理，即点击上一个或下一个按钮时将会触发视频的切换。

在切换时还会触发 `update:src` 事件，这意味着可以在 `src` 属性上使用双向绑定。

:::

:::demo video/player-slot

### 播放器插槽

通过 `player` 插槽可以自定义播放器的内容，该插槽将会替换掉原有的 `<video>` 标签的内容。

使用了该插槽后，由于内部的 `<video>` 标签被替换，所以需要通过 `video` 属性传入一个 `<video>` 标签的 html 对象以保持组件内功能能正确联动。

若没有传入，组件也会在挂在后自动寻找其下的第一个 `<video>` 标签。

:::

## API

### 预设类型

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

### Video 属性

| 名称           | 类型                          | 说明                                                                  | 默认值                      | 始于 |
| -------------- | ----------------------------- | --------------------------------------------------------------------- | --------------------------- | ---- |
| src            | `string`                      | 设置视频的地址，可以使用 `v-model` 双向绑定                           | `''`                        | -    |
| src-list       | `string[]`                    | 设置多个视频的地址，设置后会开启内部的切换视频处理                    | `null`                      | -    |
| no-controls    | `boolean`                     | 是否禁用控件                                                          | `false`                     | -    |
| video-attrs    | `Record<string, any>`         | 设置 `<video>` 标签的属性                                             | `null`                      | -    |
| time           | `number`                      | 设置视频的播放时间，可以使用 `v-model` 双向绑定                       | `0`                         | -    |
| volume         | `number`                      | 设置视频的音量，可以使用 `v-model` 双向绑定                           | `1`                         | -    |
| play-rate      | `number`                      | 设置视频的播放速率，可以使用 `v-model` 双向绑定                       | `1`                         | -    |
| play-rates     | `(number \| VideoPlayRate)[]` | 设置候选的播放速率                                                    | `[0.5, 1, 1.25, 1.5, 2]`    | -    |
| control-layout | `VideoControlLayout`          | 配置控件的布局                                                        | `videoDefaultControlLayout` | -    |
| poster         | `string`                      | 设置视频封面的地址                                                    | `''`                        | -    |
| video          | `HTMLVideoElement`            | 可手动传入一个 `<video>` 标签的 html 对象，常与 `player` 插槽一同使用 | `null`                      | -    |
| segments       | `(number \| VideoSegment)[]`  | 设置视频的分段信息                                                    | `[]`                        | -    |
| loading        | `boolean`                     | 设置视频是否为加载状态                                                | `false`                     | -    |
| loading-icon   | `Record<string, any>`         | 设置加载中的图标                                                      | `null`                      | -    |
| loading-effect | `string`                      | 设置加载中图标的效果动画                                              | `null`                      | -    |
| shortcuts      | `VideoShortcutOptions`        | 配置预设控件的快捷键                                                  | `{}`                        | -    |

### Video 事件

| 名称          | 说明                         | 参数                                     | 始于 |
| ------------- | ---------------------------- | ---------------------------------------- | ---- |
| play          | 每当视频开始播放时触发       | -                                        | -    |
| pause         | 每当视频暂停时触发           | -                                        | -    |
| ended         | 视频播放结束时触发           | -                                        | -    |
| time-change   | 当视频的播放时间改变时触发   | `(time: number)`                         | -    |
| rate-change   | 当视频的播放速率改变时触发   | `(rate: number)`                         | -    |
| volume-change | 当视频的音量改变时触发       | `(volume: number)`                       | -    |
| toggle-flip   | 当视频的镜像状态改变时触发   | `(flip: boolean)`                        | -    |
| toggle-pip    | 当视频的画中画状态改变时触发 | `(pip: boolean)`                         | -    |
| toggle-full   | 当视频的全屏状态改变时触发   | `(full: false \| 'window' \| 'browser')` | -    |
| prev          | 点击上一个视频按钮时触发     | -                                        | -    |
| next          | 点击下一个视频按钮时触发     | -                                        | -    |
| refresh       | 点击刷新按钮时触发           | -                                        | -    |

### Video 插槽

| 名称           | 说明                                                                                 | 参数                  | 始于 |
| -------------- | ------------------------------------------------------------------------------------ | --------------------- | ---- |
| control-[name] | 自定义控件的插槽，其中 `[name]` 为 `control-layout` 属性中传入的除了预设控件外的名称 | -                     | -    |
| player         | 播放器内容的插槽，将替换整个 `<video>` 标签                                          | -                     | -    |
| default        | 默认插槽，为 `<video>` 标签内添加内容                                                | -                     | -    |
| poster         | 封面内容的插槽                                                                       | -                     | -    |
| state          | 视频状态标志的插槽                                                                   | `{ active: boolean }` | -    |
| loading        | 视频加载图标的插槽                                                                   | -                     | -    |
| extra          | 额外内容的插槽，将被添加在包围元素的最后                                             | -                     | -    |

### VideoControl 属性

| 名称      | 类型                               | 说明                                             | 默认值     | 始于 |
| --------- | ---------------------------------- | ------------------------------------------------ | ---------- | ---- |
| type      | `VideoControlType`                 | 设置控件的类型                                   | `'button'` | -    |
| label     | `string`                           | 类型为 `'button'` 时设置控件的标签               | `''`       | -    |
| tipClass  | `ClassType`                        | 设置弹出气泡的自定义类名                         | `null`     | -    |
| disabled  | `boolean`                          | 设置是否为禁用状态                               | `false`    | -    |
| shortcut  | `string`                           | 设置控件的快捷键，视频聚焦时按下快捷键会触发控件 | `''`       | -    |
| focusable | `boolean`                          | 控件是否可聚焦                                   | `false`    | -    |
| value     | `number \| string`                 | 类型为 `'select'` 时设置控件的值                 | `null`     | -    |
| options   | `(string \| VideoControlOption)[]` | 类型为 `'select'` 时设置控件的选项               | `[]`       | -    |

### VideoControl 事件

| 名称   | 说明                                       | 参数                           | 始于 |
| ------ | ------------------------------------------ | ------------------------------ | ---- |
| click  | 当控件被点击时触发                         | -                              | -    |
| enter  | 当鼠标移入控件时触发                       | -                              | -    |
| leave  | 当鼠标移出控件时触发                       | -                              | -    |
| focus  | 控件聚焦时触发                             | `(event: FocusEvent)`          | -    |
| blur   | 控件失焦时触发                             | `(event: FocusEvent)`          | -    |
| select | 类型为 `'select'` 时，选择了一个选项时触发 | `(option: VideoControlOption)` | -    |

### VideoControl 插槽

| 名称     | 说明                                   | 参数                                                               | 始于 |
| -------- | -------------------------------------- | ------------------------------------------------------------------ | ---- |
| selected | 已选选项的回显内容的插槽               | `{ option: VideoControlOption }`                                   | -    |
| default  | 控件内容的插槽                         | -                                                                  | -    |
| label    | 类型为 `'button'` 时按钮提示内容的插槽 | -                                                                  | -    |
| panel    | 类型不为 `'button'` 时控件面板的插槽   | -                                                                  | -    |
| option   | 类型为 `'select'` 时选项内容的插槽     | `{ option: VideoControlOption, index: number, selected: boolean }` | -    |
