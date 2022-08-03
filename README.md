<p align="center">
  <a href="https://www.vexipui.com/" target="_blank" rel="noopener noreferrer">
    <img
      src="https://raw.githubusercontent.com/qmhc/vexip-ui/main/docs/public/logo.png"
      style="width: 180px;"
    />
  </a>
</p>

<h1 align="center">Vexip UI</h1>

<p align="center">
  Highly customizable property values, Full TypeScript, Performance should be good
</p>

<p align="center">
  <img src="https://img.shields.io/github/package-json/v/qmhc/vexip-ui" />
</p>

<p align="center">
  You may let me know if you've written any awesome thing with Vexip UI! You are very welcome if you would like to contribute codes!
</p>

**English** | [中文](./README.zh-CN.md)

Vexip UI provides a series of out-of-the-box components.

This library is using base on vue 3.0 with only using **composition api**, and design and code components in the traditional way by Vue possible, fully **TypeScript** (not AnyScript).

Almost all the **default value of props** for each component can be quickly modified by configuration (except value and options props), for easy customization.

Currently more then **70** components, many you can see everywhere and a few may bright your eyes.

## Work List

- ~~Transfer to use css vars~~ (Released in `2.0.0-beta.0`)
- ~~Refactor icons~~ (Released in `2.0.0-beta.0`)
- ~~Refactor global config~~ (Released in `2.0.0-beta.4`)
- Write unit tests (In progress, see `tests` branch)
- Adapt ssr render

## Features

- Not less components and functions for website development, hoping may improve efficiency
- Vue3 components of out-of-the-box (may not help if you still using Vue2)
- Configurable **default value of props** for easy customization
- entirely using the composition api, the performance and extensibility should be good

## Install

It is recommended to use pnpm or yarn to install:

```sh
# use pnpm
pnpm install vexip-ui

# use yarn
yarn add vexip-ui
```

## Document

[Here](https://www.vexipui.com) The online document.

## Help

Open a [issue](https://github.com/qmhc/vexip-ui/issues) to request help.

If you take maybe some bugs, please use the [Vexip UI Playground](https://playground.vexipui.com/) to provide a minimal reproduction.

## Contributing

Welcome to join us! You can check out the [Contributing Guide](./CONTRIBUTING.md) to learn how to get started.

## Environment

All components supported in modern browsers, I try to ensure the support of neerly two or three versions.

I have limited energy and it's not start writing unit tests currently, if you encountered any bug, don't scold me and create a issue or PR.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| last 2 versions                                                                                                                                                                                        | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                       | last 2 versions                                                                                                                                                                                                   |

## License

All in [MIT](./LICENSE) license.
