### Spin Props

| Name            | Type                            | Description                                                                                                                                                                                                                         | Default      | Since   |
| --------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------- |
| active          | `boolean`                       | The active state of spin                                                                                                                                                                                                            | `false`      | -       |
| icon            | `Record<string, any>`           | Icon displayed during loading, invalid after using slot                                                                                                                                                                             | `Spinner`    | -       |
| spin            | `boolean`                       | Set the loading icon to use the spin animation, by default it is a pulse animation, if further customization is required, the slot should be used                                                                                   | `false`      | -       |
| inner           | `boolean`                       | Set whether it is an inline loading effect, generally used when it is not convenient to modify the parent root element                                                                                                              | `false`      | -       |
| delay           | `boolean \| number \| number[]` | Set the number of milliseconds for delay display or disappearance during loading. When true is passed in, the default is 500ms delay. Passing in an array can control the display and disappearance delay milliseconds respectively | `false`      | -       |
| tip             | `string`                        | Set the tip content during loading                                                                                                                                                                                                  | `''`         | -       |
| mask-color      | `string`                        | Set the mask base color in loading                                                                                                                                                                                                  | `''`         | -       |
| transition-name | `string`                        | Set the transition effect to appear during loading                                                                                                                                                                                  | `'vxp-fade'` | `2.0.0` |

### Spin Slots

| Name    | Description                                                                       | Parameters | Since |
| ------- | --------------------------------------------------------------------------------- | ---------- | ----- |
| default | Slot to add the content of the loading effect, invalid when inner mode is enabled | -          | -     |
| icon    | Slot for loading icon content                                                     | -          | -     |
| tip     | Slot for loading tip content                                                      | -          | -     |

### Spin Directives

| Name      | Description                                                                                                                                                                 | Parameters                        | Since |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ----- |
| v-loading | Used to quickly add a loading effect to an element, receive a boolean value to mark whether to activate the loading effect, or pass in Spin props for further customization | `(binding: boolean \| SpinProps)` | -     |
