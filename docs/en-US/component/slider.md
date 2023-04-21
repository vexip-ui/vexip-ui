# Slider

Select value by sliding.

## Demos

:::demo slider/basis

### Basis Usage

The simplest usage, you can use `v-model:value` two-way binding.

:::

:::demo slider/maxmin

### Value Bounds

The `min` and `max` props can be used to set the bounds of the slidier.

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

:::demo slider/loading

### Loading

The loading state of the slider can be controlled through the `loading` prop.

If you want to be read-only when loading, you need to add the `loading-lock` prop.

:::

:::demo slider/state

### Different States

Different states can be set via `state`.

:::

## API

### Preset Types

```ts
interface SliderMarker {
  label?: string,
  class?: ClassType,
  style?: StyleType,
  attrs?: Record<string, any>
}
```

### Slider Props

| Name         | Type                                               | Description                                                                                    | Default   | Since   |
| ------------ | -------------------------------------------------- | ---------------------------------------------------------------------------------------------- | --------- | ------- |
| state        | `'default' \| 'success' \| 'error' \| 'warning'`   | Set the slider type                                                                            | `default` | `2.0.0` |
| value        | `number \| number[]`                               | The value of the sliding input bar, you can use `v-model` two-way binding                      | `0`       | -       |
| min          | `number`                                           | The min value of the slider                                                                    | `0`       | -       |
| max          | `number`                                           | The max value of the slider                                                                    | `100`     | -       |
| step         | `number`                                           | The span of each value change of the sliding input bar                                         | `1`       | -       |
| vertical     | `boolean`                                          | Set whether the sliding input bar is vertical, the parent element needs to have a valid height | `false`   | -       |
| hide-tip     | `boolean`                                          | Set whether to disable Tooltip                                                                 | `false`   | -       |
| tip-transfer | `boolean`                                          | Set Tooltip's `transfer` property                                                              | `false`   | -       |
| disabled     | `boolean`                                          | Set whether to disable                                                                         | `false`   | -       |
| loading      | `boolean`                                          | Set whether is loading                                                                         | `false`   | `2.0.0` |
| loading-lock | `boolean`                                          | Set whether to be read-only when loading                                                       | `false`   | `2.0.0` |
| reverse      | `boolean`                                          | Set whether to reverse operation                                                               | `false`   | `2.0.0` |
| range        | `boolean`                                          | set whether to select range                                                                    | `false`   | `2.0.0` |
| markers      | `Record<string \| number, string \| SliderMarker>` | Set markers                                                                                    | `{}`      | `2.0.0` |
| marker-only  | `boolean`                                          | Set whether only marker value can be selected, `step` will not effective after set             | `false`   | `2.0.0` |

### Slider Events

| Name   | Description                                                                                                                                    | Parameters                    | Since |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----- |
| input  | Emitted when the sliding input bar causes the value to change, returns the current value                                                       | `(value: number \| number[])` | -     |
| change | Emitted when the value of the sliding input bar changes (if sliding is used, it is triggered when the sliding ends), returns the current value | `(value: number \| number[])` | -     |

### Slider Slots

| Name   | Description             | Parameters                                                    | Since   |
| ------ | ----------------------- | ------------------------------------------------------------- | ------- |
| tip    | Slot for tip content    | `{ value: number }`                                           | -       |
| marker | Slot for marker content | `{ marker: SliderMarker, percent: number, inRange: boolean }` | `2.0.0` |
