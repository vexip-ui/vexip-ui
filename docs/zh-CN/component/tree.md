# Tree 树形列表

用于快速生成多层次的结构列表，通常在需要展示文件夹、组织架构、分类等的场景中使用，能够清晰地展现各层级的关系。

## 代码示例

:::demo tree/basis

### 基础用法

使用 `data` 属性传入一个列表数据即可生成相应的树。

该列表数据需包含可以构建树的必要信息，即唯一的键值和父级的键值。

:::

:::demo tree/tree-data

### 树形数据

默认情况下 `data` 属性接收的是展平的列表数据。

添加 `no-build-tree` 属性后，`data` 属性传入的数据将按照树形结构进行解析。

:::

:::demo tree/checkbox

### 复选框

添加 `checkbox` 属性可以开启复选框模式。

:::

:::demo tree/suffix-checkbox

### 后置复选框

同时添加 `checkbox` 和 `suffix-checkbox` 属性可以开启后置复选框。

:::

:::demo tree/no-cascaded

### 非关联节点

添加 `no-cascaded` 属性可以使父子节点能被独立勾选。

:::

:::demo tree/disabled

### 禁用效果

通过节点的 `disabled`、`selectDisabled`、`expandDisabled` 和 `checkDisabled` 选项可以控制节点的禁用状态。

其中的 `disabled` 选项开启后会完全禁用节点及下级节点的所有交互，使它们只能保持初始状态。

你可以开启非关联模式（`no-cascaded`）使其不影响下级节点。

此外的选项可以分别控制该节点对应的交互禁用状态，并且不会影响下级节点。

:::

:::demo tree/arrow-icon

### 箭头图标

==!s|2.2.5==

通过 `arrow-icon` 属性可以替换箭头位置的图标。

如果你觉得还不满足，可以使用 `arrow` 插槽进行自定义。

:::

:::demo tree/filter

### 过滤节点

通过 `filter` 属性可以开启过滤节点功能。

当传入字符串时，会在组件内部使用字符串比较的算法根据节点的 `label` 过滤，你也可以传入一个自定义的过滤函数。

:::

:::demo tree/drag

### 节点拖拽

添加 `draggable` 属性可以开启树节点拖拽。

:::

:::demo tree/props

### 节点属性

使用 `node-props` 属性可以为所有节点设置根元素的 html 属性。

:::

:::demo tree/async-load

### 异步加载

通过 `on-async-load` 属性可以实现节点异步加载，由于 `data` 是完全受控属性，因此你需要直接将新的数据更新至 `data` 里。

当加载失败时，需要返回 `false` 以告知组件该节点加载失败，否则其他情况均认为节点加载成功，该节点将会被标记为已加载。

:::

:::demo tree/slot

### 自定义节点

通常情况下，使用 `label` 插槽可以自定义节点标签的内容。

如果你希望完全自定义节点的内容，可以使用 `node` 插槽，不过我不是很建议你这样做。

:::

:::demo tree/control

### 控制方法

通过 Tree 实例可以使用一些方法控制树的节点状态。

:::

:::demo tree/floor-select

### 选择展开

添加 `floor-select` 属性可以使得在选中节点时触发展开收起。

注意，开启该特性后节点的选择特性将会失效，如果需要精确的标签交互可以使用 `label-click` 事件。

:::

:::demo tree/link-line

### 连接线

添加 `link-line` 属性可以为树节点添加连接线，还可以传入一个值指定连接线的样式。

:::

:::demo tree/post-create

### 创建后处理

通过设置 `post-create` 属性，可以在节点创建后进行后处理。

除了 `id`、`parent`、`children` 属性外，其余属性均可修改。

比如，节点的初始化信息并没有直接保存在树形数据里，而是单独记录时，这将很有用。

:::

:::demo tree/virtual

### 虚拟滚动

==!s|2.1.30==

添加 `virtual` 属性开启虚拟化，数据太多的时候，你应该会需要它。

:::

:::demo tree/external

### 额外内容

==!s|2.2.5==

通过 `prefix` 和 `suffix` 插槽可以分别自定义节点标签的前置和后置内容。

尽管只使用 `label` 插槽你也可以实现这个功能，但它们能帮助你更好地逻辑解耦。

:::

:::demo tree/block-effect

### 块级效应

==!s|2.2.5==

添加 `block-effect` 属性可以使得节点的效应作用在整个节点块。

:::

## API

### 预设类型

```ts
type Key = string | number | symbol
type Data = Record<string, any>

type TreeNodeDropType = 'before' | 'inner' | 'after'
type TreeLinkLine = 'dashed' | 'solid' | 'dotted' | 'none'

interface TreeNodeKeyConfig {
  id?: string,
  parent?: string,
  label?: string,
  children?: string,
  visible?: string,
  selected?: string,
  expanded?: string,
  disabled?: string,
  checked?: string,
  loading?: string,
  loaded?: string,
  loadFail?: string,
  readonly?: string,
  arrow?: string,
  checkbox?: string,
  selectDisabled?: string,
  expandDisabled?: string,
  checkDisabled?: string,
  isLeaf?: string
}

type TreeNodeProps<D = Data> = {
  id: Key,
  parent?: Key,
  children: TreeNodeProps[],
  visible: boolean,
  selected: boolean,
  expanded: boolean,
  disabled: boolean,
  checked: boolean,
  loading: boolean,
  loaded: boolean,
  loadFail: boolean,
  readonly: boolean,
  arrow: boolean | 'auto',
  checkbox: boolean,
  selectDisabled: boolean,
  expandDisabled: boolean,
  checkDisabled: boolean,
  isLeaf: boolean | 'auto',
  data: D
}

type TreeNodePostCreate<D = Data> = (node: TreeNodeProps<D>) => void
type TreeNodeRenderFn<D = Data> = (params: { data: D, node: TreeNodeProps<D> }) => any

interface TreeCommonSlotParams {
  data: Data,
  node: TreeNodeProps,
  depth: number,
  focused: boolean
}

interface TreeNodeSlotParams extends TreeCommonSlotParams {
  lineCount: number,
  toggleCheck: (checked?: boolean) => void,
  toggleExpand: (expanded?: boolean) => Promise<void>,
  toggleSelect: (able?: boolean) => Promise<void>
}
```

### Tree 属性

| 名称            | 类型                                                                   | 说明                                                                                                                                                                    | 默认值         | 始于     |
| --------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | -------- |
| data            | `Data[]`                                                               | 树数据源，支持传入待构建的数组结构或者已处理的树结构                                                                                                                    | `[]`           | -        |
| arrow           | `'auto' \| boolean`                                                    | 设置节点是否带有箭头指示，设置为 `'auto'` 时会根据节点是否有下级自动显示隐藏                                                                                            | `'auto'`       | -        |
| no-build-tree   | `boolean`                                                              | 设置是否禁用内置的构建树，当 `data` 的数据源为树形结构时设置                                                                                                            | `false`        | -        |
| empty-tip       | `string`                                                               | 数据为空时显示的提示                                                                                                                                                    | `locale.empty` | -        |
| disabled        | `boolean`                                                              | 设置树是否为禁用状态，若设置后，所有的树节点将被禁用                                                                                                                    | `false`        | -        |
| readonly        | `boolean`                                                              | 设置树是否为只读状态，若设置后，所有的树节点将为只读                                                                                                                    | `false`        | -        |
| checkbox        | `boolean`                                                              | 设置是否开启节点的复选框                                                                                                                                                | `false`        | -        |
| draggable       | `boolean`                                                              | 设置节点是否可拖拽                                                                                                                                                      | `false`        | -        |
| renderer        | `TreeNodeRenderFn`                                                     | 使用 render 函数进行节点渲染                                                                                                                                            | `null`         | -        |
| prefix-renderer | `TreeNodeRenderFn`                                                     | 使用 render 函数进行前置内容渲染                                                                                                                                        | `null`         | `2.2.5`  |
| suffix-renderer | `TreeNodeRenderFn`                                                     | 使用 render 函数进行后置内容渲染                                                                                                                                        | `null`         | `2.2.5`  |
| multiple        | `boolean`                                                              | 设置是否开启多选模式                                                                                                                                                    | `false`        | -        |
| indent          | `string \| number`                                                     | 设置每层树节点的缩进距离                                                                                                                                                | `'16px'`       | -        |
| accordion       | `boolean`                                                              | 设置是否开启手风琴模式                                                                                                                                                  | `false`        | -        |
| appear          | `boolean`                                                              | 设置树节点过渡效果的 `appear` 值                                                                                                                                        | `false`        | -        |
| floor-select    | `boolean`                                                              | 开启后，当选择存在下级的节点时，会触发节点的展开收起，无下级时才会触发选择取消事件                                                                                      | `false`        | -        |
| on-async-load   | `(data: Data, node: TreeNodeProps) => void \| boolean \| Promise<any>` | 节点初次加载触发的回调函数，接受 `node` 对象作为参数，如果返回 `false` 则表示加载失败，支持异步函数和 `Promise`                                                         | `null`         | -        |
| cache-node      | `boolean`                                                              | 设置是否开启节点数据缓存机制，开启后当每次 `data` 发生变化时，同个对象引用或者 `id` 值相同的节点，除了 `id`、`parent`、`children` 和 `label` 属性外其余属性将不会被刷新 | `false`        | -        |
| root-id         | `string \| number`                                                     | 设置根节点的 `id` 值，设置后，当 parent 值与该值相等的节点，将作为第一级节点展示                                                                                        | `null`         | -        |
| key-config      | `NodeKeyConfig`                                                        | 配置解析节点初始化时的各项键名                                                                                                                                          | `{}`           | `2.0.0`  |
| no-cascaded     | `boolean`                                                              | 使父子节点能被独立勾选                                                                                                                                                  | `false`        | `2.0.0`  |
| filter          | `string \| ((data: Data, node: TreeNodeProps) => boolean)`             | 过滤节点，传入一个字符串时会根据节点的 `label` 值过滤，或者传入一个自定义的过滤函数                                                                                     | `''`           | `2.0.0`  |
| ignore-case     | `boolean`                                                              | 设置在使用内置的过滤时是否忽略大小写                                                                                                                                    | `false`        | `2.0.0`  |
| node-props      | `Data \| ((data: Data, node: TreeNodeProps) => Data)`                  | 设置所有子节点根元素的 html 属性                                                                                                                                        | `null`         | `2.0.0`  |
| locale          | `LocaleConfig['tree']`                                                 | 设置多语言配置                                                                                                                                                          | `null`         | `2.1.0`  |
| link-line       | `boolean \| TreeLinkLine`                                              | 设置是否添加连接线                                                                                                                                                      | `false`        | `2.1.6`  |
| post-create     | `TreeNodePostCreate`                                                   | 节点创建时的后处理方法                                                                                                                                                  | `null`         | `2.1.7`  |
| virtual         | `boolean`                                                              | 是否开启虚拟滚动                                                                                                                                                        | `false`        | `2.1.30` |
| node-min-height | `number`                                                               | 设置节点最小高度，仅用于虚拟滚动计算，不会应用样式                                                                                                                      | `26`           | `2.1.30` |
| use-y-bar       | `boolean`                                                              | 设置树是否使用纵向滚动条                                                                                                                                                | `false`        | `2.1.30` |
| no-transition   | `boolean`                                                              | 是否禁用展开收起时的过渡效果                                                                                                                                            | `false`        | `2.1.30` |
| arrow-icon      | `Record<string, any>`                                                  | 设置箭头位置的图标                                                                                                                                                      | `null`         | `2.2.5`  |
| block-effect    | `boolean`                                                              | 节点是否为块级效应                                                                                                                                                      | `false`        | `2.2.5`  |
| filter-leaf     | `boolean`                                                              | 是否仅过滤叶子节点                                                                                                                                                      | `false`        | `2.2.14` |

### Tree 事件

| 名称        | 说明                                                                                           | 参数                                                              | 始于 |
| ----------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ---- |
| node-change | 当节点的复选框状态发生改变时触发，返回当前节点的数据和节点对象                                 | `(data: Data, node: TreeNodeProps, checked: boolean)`             | -    |
| node-click  | 当节点被点击时触发，返回当前节点数据和节点对象                                                 | `(data: Data, node: TreeNodeProps)`                               | -    |
| node-select | 当节点被选择时触发，返回当前节点的数据和节点对象，如果开启的多选模式，则返回的参数类型均为数组 | `(data: Data \| Data[], nodes: TreeNodeProps \| TreeNodeProps[])` | -    |
| node-cancel | 当节点被取消选择时触发，返回当前节点的数据和节点对象                                           | `(data: Data, node: TreeNodeProps)`                               | -    |
| node-expand | 当节点被展开时触发，返回当前节点的数据和节点对象                                               | `(data: Data, node: TreeNodeProps)`                               | -    |
| node-reduce | 当节点被收起时触发，返回当前节点的数据和节点对象                                               | `(data: Data, node: TreeNodeProps)`                               | -    |
| drag-start  | 当节点将要开始拖拽时触发，返回当前节点的数据和节点对象                                         | `(data: Data, node: TreeNodeProps)`                               | -    |
| drag-over   | 当节点正在拖拽时触发，返回当前节点的数据和节点对象                                             | `(data: Data, node: TreeNodeProps)`                               | -    |
| drop        | 当节点被其他的拖拽节点放入时触发，返回当前节点的数据和节点对象                                 | `(data: Data, node: TreeNodeProps， dropType: NodeDropType)`      | -    |
| drag-end    | 当节点结束拖拽时触发，返回当前节点的数据和节点对象                                             | `(data: Data, node: TreeNodeProps)`                               | -    |
| label-click | 当节点标签被点击时触发，返回当前节点的数据和节点对象                                           | `(data: Data, node: TreeNodeProps)`                               | -    |

### Tree 插槽

| 名称   | 说明                                                                                                                                                                     | 参数                   | 始于    |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- | ------- |
| label  | 节点标签的插槽                                                                                                                                                           | `TreeCommonSlotParams` | -       |
| node   | 节点内容的插槽，使用该插槽将完全覆盖节点各元素，包括箭头、复选框等，插槽额外的三个方法 `toggleCheck`、`toggleExpand`、`toggleSelect`，分别用于触发节点的勾选、展开、选择 | `TreeNodeSlotParams`   | -       |
| empty  | 当数据为空时的提示文字的插槽                                                                                                                                             | -                      | -       |
| prefix | 节点前置内容的插槽                                                                                                                                                       | `TreeCommonSlotParams` | `2.2.5` |
| suffix | 节点后置内容的插槽                                                                                                                                                       | `TreeCommonSlotParams` | `2.2.5` |
| arrow  | 节点箭头内容的插槽                                                                                                                                                       | `TreeCommonSlotParams` | `2.2.5` |

### Tree 方法

| 名称                    | 说明                                                                                                                                        | 签名                                                                        | 始于     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------- |
| parseAndTransformData   | 触发组件内部重新进行数据的解析和转换                                                                                                        | `() => void`                                                                | -        |
| forceUpdateData         | 强制更新数据，一般在手动更改了数据源后更新树使用                                                                                            | `() => void`                                                                | -        |
| syncNodeStateIntoData   | 将 node 中的状态属性同步到 data 中，将会覆盖 `visible`、`selected`、`expanded`、`disabled`、`checked`、`loading`、`readonly` 字段，谨慎使用 | `() => void`                                                                | -        |
| getCheckedNodes         | 获取所有复选框被勾选的节点对象                                                                                                              | `(includePartial?: boolean) => TreeNodeProps[]`                             | -        |
| getCheckedNodeData      | 获取所有复选框被勾选的节点数据                                                                                                              | `(includePartial?: boolean) => Data[]`                                      | -        |
| getSelectedNodes        | 获取所有被选择的节点对象                                                                                                                    | `() => TreeNodeProps[]`                                                     | -        |
| getSelectedNodeData     | 获取所有被选择的节点数据                                                                                                                    | `() => Data[]`                                                              | -        |
| getExpandedNodes        | 获取所有展开的节点对象                                                                                                                      | `() => TreeNodeProps[]`                                                     | -        |
| getDisabledNodes        | 获取所有被禁用的节点对象                                                                                                                    | `() => TreeNodeProps[]`                                                     | -        |
| getNodeChildren         | 获取节点对象的子节点对象                                                                                                                    | `(node: TreeNodeProps) => TreeNodeProps[]`                                  | -        |
| getParentNode           | 根据节点对象获取其父节点对象，不存在则返回 `null`                                                                                           | `(node: TreeNodeProps) => TreeNodeProps \| null`                            | -        |
| getSiblingNodes         | 根据节点对象获取所有兄弟节点对象，默认不包含自身                                                                                            | `(node: TreeNodeProps, includeSelf: boolean) => TreeNodeProps[]`            | -        |
| getPrevSiblingNode      | 根据节点对象获取上一个兄弟节点对象，不存在则返回 `null`                                                                                     | `(node: TreeNodeProps) => TreeNodeProps \| null`                            | -        |
| getNextSiblingNode      | 根据节点对象获取下一个兄弟节点对象，不存在则返回 `null`                                                                                     | `(node: TreeNodeProps) => TreeNodeProps \| null`                            | -        |
| getNodeByData           | 根据数据获取节点对象                                                                                                                        | `<T extends Data>(data: T) => TreeNodeProps \| null`                        | -        |
| expandNodeByData        | 根据数据更改节点的展开状态                                                                                                                  | `<T extends Data>(data: T, expanded?: boolean, upstream?: boolean) => void` | -        |
| selectNodeByData        | 根据数据更改节点的选择状态                                                                                                                  | `<T extends Data>(data: T, selected?: boolean) => void`                     | -        |
| checkNodeByData         | 根据数据更改节点的复选框被选状态                                                                                                            | `<T extends Data>(data: T, checked?: boolean) => void`                      | -        |
| toggleNodeLoadingByData | 根据数据更改节点的加载状态                                                                                                                  | `<T extends Data>(data: T, loading?: boolean) => void`                      | -        |
| isLeafNode              | 判断节点是否为叶子节点                                                                                                                      | `(node: TreeNodeProps) => boolean`                                          | `2.2.14` |
| getTreeData             | 获取树形的原始数据                                                                                                                          | `(withFilter?: boolean) => Data[]`                                          | `2.2.14` |
| getFlattedData          | 获取展平的原始数据                                                                                                                          | `(withFilter?: boolean) => Data[]`                                          | `2.2.14` |
| updateVisibleNodeEls    | 触发更新可访问的节点元素（用于处理键盘操作）                                                                                                | `() => void`                                                                | `2.2.14` |

### TreeNode 属性

> 以下属性在节点初始化时会从 data 的同名属性中获取初始值，若未定义则使用默认值，注意节点的刷新会触发该节点重新初始化。

| 名称     | 类型                | 说明                                                                                                 | 默认值   | 始于     |
| -------- | ------------------- | ---------------------------------------------------------------------------------------------------- | -------- | -------- |
| label    | `string`            | 节点显示的标签内容                                                                                   | `''`     | -        |
| selected | `boolean`           | 设置节点的选择状态                                                                                   | `false`  | -        |
| expanded | `boolean`           | 设置节点的展开状态                                                                                   | `false`  | -        |
| disabled | `boolean`           | 设置节点的禁用状态，不设置时会使用 Tree 的同名状态                                                   | `false`  | -        |
| readonly | `boolean`           | 设置节点的只读状态，不设置时会使用 Tree 的同名状态                                                   | `false`  | -        |
| checkbox | `boolean`           | 设置节点是否具有复选框，不设置时会使用 Tree 的状态                                                   | `false`  | -        |
| arrow    | `'auto' \| boolean` | 设置节点是否带有箭头指示，设置为 `'auto'` 时会根据是否有子级自动显示隐藏，不设置时会使用 Tree 的状态 | `'auto'` | -        |
| checked  | `boolean`           | 设置节点的复选框被选状态                                                                             | `false`  | -        |
| loading  | `boolean`           | 设置节点是否处于加载中状态                                                                           | `false`  | -        |
| loaded   | `boolean`           | 设置节点是否已加载                                                                                   | `false`  | -        |
| loadFail | `boolean`           | 设置节点是否加载失败                                                                                 | `false`  | `2.2.14` |
| isLeaf   | `'auto' \| boolean` | 强制指定节点是否为叶子节点，设置为 `'auto'` 时会根据是否有子级进行判断                               | `'auto'` | `2.2.14` |
