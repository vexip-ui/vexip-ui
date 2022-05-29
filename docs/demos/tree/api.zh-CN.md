## API

### 属性

| 名称          | 类型              | 说明                                                                                                                                                        | 默认值     |
| ------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| data          | Array             | 树数据源，支持传入待构建的 list 结构和以构建的 tree 结构                                                                                                    | []         |
| arrow         | String \| Boolean | 设置树节点是否带有箭头指示，设置为 'auto' 时会根据节点是否有下级自动显示隐藏                                                                                | 'auto'     |
| no-build-tree | Boolean           | 设置是否禁用内置的构建树，当 data 的数据源为树形结构时设置                                                                                                  | false      |
| empty-tip     | String            | 数据为空时显示的提示                                                                                                                                        | '暂无数据' |
| disabled      | Boolean           | 设置树是否为禁用状态，若设置后，所有的树节点将被禁用                                                                                                        | false      |
| readonly      | Boolean           | 设置树是否为只读状态，若设置后，所有的树节点将为只读                                                                                                        | false      |
| checkbox      | Boolean           | 设置是否开启节点的复选框                                                                                                                                    | false      |
| draggable     | Boolean           | 设置节点是否可拖拽                                                                                                                                          | false      |
| renderer      | Function          | 使用 vue 的 render 接口进行渲染，传入的方法接受 node 对象作为参数                                                                                           | null       |
| id-key        | String            | 设置数据源的 id 字段                                                                                                                                        | 'id'       |
| children-key  | String            | 设置数据源的 children 字段                                                                                                                                  | 'children' |
| parent-key    | String            | 设置数据源的 parent 字段                                                                                                                                    | 'parent'   |
| label-key     | String            | 设置数据源的 label 字段                                                                                                                                     | 'label'    |
| multiple      | Boolean           | 设置是否开启多选模式                                                                                                                                        | false      |
| indent        | String \| Number  | 设置每层树节点的缩进距离                                                                                                                                    | '1.2em'    |
| accordion     | Boolean           | 设置是否开启手风琴模式                                                                                                                                      | false      |
| appear        | Boolean           | 设置树节点过渡效果的 appear 值                                                                                                                              | false      |
| floor-select  | Boolean           | 开启后，当选择存在下级的节点时，会触发节点的展开收起，无下级时才会触发选择取消事件                                                                          | false      |
| async-load    | Function          | 节点初次加载触发的回调函数，接受 node 对象作为参数，如果返回 `false` 则表示加载失败，支持异步函数 和 Promise                                                | null       |
| cache-node    | Boolean           | 设置是否开启节点数据缓存机制，开启后当每次 data 发生变化时，同个对象引用或者 id 值相同的节点，除了 id、parent、children 和 label 属性外其余属性将不会被刷新 | false      |
| root-id       | String \| Number  | 设置根节点的 id 值，设置后，当 parent 值与该值相等的节点，将作为第一级节点展示                                                                              | null       |

### 事件

| 名称           | 说明                                                                                                                                                        | 参数                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| on-node-change | 当节点的复选框状态发生改变时触发，返回当前节点的数据和节点对象                                                                                              | data, node                       |
| on-node-select | 当节点被选择时触发，返回当前节点的数据和节点对象                                                                                                            | data, node                       |
| on-node-cancel | 当节点被取消选择时触发，返回当前节点的数据和节点对象                                                                                                        | data, node                       |
| on-node-expand | 当节点被展开时触发，返回当前节点的数据和节点对象                                                                                                            | data, node                       |
| on-node-shrink | 当节点被收起时触发，返回当前节点的数据和节点对象                                                                                                            | data, node                       |
| on-async-load  | 当监听了该事件时，当节点初次展开时，会触发该事件，返回将要展开的节点数据和节点对象，以及一个完成加载的回调方法，该方法接收一个 Boolean 参数判断是否加载成功 | data, node, loadedCallbackMehtod |
| on-drag-start  | 当节点将要开始拖拽时触发，返回当前节点的数据和节点对象                                                                                                      | data, node                       |
| on-drag-over   | 当节点正在拖拽时触发，返回当前节点的数据和节点对象                                                                                                          | data, node                       |
| on-drop        | 当节点被其他的拖拽节点放入时触发，返回当前节点的数据和节点对象                                                                                              | data, node                       |
| on-drag-end    | 当节点结束拖拽时触发，返回当前节点的数据和节点对象                                                                                                          | data, node                       |

### 插槽

| 名称  | 说明                                                                                                                                                                                                     |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label | 节点标签的插槽，通过 v-slot 接受节点的 data 对象                                                                                                                                                         |
| node  | 节点内容的插槽，使用该插槽将完全覆盖节点各元素，包括箭头、复选框等，通过 v-slot 接收 node 对象，该对象有额外的三个方法 `toggleCheck`、`toggleExpand`、`toggleSelect`，分别用于触发节点的勾选、展开、选择 |
| empty | 当数据为空时的提示文字的插槽                                                                                                                                                                             |

### 方法

| 名称                    | 说明                                                                                                                                        | 参数              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| updateData              | 更新数据，一般在手动更改了数据源后更新树使用                                                                                                | -                 |
| syncNodeStateIntoData   | 讲 node 中的状态属性同步到 data 中，将会覆盖 `visible`、`selected`、`expanded`、`disabled`、`checked`、`loading`、`readonly` 字段，谨慎使用 | -                 |
| getCheckedNodes         | 获取所有复选框被勾选的节点对象                                                                                                              | -                 |
| getCheckedNodeData      | 获取所有复选框被勾选的节点数据                                                                                                              | -                 |
| getSelectedNodes        | 获取所有被选择的节点对象                                                                                                                    | -                 |
| getSelectedNodeData     | 获取所有被选择的节点数据                                                                                                                    | -                 |
| getExpandedNodes        | 获取所有展开的节点对象                                                                                                                      | -                 |
| getDisabledNodes        | 获取所有被禁用的节点对象                                                                                                                    | -                 |
| getParentNode           | 根据节点对象获取其父节点对象，不存在则返回 null                                                                                             | node              |
| getSiblingNodes         | 根据节点对象获取所有兄弟节点对象，默认不包含自身                                                                                            | node, includeSelf |
| getPrevSiblingNode      | 根据节点对象获取上一个兄弟节点对象，不存在则返回 null                                                                                       | node              |
| getNextSiblingNode      | 根据节点对象获取下一个兄弟节点对象，不存在则返回 null                                                                                       | node              |
| getNodeByData           | 根据数据获取节点对象                                                                                                                        | data              |
| expandNodeByData        | 根据数据更改节点的展开状态                                                                                                                  | data, expanded    |
| selectNodeByData        | 根据数据更改节点的选择状态                                                                                                                  | data, selected    |
| checkNodeByData         | 根据数据更改节点的复选框被选状态                                                                                                            | data, checked     |
| toggleNodeLoadingByData | 根据数据更改节点的加载状态                                                                                                                  | data, loading     |

### Item 属性

> 以下属性在节点初始化时会从 data 的同名属性中获取初始值，若未定义则使用默认值，注意节点的刷新会触发该节点重新初始化。

| 名称     | 类型              | 说明                                                                                               | 默认值  |
| -------- | ----------------- | -------------------------------------------------------------------------------------------------- | ------- |
| label    | String            | 节点显示的标签内容                                                                                 | ''      |
| selected | Boolean           | 设置节点的选择状态                                                                                 | false   |
| expanded | Boolean           | 设置节点的展开状态                                                                                 | false   |
| disabled | Boolean           | 设置节点的禁用状态，不设置时会使用 Tree 的同名状态                                                 | false   |
| readonly | Boolean           | 设置节点的只读状态，不设置时会使用 Tree 的同名状态                                                 | false   |
| checkbox | Boolean           | 设置节点是否具有复选框，不设置时会使用 Tree 的状态                                                 | null    |
| arrow    | String \| Boolean | 设置节点是否带有箭头指示，设置为 'auto' 时会根据是否有下级自动显示隐藏，不设置时会使用 Tree 的状态 | 'auto'  |
| checked  | Boolean           | 设置节点的复选框被选状态                                                                           | false   |
| renderer | Function          | 使用 vue 的 render 接口进行渲染，方法接收 h 和 node 对象，不设置时会使用 Tree 的 renderer          | null    |
| indent   | String \| Number  | 设置节点的缩进距离，不设置时会使用 Tree 的状态                                                     | '1.2em' |
