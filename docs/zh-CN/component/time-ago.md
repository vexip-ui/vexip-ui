# TimeAgo 相对时间 ^[Since v1.1.0](!s)

## 代码示例

:::demo time-ago/basis

### 基础用法

最简单的用法。

:::

:::demo time-ago/interval

### 自动刷新

添加 `interval` 属性可以开启自动刷新，默认为 `10` 秒刷新一次。

也可以传入一个大于等于 `5` 的数值自定义刷新的间隔秒数。

:::

## API

### TimeAgo 属性

| 名称         | 类型                       | 说明                                                         | 默认值                  | 始于    |
| ------------ | -------------------------- | ------------------------------------------------------------ | ----------------------- | ------- |
| datetime     | `string \| number \| Date` | 设置相对时间的参考计算时间值                                 | `Date.now()`            | -       |
| interval     | `boolean \| number`        | 设置刷新间隔的秒数                                           | `false`                 | -       |
| title        | `boolean \| string`        | 设置是否显示标题，传入布尔值时会使用过 `title-format` 格式化 | `false`                 | -       |
| title-format | `string`                   | 设置 `title` 的格式化时的日期格式                            | `'yyyy-MM-dd HH:mm:ss'` | -       |
| locale       | `LocaleConfig['timeAgo']`  | 设置多语言配置                                               | `null`                  | `2.1.0` |
