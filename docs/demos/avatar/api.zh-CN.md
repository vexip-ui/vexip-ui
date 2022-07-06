### Avatar 属性

| 名称        | 类型                                                       | 说明                                             | 默认值      | 始于 |
| ----------- | ---------------------------------------------------------- | ------------------------------------------------ | ----------- | ---- |
| size        | `number \| 'small' \| 'default' \| 'large'`                | 头像的大小，当作用在头像组时优先使用组的大小     | `'default'` | -    |
| src         | `string`                                                   | 头像图片的源地址                                 | `''`        | -    |
| icon        | `Record<string, any>`                                      | 头像的图标对象                                   | `null`      | -    |
| circle      | `boolean`                                                  | 设置头像是否为圆形                               | `false`     | -    |
| alt         | `string`                                                   | 设置头像图片的 `alt` 属性                        | `''`        | -    |
| fit         | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | 设置头像的图片如何填充，同 `css` 的 `object-fit` | `'cover'`   | -    |
| src-set      | `string`                                                   | 设置头像图片的 `srcset` 属性                     | `''`        | -    |
| gap         | `number`                                                   | 设置文字头像左右两侧内边界的 `px` 值             | `4`         | -    |
| icon-scale   | `number`                                                   | 设置头像图标的缩放值                             | `1.4`       | -    |
| fallback-src | `string`                                                   | 头像图片加载失败时的后备源地址                   | `''`        | -    |
| color       | `string`                                                   | 设置头像的图标和文字的颜色                       | `null`      | -    |
| background  | `string`                                                   | 设置头像的背景颜色                               | `null`      | -    |

### Alert 事件

| 名称  | 说明                                     | 参数             | 始于 |
| ----- | ---------------------------------------- | ---------------- | ---- |
| error | 当使用的图片加载失败时触发，返回错误事件 | `(event: Event)` | -    |

### Alert 插槽

| 名称    | 说明                                                             | 参数 | 始于 |
| ------- | ---------------------------------------------------------------- | ---- | ---- |
| default | 头像的文字内容插槽，当未使用图片或图片无效、且未使用图标时才有效 | -    | -    |

### AvatarGroup 属性

| 名称        | 类型                                                       | 说明                                             | 默认值      | 始于 |
| ----------- | ---------------------------------------------------------- | ------------------------------------------------ | ----------- | ---- |
| size            | `number \| 'small' \| 'default' \| 'large'`                                                           | 设置组内头像的大小                       | `'default'` | -     |
| options         | `Array<({ src: string } \| { icon: Record<string, any> } \| { text: string }) & Record<string, any>>` | 头像组的选项                             | `[]`        | -     |
| circle          | `boolean`                                                                                             | 头像组的大小，会覆盖组内的头像的大小属性 | `false`     | -     |
| max             | `number`                                                                                              | 设置显示头像的最大个数                   | `null`      | -     |
| show-tip        | `boolean`                                                                                             | 设置是否为超出部分显示提示气泡           | `false`     | -     |
| tip-trigger     | `'hover' \| 'click'`                                                                                  | 提示气泡的触发方式                       | `'hover'`   | -     |
| vertical        | `boolean`                                                                                             | 设置头像组是否为纵向排列                 | `false`     | -     |
| offset          | `number`                                                                                              | 设置组内头像的偏移量                     | `null`      | -     |
| rest-color      | `string`                                                                                              | 设置超出部分头像的图标和文字颜色         | `null`      | -     |
| rest-background | `string`                                                                                              | 设置超出部分头像的背景颜色               | `null`      | -     |

### AlertGroup 插槽

| 名称    | 说明                                                             | 参数 | 始于 |
| ------- | ---------------------------------------------------------------- | ---- | ---- |
| default | 常规显示的头像的插槽                               | `{ option: ({ src: string } \| { icon: Record<string, any> } \| { text: string }) & Record<string, any>, index: number }`         | -     |
| rest    | 超出部分头像的插槽，接收超出部分的选项和超出的数目 | `{ options: Array<({ src: string } \| { icon: Record<string, any> } \| { text: string }) & Record<string, any>>, count: number }` | -     |
| tip     | 提示气泡的插槽，接收超出部分的选项和超出的数目     | `{ options: Array<({ src: string } \| { icon: Record<string, any> } \| { text: string }) & Record<string, any>>, count: number }` | -     |
