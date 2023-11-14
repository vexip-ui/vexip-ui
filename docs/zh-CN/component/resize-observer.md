# ResizeObserver 缩放观察 ==!s|2.0.0==

## 代码示例

:::demo resize-observer/basis

### 简单例子

尝试缩放一下该元素。

:::

## API

### ResizeObserver 属性

| 名称      | 类型                                  | 说明                                                   | 默认值  | 始于    |
| --------- | ------------------------------------- | ------------------------------------------------------ | ------- | ------- |
| on-resize | `(entry: ResizeObserverEntry) => any` | 大小变化后的回调                                       | `null`  | -       |
| throttle  | `boolean \| number`                   | 设置是否开启回调的节流，传入数字时可以定制节流的毫秒数 | `false` | -       |
| disabled  | `boolean`                             | 设置是否禁用                                           | `false` | `2.2.8` |
