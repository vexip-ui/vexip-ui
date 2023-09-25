# Cascader

It is used when a series of selections are required from a set of related data sets, often in the selection of provinces, cities, classified things, etc.

## Demos

:::demo cascader/basis

### Basis Usage

In the simplest usage, options under the same parent must have different values.

:::

:::demo cascader/hover

### Hover Trigger

Add the `hover-trigger` prop to enable the mouseover trigger to expand the lower panel.

This feature has no effect when asynchronous loading is enabled.

:::

:::demo cascader/clearable

### Clearable

Add the `clearable` prop to enable clearing of values.

:::

:::demo cascader/multiple

### Multiple

Add `multiple` prop to enable multiple selection mode.

:::

:::demo cascader/size

### Change Size

You can change the size by setting the value of the `size` prop. Currently.

:::

:::demo cascader/max-count

### Tag Count

Use `max-tag-count` prop to set the maximum value of tags displayed in multi-select mode.

When set to `0`, the maximum value is dynamically calculated inside the component to keep the label displayed on one line.

If you want all labels to show at all times, just set it to `Infinity`.

:::

:::demo cascader/no-cascaded

### No Cascaded Options

Adding the `no-cascaded` attribute makes each option independently selectable.

In this mode, it is best to ensure that the `label` of all parent-child options is different, otherwise it will cause ambiguity in the display.

:::

:::demo cascader/brief-label

### Brief Label

Adding the `brief-label` prop makes it possible to display only the last section of the label.

:::

:::demo cascader/merged

### Merge Tags

Add `merge-tags` prop in multi-select mode to enable merging tags.

When on, when all children of an option are selected, the labels displayed as the parent option are merged.

:::

:::demo cascader/async-load

### Async Load

Binding a function with `on-async-load` prop enables asynchronous loading mode.

Added `merge-tags` prop in multi-select mode to make parent options selectable if children are not fully loaded.

Note that enabling `merge-tags` in asynchronous loading will cause the control value to be merged into the value of the parent option, which is different from the behavior of non-asynchronous loading.

:::

:::demo cascader/loading

### Loading

The loading state of the cascader can be controlled through the `loading` prop.

If you want to be read-only when loading, you need to add the `loading-lock` prop.

:::

## API

### Preset Types

```ts
type Data = Record<string, any>
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
  data: Data
}
```

### Cascader Props

| Name            | Type                                             | Description                                                                                                                                                                        | Default          | Since   |
| --------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- |
| size            | `'small' \| 'default' \| 'large'`                | size of cascade selector                                                                                                                                                           | `'default'`      | -       |
| state           | `'default' \| 'success' \| 'error' \| 'warning'` | state of cascade selector                                                                                                                                                          | `'default'`      | -       |
| prefix          | `Record<string, any>`                            | prefix icon, invalid when using prefix slot                                                                                                                                        | `null`           | -       |
| prefix-color    | `string`                                         | The color of the prefix content, affects the prefix slot                                                                                                                           | `''`             | -       |
| suffix          | `Record<string, any>`                            | suffix icon, invalid when using suffix slot                                                                                                                                        | `null`           | -       |
| suffix-color    | `string`                                         | The color of the suffix content, which affects the suffix slot                                                                                                                     | `''`             | -       |
| no-suffix       | `boolean`                                        | Set whether to disable suffix icon                                                                                                                                                 | `false`          | -       |
| static-suffix   | `boolean`                                        | Set whether the suffix icon is static                                                                                                                                              | `false`          | -       |
| visible         | `boolean`                                        | Set whether the option list is visible, you can use `v-model` two-way binding                                                                                                      | `false`          | -       |
| options         | `Data[]`                                         | Set options for cascade selector                                                                                                                                                   | `[]`             | -       |
| value           | `CascaderValue`                                  | Cascading selector value, can use `v-model` two-way binding                                                                                                                        | `null`           | -       |
| disabled        | `boolean`                                        | set whether to disable cascade selector                                                                                                                                            | `false`          | -       |
| multiple        | `boolean`                                        | Set whether to enable multiple selection mode                                                                                                                                      | `false`          | -       |
| no-cascaded     | `boolean`                                        | Set whether to disassociate parent and child options, after disassociation, parent options can be selected separately                                                              | `false`          | -       |
| key-config      | `CascaderKeyConfig`                              | Configure key names when parsing `options`                                                                                                                                         | `{}`             | -       |
| separator       | `string`                                         | Set the connector of option value and label, the length is `1`, note that it will be used to build the full path of the option value internally                                    | `/`              | -       |
| hover-trigger   | `boolean`                                        | Set whether to enable the mouse hover to trigger the expansion of the lower panel, invalid after enabling asynchronous loading                                                     | `false`          | -       |
| max-tag-count   | `number`                                         | In multi-select mode, set the maximum number of tags to display, when it is `0`, it will be dynamically calculated to ensure that it is displayed in one line                      | `0`              | -       |
| brief-label     | `boolean`                                        | Set whether to display the short label value                                                                                                                                       | `false`          | -       |
| no-rest-tip     | `boolean`                                        | Set whether to disable the bubble tip for extra tabs                                                                                                                               | `false`          | -       |
| on-async-load   | `(data: Data) => any[] \| Promise<any[]>`        | Set the callback function for asynchronous loading, after setting it will start asynchronous loading                                                                               | `null`           | -       |
| merge-tags      | `boolean`                                        | In multi-select mode, set whether to display the parent option when all child options are selected, and enable it in asynchronous loading will change the way of passing values ​​ | `false`          | -       |
| tag-type        | `TagType`                                        | Set the type of label in multi-select mode                                                                                                                                         | `null`           | -       |
| outside-close   | `boolean`                                        | Set whether to close the component by clicking outside                                                                                                                             | `false`          | -       |
| placeholder     | `string`                                         | same as native `placeholder`                                                                                                                                                       | `''`             | -       |
| clearable       | `boolean`                                        | Set whether the value can be cleared                                                                                                                                               | `false`          | -       |
| transition-name | `string`                                         | transition animation for options list                                                                                                                                              | `'vxp-drop'`     | -       |
| placement       | `Placement`                                      | The placement of the option list, the optional value is the same as Popper.js                                                                                                      | `'bottom-start'` | -       |
| transfer        | `boolean \| string`                              | Set the rendering position of the option list. When set to `true`, it will render to `<body>` by default                                                                           | `false`          | -       |
| empty-text      | `string`                                         | Prompt for empty options                                                                                                                                                           | `locale.empty`   | -       |
| loading         | `boolean`                                        | Set whether is loading                                                                                                                                                             | `false`          | -       |
| loading-icon    | `Record<string, any>`                            | Set the loading icon                                                                                                                                                               | `Spinner`        | -       |
| loading-lock    | `boolean`                                        | Set whether to be read-only when loading                                                                                                                                           | `false`          | -       |
| loading-effect  | `string`                                         | Set the effect animation for the loading icon                                                                                                                                      | `false`          | `2.1.0` |
| transparent     | `boolean`                                        | Set whether to be transparent                                                                                                                                                      | `false`          | `2.0.2` |
| locale          | `LocaleConfig['select']`                         | Set the locale config                                                                                                                                                              | `null`           | `2.1.0` |
| popper-alive    | `boolean`                                        | Set whether the Popper is persistent, by default it will be persistent when the `transfer` prop is not set                                                                         | `null`           | `2.2.3` |

### Cascader Events

| Name          | Description                                                                                                                                                    | Parameters                                         | Since |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----- |
| toggle        | Emitted when the option list display state changes, returns the current state                                                                                  | `(visible: boolean)`                               | -     |
| select        | Emitted when an option is selected, returns the value path and option data of the selected option                                                              | `(value: (string \| number)[], data: Data)`        | -     |
| cancel        | Emitted when the option is canceled, only in multi-select mode, returns the value path and option data of the canceled option                                  | `(value: (string \| number)[], data: Data)`        | -     |
| change        | Emitted when the selected value changes, returns the value path and option data of the option, the value path array and option data array in multi-select mode | `(value: CascaderValue, data: Data[] \| Data[][])` | -     |
| click-outside | Emitted when clicking outside the cascade selector                                                                                                             | -                                                  | -     |
| outside-close | Emitted when the option list is closed by clicking outside                                                                                                     | -                                                  | -     |
| clear         | Emitted when the value is cleared by the clear button                                                                                                          | -                                                  | -     |

### Cascader Slots

| Name    | Description                                                                                               | Parameters                                                                                                | Since |
| ------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ----- |
| default | Slot for option content, where `hasChild` provided by parameter is the result of internal calculation     | `{ option: CascaderOptionState, index: number, selected: boolean, canCheck: boolean, hasChild: boolean }` | -     |
| label   | Slot for option label value, where `hasChild` provided by parameter is the result of internal calculation | `{ option: CascaderOptionState, index: number, selected: boolean, canCheck: boolean, hasChild: boolean }` | -     |
| prefix  | Slot to prepend icon content                                                                              | -                                                                                                         | -     |
| control | Slot for selector main control content                                                                    | -                                                                                                         | -     |
| suffix  | Slot for suffix icon content                                                                              | -                                                                                                         | -     |
| empty   | Slot for empty option prompt content                                                                      | -                                                                                                         | -     |
