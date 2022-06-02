### ResizeObserver Props

| Name      | Type                                  | Description                                                   | Default  | Since |
| --------- | ------------------------------------- | ------------------------------------------------------ | ------- | --- |
| on-resize | `(entry: ResizeObserverEntry) => any` | 大小变化后的回调                                       | `null`  | - |
| throttle  | `boolean \| number`                   | 设置是否开启回调的节流，传入数字时可以定制节流的毫秒数 | `false` | - |
