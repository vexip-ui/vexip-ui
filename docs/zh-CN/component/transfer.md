# Transfer 穿梭框 ==!s|2.0.0==

## 代码示例

:::demo transfer/basis

### 基础用法

最简单的用法。

:::

:::demo transfer/disabled

### 禁用状态

添加 `disabled` 属性可以设置禁用状态。

:::

:::demo transfer/paged

### 选项分页

最简单的用法。

:::

:::demo transfer/filter

### 过滤选项

添加 `filter` 属性可以开启选项过滤，传入一个函数时可以自定义过滤的方法。

:::

:::demo transfer/loading

### 加载状态

通过 `loading` 属性可以控制穿梭框的加载状态。

如果你希望在加载中时为只读，你需要添加 `loading-lock` 属性。

:::

:::demo transfer/state

### 不同状态

通过 `state` 可以设置不同的状态，添加 `deep-state` 属性可以把该状态传递给内部的控件。

:::

## API

### 预设类型

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

type TransferFilter = (value: string, options: TransferOptionState, type: 'source' | 'target') => boolean
```

### Transfer 属性

| 名称           | 类型                                             | 说明                                           | 默认值          | 始于     |
| -------------- | ------------------------------------------------ | ---------------------------------------------- | --------------- | -------- |
| state          | `'default' \| 'success' \| 'error' \| 'warning'` | 穿梭框的状态                                   | `'default'`     | -        |
| options        | `(string \| Record<string, any>)[]`              | 设置穿梭框的选项                               | `[]`            | -        |
| value          | `(string \| number)[]`                           | 设置穿梭框的值                                 | `[]`            | -        |
| disabled       | `boolean`                                        | 设置是否禁用                                   | `false`         | -        |
| paged          | `boolean`                                        | 设置是否分页                                   | `false`         | -        |
| filter         | `boolean \| TransferFilter`                      | 设置是否启用查询，传入函数时可以自定义过滤方法 | `false`         | -        |
| empty-text     | `string`                                         | 设置空选项的提示语                             | `locale.empty`  | -        |
| key-config     | `TransferKeyConfig`                              | 设置解析 `options` 时的各项键名                | `{}`            | -        |
| option-height  | `number`                                         | 设置选项的高度                                 | `32`            | -        |
| ignore-case    | `boolean`                                        | 设置使用查询方法时是否忽略大小写               | `false`         | -        |
| source-title   | `string`                                         | 设置源面板的标题                               | `locale.source` | -        |
| target-title   | `string`                                         | 设置目标面板的标题                             | `locale.target` | -        |
| deep-state     | `boolean`                                        | 设置是否同步状态到子控件                       | `false`         | `2.0.13` |
| loading        | `boolean`                                        | 设置是否为加载中                               | `false`         | -        |
| loading-icon   | `VueComponent`                                   | 设置加载中的图标                               | `Spinner`       | -        |
| loading-lock   | `boolean`                                        | 设置在加载中时是否为只读                       | `false`         | -        |
| loading-effect | `string`                                         | 设置加载中图标的效果动画                       | `false`         | -        |
| locale         | `LocaleConfig['transfer']`                       | 设置多语言配置                                 | `null`          | `2.1.0`  |

### Transfer 事件

| 名称   | 说明                               | 参数                                                                                                                                                         | 始于 |
| ------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| change | 当所选值发生变化时触发             | `(values: (string \| number)[])`                                                                                                                             | -    |
| select | 当面板中的选项的选中状态改变时触发 | `(type: 'source' \| 'target', selected: { source: (string \| number)[], target: (string \| number)[] }, data: { source: RawOption[], target: RawOption[] })` | -    |

### Transfer 插槽

| 名称          | 说明                     | 参数                                                                         | 始于 |
| ------------- | ------------------------ | ---------------------------------------------------------------------------- | ---- |
| source-header | 源面板的头部插槽         | `SlotPayload`                                                                | -    |
| target-header | 目标面板的头部插槽       | `SlotPayload`                                                                | -    |
| header        | 面板的头部插槽，低优先级 | `SlotPayload`                                                                | -    |
| source-title  | 源面板的标题插槽         | `SlotPayload`                                                                | -    |
| target-title  | 目标面板的标题插槽       | `SlotPayload`                                                                | -    |
| title         | 面板的标题插槽，低优先级 | `SlotPayload`                                                                | -    |
| source-body   | 源面板的内容插槽         | `SlotPayload`                                                                | -    |
| target-body   | 目标面板的内容插槽       | `SlotPayload`                                                                | -    |
| body          | 面板的内容插槽，低优先级 | `SlotPayload`                                                                | -    |
| source-footer | 源面板的脚部插槽         | `SlotPayload`                                                                | -    |
| target-footer | 目标面板的脚部插槽       | `SlotPayload`                                                                | -    |
| footer        | 面板的脚部插槽，低优先级 | `SlotPayload`                                                                | -    |
| source-option | 源面板的选项插槽         | `{ type: 'source' \| 'target', option: TransferOptionState, index: number }` | -    |
| target-option | 目标面板的选项插槽       | `{ type: 'source' \| 'target', option: TransferOptionState, index: number }` | -    |
| option        | 面板的选项插槽，低优先级 | `{ type: 'source' \| 'target', option: TransferOptionState, index: number }` | -    |
