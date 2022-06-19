### ColorPicker Props

| Name          | Type    | Description                                                                     | Default          | Since |
| ------------- | ------- | ------------------------------------------------------------------------ | --------------- | --- |
| value | `string` | The value of the color picker, can use `v-model` two-way binding | `'#339af0'` | - |
| visible | `boolean` | Sets the display state of the color control panel | `false` | - |
| format | `'rgb' \| 'hsl' \| 'hsv' \| 'hex'` | Type to format the color before updating value | `'rgb'` | - |
| size | `small \| default \| large` | The size of color picker | `'default'` | - |
| alpha | `boolean` | whether to use transparency selection | `false` | - |
| disabled | `boolean` | Set whether is disabled | `false` | - |
| no-input | `boolean` | Set whether to disable Input input color value | `false` | - |
| shortcut | `boolean` | wSet hether to use shortcut to select color | `false` | - |
| shortcut-list | `string[]` | Shortcut colors selection list | `defaultShotcuts` | - |
| disable-validate | `boolean` | Whether to disable triggering form field validation | `false` | - |

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

| Name             | Description                                                             | Parameters           | Since |
| ---------------- | ---------------------------------------------------------------- | -------------- | --- |
| toggle | Emitted when the color control panel display state changes, returns the current state | `(visible: boolean)` | - |
| click-outside | Emitted when the outside of the control is clicked, no return value | - | - |
| outside-close | Emitted when the panel is closed by clicking outside the control, no return value | - | - |
| change | Emitted when the selected color changes, returns the formatted color value | `(color: string \| RGBAColor \| HSLAColor \| HSVAColor)` | - |
| shortcut | Emitted when a color is selected using the shortcut function, returns the formatted color value | `(color: string \| RGBAColor \| HSLAColor \| HSVAColor)` | - |
