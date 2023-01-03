### 预设类型

```ts
type CountToTimingName = 'linear' | 'easeOut'
type CountToTiming = (progress: number, localStart: number, end: number, duration: number) => number
```

### CountTo 属性

| 名称      | 类型                                 | 说明                 | 默认值     | 始于 |
| --------- | ------------------------------------ | -------------------- | ---------- | ---- |
| start     | `number`                             | 开始的数字           | `0`        | -    |
| end       | `number`                             | 结束的数字           | `0`        | -    |
| manual    | `boolean`                            | 是否自动播放滚动动画 | `false`    | -    |
| duration  | `number`                             | 播放动画的时间       | `3000`     | -    |
| decimals  | `number`                             | 展示小数点后几位     | `0`        | -    |
| decimal   | `string`                             | 小数分隔符           | `'.'`      | -    |
| separator | `string`                             | 千分位分隔符         | `','`      | -    |
| prefix    | `string`                             | 自定义前缀内容       | `''`       | -    |
| suffix    | `string`                             | 自定义后缀内容       | `''`       | -    |
| timing    | `CountToTimingName \| CountToTiming` | 数字变化的过渡函数   | `'linear'` | -    |
