# Typescript 支持

在 typescript 项目中，如果全局引入了组件库目前是无法获得有效的类型推导的。

此时我们需要在项目的 `src` 目录下新建一个 `shims-vexip.d.ts` 文件，并进行一些配置以获得类型支持。

## 添加模块声明

组件库内部已经生成了完整的组件类型声明，并封装到 `VexipComponents` 的全局接口中，通过继承的方式可以轻松将组件库的类型引入。

```ts
import { VexipComponents } from 'vexip-ui'

declare module 'vue' {
  interface GlobalComponents extends VexipComponents {}
}
```

该类型声明为 [Volar](https://github.com/johnsoncodehk/volar) 提供全局组件的类型推导，详细请参阅 Volar 的[相关文档](https://github.com/johnsoncodehk/volar/tree/master/extensions/vscode-vue-language-features)。

> 如果你正在使用按需引入，则不需要该模块声明也能获得完整的组件类型推导。

## 全局属性声明

除了组件之外，组件库还提供了数个全局属性以快速调用一些交互组件，因此也需要拓展 `@vue/runtime-core` 模块声明以获得正确的属性类型。

组件库内部也已经生成了完整的全局属性声明，并封装在 `VexipProperties` 接口中，同样通过继承即可引入完整的类型声明。

```ts
import { VexipProperties } from 'vexip-ui'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties extends VexipProperties {}
}
```

> 如果你使用按需引入，但在全局注册了如 Message 等的插件，你仍需要添加全局属性声明。
