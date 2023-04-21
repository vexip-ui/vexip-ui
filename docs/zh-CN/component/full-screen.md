# 全屏 FullScreen

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

## FullScreen 插槽

| 名称    | 类型                                                                                                              | 参数                | 始于 |
| ------- | ----------------------------------------------------------------------------------------------------------------- | ------------------- | ---- |
| default | 你可以得到 `enter`、 `exit` 或 `toggle` 三种方法, 请参阅 [FullScreen Methods](#fullscreen-methods) 来查看使用方法 | `{ full: boolean }` | -    |

## FullScreen 方法

| 名称   | 说明                            | 签名                                                      | 始于 |
| ------ | ------------------------------- | --------------------------------------------------------- | ---- |
| enter  | 进入全屏模式                    | `(mode?: 'window' \| 'browser', zIndex?: number) => void` | -    |
| exit   | 退出全屏模式                    | `() => void`                                              | -    |
| toggle | 自动在进入/退出全屏模式之间切换 | `(mode?: 'window' \| 'browser') => void`                  | -    |
