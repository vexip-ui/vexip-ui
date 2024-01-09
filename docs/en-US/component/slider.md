# Slider

Select value by sliding.

## Demos

:::demo slider/basis

### Basis Usage

The simplest usage, you can use `v-model:value` two-way binding.

:::

:::demo slider/maxmin

### Value Bounds

The `min` and `max` props can be used to set the bounds of the slider.

:::

:::demo slider/step

### Adjust Step

Set the value of the `step` prop to adjust the step of each slide.

:::

:::demo slider/range

### Range Select

Add the `range` prop to enable range select mode.

:::

:::demo slider/vertical

### Vertical

Add the `vertical` prop to make the slider vertically.

:::

:::demo slider/reverse

### Reverse

Add the `reverse` prop to reverse the operation of the slider.

:::

:::demo slider/markers

### Markers

Some markers can be set for slider via the `markers` prop.

:::

:::demo slider/marker-only

### Marker Only

After setting markers, you can add `marker-only` prop to limit only the marked value can be selected. After adding, the `step` prop will not effective.

:::

:::demo slider/trigger-fade

### Hide Trigger

==!s|2.2.9==

Add the `trigger-fade` prop to hide the trigger when there is no operation.

:::

:::demo slider/loading

### Loading

The loading state of the slider can be controlled through the `loading` prop.

If you want to be read-only when loading, you need to add the `loading-lock` prop.

:::

:::demo slider/state

### Different States

Different states can be set via `state` prop.

:::

:::demo slider/trigger

### Custom Trigger

==!s|2.2.3==

You can custom the trigger content via `trigger` slot.

:::

## API

### Preset Types

```ts
import type { TooltipProps } from 'vexip-ui'

interface SliderMarker {
  label?: string,
  class?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>
}

type SliderRawMarkers =
  | Record<string | number, string | SliderMarker>
  | Array<number | (SliderMarker & { value: number })>

type SliderTipProps = Omit<
  TooltipProps,
  'trigger' | 'transfer' | 'visible' | 'disabled' | 'noHover'
>

interface SliderSlotParams {
  values: number[],
  sliding: boolean[],
  percent: number[],
  disabled: boolean,
  loading: boolean
}

interface SliderMarkerSlotParams extends SliderSlotParams {
  markerValue: number,
  marker: SliderMarker,
  inRange: boolean
}

interface SliderTriggerParams {
  type: 'start' | 'end',
  value: number,
  sliding: boolean,
  percent: number,
  disabled: boolean,
  loading: boolean
}
```

### Slider Props

| Name         | Type                                             | Description                                                                                    | Default   | Since    |
| ------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------- | --------- | -------- |
| state        | `'default' \| 'success' \| 'error' \| 'warning'` | Set the slider type                                                                            | `default` | `2.0.0`  |
| value        | `number \| number[]`                             | The value of the sliding input bar, you can use `v-model` two-way binding                      | `0`       | -        |
| min          | `number`                                         | The min value of the slider                                                                    | `0`       | -        |
| max          | `number`                                         | The max value of the slider                                                                    | `100`     | -        |
| step         | `number`                                         | The span of each value change of the sliding input bar                                         | `1`       | -        |
| vertical     | `boolean`                                        | Set whether the sliding input bar is vertical, the parent element needs to have a valid height | `false`   | -        |
| hide-tip     | `boolean`                                        | Set whether to disable the Tooltip                                                             | `false`   | -        |
| tip-transfer | `boolean`                                        | Set the Tooltip's `transfer` prop                                                              | `false`   | -        |
| disabled     | `boolean`                                        | Set whether to disable                                                                         | `false`   | -        |
| loading      | `boolean`                                        | Set whether is loading                                                                         | `false`   | `2.0.0`  |
| loading-lock | `boolean`                                        | Set whether to be read-only when loading                                                       | `false`   | `2.0.0`  |
| reverse      | `boolean`                                        | Set whether to reverse operation                                                               | `false`   | `2.0.0`  |
| range        | `boolean`                                        | set whether to select range                                                                    | `false`   | `2.0.0`  |
| markers      | `SliderRawMarkers`                               | Set markers                                                                                    | `null`    | `2.0.0`  |
| marker-only  | `boolean`                                        | Set whether only marker value can be selected, `step` will not effective after set             | `false`   | `2.0.0`  |
| tip-hover    | `boolean`                                        | Set whether the Tooltip can be hovered                                                         | `false`   | `2.2.8`  |
| flip-marker  | `boolean`                                        | Set whether to place the marker label on the other side                                        | `false`   | `2.2.9`  |
| trigger-fade | `boolean`                                        | Whether the trigger will be automatically hidden                                               | `false`   | `2.2.9`  |
| tip-props    | `SliderTipProps`                                 | Set other props of the Tooltip                                                                 | `{}`      | `2.2.11` |

### Slider Events

| Name   | Description                                                                                                                                    | Parameters                    | Since |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----- |
| input  | Emitted when the sliding input bar causes the value to change, returns the current value                                                       | `(value: number \| number[])` | -     |
| change | Emitted when the value of the sliding input bar changes (if sliding is used, it is triggered when the sliding ends), returns the current value | `(value: number \| number[])` | -     |

### Slider Slots

| Name    | Description                   | Parameters               | Since    |
| ------- | ----------------------------- | ------------------------ | -------- |
| trigger | Slot for trigger content      | `SliderTriggerParams`    | `2.2.3`  |
| tip     | Slot for tip content          | `SliderTriggerParams`    | -        |
| marker  | Slot for marker label content | `SliderMarkerSlotParams` | `2.0.0`  |
| point   | Slot for marker point content | `SliderMarkerSlotParams` | `2.2.9`  |
| filler  | Slot for track filler         | `SliderSlotParams`       | `2.2.10` |
