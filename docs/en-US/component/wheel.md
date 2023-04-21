# Wheel

I use it for TimePicker, don't know if there are other uses.

## Demos

:::demo wheel/basis

### Basis Usage

Simple usage, select value with scrolling.

:::

:::demo wheel/empty

### Insert Empty

Add the `insert-empty` prop to insert an empty value at the beginning.

You can also specify the label of this empty value by passing in a string.

:::

:::demo wheel/arrow

### Arrow Actions

Add the `arrow` prop to add arrow actions on both sides.

:::

:::demo wheel/disabled

### Disable Options

The passed options are disabled via the `disabled` option.

:::

:::demo wheel/horizontal

### Horizontal Wheel

Change to horizontal wheel via adding `horizontal` prop.

:::

:::demo wheel/loading

### Loading

The loading state of the wheel can be controlled through the `loading` prop.

If you want to be read-only when loading, you need to add the `loading-lock` prop.

:::

:::demo wheel/state

### Different States

Different states can be set via `state`.

:::

## API

### Preset Types

```ts
type RawOption =
  | string
  | number
  | {
    value: string | number,
    label?: string,
    disabled?: boolean
  }
```

### Wheel Props

| Name          | Type                                                    | Description                                                                            | Default       | Since    |
| ------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------- | -------- |
| state         | `'default' \| 'success' \| 'error' \| 'warning'`        | The state of wheel                                                                     | `'default'`   | `2.0.0`  |
| options       | `RawOption[]`                                           | Set the options of wheel                                                               | `[]`          | `2.0.0`  |
| horizontal    | `boolean`                                               | Set whether the scroll wheel is in landscape mode                                      | `false`       | -        |
| value         | `string \| number`                                      | The index of the currently active element, can use `v-model` two-way binding           | `0`           | -        |
| candidate     | `number`                                                | Set the number of candidates up and down the scroll wheel, the optional range is 0 ~ 3 | `2`           | -        |
| arrow         | `boolean`                                               | Set whether to use the scroll wheel arrow indicator                                    | `false`       | -        |
| insert-empty  | `boolean \| string`                                     | Set whether insert a empty value, can be specify the label when passing a string       | `false`       | `2.0.0`  |
| disabled      | `boolean`                                               | Set whether the wheel is disabled                                                      | `false`       | `2.0.0`  |
| loading       | `boolean`                                               | Set whether is loading                                                                 | `false`       | `2.0.0`  |
| loading-lock  | `boolean`                                               | Set whether to be read-only when loading                                               | `false`       | `2.0.0`  |
| disabled-item | `(value: string \| number, data: RawOption) => boolean` | Set disabled items                                                                     | `() => false` | `2.0.14` |

### Wheel Events

| Name   | Description                                                                                | Parameters                  | Since |
| ------ | ------------------------------------------------------------------------------------------ | --------------------------- | ----- |
| change | Triggered when the currently active element changes, returns the element's index and value | `(value: string \| number)` | -     |
