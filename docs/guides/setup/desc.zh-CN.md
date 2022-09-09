# Vexip UI

Vexip UI 提供了一系类开箱即用的组件。

该组件库使用全新的 **组合式 Api** 编写，并尽可能采用 Vue 传统的方式设计和编写组件，全量的 **TypeScript**（不是 AnyScript）。

每个组件几乎所有的 **属性默认值** 均可以通过注入配置快速修改（除了值和选项属性），轻松实现定制化。

同时，组件代码的编写非常注重降低 **源码阅读** 的门槛，代码的排布尽可能的贴近平时的业务代码的习惯，避免让人眼花缭乱的封装。

目前有 **70+** 个组件，一些你几乎看烂了的组件这里大多有，或许也有一些你不太常见的组件。

## 特性

- 还算多的组件和功能，为网站开发助力，希望能提高点效率
- 开箱即用 **Vue3** 组件（如果你还在用 Vue2，这里可能帮不到你）
- 遵循直觉的设计，代码也尽可能写得直接一些，不要拐弯抹角
- 完全使用组合式 Api 编写，性能与拓展性应该还不错
- **700+** 单元测试，为组件的使用提供良好的基础稳定性

## 兼容环境

所有组件兼容现代浏览器和 ~~IE11~~，尽量保证近两三个版本的支持。

但我一个人精力有限，所以有问题的话不要骂我，给我提点 issue 和 PR 吧。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| last 2 versions                                                                                                                                                                                        | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                       | last 2 versions                                                                                                                                                                                                   |

## 最新版本

![version](https://img.shields.io/github/package-json/v/vexip-ui/vexip-ui)

> 左上方的版本为文档构建时依赖的组件库版本，可能与最新的不一致，因为文档的更新往往会落后一些。

## 安装

推荐使用 yarn 或 pnpm 的方式进行安装：

```sh
# 使用 yarn
yarn add vexip-ui

# 使用 pnpm
pnpm install vexip-ui
```

## 帮助

创建一个 [issue](https://github.com/vexip-ui/vexip-ui/issues) 来寻求帮助。

如果你遇到一些可能是 bug 的问题, 可以用 [Vexip UI Playground](https://playground.vexipui.com/) 来提供一个最小的复现。

## 贡献

欢迎你的加入！你可以查阅 [贡献指南](https://github.com/vexip-ui/vexip-ui/blob/main/CONTRIBUTING.md) 了解如何开始。
