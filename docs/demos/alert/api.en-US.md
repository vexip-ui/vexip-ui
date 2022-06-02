### Alert Props

| Name          | Type              | Description                                                           | Default |
| ------------- | ----------------- | -------------------------------------------------------------- | ------ |
| type          | `'info' \| 'success' \| 'warning' \| 'error'`          | 警告提示的类型 | `'info'` |
| title         | `string`            | 设置警告提示标题，使用同名插槽后失效                           | `''`     |
| colorful-text | `boolean`           | 设置字体是否具有和类型一致的颜色                               | `false`  |
| icon          | `boolean \| Record<string, any>` | 设置是否显示图标，可以直接传入图标进行显示           | `false`  |
| closable      | `boolean`           | 设置警告提示是否可以被关闭                                     | `false`  |
| icon-color    | `string`            | 设置警告提示图标的颜色                                         | `''`     |
| no-border     | `boolean`           | 设置是否禁用警告提示的边框                                     | `false`  |
| banner        | `boolean`           | 设置是否作为顶部通告的形式，开启后样式会有相应的调整           | `false`  |

### Alert Events

| Name     | Description                             | Parameters |
| -------- | -------------------------------- | ---- |
| close | 当警告提示被关闭时触发，无返回值 | -    |
| hide  | 当警告提示消失时触发，无返回值   | -    |

### Alert Slots

| Name    | Description                       | Parameters |
| ------- | -------------------------- | --- |
| default | 警告提示的内容插槽         | - |
| title   | 警告提示的标题内容插槽     | - |
| icon    | 警告提示的图标内容插槽     | - |
| close   | 警告提示的关闭按钮内容插槽 | - |
