### TimeAgo 属性

| 名称         | 类型                     | 说明                                                         | 默认值                |
| ------------ | ------------------------ | ------------------------------------------------------------ | --------------------- |
| datetime     | String \| Number \| Date | 设置相对时间的参考计算时间值                                 | Date.now()            |
| interval     | Number                   | 设置刷新间隔的秒数                                           | 10                    |
| title        | Boolean \| String        | 设置是否显示 title，传入布尔值时会使用过 title-format 格式化 | false                 |
| title-format | String                   | 设置 title 的格式化时的日期格式                              | 'yyyy-MM-dd HH:mm:ss' |
