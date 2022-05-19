## API

### 属性

| 属性          | 类型              | 说明                                                                           | 默认值  |
| ------------- | ----------------- | ------------------------------------------------------------------------------ | ------- |
| active        | Number            | 当前激活的元素，可以使用 v-model 双向绑定                                      | 0       |
| view-size     | Number            | 视窗中可容纳的 item 数                                                         | 3       |
| vertical      | Boolean           | 设置是否开启纵向轮播模式                                                       | false   |
| disabled      | Boolean           | 是否为禁用状态                                                                 | false   |
| loop          | Boolean           | 是否开启循环轮播模式                                                           | false   |
| arrow         | String            | 箭头显示的方式，可选值为 `outside`、`inside`、`none`                           | 'outer' |
| arrow-trigger | String            | 箭头显示的触发方式，可选值为 `hover`、`always`，仅当箭头类型为 `inside` 时有效 | 'hover' |
| autoplay      | Boolean \| Number | 设置轮播自动播放，传入数值时可以设置间隔毫秒数，最低有效值为 300               | false   |
| pointer       | String            | 指示器显示的方式，可选值为 `outside`、`inside`、`none`                         | 'none'  |
| speed         | Number            | 元素切换过渡效果的速度                                                         | 300     |
| active-offset | Number            | 标记 item 激活的偏移量，为 0 时默认视窗第一个元素为激活状态                    | 0       |
| height        | Number \| String  | 在 `vertical` 模式下，可以设置高度                                             | null    |

### 事件

| 事件      | 说明                                                         | 参数  |
| --------- | ------------------------------------------------------------ | ----- |
| on-change | 激活的 item 改变时触发，返回激活的元素的索引                 | index |
| on-prev   | 当点击向前箭头切换元素时触发，返回激活的元素的索引           | index |
| on-next   | 当点击向后箭头或自动播放切换元素时触发，返回激活的元素的索引 | index |
| on-select | 当点击了元素时触发，返回点击的元素的索引                     | index |

### 插槽

| 名称       | 说明                                                               |
| ---------- | ------------------------------------------------------------------ |
| default    | 轮播的内容插槽                                                     |
| prev-arrow | 向前滚动按钮的内容插槽，接受一个 `disabled` 参数标识是否为禁用状态 |
| next-arrow | 向后滚动按钮的内容插槽，接受一个 `disabled` 参数标识是否为禁用状态 |
| pointer    | 轮播标记点的内容插槽，接受一个 `active` 参数标识是否为激活状态     |

### Item 插槽

| 名称    | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| default | 轮播元素的内容插槽，接受一个 `active` 参数标识是否为激活状态 |
