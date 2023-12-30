# Carousel 轮播

轮播组件可以快速构建一个轮播的区域，常用与一组平级内容的灵活展示。

## 代码示例

:::demo carousel/basis

### 基础用法

默认的可视区域为 3 个元素，可以设置 `view-size` 属性进行调整。

:::

:::demo carousel/autoplay

### 自动播放

添加 `autoplay` 属性可以开启自动播放，到最后一个元素时会回到第一个元素。

:::

:::demo carousel/loop

### 循环轮播

添加 `loop` 属性可以开启循环轮播，到最后一个元素时会衔接第一个元素，反之亦然。

:::

:::demo carousel/active

### 聚焦元素

Item 组件默认插槽可以通过 `active` 属性获取当前元素是否处理激活状态。

使用该属性可以轻松地对激活与非激活的元素添加定制化样式。

:::

:::demo carousel/lantern

### 走马灯

设置 `view-size` 属性为 1 后可以形成走马灯效果。

:::

:::demo carousel/vertical

### 纵向轮播

通过添加 `vertical` 属性可以使轮播变为纵向。

:::

:::demo carousel/album

### 相册用例

使用轮播组件结合一些简单的元素即可实现类似相册、图片查看器的效果（二次元浓度检测）。

:::

## API

### Carousel 属性

| 名称          | 类型                              | 说明                                                                           | 默认值      | 始于    |
| ------------- | --------------------------------- | ------------------------------------------------------------------------------ | ----------- | ------- |
| active        | `number`                          | 当前激活的元素，可以使用 `v-model` 双向绑定                                    | `0`         | -       |
| view-size     | `number`                          | 视窗中可容纳的 item 数                                                         | `3`         | -       |
| vertical      | `boolean`                         | 设置是否开启纵向轮播模式                                                       | `false`     | -       |
| disabled      | `boolean`                         | 是否为禁用状态                                                                 | `false`     | -       |
| loop          | `boolean`                         | 是否开启循环轮播模式                                                           | `false`     | -       |
| arrow         | `'outside' \| 'inside' \| 'none'` | 箭头显示的方式                                                                 | `'outside'` | -       |
| arrow-trigger | `'hover' \| 'always'`             | 箭头显示的触发方式，可选值为 `hover`、`always`，仅当箭头类型为 `inside` 时有效 | `'hover'`   | -       |
| autoplay      | `boolean \| number`               | 设置轮播自动播放，传入数值时可以设置间隔毫秒数，最低有效值为 300               | `false`     | -       |
| pointer       | `'outside' \| 'inside' \| 'none'` | 指示器显示的方式，可选值为 `outside`、`inside`、`none`                         | `'none'`    | -       |
| speed         | `number`                          | 元素切换过渡效果的速度                                                         | `300`       | -       |
| active-offset | `number`                          | 标记 item 激活的偏移量，为 0 时默认视窗第一个元素为激活状态                    | `0`         | -       |
| height        | `number \| string`                | 在 `vertical` 模式下，可以设置高度                                             | `null`      | -       |
| ignore-hover  | `boolean`                         | 开启自动轮播后是否忽略鼠标移入                                                 | `false`     | `2.0.3` |

### Carousel 事件

| 名称   | 说明                                                         | 参数               | 始于 |
| ------ | ------------------------------------------------------------ | ------------------ | ---- |
| change | 激活的 item 改变时触发，返回激活的元素的索引                 | `(active: number)` | -    |
| prev   | 当点击向前箭头切换元素时触发，返回激活的元素的索引           | `(active: number)` | -    |
| next   | 当点击向后箭头或自动播放切换元素时触发，返回激活的元素的索引 | `(active: number)` | -    |
| select | 当点击了元素时触发，返回点击的元素的索引                     | `(active: number)` | -    |

### Carousel 插槽

| 名称       | 说明                                                               | 参数                    | 始于 |
| ---------- | ------------------------------------------------------------------ | ----------------------- | ---- |
| default    | 轮播的内容插槽                                                     | -                       | -    |
| prev-arrow | 向前滚动按钮的内容插槽，接受一个 `disabled` 参数标识是否为禁用状态 | `{ disabled: boolean }` | -    |
| next-arrow | 向后滚动按钮的内容插槽，接受一个 `disabled` 参数标识是否为禁用状态 | `{ disabled: boolean }` | -    |
| pointer    | 轮播标记点的内容插槽，接受一个 `active` 参数标识是否为激活状态     | `{ active: boolean }`   | -    |

### CarouselItem 插槽

| 名称    | 说明                                                         | 参数                  | 始于 |
| ------- | ------------------------------------------------------------ | --------------------- | ---- |
| default | 轮播元素的内容插槽，接受一个 `active` 参数标识是否为激活状态 | `{ active: boolean }` | -    |
