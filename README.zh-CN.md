<p align="center">
  <a href="https://www.vexipui.com/" target="_blank" rel="noopener noreferrer">
    <img
      src="https://raw.githubusercontent.com/vexip-ui/vexip-ui/main/docs/public/logo.png"
      style="width: 180px;"
    />
  </a>
</p>

<h1 align="center">Vexip UI</h1>

<p align="center">
  高可定制化的属性值，全量的 TypeScript，性能应该还不错
</p>

<p align="center">
  <img src="https://img.shields.io/github/package-json/v/vexip-ui/vexip-ui" />
</p>

<p align="center">
  如果你用 Vexip UI 写了一些很酷的东西，你都可以告诉我！如果你可以并愿意贡献代码，非常欢迎！
</p>

**中文** | [English](./README.md)

Vexip UI 提供了一系列开箱即用的组件。

组件库使用全新的 **组合式 Api** 编写，并尽可能采用 Vue 传统的方式设计和编写组件，全量的 **TypeScript**（不是 AnyScript）。

每个组件几乎所有的 **属性默认值** 均可以通过注入配置快速修改（除了值和选项属性），轻松实现定制化。

同时，组件代码的编写非常注重降低 **源码阅读** 的门槛，代码的排布尽可能的贴近平时的业务代码的习惯，避免让人眼花缭乱的封装。

目前有 **70+** 个组件，一些你几乎看烂了的组件这里大多有，或许也有一些你不太常见的组件。

## 特性

- 还算多的组件，为网站开发助力，希望能提高点效率
- 开箱即用 **Vue3** 组件（如果你还在用 Vue2，这里可能帮不到你）
- 遵循直觉的设计，代码也尽可能写得直接一些，不要拐弯抹角
- 使用组合式 Api 编写，性能与拓展性应该还不错
- **700+** 单元测试，为组件的使用提供良好的基础稳定性

## 安装

推荐使用 pnpm 或 yarn 的方式进行安装:

```sh
# 使用 pnpm
pnpm install vexip-ui

# 使用 yarn
yarn add vexip-ui
```

## 文档

[这里](https://www.vexipui.com) 可以查看在线文档。

## 帮助

在 [issue](https://github.com/vexip-ui/vexip-ui/issues) 给我留言，以便第一时间获得帮助。

如果你遇到可能是 bugs 的问题，请使用 [Vexip UI Playground](https://playground.vexipui.com/) 提供一个最小的复现。

## 贡献

欢迎你的加入！你可以查阅 [贡献指南](./CONTRIBUTING.md) 了解如何开始。

## 贡献者

感谢他们的所做的一切贡献！

<a href="https://github.com/vexip-ui/vexip-ui/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=vexip-ui/vexip-ui" />
</a>

## 兼容环境

所有组件兼容现代浏览器，尽量保证近两三个版本的支持。

但我一个人精力有限，现在也还没开始写单元测试，所以有问题的话不要骂我，给我提点 issue 和 PR 吧。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| last 2 versions                                                                                                                                                                                        | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                       | last 2 versions                                                                                                                                                                                                   |

## 授权

所有文件都基于 [MIT](./LICENSE) 授权。
