### NativeScroll 属性

| 名称          | 类型              | 说明                                                                       | 默认值     |
| ------------- | ----------------- | -------------------------------------------------------------------------- | ---------- |
| mode          | String            | 滚动的模式，可选值为 `horizontal`、`vertical`、`both`                      | 'vertical' |
| scroll-class  | String \| Object  | 滚动内容包围元素的自定义类名                                               | null       |
| scroll-style  | Object            | 滚动内容包围元素的自定义样式                                               | null       |
| width         | Number \| String  | 滚动视窗的宽度，内容的宽度大于视窗的宽度时才可滚动                         | ''         |
| height        | Number \| String  | 滚动视窗的高度，内容的高度大于视窗的高度时才可滚动                         | ''         |
| disabled      | Boolean           | 设置是否禁用滚动                                                           | false      |
| pointer       | Boolean           | 设置是否开启鼠标拖动滚动，在移动端时不应启用该属性，避免与原生交互发生冲突 | false      |
| scroll-x      | Number            | 设置横向滚动的位置                                                         | 0          |
| scroll-y      | Number            | 设置纵向滚动的位置                                                         | 0          |
| use-x-bar     | Boolean           | 设置是否使用横向滚动条                                                     | false      |
| use-y-bar     | Boolean           | 设置是否使用纵向滚动条                                                     | false      |
| bar-fade      | Number            | 设置触发滚动条渐隐的等待毫秒，若小于 300 则关闭渐隐效果                    | 1500       |
| bar-class     | String \| Object  | 设置滚动条的自定义类名                                                     | null       |
| autoplay      | Boolean \| Number | 设置滚动条自动滚动，当传入数字时，会作为一次完整滚动的所需毫秒数           | false      |
| play-waiting  | Number            | 当开启了自动滚动时，设置每次开始滚动前和结束滚动后的暂缓毫秒数             | 500        |
| on-before-scroll | Function          | 设置滚动前的回调，不支持异步函数和 Promise，返回值为 false 会阻止滚动      | null       |
| appear        | Boolean           | 设置滚动初始渲染时是否具有过渡效果，一般用于初始滚动位置为非 0 的场合      | false      |
| bar-duration  | Number            | 设置滚动条过渡效果的持续时间                                               | null       |
| use-bar-track | Boolean           | 设置滚动条是否启用轨道交互                                                 | false      |

### NativeScroll 事件

| 名称                | 说明                                                                                             | 参数         |
| ------------------- | ------------------------------------------------------------------------------------------------ | ------------ |
| scroll           | 当以任意交互形式进行了滚动后触发，返回一个 `{ type, clientX, clientY, percentX, percnetY }` 对象 | ScrollObject |
| scroll-start     | 当使用 pointer 滚动开始时触发，返回一个 `{ clientX, clientY, percentX, percnetY }` 对象          | ScrollObject |
| scroll-end       | 当使用 pointer 滚动结束时触发，返回一个 `{ clientX, clientY, percentX, percnetY }` 对象          | ScrollObject |
| x-enable-change  | 当横向滚动的激活状态改变时触发，返回当前滚动状态                                                 | enableX      |
| y-enable-change  | 当纵向滚动的激活状态改变时触发，返回当前滚动状态                                                 | enableY      |
| bar-scroll-start | 当使用滚动条触发滚动开始时触发，返回当前触发的滚动条类型 `vertical` 或 `horizontal`              | type         |
| bar-scroll-end   | 当使用滚动条触发滚动结束时触发，返回当前触发的滚动条类型 `vertical` 或 `horizontal`              | type         |

### NativeScroll 插槽

| 名称    | 说明           |
| ------- | -------------- |
| defalut | 滚动内容的插槽 |
