### Button Props

| Name         | Type    | Description                 | Default    |
| ------------ | ------- | ------------------------------------------------------------------------------------------------ | --------- |
| type         | String  | Button type, optional values are `default`, `primary`, `info`, `success`, `warning`, `error` | 'default' |
| simple       | Boolean | Once set, the button will change to a minimalist style in light colors            | false     |
| ghost        | Boolean |  Once set, the button will be styled with a transparent background color    | false     |
| text | Boolean | Set whether it is a text button | false |
| dsahed | Boolean | Set whether it is a dashed button | false |
| size         | String  | The size of the button, optional values are `small`, `default`, `large` | 'default' |
| disabled     | Boolean | Set whether it is a disabled button                                | false     |
| loading      | Boolean | Set whether it is a loading button                         | false     |
| circle       | Boolean | Set whether it is a circular button              | false     |
| icon         | Object  | Auxiliary icon of the button, it will switch to the loading icon when loading   | ''        |
| loading-icon | String  | Icon displayed when loading state, with pulse effect       | 'spinner' |
| loading-spin | Boolean | After set, the original pulse effect of the loading icon will be displaced and rotated  | false     |
| button-type  | String  | Set the type property of the native button                        | 'button'  |
| block        | Boolean | Whether it is a block-level element, the width becomes 100% after setting                      | false     |
| color   | String  | Set the major color of the button                   | null      |

### Button Events

| Name     | Description                                    | Parameters       |
| -------- | --------------------------------------- | ---------- |
| click | Triggered when the button is left clicked, returns the clicked event object | clickEvent |

### Button Slots

| Name    | Description                                             |
| ------- | ------------------------------------------------ |
| default | Content slot for button                                   |
| loading | Loading icon slot, used when you need more custom loading icon effects |
