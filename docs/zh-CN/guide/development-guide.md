# 开发指南

在开始之前，请先确保你的系统中包含：

- Node >= 18
- pnpm >= 8

## 初始化

先 Fork [Vexip UI](https://github.com/vexip-ui/vexip-ui) 并克隆到你的本地，然后安装依赖：

```sh
pnpm install # pnpm i
```

接着你需要构建一次 `common` 下的包（**重要**）：

```sh
pnpm run build:common
```

## 组件开发

我们在 `dev-server` 中使用一个 Vite 项目作为开发服务。

你可以通过下面的命令为指定的组件启动开发服务：

```sh
pnpm run dev [component]
```

服务成功开启后，会将 `docs/demos` 下所指定的组件的示例作为开发用例。

开发服务默认使用 `8008` 端口和中文示例，你可以在命令中添加 `-p` 和 `-l` 参数分别指定端口和语言：

```sh
pnpm run dev [component] -p [port] -l [language]
```

## 文档开发

我们使用 [VitePress](https://vitepress.dev/) 作为文档框架，你可以通过下面的命令本地启动它：

```sh
pnpm run dev:docs
```

## 创建新组件

你可以使用模版文件快速创建一个新组件：

```sh
pnpm run create [component]
```

耐心等待文件创建完，然后你可以检查下列位置的文件：

- `components/[component]/index.ts`
- `components/[component]/props.ts`
- `components/[component]/css.ts`
- `components/[component]/style.ts`
- `components/[component]/[component].vue`
- `components/[component]/tests/ssr.spec.tsx`
- `components/[component]/tests/[component].spec.tsx`
- `docs/demos/[component]/basis/demo.en-US.vue`
- `docs/demos/[component]/basis/demo.zh-CN.vue`
- `docs/en-US/component/[component].md`
- `docs/zh-CN/component/[component].md`
- `style/[component].scss`
- `docs/.vitepress/theme/i18n/en-US.ts`
- `docs/.vitepress/theme/i18n/zh-CN.ts`
- `docs/.vitepress/theme/i18n/helper.ts`
- `docs/.vitepress/config/component.ts`

除了上述的模版文件外，我们还有一些文件名的约定：

- `components/[component]/symbol.ts` 用来定义类型和一些通用的常量与变量
- `components/[component]/helpers.ts` 用来定义一些专用的帮助方法
- `components/[component]/hooks.ts` 用来定义一些专用的钩子方法

确认无误后，执行引导命令：

```sh
pnpm run bootstrap
```

完成后即可开始开发组件及其文档开发。
