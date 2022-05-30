### Collapse 属性

| 名称       | 类型                      | 说明                                                       | 默认值  |
| ---------- | ------------------------- | ---------------------------------------------------------- | ------- |
| expanded   | String \| Number \| Array | 设置展开的面板的 label 值，非手风琴模式时可传入数组        | null    |
| card       | Boolean                   | 设置是否为卡片模式                                         | false   |
| accordion  | Boolean                   | 设置是否为手风琴模式                                       | false   |
| arrow-type | String                    | 设置面板的指示箭头的类型，可选值为 `right`、`left`、`none` | 'right' |
| ghost      | Boolean                   | 设置是否为无边框模式                                       | false   |

### Collapse 事件

| 名称      | 说明                                                   | 参数            |
| --------- | ------------------------------------------------------ | --------------- |
| on-change | 当展开的面板发生变化时触发，返回当前展开的面板的 label | currentExpanded |

### CollapseItem 属性

| 名称          | 类型             | 说明                                                       | 默认值  |
| ------------- | ---------------- | ---------------------------------------------------------- | ------- |
| label         | String \| Number | 面板的 label 值，同一组内唯一                              | null    |
| title         | String           | 面板的标题                                                 | ''      |
| disabled      | Boolean          | 设置面板是否为禁用状态                                     | false   |
| content-style | Object           | 设置面板的内容的样式                                       | null    |
| expanded      | Boolean          | 设置面板是否展开                                           | false   |
| card          | Boolean          | 设置是否为卡片模式                                         | false   |
| arrow-type    | String           | 设置面板的指示箭头的类型，可选值为 `right`、`left`、`none` | 'right' |
| icon          | String           | 设置面板标题的附属图标名称                                 | ''      |
| ghost         | Boolean          | 设置是否为无边框模式                                       | false   |

### CollapseItem 插槽

| 名称    | 说明           |
| ------- | -------------- |
| default | 面板的内容插槽 |
| title   | 面板的标题插槽 |

### CollapseTransition 属性

| 名称        | 类型    | 说明                                               | 默认值        |
| ----------- | ------- | -------------------------------------------------- | ------------- |
| appear      | Boolean | 将传递给 vue 原生的 transition 组件                | false         |
| mode        | String  | 过渡的模式，可选值为 `default`、`out-in`、`in-out` | 'default'     |
| horizontal  | Boolean | 设置是否为横向折叠                                 | false         |
| duration    | Number  | 设置折叠过渡效果的持续毫秒数                       | 250           |
| timing      | String  | 设置过渡效果的动画函数                             | 'ease-in-out' |
| fade-effect | Boolean | 设置是否在折叠的时候同时具有渐显隐效果             | false         |

> CollapseTransition 组件支持 'before-enter'、'enter'、'after-enter'、'before-leave'、'leave'、'after-leave' 事件。
