### Skeleton 属性

| 名称      | 类型                              | 说明                                                         | 默认值  | 始于 |
| --------- | --------------------------------- | ------------------------------------------------------------ | ------- | ---- |
| size      | `'small' \| 'default' \| 'large'` | 为骨架屏设置内置的大小，一般用于对齐其他组件的大小           | `null`  | -    |
| width     | `number \| string`                | 设置骨架屏的宽度，可以传入合法的 css 大小值                  | `null`  | -    |
| height    | `number \| string`                | 设置骨架屏的高度，可以传入合法的 css 大小值                  | `null`  | -    |
| repeat    | `number`                          | 设置骨架屏的重复渲染次数                                     | `1`     | -    |
| tag       | `string`                          | 设置骨架屏渲染的标签                                         | `'div'` | -    |
| activated | `boolean`                         | 设置骨架屏是否处于激活效果                                   | `false` | -    |
| image     | `boolean`                         | 设置是否为图片占位骨架屏                                     | `false` | -    |
| imageIcon | `Record<string, any>`             | 图片占位时的图标                                             | `null`  | -    |
| iconScale | `Number`                          | 图片占位时的图标缩放倍数                                     | `4`     | -    |
| round     | `boolean`                         | 设置是否为圆角骨架屏                                         | `false` | -    |
| circle    | `boolean`                         | 设置是否为圆形骨架屏，设置后 `width` 属性将失效              | `false` | -    |
| block     | `boolean`                         | 设置是否为 `block` 占位元素                                  | `false` | -    |
| spread    | `number`                          | 设置骨架屏的下边距                                           | `0`     | -    |
| loading   | `boolean`                         | 设置是否处于加载状态，再非加载状态下会直接渲染默认插槽的内容 | `true`  | -    |
