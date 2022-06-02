### Timeline Props

| Name       | Type             | Description                                                          | Default | Since |
| ---------- | ---------------- | ------------------------------------------------------------- | ------ | --- |
| pending    | `boolean`          | 设置时间线是否为未完成状态                                    | `false`  | - |
| both-sides | `boolean`          | 设置是否开启两侧模式                                          | `false`  | - |
| dashed     | `boolean`          | 设置时间线是否为虚线                                          | `false`  | - |
| lineColor  | `string`           | 设置时间线的颜色                                              | `null`   | - |
| spacing    | `number \| string` | 设置时间节点间的间隔距离，可以传入一个数字或合法的 css 长度值 | `null`   | - |

### Timeline Events

| Name            | Description                                             | Parameters  | Since |
| --------------- | ------------------------------------------------ | ----- | --- |
| signal-click | 当时间线节点被点击时触发，返回被点击节点的 `label` | `(label: string \| number)` | - |

### TimelineItem Props

| Name      | Type             | Description                                                                                   | Default   | Since |
| --------- | ---------------- | -------------------------------------------------------------------------------------- | -------- | --- |
| type      | `'default' \| 'success' \| 'error' \| 'warning' \| 'disabled'`           | 时间节点的类型 | `'default'` | - |
| color     | `string`           | 可以指定节点的自定义颜色                                         | `''`       | - |
| label     | `number \| string` | 设置节点的 `label`，在监听节点点击事件时有用                                             | `null`     | - |
| dashed    | `boolean`          | 设置时间节点的线是否为虚线                                                             | `false`    | - |
| lineColor | `string`           | 设置时间节点的线的颜色                                                                 | `null`     | - |
| spacing   | `number \| string` | 设置时间节点间的间隔距离，可以传入一个数字或合法的 css 长度值                          | `null`     | - |

### TimelineItem Events

| Name            | Description                                     | Parameters  | Since |
| --------------- | ---------------------------------------- | ----- | --- |
| signal-click | 当时间线节点被点击时触发，返回当前 `label` | `(label: string \| number)` | - |
