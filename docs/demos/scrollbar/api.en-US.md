### Scrollbar Props

| Name        | Type             | Description                                                                                 | Default  |
| ----------- | ---------------- | ------------------------------------------------------------------------------------ | ------- |
| placement   | `'top' \| 'right' \| 'bottom' \| 'left'`           | 滚动条的位置                              | `'right'` |
| scroll      | `number`           | 设置滚动条的滚动位置，百分比                                                         | `0`       |
| bar-length  | `number`           | 滚动条的长度 (纵向时为高度)，单位为百分比，可选值 `1` ~ `99`                             | `35`      |
| appear      | `boolean`          | 设置滚动条是否在初始渲染就启用过渡效果                                               | `false`   |
| fade        | `number`           | 设置触发滚动条渐隐的等待毫秒，若小于 `300` 则关闭渐隐效果                              | `1500`    |
| bar-color   | `string`           | 滚动条的背景颜色                                                                     | `null`    |
| disabled    | `boolean`          | 设置滚动条的禁用状态                                                                 | `false`   |
| wrapper     | `string \| HTMLElement` | 传入 id 选择器或一个 Node 对象，设置滚动条的容器，用于感知鼠标移动已显示和隐藏滚动条 | `null`    |
| duration    | `number`           | 设置滚动条过渡效果的持续时间，单位为毫秒                                             | `null`    |
| use-track   | `boolean`          | 设置是否开启滚动条轨道交互                                                           | `false`   |
| track-speed | `number`           | 设置点击轨道触发滚动的基础移动速度，单位为百分比，可选值为 `1` ~ `9`                     | `2`       |

### Scrollbar Events

| Name            | Description                                                        | Parameters   |
| --------------- | ----------------------------------------------------------- | ------ |
| scroll-start | 当即将使用滚动条进行滚动时触发，返回当前的滚动位置 (百分比) | `(percent: number)` |
| scroll       | 当使用滚动条进行滚动时触发，返回当前的滚动位置 (百分比)     | `(percent: number)` |
| scroll-end   | 当停止使用滚动条进行滚动时触发，返回当前的滚动位置 (百分比) | `(percent: number)` |
