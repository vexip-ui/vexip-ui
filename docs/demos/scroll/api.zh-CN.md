### Scroll 属性

| 名称             | 类型                                                         | 说明                                                                          | 默认值       | 始于 |
| ---------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------ | ---- |
| mode             | `'horizontal' \| 'horizontal-exact' \| 'vertical' \| 'both'` | 滚动的模式                                                                    | `'vertical'` | -    |
| scroll-class     | `string \| Record<string, boolean>`                          | 滚动内容包围元素的自定义类名                                                  | `null`       | -    |
| width            | `number \| string`                                           | 滚动视窗的宽度，内容的宽度大于视窗的宽度时才可滚动                            | `''`         | -    |
| height           | `number \| string`                                           | 滚动视窗的高度，内容的高度大于视窗的高度时才可滚动                            | `''`         | -    |
| delat-x          | `number`                                                     | 每次横向滚动的距离                                                            | `20`         | -    |
| delta-y          | `number`                                                     | 每次纵向滚动的距离                                                            | `20`         | -    |
| disabled         | `boolean`                                                    | 设置是否禁用滚动                                                              | `false`      | -    |
| pointer          | `boolean`                                                    | 设置是否开启鼠标拖动滚动                                                      | `false`      | -    |
| wheel            | `boolean`                                                    | 设置是否开启滚轮滚动                                                          | `true`       | -    |
| scroll-x         | `number`                                                     | 设置横向滚动的位置                                                            | `0`          | -    |
| scroll-y         | `number`                                                     | 设置纵向滚动的位置                                                            | `0`          | -    |
| use-x-bar        | `boolean`                                                    | 设置是否使用横向滚动条                                                        | `false`      | -    |
| use-y-bar        | `boolean`                                                    | 设置是否使用纵向滚动条                                                        | `false`      | -    |
| bar-fade         | `number`                                                     | 设置触发滚动条渐隐的等待毫秒，若小于 300 则关闭渐隐效果                       | `1500`       | -    |
| bar-class        | `string \| Record<string, boolean>`                          | 设置滚动条的自定义类名                                                        | `null`       | -    |
| autoplay         | `boolean \| number`                                          | 设置滚动条自动滚动，当传入数字时，会作为一次完整滚动的所需毫秒数              | `false`      | -    |
| play-waiting     | `number`                                                     | 当开启了自动滚动时，设置每次开始滚动前和结束滚动后的暂缓毫秒数                | `500`        | -    |
| on-before-scroll | `(payload: { signX: number, signY: number }) => boolean`     | 设置滚动前的回调，**不支持**异步函数和 `Promise`，返回值为 `false` 会阻止滚动 | `null`       | -    |
| use-bar-track    | `boolean`                                                    | 设置滚动条是否启用轨道交互                                                    | `false`      | -    |

### Scroll 事件

| 名称             | 说明                                                                                | 参数                                                                                                                                   | 始于 |
| ---------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| scroll           | 当以任意交互形式进行了滚动后触发                                                    | `(scroll: { type?: 'vertical' \| 'horizontal', clientX: number, clientY: number, percentX: number, percnetY: number })`                | -    |
| wheel            | 当用滚轮进行了滚动后触发，其中 `sign` 标记滚动的方向                                | `(scroll: { type?: 'vertical' \| 'horizontal', sign: -1 \| 1, clientX: number, clientY: number, percentX: number, percnetY: number })` | -    |
| x-enable-change  | 当横向滚动的激活状态改变时触发，返回当前滚动状态                                    | `(enabled: boolean)`                                                                                                                   | -    |
| y-enable-change  | 当纵向滚动的激活状态改变时触发，返回当前滚动状态                                    | `(enabled: boolean)`                                                                                                                   | -    |
| ready            | 当滚动触发刷新，并在刷新成功即将进入正常可用状态时触发，无返回值                    | -                                                                                                                                      | -    |
| scroll-start     | 当使用 pointer 滚动开始时触发                                                       | `(scroll: { clientX: number, clientY: number, percentX: number, percnetY: number })`                                                   | -    |
| scroll-end       | 当使用 pointer 滚动结束时触发                                                       | `(scroll: { clientX: number, clientY: number, percentX: number, percnetY: number })`                                                   | -    |
| bar-scroll-start | 当使用滚动条触发滚动开始时触发，返回当前触发的滚动条类型 `vertical` 或 `horizontal` | `(type: 'vertical' \| 'horizontal')`                                                                                                   | -    |
| bar-scroll-end   | 当使用滚动条触发滚动结束时触发，返回当前触发的滚动条类型 `vertical` 或 `horizontal` | `(type: 'vertical' \| 'horizontal')`                                                                                                   | -    |

### Scroll 插槽

| 名称    | 说明           | 参数 | 始于 |
| ------- | -------------- | ---- | ---- |
| defalut | 滚动内容的插槽 | -    | -    |
