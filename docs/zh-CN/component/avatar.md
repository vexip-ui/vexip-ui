# Avatar 头像 ==!s|2.0.0==

用户的首要标志，可以使用图片、图标或文字进行展示。

## 代码示例

:::demo avatar/basis

### 基础用法

内置了三种大小，或者你可以设置 `size` 为具体的大小。

:::

:::demo avatar/circle

### 圆形头像

添加 `circle` 属性可以让头像变成圆形。

:::

:::demo avatar/icon

### 图标头像

将图标传入 `icon` 属性可以使用图标作为头像。

设置 `icon-scale` 的值可以调整图标的缩放比例。

:::

:::demo avatar/text

### 文字头像

使用默认插槽可以将文字作为头像，并且文字会根据头像大小自动计算缩放比例。

可以结合 `gap` 属性设置头像两侧的内边距。

:::

:::demo avatar/badge

### 添加徽标

可以与 Badge 组件结合使用。

:::

:::demo avatar/error

### 回退行为

当使用图片时，加载失败会触发事件回调。

如果你设置了 `fallback-src` 那会尝试使用该值作为源地址重新加载。

:::

:::demo avatar/group

### 头像组

结合 AvatarGroup 组件可以灵活创建头像组。

:::

:::demo avatar/tip

### 自定义提示

使用头像组时，通过 `tip` 插槽可以自定义提示气泡的内容。

:::

:::demo avatar/vertical

### 纵向组

添加 `vertical` 属性可以使头像组变成纵向的。

:::

## API

### Avatar 属性

| 名称         | 类型                                                       | 说明                                             | 默认值      | 始于 |
| ------------ | ---------------------------------------------------------- | ------------------------------------------------ | ----------- | ---- |
| size         | `number \| 'small' \| 'default' \| 'large'`                | 头像的大小，当作用在头像组时优先使用组的大小     | `'default'` | -    |
| src          | `string`                                                   | 头像图片的源地址                                 | `''`        | -    |
| icon         | `VueComponent`                                             | 头像的图标对象                                   | `null`      | -    |
| circle       | `boolean`                                                  | 设置头像是否为圆形                               | `false`     | -    |
| alt          | `string`                                                   | 设置头像图片的 `alt` 属性                        | `''`        | -    |
| fit          | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | 设置头像的图片如何填充，同 `css` 的 `object-fit` | `'cover'`   | -    |
| src-set      | `string`                                                   | 设置头像图片的 `srcset` 属性                     | `''`        | -    |
| gap          | `number`                                                   | 设置文字头像左右两侧内边界的 `px` 值             | `4`         | -    |
| icon-scale   | `number`                                                   | 设置头像图标的缩放值                             | `1.4`       | -    |
| fallback-src | `string`                                                   | 头像图片加载失败时的后备源地址                   | `''`        | -    |
| color        | `string`                                                   | 设置头像的图标和文字的颜色                       | `null`      | -    |
| background   | `string`                                                   | 设置头像的背景颜色                               | `null`      | -    |

### Alert 事件

| 名称  | 说明                                     | 参数             | 始于 |
| ----- | ---------------------------------------- | ---------------- | ---- |
| error | 当使用的图片加载失败时触发，返回错误事件 | `(event: Event)` | -    |

### Alert 插槽

| 名称    | 说明                                                             | 参数 | 始于 |
| ------- | ---------------------------------------------------------------- | ---- | ---- |
| default | 头像的文字内容插槽，当未使用图片或图片无效、且未使用图标时才有效 | -    | -    |

### AvatarGroup 属性

| 名称            | 类型                                                                                                  | 说明                                     | 默认值      | 始于 |
| --------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------- | ----------- | ---- |
| size            | `number \| 'small' \| 'default' \| 'large'`                                                           | 设置组内头像的大小                       | `'default'` | -    |
| options         | `Array<({ src: string } \| { icon: Record<string, any> } \| { text: string }) & Record<string, any>>` | 头像组的选项                             | `[]`        | -    |
| circle          | `boolean`                                                                                             | 头像组的大小，会覆盖组内的头像的大小属性 | `false`     | -    |
| max             | `number`                                                                                              | 设置显示头像的最大个数                   | `null`      | -    |
| show-tip        | `boolean`                                                                                             | 设置是否为超出部分显示提示气泡           | `false`     | -    |
| tip-trigger     | `'hover' \| 'click'`                                                                                  | 提示气泡的触发方式                       | `'hover'`   | -    |
| vertical        | `boolean`                                                                                             | 设置头像组是否为纵向排列                 | `false`     | -    |
| offset          | `number`                                                                                              | 设置组内头像的偏移量                     | `null`      | -    |
| rest-color      | `string`                                                                                              | 设置超出部分头像的图标和文字颜色         | `null`      | -    |
| rest-background | `string`                                                                                              | 设置超出部分头像的背景颜色               | `null`      | -    |

### AlertGroup 插槽

| 名称    | 说明                                               | 参数                                                                                                                              | 始于 |
| ------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---- |
| default | 常规显示的头像的插槽                               | `{ option: ({ src: string } \| { icon: Record<string, any> } \| { text: string }) & Record<string, any>, index: number }`         | -    |
| rest    | 超出部分头像的插槽，接收超出部分的选项和超出的数目 | `{ options: Array<({ src: string } \| { icon: Record<string, any> } \| { text: string }) & Record<string, any>>, count: number }` | -    |
| tip     | 提示气泡的插槽，接收超出部分的选项和超出的数目     | `{ options: Array<({ src: string } \| { icon: Record<string, any> } \| { text: string }) & Record<string, any>>, count: number }` | -    |
