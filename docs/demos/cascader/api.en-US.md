### Preset Types

```ts
type CascaderValue = (string | number)[] | (string | number)[][]

interface CascaderKeyConfig {
  value?: string,
  label?: string,
  children?: string,
  disabled?: string,
  hasChild?: string
}

interface CascaderOptionState {
  id: number,
  parent: number,
  value: string | number,
  fullValue: string,
  label: string,
  fullLabel: string,
  children: CascaderOptionState[],
  disabled: boolean,
  hasChild: boolean,
  checked: boolean,
  partial: boolean,
  loading: boolean,
  loaded: boolean,
  error: boolean,
  childrenLoaded: boolean,
  data: Record<string, any>
}

interface OptionState {
  id: number,
  parent: number,
  value: string | number,
  fullValue: string,
  label: string,
  fullLabel: string,
  children: OptionState[],
  disabled: boolean,
  hasChild: boolean,
  checked: boolean,
  partial: boolean,
  loading: boolean,
  loaded: boolean,
  error: boolean,
  childrenLoaded: boolean,
  data: Record<string, any>
}
```

### Cascader Props

| Name            | Type                                                     | Description                                                                                                                                                                        | Default          | Since   |
| --------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- |
| size            | `'small' \| 'default' \| 'large'`                        | size of cascade selector                                                                                                                                                           | `'default'`      | -       |
| state           | `'default' \| 'success' \| 'error' \| 'warning'`         | state of cascade selector                                                                                                                                                          | `'default'`      | -       |
| prefix          | `Record<string, any>`                                    | prefix icon, invalid when using prefix slot                                                                                                                                        | `null`           | -       |
| prefix-color    | `string`                                                 | The color of the prefix content, affects the prefix slot                                                                                                                           | `''`             | -       |
| suffix          | `Record<string, any>`                                    | suffix icon, invalid when using suffix slot                                                                                                                                        | `null`           | -       |
| suffix-color    | `string`                                                 | The color of the suffix content, which affects the suffix slot                                                                                                                     | `''`             | -       |
| no-suffix       | `boolean`                                                | Set whether to disable suffix icon                                                                                                                                                 | `false`          | -       |
| static-suffix   | `boolean`                                                | Set whether the suffix icon is static                                                                                                                                              | `false`          | -       |
| visible         | `boolean`                                                | Set whether the option list is visible, you can use `v-model` two-way binding                                                                                                      | `false`          | -       |
| options         | `Array<Record<string, any>>`                             | Set options for cascade selector                                                                                                                                                   | `[]`             | -       |
| value           | `CascaderValue`                                          | Cascading selector value, can use `v-model` two-way binding                                                                                                                        | `null`           | -       |
| disabled        | `boolean`                                                | set whether to disable cascade selector                                                                                                                                            | `false`          | -       |
| multiple        | `boolean`                                                | Set whether to enable multiple selection mode                                                                                                                                      | `false`          | -       |
| no-cascaded     | `boolean`                                                | Set whether to disassociate parent and child options, after disassociation, parent options can be selected separately                                                              | `false`          | -       |
| key-config      | `CascaderKeyConfig`                                      | Configure key names when parsing `options`                                                                                                                                         | `{}`             | -       |
| separator       | `string`                                                 | Set the connector of option value and label, the length is `1`, note that it will be used to build the full path of the option value internally                                    | `/`              | -       |
| hover-trigger   | `boolean`                                                | Set whether to enable the mouse hover to trigger the expansion of the lower panel, invalid after enabling asynchronous loading                                                     | `false`          | -       |
| max-tag-count   | `number`                                                 | In multi-select mode, set the maximum number of tags to display, when it is `0`, it will be dynamically calculated to ensure that it is displayed in one line                      | `0`              | -       |
| brief-label     | `boolean`                                                | Set whether to display the short label value                                                                                                                                       | `false`          | -       |
| no-rest-tip     | `boolean`                                                | Set whether to disable the bubble tip for extra tabs                                                                                                                               | `false`          | -       |
| on-async-load   | `(data: Record<string, any>) => any[] \| Promise<any[]>` | Set the callback function for asynchronous loading, after setting it will start asynchronous loading                                                                               | `null`           | -       |
| merge-tags      | `boolean`                                                | In multi-select mode, set whether to display the parent option when all child options are selected, and enable it in asynchronous loading will change the way of passing values ​​ | `false`          | -       |
| tag-type        | `TagType`                                                | Set the type of label in multi-select mode                                                                                                                                         | `null`           | -       |
| outside-close   | `boolean`                                                | Set whether to close the component by clicking outside                                                                                                                             | `false`          | -       |
| placeholder     | `string`                                                 | same as native `palceholder`                                                                                                                                                       | `''`             | -       |
| clearable       | `boolean`                                                | Set whether the value can be cleared                                                                                                                                               | `false`          | -       |
| transition-name | `string`                                                 | transition animation for options list                                                                                                                                              | `'vxp-drop'`     | -       |
| placement       | `Placement`                                              | The placement of the option list, the optional value is the same as Popper.js                                                                                                      | `'bottom-start'` | -       |
| transfer        | `boolean \| string`                                      | Set the rendering position of the option list. When set to `true`, it will render to `<body>` by default                                                                           | `false`          | -       |
| empty-text      | `string`                                                 | Prompt for empty options                                                                                                                                                           | `locale.empty`   | -       |
| loading         | `boolean`                                                | Set whether is loading                                                                                                                                                             | `false`          | -       |
| loading-icon    | `Record<string, any>`                                    | Set the loading icon                                                                                                                                                               | `Spinner`        | -       |
| loading-lock    | `boolean`                                                | Set whether to be read-only when loading                                                                                                                                           | `false`          | -       |
| loading-effect  | `string`                                                 | Set the effect animation for the loading icon                                                                                                                                      | `false`          | `2.1.0` |
| transparent     | `boolean`                                                | Set whether to be transparent                                                                                                                                                      | `false`          | `2.0.2` |

### Cascader Events

| Name          | Description                                                                                                                                                    | Parameters                                                                        | Since |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----- |
| toggle        | Emitted when the option list display state changes, returns the current state                                                                                  | `(visible: boolean)`                                                              | -     |
| select        | Emitted when an option is selected, returns the value path and option data of the selected option                                                              | `(value: (string \| number)[], data: Record<string, any>)`                        | -     |
| cancel        | Emitted when the option is canceled, only in multi-select mode, returns the value path and option data of the canceled option                                  | `(value: (string \| number)[], data: Record<string, any>)`                        | -     |
| change        | Emitted when the selected value changes, returns the value path and option data of the option, the value path array and option data array in multi-select mode | `(value: CascaderValue, data: Record<string, any> \| Array<Record<string, any>>)` | -     |
| click-outside | Emitted when clicking outside the cascade selector, no return value                                                                                            | -                                                                                 | -     |
| outside-close | Emitted when the option list is closed by clicking outside, no return value                                                                                    | -                                                                                 | -     |
| clear         | Emitted when the value is cleared by the clear button, no return value                                                                                         | -                                                                                 | -     |

### Cascader Slots

| Name    | Description                                                                                               | Parameters                                                                                                | Since |
| ------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----- |
| default | Slot for option content, where `hasChild` provided by parameter is the result of internal calculation     | `{ option: CascaderOptionState, index: number, selected: boolean, canCheck: boolean, hasChild: boolean }` | -     |
| label   | Slot for option label value, where `hasChild` provided by parameter is the result of internal calculation | `{ option: CascaderOptionState, index: number, selected: boolean, canCheck: boolean, hasChild: boolean }` | -     |
| prefix  | Slot to prepend icon content                                                                              | -                                                                                                         | -     |
| control | Slot for selector main control content                                                                    | -                                                                                                         | -     |
| suffix  | Slot for suffix icon content                                                                              | -                                                                                                         | -     |
| empty   | Slot for empty option prompt content                                                                      | -                                                                                                         | -     |
