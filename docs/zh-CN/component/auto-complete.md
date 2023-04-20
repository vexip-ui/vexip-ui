# 自动完成 AutoComplete

## 代码示例

在输入时提供一些选项帮助快速完成，可以当搜索框用。

你或许会奇怪它和带搜索功能的 Select 有何不同？只需记住两个关键词：输入和选择。

:::demo autocomplete/basis

### 基础用法

通过 `options` 属性来设置自动完成的数据源。

:::

:::demo autocomplete/clearable

### 可清空

添加 `clearable` 属性可以开启可清空功能。

:::

:::demo autocomplete/custom-key

### 自定义键

通过 `key-config` 可以指定解析选项的各项键值，毕竟有时候处理选项也挺麻烦的。

:::

:::demo autocomplete/filter

### 过滤选项

用作搜索框时可以设置 `filter` 属性来开启选项过滤。

当设置为 `true` 时将启用内置的过滤方法，当设置为函数时可以传入一个自定义的过滤方法。

添加 `ignore-case` 属性可以设置过滤时忽略大小写进行比较。

:::

:::demo autocomplete/group

### 选项分组

传入选项时，设置 `group` 选项为 `true`，并将子项放在 `children` 选项下，可以实现分组。

通过 `group` 插槽可以自定义组标签的内容。

:::

:::demo autocomplete/loading

### 加载状态

通过 `loading` 属性可以控制自动完成组件的加载状态。

如果你希望在加载中时为只读，你需要添加 `loading-lock` 属性。

:::

:::demo autocomplete/option

### 自定义选项

使用 Option 组件作为插槽可以实现自定义选项。

:::

## API

### 预设类型

```ts
export interface AutoCompleteKeyConfig {
  value?: string,
  disabled?: string,
  divided?: string,
  noTitle?: string,
  group?: string,
  children?: string
}

type AutoCompleteRawOption = string | Record<string, any>

interface AutoCompleteOptionState {
  value: string | number,
  disabled: boolean,
  divided: boolean,
  noTitle: boolean,
  hidden: boolean,
  hitting: boolean,
  group: boolean,
  depth: number,
  parent: AutoCompleteOptionState | null,
  data: AutoCompleteRawOption
}

type AutoCompleteFilter = (value: string | number, options: AutoCompleteOptionState) => boolean
```

### AutoComplete 属性

| 名称           | 类型                                             | 说明                                                    | 默认值      | 始于    |
| -------------- | ------------------------------------------------ | ------------------------------------------------------- | ----------- | ------- |
| value          | `string \| number`                               | Input 控件的值                                          | `''`        | -       |
| options        | `AutoCompleteRawOption[]`                        | 可选项列表，可以是字符串或者符合 `ObjectOption` 的对象  | `[]`        | -       |
| filter         | `boolean \| AutoCompleteFilter`                  | 过滤 `options` 的方法，传入 `ture` 时会使用内置比较方法 | `false`     | -       |
| prefix         | `Record<string, any>`                            | 前缀图标，使用前缀插槽时无效                            | `null`      | -       |
| prefix-color   | `string`                                         | 前缀内容的颜色，会影响前缀插槽                          | `''`        | -       |
| suffix         | `Record<string, any>`                            | 后缀图标，使用后缀插槽时无效                            | `null`      | -       |
| suffix-color   | `string`                                         | 后缀内容的颜色，会影响后缀插槽                          | `''`        | -       |
| placeholder    | `string`                                         | Input 控件占位符                                        | `null`      | -       |
| size           | `'small' \| 'default' \| 'large'`                | 设置输入控件大小                                        | `'default'` | -       |
| state          | `'default' \| 'success' \| 'error' \| 'warning'` | 输入框的状态                                            | `'default'` | -       |
| disabled       | `boolean`                                        | 设置是否禁用                                            | `false`     | -       |
| drop-disabled  | `boolean`                                        | 是否允许下拉列表显示                                    | `false`     | -       |
| placement      | `Placement`                                      | 选项列表出现的位置，可选值同 Popper.js                  | `'bottom'`  | -       |
| clearable      | `boolean`                                        | 设置是否可以清空值                                      | `false`     | -       |
| ignore-case    | `boolean`                                        | 在使用内置的过滤时，设置是否忽略大小写                  | `false`     | -       |
| key-config     | `AutoCompleteKeyConfig`                          | 设置选项解析 `options` 时的各项键名                     | `{}`        | `2.0.0` |
| loading        | `boolean`                                        | 设置是否为加载中                                        | `false`     | `2.0.0` |
| loading-icon   | `Record<string, any>`                            | 设置加载中的图标                                        | `Spinner`   | `2.0.0` |
| loading-lock   | `boolean`                                        | 设置在加载中时是否为只读                                | `false`     | `2.0.0` |
| loading-effect | `string`                                         | 设置加载中图标的效果动画                                | `false`     | `2.0.0` |
| transparent    | `boolean`                                        | 设置是否为透明模式                                      | `false`     | `2.0.2` |
| locale         | `LocaleConfig['input']`                          | 设置多语言配置                                          | `null`      | `2.1.0` |

### AutoComplete 事件

| 名称   | 说明                                        | 参数                                                     | 始于 |
| ------ | ------------------------------------------- | -------------------------------------------------------- | ---- |
| input  | 当在 Input 控件中输入触发，返回当前输入的值 | `(value: string)`                                        | -    |
| toggle | 当候选列表显示状态改变时触发，返回当前状态  | `(visible: boolean)`                                     | -    |
| change | 当值改变后并焦点消失时触发，返回当前的值    | `(value: number \| string, data: AutoCompleteRawOption)` | -    |
| select | 当使用选项时触发，返回当前的值              | `(value: number \| string, data: AutoCompleteRawOption)` | -    |
| enter  | 当按下回车时触发，返回当前的值              | `(value: number \| string)`                              | -    |
| clear  | 当使用清空按钮清空时触发，无返回值          | -                                                        | -    |

### AutoComplete 插槽

| 名称    | 说明                                                                                         | 参数                                                                                                                                   | 始于 |
| ------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| default | 选项列表的插槽，使用插槽传入选项会使内置的选项过滤、按键选值等功能失效，需要手动实现这些功能 | -                                                                                                                                      | -    |
| prefix  | 前置图标内容的插槽                                                                           | -                                                                                                                                      | -    |
| suffix  | 后缀图标内容的插槽                                                                           | -                                                                                                                                      | -    |
| control | 输入控件的插槽，接受 5 个参数，分别为当前值与 4 个事件回调方法                               | `(value: number \| string, onInput: (event: string \| Event) => void, onChange: () => void, onEnter: () => void, onClear: () => void)` | -    |
