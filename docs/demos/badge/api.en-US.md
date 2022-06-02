### Badge Props

| Name     | Type             | Description                                                                                  | Default  |
| -------- | ---------------- | ------------------------------------------------------------------------------------- | ------- |
| content  | `number \| string` | 徽标的内容                                                                            | `null`    |
| max      | `number`           | 当徽标为数字时，可以设置最大值，超过最大值后会显示为 `` `${max}+` ``                  | `0`       |
| disabled | `boolean`          | 设置徽标是否禁用，禁用后将不显示任何内容                                              | `false`   |
| is-dot   | `boolean`          | 设置徽标是否为状态点                                                                  | `false`   |
| type     | `'error' \| 'primary' \| 'success' \| 'warning' \| 'info' \| 'disabled'`           | 设置徽标的类型 | `'error'` |
| color    | `String`           | 设置徽标的颜色，当内置类型无法满足需求是可以使用                                      | `null`    |

### Badge Events

| Name           | Description                       | Parameters |
| -------------- | -------------------------- | ---- |
| badge-click | 当点击徽标时触发，无返回值 | -    |

### Badge Slots

| Name    | Description                   | Parameters |
| ------- | ---------------------- | ---- |
| default | 需要设置徽标的内容插槽 | - |
| content | 徽标的内容插槽         | - |
