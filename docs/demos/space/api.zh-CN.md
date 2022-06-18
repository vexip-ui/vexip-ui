### Space 属性

| 名称         | 类型                                                                                  | 说明                                                                                    | 默认值             | 始于 |
| ------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------ | ---- |
| vertical     | `boolean`                                                                             | 设置是否为纵向排列                                                                      | `false`            | -    |
| inline       | `boolean`                                                                             | 设置是否为行内布局                                                                      | `false`            | -    |
| tag          | `string`                                                                              | 设置要渲染的标签                                                                        | `'div'`            | -    |
| align        | `'start' \| 'end' \| 'center' \| 'baseline' \| 'stretch'`                             | 设置纵向的对齐方式                                                                      | `'stretch'`        | -    |
| justify      | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | 设置横向的对齐方式                                                                      | `'start'`          | -    |
| no-wrap      | `boolean`                                                                             | 设置是否不换行                                                                          | `false`            | -    |
| size         | `'small' \| 'default' \| 'large' \| number \| [number, number]`                       | 设置间距的大小，可以传入数字设置具体值，也可以传入数组分别控制横向和纵向的间距          | `'default'`        | -    |
| item-style   | `string \| Record<string, any>`                                                       | 子元素的自定义样式                                                                      | `null`             | -    |
| gap-disabled | `boolean`                                                                             | 设置是否禁用 `gap` 属性，禁用后会采用内外边距实现间距，默认情况会根据兼容性判断是否使用 | `flexGapSupported` | -    |

### Space 插槽

| 名称    | 说明           | 参数 | 始于 |
| ------- | -------------- | ---- | ---- |
| default | 需要间隔的内容 | -    | -    |
