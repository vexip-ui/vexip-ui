## API

### 属性

| 名称          | 类型              | 说明                                                                  | 默认值     |
| ------------- | ----------------- | --------------------------------------------------------------------- | ---------- |
| mode          | String            | 滚动的模式，可选值为 `horizontal`、`vertical`、`both`                 | 'vertical' |
| scroll-class  | String \| Object  | 滚动内容包围元素的自定义类名                                          | null       |
| width         | Number \| String  | 滚动视窗的宽度，内容的宽度大于视窗的宽度时才可滚动                    | ''         |
| height        | Number \| String  | 滚动视窗的高度，内容的高度大于视窗的高度时才可滚动                    | ''         |
| delat-x       | Number            | 每次横向滚动的距离                                                    | 20         |
| delta-y       | Number            | 每次纵向滚动的距离                                                    | 20         |
| disabled      | Boolean           | 设置是否禁用滚动                                                      | false      |
| pointer       | Boolean           | 设置是否开启鼠标拖动滚动                                              | false      |
| wheel         | Boolean           | 设置是否开启滚轮滚动                                                  | true       |
| scroll-x      | Number            | 设置横向滚动的位置                                                    | 0          |
| scroll-y      | Number            | 设置纵向滚动的位置                                                    | 0          |
| use-x-bar     | Boolean           | 设置是否使用横向滚动条                                                | false      |
| use-y-bar     | Boolean           | 设置是否使用纵向滚动条                                                | false      |
| bar-fade      | Number            | 设置触发滚动条渐隐的等待毫秒，若小于 300 则关闭渐隐效果               | 1500       |
| bar-class     | String \| Object  | 设置滚动条的自定义类名                                                | null       |
| autoplay      | Boolean \| Number | 设置滚动条自动滚动，当传入数字时，会作为一次完整滚动的所需毫秒数      | false      |
| play-waiting  | Number            | 当开启了自动滚动时，设置每次开始滚动前和结束滚动后的暂缓毫秒数        | 500        |
| before-scroll | Function          | 设置滚动前的回调，不支持异步函数和 Promise，返回值为 false 会阻止滚动 | null       |
| use-bar-track | Boolean           | 设置滚动条是否启用轨道交互                                            | false      |

### 事件

| 名称                | 说明                                                                                                                       | 参数         |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------ |
| on-scroll           | 当以任意交互形式进行了滚动后触发，返回一个 `{ type, clientX, clientY, percentX, percnetY }` 对象                           | ScrollObject |
| on-wheel            | 当用滚轮进行了滚动后触发，返回一个 `{ type, sign, clientX, clientY, percentX, percnetY }` 对象，其中 `sign` 标记滚动的方向 | ScrollObject |
| on-x-enable-change  | 当横向滚动的激活状态改变时触发，返回当前滚动状态                                                                           | enableX      |
| on-y-enable-change  | 当纵向滚动的激活状态改变时触发，返回当前滚动状态                                                                           | enableY      |
| on-ready            | 当滚动触发刷新，并在刷新成功即将进入正常可用状态时触发，无返回值                                                           | -            |
| on-scroll-start     | 当使用 pointer 滚动开始时触发，返回一个 `{ clientX, clientY, percentX, percnetY }` 对象                                    | ScrollObject |
| on-scroll-end       | 当使用 pointer 滚动结束时触发，返回一个 `{ clientX, clientY, percentX, percnetY }` 对象                                    | ScrollObject |
| on-bar-scroll-start | 当使用滚动条触发滚动开始时触发，返回当前触发的滚动条类型 `vertical` 或 `horizontal`                                        | type         |
| on-bar-scroll-end   | 当使用滚动条触发滚动结束时触发，返回当前触发的滚动条类型 `vertical` 或 `horizontal`                                        | type         |

### 插槽

| 名称    | 说明           |
| ------- | -------------- |
| defalut | 滚动内容的插槽 |
