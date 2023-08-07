# 遮罩 Masker

## 代码示例

:::demo masker/basis

### 基础用法

直接打开遮罩，当然也可以渲染一些东西在遮罩上。

:::

:::demo masker/custom-mask

### 自定义遮罩

通过 `mask` 插槽，你可以自定义遮罩层，例如做一个镂空效果。

:::

## API

### Masker 属性

| 名称            | 类型                        | 说明                                                                        | 默认值       | 始于     |
| --------------- | --------------------------- | --------------------------------------------------------------------------- | ------------ | -------- |
| active          | `boolean`                   | 设置遮罩是否显示，可以使用 `v-model` 双向绑定                               | `false`      | -        |
| closable        | `boolean`                   | 设置是否可以点击遮罩层关闭                                                  | `false`      | -        |
| inner           | `boolean`                   | 设置是否为一个内联的抽屉，开启后定位从 fixed 变位 absolute                  | `false`      | -        |
| mask-transition | `string`                    | 遮罩层的过渡动画                                                            | `'vxp-fade'` | -        |
| transition-name | `string`                    | 显示层的过渡动画                                                            | `'vxp-fade'` | -        |
| disabled        | `boolean`                   | 设置是否禁用遮罩层，该属性仅影响遮罩层，显示层不受影响                      | `false`      | -        |
| on-before-close | `() => any \| Promise<any>` | 设置遮罩关闭前的回调，支持异步函数和 `Promise`，返回值为 `false` 会阻止关闭 | `null`       | -        |
| transfer        | `boolean \| string`         | 设置遮罩的渲染位置，设置为 `true` 时默认渲染至 `<body>`                     | `false`      | -        |
| auto-remove     | `boolean`                   | 设置不显示时是否自动移除                                                    | `false`      | `2.0.13` |
| permeable       | `boolean`                   | 设置 `wheel` 事件是否可以穿透                                               | `false`      | `2.1.29` |

### Masker 事件

| 名称   | 说明                                                 | 参数                | 始于 |
| ------ | ---------------------------------------------------- | ------------------- | ---- |
| toggle | 当遮罩的激活状态改变时触发，返回当前的激活状态       | `(active: boolean)` | -    |
| close  | 当用关闭功能触发关闭时触发，无返回值                 | -                   | -    |
| show   | 当遮罩打开后后，过渡效果结后触发，无返回值           | -                   | -    |
| hide   | 当遮罩关闭后，过渡效果结束，完全消失时触发，无返回值 | -                   | -    |

### Masker 插槽

| 名称    | 说明         | 参数                | 始于     |
| ------- | ------------ | ------------------- | -------- |
| default | 显示层的内容 | `{ show: boolean }` | -        |
| mask    | 遮罩层的内容 | -                   | `2.1.30` |
