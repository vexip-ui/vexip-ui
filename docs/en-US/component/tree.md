# Tree

It is used to quickly generate a multi-level structure list. It is usually used in scenarios that need to display folders, organizational structures, classifications, etc., and can clearly show the relationship of each level.

## Demos

:::demo tree/basis

### Basis Usage

Use the `data` prop to pass in a list of data to generate the corresponding tree.

The data needs to contain the necessary information to build the tree, namely unique key and parent key.

:::

:::demo tree/tree-data

### Tree Data

By default the `data` prop receives flattened list data.

After adding the `no-build-tree` prop, the data passed in the `data` prop will be parsed according to the tree structure.

:::

:::demo tree/checkbox

### Checkbox

Add the `checkbox` prop to enable checkbox mode.

:::

:::demo tree/suffix-checkbox

### Suffix Checkbox

Adding the `checkbox` and `suffix-checkbox` props at the same time enables the suffix checkbox.

:::

:::demo tree/no-cascaded

### No Cascaded Nodes

Adding the `no-cascaded` prop enables parent and child nodes to be checked independently.

:::

:::demo tree/disabled

### Disabled Effects

The node's disabled state can be controlled by `disabled`, `selectDisabled`, `expandDisabled` and `checkDisabled` options.

When the `disabled` option is true, all interactions of the node and the under nodes will be completely disabled, so that they can only maintain the initial state.

You can enable the no cascaded mode (`no-cascaded`) so that it does not effect the under nodes.

The other options can respectively control the interaction disabled state of the node, and will not effect the under nodes.

:::

:::demo tree/arrow-icon

### Arrow Icon

==!s|2.2.5==

The icon at the arrow position can be changed via the `arrow-icon` prop.

If you're not satisfied yet, you can customize it using the `arrow` slot.

:::

:::demo tree/filter

### Filter Nodes

Filter nodes can be enabled through the `filter` prop.

A string comparison algorithm is used inside the component to filter according to the `label` of nodes when passing in a string, or you can also pass in a custom filter function.

:::

:::demo tree/drag

### Drag Node

Adding the `draggable` prop enables tree node dragging.

:::

:::demo tree/props

### Node Props

Use the `node-props` prop to set the html attributes of the root element for all nodes.

:::

:::demo tree/async-load

### Async Load

Nodes can async load via `on-async-load` prop. Since `data` is a fully controlled prop, you need to update the `data` prop directly.

You need to return `false` to inform the component when the node failed to load, otherwise the node is considered to be successfully loaded and the node will be marked as loaded.

:::

:::demo tree/slot

### Custom Node

Normally, the content of a node label can be customized using the `label` slot.

If you want to completely customize the content of the node, you can use the `node` slot, but I don't really recommend it.

:::

:::demo tree/control

### Control Methods

There are a number of methods that can be used to control the node state of the tree through the Tree instance.

:::

:::demo tree/floor-select

### Select To Expand

Add the `floor-select` prop to trigger expand and reduce when select a node.

Note that the node selection feature will be disabled when this feature is enabled, if you need precise label interaction you can use the `label-click` event.

:::

:::demo tree/link-line

### Link Line

Add the `link-line` prop to create link lines for the tree nodes, and you can also pass a value to specify the style of the link line.

:::

:::demo tree/post-create

### Post Create

Each node can be post processed when created via passing a function to `post-create` prop.

Except `id`, `parent`, `children` options, other options can be modified.

This can be useful, for example, when init info for nodes is not stored directly in the tree data, but is recorded separately.

:::

:::demo tree/virtual

### Virtual Scroll

==!s|2.1.30==

Add the `virtual` prop to enable virtualization. You may need it when there is too much data.

:::

:::demo tree/external

### External Content

==!s|2.2.5==

You can customize prefix and suffix content of node label respectively via the `prefix` and `suffix` slots.

Although you can implement this feature just using `label` slot, they help you better to decouple the logic.

:::

:::demo tree/block-effect

### Block Effect

==!s|2.2.5==

Adding the `block-effect` prop to make the effect apply to the entire block of the node.

:::

## API

### Preset Types

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
  /** @deprecated */
  lineCount: number,
  lineIndexes: number[],
  toggleCheck: (checked?: boolean) => void,
  toggleExpand: (expanded?: boolean) => Promise<void>,
  toggleSelect: (able?: boolean) => Promise<void>
}
```

### Tree Props

| Name            | Type                                                                   | Description                                                                                                                                                                                                                                      | Default        | Since    |
| --------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | -------- |
| data            | `Data[]`                                                               | Tree data source, supports passing in the array structure to be constructed or the processed tree structure                                                                                                                                      | `[]`           | -        |
| arrow           | `'auto' \| boolean`                                                    | Set whether the tree node has arrow indication, when set to `'auto'`, it will be automatically displayed and hidden according to whether the node has subordinates                                                                               | `'auto'`       | -        |
| no-build-tree   | `boolean`                                                              | Set whether to disable the built-in build tree, set when the data source of `data` is a tree structure                                                                                                                                           | `false`        | -        |
| empty-text      | `string`                                                               | Tip to show when data is empty                                                                                                                                                                                                                   | `locale.empty` | `2.2.15` |
| disabled        | `boolean`                                                              | Set whether the tree is disabled, if set, all tree nodes will be disabled                                                                                                                                                                        | `false`        | -        |
| readonly        | `boolean`                                                              | Set whether the tree is read-only, if set, all tree nodes will be read-only                                                                                                                                                                      | `false`        | -        |
| checkbox        | `boolean`                                                              | Set whether to enable the checkbox of the node                                                                                                                                                                                                   | `false`        | -        |
| draggable       | `boolean`                                                              | Set whether the node is draggable                                                                                                                                                                                                                | `false`        | -        |
| renderer        | `(data: { data: Data, node: TreeNodeProps, depth: number }) => any`    | Set the render function to render node content                                                                                                                                                                                                   | `null`         | -        |
| prefix-renderer | `TreeNodeRenderFn`                                                     | Set the render function to render prefix content                                                                                                                                                                                                 | `null`         | `2.2.5`  |
| suffix-renderer | `TreeNodeRenderFn`                                                     | Set the render function to render suffix content                                                                                                                                                                                                 | `null`         | `2.2.5`  |
| multiple        | `boolean`                                                              | Set whether to enable multiple selection mode                                                                                                                                                                                                    | `false`        | -        |
| indent          | `string \| number`                                                     | Set the indent distance of each tree node                                                                                                                                                                                                        | `'16px'`       | -        |
| accordion       | `boolean`                                                              | Set whether to enable accordion mode                                                                                                                                                                                                             | `false`        | -        |
| appear          | `boolean`                                                              | Set the `appear` value of the transition effect of the tree node                                                                                                                                                                                 | `false`        | -        |
| floor-select    | `boolean`                                                              | When enabled, when a node with subordinates is selected, the node will be expanded and collapsed, and the selection cancellation event will be triggered when there are no subordinates                                                          | `false`        | -        |
| on-async-load   | `(data: Data, node: TreeNodeProps) => void \| boolean \| Promise<any>` | The callback function triggered by the initial load of the node, accepts the `node` object as a parameter, if it returns `false`, it means that the load fails , supports async functions and `Promise`                                          | `null`         | -        |
| cache-node      | `boolean`                                                              | Set whether to enable the node data cache mechanism. After enabling, every time `data` changes, the same object refers to the node with the same `id` value, except for `id`, `parent` , `children` and `label` properties will not be refreshed | `false`        | -        |
| root-id         | `string \| number`                                                     | Set the `id` value of the root node. After setting, when the parent value is equal to this value, it will be displayed as the first level node                                                                                                   | `null`         | -        |
| key-config      | `NodeKeyConfig`                                                        | Configure the key names when the parsing node is initialized                                                                                                                                                                                     | `{}`           | `2.0.0`  |
| no-cascaded     | `boolean`                                                              | Enable parent and child nodes to be checked independently                                                                                                                                                                                        | `false`        | `2.0.0`  |
| filter          | `string \| ((data: Data, node: TreeNodeProps) => boolean)`             | Set to filter nodes. When a string is passed in, it will be filtered according to the `label` value of nodes, or a custom filter will be passed in function                                                                                      | `''`           | `2.0.0`  |
| ignore-case     | `boolean`                                                              | Set whether to ignore case when using built-in filtering                                                                                                                                                                                         | `false`        | `2.0.0`  |
| node-props      | `Data \| ((data: Data, node: TreeNodeProps) => Data)`                  | Set the html attributes of the root element of all child nodes                                                                                                                                                                                   | `null`         | `2.0.0`  |
| locale          | `LocaleConfig['tree']`                                                 | Set the locale config                                                                                                                                                                                                                            | `null`         | `2.1.0`  |
| link-line       | `boolean \| TreeLinkLine`                                              | Set whether to add link line                                                                                                                                                                                                                     | `false`        | `2.1.6`  |
| post-create     | `TreeNodePostCreate`                                                   | The post process when node is created                                                                                                                                                                                                            | `null`         | `2.1.7`  |
| virtual         | `boolean`                                                              | Whether enable virtual scroll                                                                                                                                                                                                                    | `false`        | `2.1.30` |
| node-min-height | `number`                                                               | Set node min height, only use for virtual scroll, no applied style                                                                                                                                                                               | `26`           | `2.1.30` |
| use-y-bar       | `boolean`                                                              | Set whether the table uses vertical scroll bar                                                                                                                                                                                                   | `false`        | `2.1.30` |
| no-transition   | `boolean`                                                              | Whether disable transition of expanding or collapsing                                                                                                                                                                                            | `false`        | `2.1.30` |
| arrow-icon      | `VueComponent`                                                         | Set the icon at the arrow position                                                                                                                                                                                                               | `null`         | `2.2.5`  |
| block-effect    | `boolean`                                                              | Whether the node is block effect                                                                                                                                                                                                                 | `false`        | `2.2.5`  |
| filter-leaf     | `boolean`                                                              | Whether only filter the leaf nodes                                                                                                                                                                                                               | `false`        | `2.2.14` |

### Tree Events

| Name        | Description                                                                                                                                                             | Parameters                                                        | Since |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----- |
| node-change | Emitted when the state of the node's checkbox changes, returns the current node's data and node object                                                                  | `(data: Data, node: TreeNodeProps, checked: boolean)`             | -     |
| node-click  | Emitted when a node is clicked, returns the current node data and node object                                                                                           | `(data: Data, node: TreeNodeProps)`                               | -     |
| node-select | Emitted when a node is selected, returns the data and node object of the current node, if the multi-select mode is enabled, the returned parameter types are all arrays | `(data: Data \| Data[], nodes: TreeNodeProps \| TreeNodeProps[])` | -     |
| node-cancel | Emitted when a node is deselected, returns the current node's data and node object                                                                                      | `(data: Data, node: TreeNodeProps)`                               | -     |
| node-expand | Emitted when a node is expanded, returns the current node's data and node object                                                                                        | `(data: Data, node: TreeNodeProps)`                               | -     |
| node-reduce | Emitted when a node is collapsed, returns the data and node object of the current node                                                                                  | `(data: Data, node: TreeNodeProps)`                               | -     |
| drag-start  | Emitted when the node is about to start dragging, returns the data and node object of the current node                                                                  | `(data: Data, node: TreeNodeProps)`                               | -     |
| drag-over   | Emitted when the node is being dragged, returns the current node's data and node object                                                                                 | `(data: Data, node: TreeNodeProps)`                               | -     |
| drop        | Emitted when a node is dropped by another dragged node, returns the current node's data and node object                                                                 | `(data: Data, node: TreeNodeProps, dropType: NodeDropType)`       | -     |
| drag-end    | Emitted when the node finishes dragging, returns the data and node object of the current node                                                                           | `(data: Data, node: TreeNodeProps)`                               | -     |
| label-click | Emitted when a node label is clicked, returns the current node data and node object                                                                                     | `(data: Data, node: TreeNodeProps)`                               | -     |

### Tree Slots

| Name   | Description                                                                                                                                                                                                                                                           | Parameters             | Since   |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------- |
| label  | Slot for node label                                                                                                                                                                                                                                                   | `TreeCommonSlotParams` | -       |
| node   | Slot for node content, using this slot will completely cover the elements of the node, including arrows, check boxes, etc. The slot has three additional methods `toggleCheck`, `toggleExpand`, `toggleSelect`, which are used for trigger node check, expand, select | `TreeNodeSlotParams`   | -       |
| empty  | Slot for prompt text when data is empty                                                                                                                                                                                                                               | -                      | -       |
| prefix | Slot for node prefix content                                                                                                                                                                                                                                          | `TreeCommonSlotParams` | `2.2.5` |
| suffix | Slot for node suffix content                                                                                                                                                                                                                                          | `TreeCommonSlotParams` | `2.2.5` |
| arrow  | Slot for node arrow content                                                                                                                                                                                                                                           | `TreeCommonSlotParams` | `2.2.5` |

### Tree Methods

| Name                    | Description                                                                                                                                                                 | Signature                                                                   | Since    |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------- |
| parseAndTransformData   | Trigger to re-parse and transform data inside the component                                                                                                                 | `() => void`                                                                | -        |
| forceUpdateData         | Force update data, generally use to update the tree after manually changing the data source                                                                                 | `() => void`                                                                | -        |
| syncNodeStateIntoData   | The state attribute in node is synchronized to data, it will cover `visible`, `selected`, `expanded`, `disabled`, `checked`, `loading`, `readonly` fields, use with caution | `() => void`                                                                | -        |
| getCheckedNodes         | Get all node objects whose checkboxes are checked                                                                                                                           | `(includePartial?: boolean) => TreeNodeProps[]`                             | -        |
| getCheckedNodeData      | Get all node data whose checkboxes are checked                                                                                                                              | `(includePartial?: boolean) => Data[]`                                      | -        |
| getSelectedNodes        | Get all selected node objects                                                                                                                                               | `() => TreeNodeProps[]`                                                     | -        |
| getSelectedNodeData     | Get all selected node data                                                                                                                                                  | `() => Data[]`                                                              | -        |
| getExpandedNodes        | Get all expanded node objects                                                                                                                                               | `() => TreeNodeProps[]`                                                     | -        |
| getDisabledNodes        | Get all disabled node objects                                                                                                                                               | `() => TreeNodeProps[]`                                                     | -        |
| getNodeChildren         | Get the child node object of the node object                                                                                                                                | `(node: TreeNodeProps) => TreeNodeProps[]`                                  | -        |
| getParentNode           | Get the parent node object according to the node object, or return `null` if it does not exist                                                                              | `(node: TreeNodeProps) => TreeNodeProps \| null`                            | -        |
| getSiblingNodes         | Get all sibling node objects according to the node object, excluding itself by default                                                                                      | `(node: TreeNodeProps, includeSelf: boolean) => TreeNodeProps[]`            | -        |
| getPrevSiblingNode      | Get the previous sibling node object according to the node object, or return `null` if it does not exist                                                                    | `(node: TreeNodeProps) => TreeNodeProps \| null`                            | -        |
| getNextSiblingNode      | Get the next sibling node object according to the node object, or return `null` if it does not exist                                                                        | `(node: TreeNodeProps) => TreeNodeProps \| null`                            | -        |
| getNodeByData           | Get node object according to data                                                                                                                                           | `<T extends Data>(data: T) => TreeNodeProps \| null`                        | -        |
| expandNodeByData        | Change the expanded state of a node based on data                                                                                                                           | `<T extends Data>(data: T, expanded?: boolean, upstream?: boolean) => void` | -        |
| selectNodeByData        | Change node selection state based on data                                                                                                                                   | `<T extends Data>(data: T, selected?: boolean) => void`                     | -        |
| checkNodeByData         | Change the selected state of the node's checkbox according to the data                                                                                                      | `<T extends Data>(data: T, checked?: boolean) => void`                      | -        |
| toggleNodeLoadingByData | Change the loading state of a node based on data                                                                                                                            | `<T extends Data>(data: T, loading?: boolean) => void`                      | -        |
| isLeafNode              | Determine whether the node is a leaf node                                                                                                                                   | `(node: TreeNodeProps) => boolean`                                          | `2.2.14` |
| getTreeData             | Get original tree data                                                                                                                                                      | `(withFilter?: boolean) => Data[]`                                          | `2.2.14` |
| getFlattedData          | Get original flatted data                                                                                                                                                   | `(withFilter?: boolean) => Data[]`                                          | `2.2.14` |
| updateVisibleNodeEls    | Trigger to update the visible node elements (used to precess keyboard operation)                                                                                            | `() => void`                                                                | `2.2.14` |

### TreeNode Props

> The following props will get the initial value from the property of the same name of data when the node is initialized. If it is not defined, the default value will be used. Note that the refresh of the node will trigger the re-initialization of the node.

| Name     | Type                | Description                                                                                                                                                                            | Default  | Since    |
| -------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| label    | `string`            | Label content displayed by the node                                                                                                                                                    | `''`     | -        |
| selected | `boolean`           | Set the selected state of the node                                                                                                                                                     | `false`  | -        |
| expanded | `boolean`           | Set the expanded state of the node                                                                                                                                                     | `false`  | -        |
| disabled | `boolean`           | Set the disabled state of the node, if not set, the state of the same name of the Tree will be used                                                                                    | `false`  | -        |
| readonly | `boolean`           | Set the read-only status of the node, if not set, the same name status of the Tree will be used                                                                                        | `false`  | -        |
| checkbox | `boolean`           | Set whether the node has a checkbox, if not set, the state of Tree will be used                                                                                                        | `false`  | -        |
| arrow    | `'auto' \| boolean` | Set whether the node has arrow, will use the `arrow` props of Tree if not set. When set to `'auto'`, the arrow will automatically show or hide based on the presence of any child node | `'auto'` | -        |
| checked  | `boolean`           | Set the checked state of the node's checkbox                                                                                                                                           | `false`  | -        |
| loading  | `boolean`           | Set whether the node is in the loading state                                                                                                                                           | `false`  | -        |
| loaded   | `boolean`           | Set whether the node is loaded                                                                                                                                                         | `false`  | -        |
| loadFail | `boolean`           | Set whether the node fails to load                                                                                                                                                     | `false`  | `2.2.14` |
| isLeaf   | `'auto' \| boolean` | Forces set the node to leaf node. When set to `'auto'`, it will be judged based on the presence of any child node                                                                      | `'auto'` | `2.2.14` |
