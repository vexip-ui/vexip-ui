# 自定义内置图标

Vexip UI 所有组件使用到的内部图标，均可以通过 [全局配置](/zh-CN/guide/global-config#内置图标) 或 [ConfigProvider](/zh-CN/component/config-provider) 进行自定义的修改。

```ts
import { CircleXmark, Spinner, Xmark } from '@vexip-ui/icons'

app.use(install, {
  icons: {
    close: Xmark,

    // 可以传入一个函数，并返回一个组件
    clear: () => CircleXmark,

    // 可以传入一个数组，并在第二个参数配置自定义参数
    loading: [
      Spinner,
      { effect: 'pulse-in' }
    ]
  }
})
```

## 内部图标一览

:::info
配置项中使用了更语义化的名称，这通常与图标本身的名称是不相同的，请勿混淆。
:::

<InternalIcons></InternalIcons>
