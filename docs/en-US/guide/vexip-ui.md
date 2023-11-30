# Welcome To Vexip UI

Vexip (pronounced `/ˈvesɪp/` <AudioButton src="/vexip-pron.wav"></AudioButton>) UI provides a series of out-of-box components.

This library is using base on vue 3.0 with using **composition api**, and design and code components in the traditional way by Vue possible, fully **TypeScript**.

Almost all the **default value of props** for each component can be quickly modified by configuration, for easy customization.

And, the writing of component codes pay great attention to lowering the threshold of **source codes reading**, and the style of code is as close to the usual business code habits as possible to avoid dazzling encapsulation.

There are currently **70+** components, many you see everywhere are here and are better, and a few may brighten your eyes.

## Features

- 📦 70+ out-of-box high quality Vue 3 components
- 📐 Intuitive, minimalistic Api design
- 🔧 Configurable default value of props, quickly complete global/local modifications
- ⚡ Composition Api, good performance base
- 🔨 With TypeScript, fully types
- 💪 1000+ unit tests to provide good stability
- 🎨 Support CSS variable, built-in dark theme
- 🚩 Support i18n
- 🛫 Provide resolver, support unplugin
- 🚤 Support SSR
- 🩹 Good a11n
- 👀 Close to business code arrangement, low threshold for source code reading

> The design tokens are base on Open Color, and have some adjustments.

## Environment

All components supported in modern browsers, support of nearly two or three versions.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24" height="24" />](http://godban.github.io/browsers-support-badges/)<br/>Electron |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| last 2 versions                                                                                                                                                                                        | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                       | last 2 versions                                                                                                                                                                                                   |

## Latest Version

<a href="https://www.npmjs.com/package/vexip-ui" target="_blank">
  <img src="https://img.shields.io/github/package-json/v/vexip-ui/vexip-ui" alt="NPM version"/>
</a>

> The version on the top-left is the version of the component library that the docs depends on when it is built, which may be inconsistent with the latest version.

You can view the [Changelog](https://github.com/vexip-ui/vexip-ui/blob/main/CHANGELOG.md) to learn about the update process.

## Install

It is recommended to use pnpm or yarn to install:

```sh
# use pnpm
pnpm add vexip-ui

# use yarn
yarn add vexip-ui
```

## Help

Open a [issue](https://github.com/vexip-ui/vexip-ui/issues) to request help.

If you take maybe some bugs, please use the [Vexip UI Playground](https://playground.vexipui.com/) to provide a minimal reproduction.

## Contributing

Welcome to join us! You can check out the [Contributing Guide](https://github.com/vexip-ui/vexip-ui/blob/main/CONTRIBUTING.md) to learn how to get started.

Or you can sponsor us to help the project grow better!

WeChat:

<img src="/sponsor-wechat.webp" alt="WeChat payment" style="width: 240px;" />

Alipay:

<img src="/sponsor-alipay.webp" alt="Alipay payment" style="width: 240px;" />

> Author is poor in English. If you have any advice to improve the English document, you can create an issue or a PR.

## Contributors

Thanks for all their contributions!

<a href="https://github.com/vexip-ui/vexip-ui/graphs/contributors">
  <img class="contrib__img" src="https://contrib.rocks/image?repo=vexip-ui/vexip-ui&columns=5" />
  <img class="contrib__img--lg" src="https://contrib.rocks/image?repo=vexip-ui/vexip-ui&columns=9" />
  <img class="contrib__img--xl" src="https://contrib.rocks/image?repo=vexip-ui/vexip-ui" />
</a>

<style lang="scss">
@use '@vp/theme/style/mixins.scss' as *;

.contrib__img--lg,
.contrib__img--xl {
  display: none;
}

@include query-media('lg') {
  .contrib__img,
  .contrib__img--xl {
    display: none;
  }

  .contrib__img--lg {
    display: block;
  }
}

@include query-media('xl') {
  .contrib__img,
  .contrib__img--lg {
    display: none;
  }

  .contrib__img--xl {
    display: block;
  }
}
</style>
