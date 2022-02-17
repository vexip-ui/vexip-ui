# Vexip UI ![version](https://img.shields.io/github/package-json/v/qmhc/vexip-ui)

**English** | [中文](./README.zh-CN.md)

Vexip UI provides a series of out-of-the-box components.

This library is using the vue 3.0 with composition api, and the development is using vite 2.0 and monorepo that makes it possible to start dev server and manage development files for each component. It is an attempt at the new generation of vue library project.

## Features

- Rich components and functions for website development, greatly improve efficiency
- High quality Vue 3.0 components of out-of-the-box
- Intuitive api design, easy to understand and use
- entirely using the composition api, with excellent performance and scalability

## Environment

Since Vue 3.0 uses the Proxy for implementation, this library cannot be used in IE11 and legacy Edge.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge                                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |

## Install

It is recommended to use pnpm or yarn to install:

```sh
# use pnpm
npm install vexip-ui

# use yarn
yarn add vexip-ui
```

## Document

[Here](//www.vexipui.com) is the online document. Currently only available in Chinese (foreign borthers can use the translation tool of browser).

## Development

In each component, development files are placed under a folder named `__serve__`, and start the dev server use following command:

```sh
yarn run serve [component-pattern]
```

## Help

Open a [issue](//github.com/qmhc/vexip-ui/issues) to request help.

If you take some bugs, please use the [Vexip UI Playground](https://playground.vexipui.com/) to provide a minimal reproduction.

## License

All in [MIT](./LICENSE) license.
