# ColorPicker

Provides a picker that can be used to give the user quick and flexible selection of color values.

## Demos

:::demo colorpicker/basis

### Basis Usage

Simplest usage.

:::

:::demo colorpicker/alpha

### Alpha

Add the `alpha` prop to enable transparency selection.

:::

:::demo colorpicker/loading

### Loading

The loading state of the color picker can be controlled through the `loading` prop.

If you want to be read-only when loading, you need to add the `loading-lock` prop.

:::

:::demo colorpicker/prefix

### Prefix Icon

Prefix icon can be added to color picker by setting the `prefix` prop or using the slot of the same name.

:::

:::demo colorpicker/shortcut

### Shortcuts

Add the `shortcut` prop to use shortcuts.

The list of shortcuts can be customized via passing a string array.

:::

## API

### ColorPicker Props

| Name           | Type                               | Description                                                                                   | Default     | Since   |
| -------------- | ---------------------------------- | --------------------------------------------------------------------------------------------- | ----------- | ------- |
| value          | `string`                           | The value of the color picker, can use `v-model` two-way binding                              | `'#339af0'` | -       |
| visible        | `boolean`                          | Set the display state of the color control panel                                              | `false`     | -       |
| format         | `'rgb' \| 'hsl' \| 'hsv' \| 'hex'` | Type to format the color before updating value                                                | `'rgb'`     | -       |
| size           | `small \| default \| large`        | The size of color picker                                                                      | `'default'` | -       |
| alpha          | `boolean`                          | whether to use transparency selection                                                         | `false`     | -       |
| disabled       | `boolean`                          | Set whether is disabled                                                                       | `false`     | -       |
| no-input       | `boolean`                          | Set whether to disable Input input color value                                                | `false`     | -       |
| shortcut       | `boolean \| string[]`              | Set whether to use shortcut to select color, can specify the list when passing a string array | `false`     | -       |
| prefix         | `Record<string, any>`              | The prefix icon, invalid when using prefix slot                                               | `null`      | `2.0.0` |
| prefix-color   | `string`                           | The color of the prefix content, affects the prefix slot                                      | `''`        | `2.0.0` |
| suffix         | `Record<string, any>`              | The suffix icon, invalid when using suffix slot                                               | `null`      | `2.0.0` |
| suffix-color   | `string`                           | The color of the suffix content, which affects the suffix slot                                | `''`        | `2.0.0` |
| no-suffix      | `boolean`                          | Set whether to disable suffix icon                                                            | `false`     | `2.0.0` |
| static-suffix  | `boolean`                          | Set whether the suffix icon is static                                                         | `false`     | `2.0.0` |
| loading        | `boolean`                          | Set whether is loading                                                                        | `false`     | `2.0.0` |
| loading-icon   | `Record<string, any>`              | Set the loading icon                                                                          | `Spinner`   | `2.0.0` |
| loading-lock   | `boolean`                          | Set whether to be read-only when loading                                                      | `false`     | `2.0.0` |
| loading-effect | `string`                           | Set the effect animation for the loading icon                                                 | `false`     | `2.0.0` |
| locale         | `LocaleConfig['colorPicker']`      | Set the locale config                                                                         | `null`      | `2.1.0` |

```js
const defaultShotcuts = [
  '#2d8cf0',
  '#19be6b',
  '#ff9900',
  '#ed4014',
  '#00b5ff',
  '#19c919',
  '#f9e31c',
  '#ea1a1a',
  '#9b1dea',
  '#00c2b1',
  '#ac7a33',
  '#1d35ea',
  '#8bc34a',
  '#f16b62',
  '#ea4ca3',
  '#0d94aa',
  '#febd79',
  '#5d4037',
  '#00bcd4',
  '#f06292',
  '#cddc39',
  '#607d8b',
  '#000000',
  '#ffffff'
]
```

### ColorPicker Events

| Name          | Description                                                                                     | Parameters                                               | Since |
| ------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ----- |
| toggle        | Emitted when the color control panel display state changes, returns the current state           | `(visible: boolean)`                                     | -     |
| click-outside | Emitted when the outside of the control is clicked, no return value                             | -                                                        | -     |
| outside-close | Emitted when the panel is closed by clicking outside the control, no return value               | -                                                        | -     |
| change        | Emitted when the selected color changes, returns the formatted color value                      | `(color: string \| RGBAColor \| HSLAColor \| HSVAColor)` | -     |
| shortcut      | Emitted when a color is selected using the shortcut function, returns the formatted color value | `(color: string \| RGBAColor \| HSLAColor \| HSVAColor)` | -     |
