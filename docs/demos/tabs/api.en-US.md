### Tabs Props

| Name   | Type             | Description                                            | Default |
| ------ | ---------------- | ----------------------------------------------- | ------ |
| card   | `boolean`          | 设置导航栏是否开启卡片模式                      | `false`  |
| active | `string \| number` | 设置当前激活的标签页，可以使用 v-model 双向绑定 | `''`     |

### Tabs Events

| Name      | Description                                                   | Parameters  |
| --------- | ------------------------------------------------------ | ----- |
| change | 当激活的标签页发生变化时触发，返回当前激活标签页的标签 | `(label: string \| number)` |

### TabPane Props

| Name     | Type             | Description               | Default |
| -------- | ---------------- | ------------------ | ------ |
| label    | `string \| number` | 导航页的唯一索引   | `''`     |
| disabled | `boolean`          | 设置是否禁用该导航 | `false`  |
| icon     | `string`           | 设置导航的前置图标 | `''`     |

### TabPane Events

| Name      | Description                                                     | Parameters   |
| --------- | -------------------------------------------------------- | ------ |
| change | 当标签页的激活状态发生变化时触发，返回当前标签页是否激活 | `(active: boolean)` |
