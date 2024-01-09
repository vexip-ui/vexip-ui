# FullScreen 全屏 ==!s|2.1.0==

这个组件将帮助你快速实现全屏展示一些内容。

## 代码示例

:::demo full-screen/basis

### 基础用法

可通过 `v-slot` 拿到 `exit`、`enter` 和 `toggle` 方法，来决定是否全屏显示某个内容。

:::

:::demo full-screen/ref

### Ref 用法

还可以通过 `ref` 获取组件实例来触发 `exit`、`enter` 和 `toggle` 方法。

:::

:::demo full-screen/tooltip

### 全屏提示

如果你想要将像是 Tooltip、Modal 这样的具有 `transfer` 属性的组件一同使用，需要确保 `transfer` 属性的目标位置位于全屏组件内。

:::

## API

### 预设类型

```ts
interface FullScreenSlotParams {
  full: false | FullScreenType,
  placeId: string,
  enter: (type?: FullScreenType, zIndex?: number) => Promise<void>,
  exit: () => Promise<void>,
  toggle: (type?: FullScreenType, zIndex?: number) => Promise<void>
}
```

### FullScreen 属性

| 名称 | 类型     | 说明           | 默认值  | 始于    |
| ---- | -------- | -------------- | ------- | ------- |
| tag  | `string` | 设置渲染的标签 | `'div'` | `2.2.9` |

### FullScreen 插槽

| 名称    | 类型                   | 参数                   | 始于 |
| ------- | ---------------------- | ---------------------- | ---- |
| default | 需全屏展示的内容的插槽 | `FullScreenSlotParams` | -    |

### FullScreen 方法

| 名称   | 说明                            | 签名                                                        | 始于 |
| ------ | ------------------------------- | ----------------------------------------------------------- | ---- |
| enter  | 进入全屏模式                    | `(type?: FullScreenType, zIndex?: number) => Promise<void>` | -    |
| exit   | 退出全屏模式                    | `() => Promise<void>`                                       | -    |
| toggle | 自动在进入/退出全屏模式之间切换 | `(type?: FullScreenType, zIndex?: number) => Promise<void>` | -    |
