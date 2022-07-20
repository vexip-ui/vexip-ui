### Transfer Props

| Name          | Type                                             | Description                                                                               | Default         | Since |
| ------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------- | --------------- | ----- |
| state         | `'default' \| 'success' \| 'error' \| 'warning'` | The state of Transfer                                                                     | `'default'`     | -     |
| options       | `(string \| Record<string, any>)[]`              | Set options for the Transfer                                                              | `[]`            | -     |
| value         | `(string \| number)[]`                           | Set the value of the Transfer                                                             | `[]`            | -     |
| disabled      | `boolean`                                        | set whether disabled                                                                      | `false`         | -     |
| paged         | `boolean`                                        | Set whether paged                                                                         | `false`         | -     |
| filter        | `boolean \| FilterHandler`                       | Set whether to enable filter, the filter method can be customized when passing a function | `false`         | -     |
| empty-text    | `string`                                         | The prompt when option empty                                                              | `locale.empty`  | -     |
| key-config    | `TransferKeyConfig`                              | Set the key config when parsing `options`                                                 | `{}`            | -     |
| option-height | `number`                                         | Set the height of the option                                                              | `32`            | -     |
| ignore-case   | `boolean`                                        | Set whether to ignore case when using default filter method                               | `false`         | -     |
| source-title  | `string`                                         | Set the title of the source panel                                                         | `locale.source` | -     |
| target-title  | `string`                                         | Set the title of the target panel                                                         | `locale.target` | -     |

Some preset types:

```ts
interface TransferKeyConfig {
  value?: string,
  label?: string,
  disabled?: string
}

interface TransferOptionState {
  value: string | number,
  label: string,
  disabled: boolean,
  hidden: boolean,
  hitting: boolean,
  data: string | Record<string, any>
}

interface SlotPayload {
  type: 'source' | 'target',
  currentPage: number,
  pageSize: number,
  totalPages: number,
  allSelected: boolean,
  partial: boolean,
  selected: (string | number)[],
  options: TransferOptionState[],
  toggleSelectAll: () => void,
  handleReverse: () => void
}

type FilterHandler = (value: string, options: TransferOptionState, type: 'source' | 'target') => boolean
```

### Transfer Events

| Name   | Description                                                    | Parameters                                                                                                                                                    | Since       |
| ------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | --- |
| change | Emitted when the selected value changes                        | `(values: (string                                                                                                                                             | number)[])` | -   |
| select | Emitted when the selected state of option changed in the panel | `(type: 'source' \| 'target', selected: { source: (string \| number)[], target: (string \| number) [] }, data: { source: RawOption[], target: RawOption[] })` | -           |

### Transfer Slots

| Name          | Description                           | Parameters                                                                   | Since |
| ------------- | ------------------------------------- | ---------------------------------------------------------------------------- | ----- |
| source-header | Header slot for the source panel      | `SlotPayload`                                                                | -     |
| target-header | Header slot for the target panel      | `SlotPayload`                                                                | -     |
| header        | Header slot for panels, low priority  | `SlotPayload`                                                                | -     |
| source-title  | Title slot for the source panel       | `SlotPayload`                                                                | -     |
| target-title  | Title slot for the target panel       | `SlotPayload`                                                                | -     |
| title         | Title slot for panels, low priority   | `SlotPayload`                                                                | -     |
| source-body   | Content slot for the source panel     | `SlotPayload`                                                                | -     |
| target-body   | Content slot for the target panel     | `SlotPayload`                                                                | -     |
| body          | Content slot for panels, low priority | `SlotPayload`                                                                | -     |
| source-footer | Footer slot for the source panel      | `SlotPayload`                                                                | -     |
| target-footer | Footer slot for the target panel      | `SlotPayload`                                                                | -     |
| footer        | Footer slot for panel, low priority   | `SlotPayload`                                                                | -     |
| source-option | Option slot for source panel          | `{ type: 'source' \| 'target', option: TransferOptionState, index: number }` | -     |
| target-option | Option slot for target panel          | `{ type: 'source' \| 'target', option: TransferOptionState, index: number }` | -     |
| option        | Option slot for panels, low priority  | `{ type: 'source' \| 'target', option: TransferOptionState, index: number }` | -     |
