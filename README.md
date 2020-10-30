# Vexip UI ![version](https://img.shields.io/github/package-json/v/qmhc/vexip-ui)

Vexip UI 提供了一系类开箱即用的组件。

> 注意：由于开发和测试的需要, 目前组件库的版本可能会高频率的变化

## 特性

+ 丰富的组件和功能，为网站开发助力，大幅提高效率
+ 开箱即用的高质量 Vue 组件
+ 符合直觉的 api 设计，易于理解与使用
+ 深度使用插槽，使定制化组件轻松愉快

## 兼容环境

所有组件兼容现代浏览器和 IE11，但全局配置使用了 Proxy 实现，因此无法在 IE11 与旧版 Edge 中使用该特性。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions


## 安装

推荐使用 npm 或 yarn 的方式进行安装，可以享受脚手架工具带来的诸多好处。

### yarn 安装

```bash
yarn add vexip-ui
```

### npm 安装

```bash
npm install vexip-ui
```

### 标签全局引入

使用 `link` 和 `script` 标签可以直接引入文件，并通过全局变量 `VexipUI` 使用。

在 npm 发布包的 `vexip-ui/dist` 目录下提供了 `vexip-ui.umd.min.js` 和 `vexip-ui.css` 两个文件。

```html
<!-- 样式文件 -->
<link rel="stylesheet" href="vexip-ui.css" />
<!-- 组件文件 -->
<script type="text/javascript" src="vexip-ui.umd.min.js"></script>
```

## 文档

[这里](//www.vexipui.com) 可以查看在线文档，当前文档仍在撰写中，部分组件缺少示例。

## 帮助

在 [issue](//github.com/qmhc/vexip-ui/issues) 给我留言，以第一时间获得帮助。

如果你遇到 BUG，请使用如 [Code Sandbox](//codesandbox.io/) 等在线网站提供一个最小复现项目。

## 授权

所有文件都基于 [MIT](./LICENSE) 授权。
