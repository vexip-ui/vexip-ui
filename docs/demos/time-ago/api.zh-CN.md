### TimeAgo 属性

| 名称         | 类型                     | 说明                                                         | 默认值                |
| ------------ | ------------------------ | ------------------------------------------------------------ | --------------------- |
| datetime     | `string \| number \| Date` | 设置相对时间的参考计算时间值                                 | `Date.now()`            |
| interval     | `number`                   | 设置刷新间隔的秒数                                           | `10`                    |
| title        | `boolean \| string`        | 设置是否显示标题，传入布尔值时会使用过 `title-format` 格式化 | `false`                 |
| title-format | `string`                   | 设置 `title` 的格式化时的日期格式                              | `'yyyy-MM-dd HH:mm:ss'` |
