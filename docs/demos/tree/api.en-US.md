### Preset Types

```ts
type Key = string | number
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
  readonly?: string,
  arrow?: string,
  checkbox?: string,
  selectDisabled?: string,
  expandDisabled?: string,
  checkDisabled?: string
}

type TreeNodeProps<D = Data> = {
  id: Key,
  parent: Key,
  children: TreeNodeProps[],
  visible: boolean,
  selected: boolean,
  expanded: boolean,
  disabled: boolean,
  checked: boolean,
  loading: boolean,
  loaded: boolean,
  readonly: boolean,
  arrow: boolean | 'auto',
  checkbox: boolean,
  selectDisabled: boolean,
  expandDisabled: boolean,
  checkDisabled: boolean,
  data: Data
}

type TreeNodePostCreate<D = Data> = (node: TreeNodeProps<D>) => void
type TreeNodeRenderFn<D = Data> = (data: { data: D, node: TreeNodeProps<D> }) => any
```

### Tree Props

| Name          | Type                                                                   | Description                                                                                                                                                                                                                                      | Default        | Since   |
| ------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ------- |
| data          | `Data[]`                                                               | Tree data source, supports passing in the array structure to be constructed or the processed tree structure                                                                                                                                      | `[]`           | -       |
| arrow         | `'auto' \| boolean`                                                    | Set whether the tree node has arrow indication, when set to `'auto'`, it will be automatically displayed and hidden according to whether the node has subordinates                                                                               | `'auto'`       | -       |
| no-build-tree | `boolean`                                                              | Set whether to disable the built-in build tree, set when the data source of `data` is a tree structure                                                                                                                                           | `false`        | -       |
| empty-tip     | `string`                                                               | Tip to show when data is empty                                                                                                                                                                                                                   | `locale.empty` | -       |
| disabled      | `boolean`                                                              | Set whether the tree is disabled, if set, all tree nodes will be disabled                                                                                                                                                                        | `false`        | -       |
| readonly      | `boolean`                                                              | Set whether the tree is read-only, if set, all tree nodes will be read-only                                                                                                                                                                      | `false`        | -       |
| checkbox      | `boolean`                                                              | Set whether to enable the checkbox of the node                                                                                                                                                                                                   | `false`        | -       |
| draggable     | `boolean`                                                              | Set whether the node is draggable                                                                                                                                                                                                                | `false`        | -       |
| renderer      | `(data: { data: Data, node: TreeNodeProps, depth: number }) => any`    | The number of nodes to render using the render function                                                                                                                                                                                          | `null`         | -       |
| multiple      | `boolean`                                                              | Set whether to enable multiple selection mode                                                                                                                                                                                                    | `false`        | -       |
| indent        | `string \| number`                                                     | Set the indent distance of each tree node                                                                                                                                                                                                        | `'16px'`       | -       |
| accordion     | `boolean`                                                              | Set whether to enable accordion mode                                                                                                                                                                                                             | `false`        | -       |
| appear        | `boolean`                                                              | Set the `appear` value of the transition effect of the tree node                                                                                                                                                                                 | `false`        | -       |
| floor-select  | `boolean`                                                              | When enabled, when a node with subordinates is selected, the node will be expanded and collapsed, and the selection cancellation event will be triggered when there are no subordinates                                                          | `false`        | -       |
| on-async-load | `(data: Data, node: TreeNodeProps) => void \| boolean \| Promise<any>` | The callback function triggered by the initial load of the node, accepts the `node` object as a parameter, if it returns `false`, it means that the load fails , supports async functions and `Promise`                                          | `null`         | -       |
| cache-node    | `boolean`                                                              | Set whether to enable the node data cache mechanism. After enabling, every time `data` changes, the same object refers to the node with the same `id` value, except for `id`, `parent` , `children` and `label` properties will not be refreshed | `false`        | -       |
| root-id       | `string \| number`                                                     | Set the `id` value of the root node. After setting, when the parent value is equal to this value, it will be displayed as the first level node                                                                                                   | `null`         | -       |
| key-config    | `NodeKeyConfig`                                                        | Configure the key names when the parsing node is initialized                                                                                                                                                                                     | `{}`           | `2.0.0` |
| no-cascaded   | `boolean`                                                              | Enable parent and child nodes to be checked independently                                                                                                                                                                                        | `false`        | `2.0.0` |
| filter        | `string \| ((data: Data, node: TreeNodeProps) => boolean)`             | Set to filter nodes. When a string is passed in, it will be filtered according to the `label` value of nodes, or a custom filter will be passed in function                                                                                      | `''`           | `2.0.0` |
| ignore-case   | `boolean`                                                              | Set whether to ignore case when using built-in filtering                                                                                                                                                                                         | `false`        | `2.0.0` |
| node-props    | `Data \| ((data: Data, node: TreeNodeProps) => Data)`                  | Set the html attributes of the root element of all child nodes                                                                                                                                                                                   | `null`         | `2.0.0` |
| locale        | `LocaleConfig['tree']`                                                 | Set the locale config                                                                                                                                                                                                                            | `null`         | `2.1.0` |
| link-line     | `boolean \| TreeLinkLine`                                              | Set whether to add link line                                                                                                                                                                                                                     | `false`        | `2.1.6` |
| post-create   | `TreeNodePostCreate`                                                   | The post process when node is created                                                                                                                                                                                                            | `null`         | `2.1.7` |

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

| Name  | Description                                                                                                                                                                                                                                                                  | Parameters                                                                                                                                                                                           | Since |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| label | Slot for node label                                                                                                                                                                                                                                                          | `(data: Data, node: TreeNodeProps, depth: number)`                                                                                                                                                   | -     |
| node  | The slot of the node content, using this slot will completely cover the elements of the node, including arrows, check boxes, etc. The slot has three additional methods `toggleCheck`, `toggleExpand`, `toggleSelect`, which are used for Trigger node check, expand, select | `(data: Data, node: TreeNodeProps, depath: number, toggleCheck: (checked?: boolean) => void, toggleExpand: (expanded?: boolean) => Promise<void> , toggleSelect: (able?: boolean) => Promise<void>)` | -     |
| empty | Slot for prompt text when data is empty                                                                                                                                                                                                                                      | -                                                                                                                                                                                                    | -     |

### Tree Methods

| Name                    | Description                                                                                                                                                                 | Signature                                                                   | Since |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----- |
| parseAndTransformData   | Trigger to re-parse and transform data inside the component                                                                                                                 | `() => void`                                                                | -     |
| forceUpdateData         | Force update data, generally use to update the tree after manually changing the data source                                                                                 | `() => void`                                                                | -     |
| syncNodeStateIntoData   | The state attribute in node is synchronized to data, it will cover `visible`, `selected`, `expanded`, `disabled`, `checked`, `loading`, `readonly` fields, use with caution | `() => void`                                                                | -     |
| getCheckedNodes         | Get all node objects whose checkboxes are checked                                                                                                                           | `() => TreeNodeProps[]`                                                     | -     |
| getCheckedNodeData      | Get all node data whose checkboxes are checked                                                                                                                              | `() => Data[]`                                                              | -     |
| getSelectedNodes        | Get all selected node objects                                                                                                                                               | `() => TreeNodeProps[]`                                                     | -     |
| getSelectedNodeData     | Get all selected node data                                                                                                                                                  | `() => Data[]`                                                              | -     |
| getExpandedNodes        | Get all expanded node objects                                                                                                                                               | `() => TreeNodeProps[]`                                                     | -     |
| getDisabledNodes        | Get all disabled node objects                                                                                                                                               | `() => TreeNodeProps[]`                                                     | -     |
| getNodeChildren         | Get the child node object of the node object                                                                                                                                | `(node: TreeNodeProps) => TreeNodeProps[]`                                  | -     |
| getParentNode           | Get the parent node object according to the node object, or return `null` if it does not exist                                                                              | `(node: TreeNodeProps) => TreeNodeProps \| null`                            | -     |
| getSiblingNodes         | Get all sibling node objects according to the node object, excluding itself by default                                                                                      | `(node: TreeNodeProps, includeSelf: boolean) => TreeNodeProps[]`            | -     |
| getPrevSiblingNode      | Get the previous sibling node object according to the node object, or return `null` if it does not exist                                                                    | `(node: TreeNodeProps) => TreeNodeProps \| null`                            | -     |
| getNextSiblingNode      | Get the next sibling node object according to the node object, or return `null` if it does not exist                                                                        | `(node: TreeNodeProps) => TreeNodeProps \| null`                            | -     |
| getNodeByData           | Get node object according to data                                                                                                                                           | `<T extends Data>(data: T) => TreeNodeProps \| null`                        | -     |
| expandNodeByData        | Change the expanded state of a node based on data                                                                                                                           | `<T extends Data>(data: T, expanded?: boolean, upstream?: boolean) => void` | -     |
| selectNodeByData        | Change node selection state based on data                                                                                                                                   | `<T extends Data>(data: T, selected?: boolean) => void`                     | -     |
| checkNodeByData         | Change the selected state of the node's checkbox according to the data                                                                                                      | `<T extends Data>(data: T, checked?: boolean) => void`                      | -     |
| toggleNodeLoadingByData | Change the loading state of a node based on data                                                                                                                            | `<T extends Data>(data: T, loading?: boolean) => void`                      | -     |

### TreeNode Props

> The following props will get the initial value from the property of the same name of data when the node is initialized. If it is not defined, the default value will be used. Note that the refresh of the node will trigger the re-initialization of the node.

| Name     | Type                | Description                                                                                                                                                                                         | Default  | Since |
| -------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----- |
| label    | `string`            | Label content displayed by the node                                                                                                                                                                 | `''`     | -     |
| selected | `boolean`           | Set the selected state of the node                                                                                                                                                                  | `false`  | -     |
| expanded | `boolean`           | Set the expanded state of the node                                                                                                                                                                  | `false`  | -     |
| disabled | `boolean`           | Set the disabled state of the node, if not set, the state of the same name of the Tree will be used                                                                                                 | `false`  | -     |
| readonly | `boolean`           | Set the read-only status of the node, if not set, the same name status of the Tree will be used                                                                                                     | `false`  | -     |
| checkbox | `boolean`           | Set whether the node has a checkbox, if not set, the state of Tree will be used                                                                                                                     | `false`  | -     |
| arrow    | `'auto' \| boolean` | Set whether the node has arrow indication, when set to 'auto', it will be automatically displayed and hidden according to whether there are subordinates, if not set, it will use the state of Tree | `'auto'` | -     |
| checked  | `boolean`           | Set the checked state of the node's checkbox                                                                                                                                                        | `false`  | -     |
| loading  | `boolean`           | Set whether the node is in the loading state                                                                                                                                                        | `false`  | -     |
| loaded   | `boolean`           | Set whether the node is loaded                                                                                                                                                                      | `false`  | -     |
