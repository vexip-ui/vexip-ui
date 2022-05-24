## API

### 属性

| 属性       | 类型             | 说明                                                          | 默认值 |
| ---------- | ---------------- | ------------------------------------------------------------- | ------ |
| pending    | Boolean          | 设置时间线是否为未完成状态                                    | false  |
| both-sides | Boolean          | 设置是否开启两侧模式                                          | false  |
| dashed     | Boolean          | 设置时间线是否为虚线                                          | false  |
| lineColor  | String           | 设置时间线的颜色                                              | null   |
| spacing    | Number \| String | 设置时间节点间的间隔距离，可以传入一个数字或合法的 css 长度值 | null   |

### 事件

| 事件            | 说明                                             | 参数  |
| --------------- | ------------------------------------------------ | ----- |
| on-signal-click | 当时间线节点被点击时触发，返回被点击节点的 label | label |

### Item 属性

| 属性      | 类型             | 说明                                                                                   | 默认值   |
| --------- | ---------------- | -------------------------------------------------------------------------------------- | -------- |
| type      | String           | 时间节点的类型，可选值为 `normal`、`success`、`error`、`warning`、`disabled`、`custom` | 'normal' |
| color     | String           | 当节点类型为 custom 时可以指定节点的自定义颜色                                         | ''       |
| label     | Number \| String | 设置节点的 label，在监听节点点击事件时有用                                             | null     |
| dashed    | Boolean          | 设置时间节点的线是否为虚线                                                             | false    |
| lineColor | String           | 设置时间节点的线的颜色                                                                 | null     |
| spacing   | Number \| String | 设置时间节点间的间隔距离，可以传入一个数字或合法的 css 长度值                          | null     |

### Item 事件

| 事件            | 说明                                     | 参数  |
| --------------- | ---------------------------------------- | ----- |
| on-signal-click | 当时间线节点被点击时触发，返回当前 label | label |
