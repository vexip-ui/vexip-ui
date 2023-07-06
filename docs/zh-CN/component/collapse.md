# 折叠面板 Collapse

## 代码示例

:::demo collapse/basis

### 基础用法

每个面板可以独立展开收缩，不相互影响。

:::

:::demo collapse/card

### 卡片模式

添加 `card` 属性可以开启卡片模式。

:::

:::demo collapse/ghost

### 无边框模式

添加 `ghost` 属性可以开启无边框模式，该属性在卡片模式下无效。

:::

:::demo collapse/accordion

### 手风琴

添加 `accordion` 属性可以开启手风琴模式，该模式下每次只能展开一个面板。

:::

:::demo collapse/arrow

### 调整箭头

添加 `arrow-type` 属性的值可以改变面板箭头的位置或者隐藏箭头。

:::

:::demo collapse/single

### 单独使用

并不是所有的情况都需要多个面板并列，这时 CollapsePanel 组件可以单独使用。

:::

:::demo collapse/transition

### 过渡组件

折叠面板内部使用了一个自定义的 Transition 组件实现折叠过渡效果。

该组件可以独立使用，为内部元素添加折叠过渡效果，同时支持原生 Transition 的所有属性。

:::

## API

### Collapse 属性

| 名称       | 类型                                       | 说明                                                | 默认值    | 始于 |
| ---------- | ------------------------------------------ | --------------------------------------------------- | --------- | ---- |
| expanded   | `string \| number \| (string \| number)[]` | 设置展开的面板的 label 值，非手风琴模式时可传入数组 | `null`    | -    |
| card       | `boolean`                                  | 设置是否为卡片模式                                  | `false`   | -    |
| accordion  | `boolean`                                  | 设置是否为手风琴模式                                | `false`   | -    |
| arrow-type | `'right' \| 'left' \| 'none'`              | 设置面板的指示箭头的类型                            | `'right'` | -    |
| ghost      | `boolean`                                  | 设置是否为无边框模式                                | `false`   | -    |

### Collapse 事件

| 名称   | 说明                                                   | 参数                               | 始于 |
| ------ | ------------------------------------------------------ | ---------------------------------- | ---- |
| change | 当展开的面板发生变化时触发，返回当前展开的面板的 label | `(expanded: (string \| number)[])` | -    |

### CollapsePanel 属性

| 名称          | 类型                          | 说明                          | 默认值    | 始于 |
| ------------- | ----------------------------- | ----------------------------- | --------- | ---- |
| label         | `string \| number`            | 面板的 label 值，同一组内唯一 | `null`    | -    |
| title         | `string`                      | 面板的标题                    | `''`      | -    |
| disabled      | `boolean`                     | 设置面板是否为禁用状态        | `false`   | -    |
| content-style | `Record<string, any>`         | 设置面板的内容的样式          | `null`    | -    |
| expanded      | `boolean`                     | 设置面板是否展开              | `false`   | -    |
| card          | `boolean`                     | 设置是否为卡片模式            | `false`   | -    |
| arrow-type    | `'right' \| 'left' \| 'none'` | 设置面板的指示箭头的类型      | `'right'` | -    |
| icon          | `Record<string, any>`         | 设置面板标题的附属图标        | `''`      | -    |
| ghost         | `boolean`                     | 设置是否为无边框模式          | `false`   | -    |

### CollapsePanel 插槽

| 名称    | 说明           | 参数 | 始于 |
| ------- | -------------- | ---- | ---- |
| default | 面板的内容插槽 | -    | -    |
| title   | 面板的标题插槽 | -    | -    |

### CollapseTransition 属性

| 名称        | 类型                                | 说明                                               | 默认值          | 始于 |
| ----------- | ----------------------------------- | -------------------------------------------------- | --------------- | ---- |
| appear      | `boolean`                           | 将传递给 vue 原生的 transition 组件                | `false`         | -    |
| mode        | `'in-out' \| 'out-in' \| 'default'` | 过渡的模式，可选值为 `default`、`out-in`、`in-out` | `'default'`     | -    |
| horizontal  | `boolean`                           | 设置是否为横向折叠                                 | `false`         | -    |
| duration    | `number`                            | 设置折叠过渡效果的持续毫秒数，不小于 `200ms`       | `250`           | -    |
| timing      | `string`                            | 设置过渡效果的动画函数                             | `'ease-in-out'` | -    |
| fade-effect | `boolean`                           | 设置是否在折叠的时候同时具有渐显隐效果             | `false`         | -    |

> CollapseTransition 组件支持 'before-enter'、'enter'、'after-enter'、'before-leave'、'leave'、'after-leave' 事件。
