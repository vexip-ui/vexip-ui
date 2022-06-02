### TabNav Props

| Name   | Type             | Description                                          | Default |
| ------ | ---------------- | --------------------------------------------- | ------ |
| active | `string \| number` | 设置当前激活的导航，可以使用 v-model 双向绑定 | `null`   |
| card   | `boolean`          | 设置是否开启卡片模式                          | `false`  |

### TabNav Events

| Name      | Description                                               | Parameters |
| --------- | -------------------------------------------------- | ---- |
| change | 当激活的导航发生变化时触发，返回当前激活导航的名字 | `(label: string \| number)` |

### TabNavItem Props

| Name     | Type             | Description                     | Default |
| -------- | ---------------- | ------------------------ | ------ |
| label    | `string \| number` | 导航的唯一索引，未设置时会采用内部的 `index` 值 | `null`      |
| disabled | `boolean`          | 设置是否禁用该导航       | `false`  |
| icon     | `string`           | 设置导航的前置图标       | `''`     |

### TabNavItem Events

| Name      | Description                                       | Parameters  |
| --------- | ------------------------------------------ | ----- |
| toggle | 当该导航被选择时触发，返回当前是否处于激活状态 | `(active: boolean)` |
