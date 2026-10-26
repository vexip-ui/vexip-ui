# ResizeObserver 缩放观察 ==!s|2.0.0==

## 代码示例

:::demo resize-observer/basis

### 简单例子

尝试缩放一下该元素。

:::

:::demo resize-observer/directive

### 使用指令

使用 `v-resize` 指令可以快速为元素添加缩放回调。

:::

## API

### 预设类型

```ts
type ResizeHandler = (entry: ResizeObserverEntry) => any

interface VResizeOptions {
  handler: ResizeHandler,
  throttle?: boolean | number,
  disabled?: boolean
}
```

### ResizeObserver 属性

| 名称      | 类型                                  | 说明                                                   | 默认值  | 始于    |
| --------- | ------------------------------------- | ------------------------------------------------------ | ------- | ------- |
| on-resize | `(entry: ResizeObserverEntry) => any` | 大小变化后的回调                                       | `null`  | -       |
| throttle  | `boolean \| number`                   | 设置是否开启回调的节流，传入数字时可以定制节流的毫秒数 | `false` | -       |
| disabled  | `boolean`                             | 设置是否禁用                                           | `false` | `2.2.8` |

### ResizeObserver 指令

| 名称     | 说明                                                | 参数                                         | 始于    |
| -------- | --------------------------------------------------- | -------------------------------------------- | ------- |
| v-resize | 用于为元素快速添加缩放回调，支持 `.throttle` 修饰符 | `(binding: ResizeHandler \| VResizeOptions)` | `2.3.0` |
