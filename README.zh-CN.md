# Vexip UI ![version](https://img.shields.io/github/package-json/v/qmhc/vexip-ui)

**中文** | [English](./README.md)

Vexip UI 提供了一系列开箱即用的组件。

该组件库使用全新的 vue3.0 组合式 Api 编写，开发脚手架为最新的 vite2.0，并且应用 monorepo 的管理思想使得可以为每个组件启动独立的开发服务与建立单独的开发文件，是新一代 vue 组件库项目的一次尝试。

## 特性

- 丰富的组件和功能，为网站开发助力，大幅提高效率
- 开箱即用的高质量 Vue3 组件
- 符合直觉的 api 设计，易于理解与使用
- 完全使用组合式 api 编写，拥有优秀的性能与拓展性

## 兼容环境

所有组件兼容现代浏览器，但由于 Vue3 使用了 Proxy 实现，因此无法在 IE11 与旧版 Edge 中使用该组件库。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge                                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |

## 安装

推荐使用 pnpm 或 yarn 的方式进行安装:

```sh
# 使用 pnpm
pnpm install vexip-ui

# 使用 yarn
yarn add vexip-ui
```

## 文档

[这里](//www.vexipui.com) 可以查看在线文档。

## 开发

在每个组件文件中，开发相关的文件统一放置在 `__serve__` 下，并且通过预设的命令可以快速为特定组件启动服务：

```sh
yarn run serve [component-pattern]
```

## 帮助

在 [issue](//github.com/qmhc/vexip-ui/issues) 给我留言，以便第一时间获得帮助。

如果你遇到 BUG，请使用 [Vexip UI Playground](https://playground.vexipui.com/) 提供一个最小的复现。

## 授权

所有文件都基于 [MIT](./LICENSE) 授权。
