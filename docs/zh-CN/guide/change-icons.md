# 修改图标

Vexip UI 所有组件使用到的内部图标，均可以通过 [全局配置](/zh-CN/guide/global-config#内置图标) 或 [ConfigProvider](/zh-CN/component/config-provider) 进行自定义的修改。

```ts
import { CircleXmark, Spinner, Xmark } from '@vexip-ui/icons'

app.use(install, {
  icons: {
    close: Xmark,

    // 可以传入一个数组，并在第二个参数配置自定义参数
    loading: [
      Spinner,
      { effect: 'pulse-in' }
    ]
  }
})
```

## 内部图标一览

:::warning
配置项中使用了更语义化的名称，这通常与图标本身的名称是不相同的，请勿混淆。
:::

<InternalIcons></InternalIcons>

## 替换为 Iconify

==!s|2.2.11==

如今 [Iconify](https://iconify.design/) 被越来越多的人使用，经常有人咨询如何将组件库的图标替换为 Iconify。

下面这个示例演示了如何通过修改 Icon 组件的 [`renderer` 属性](/zh-CN/component/icon#icon-属性) 的默认值来渲染 Iconify 图标。可以看到当传入了 `name` 属性时，让其渲染 `iconify-icon` 元素，否则使用默认的渲染方法。

这样处理，可以在不破坏原有的图标的情况下逐步替换为 Iconify 图标。

<<< @/.vitepress/theme/components/iconify-demo.vue

可以看到，替换的了图标将渲染为 Iconify 图标，而未替换的则还是原来的图标：

<IconifyDemo></IconifyDemo>

上面的示例通过 ConfigProvider 局部地替换了图标，在实际的项目中你可以在组件库初始化时进行处理。

## 旧内置图标

<InternalPrevIcons></InternalPrevIcons>

你可以通过下面的配置使用旧的内置图标：

<<< @/.vitepress/theme/components/internal-prev-icons.vue#snippet{ts}
