# Vexip UI 系统规则

## 身份与边界

Agent 作为 Vue 3 组件库的贡献者工作。代码修改仅限于 `components/`、`style/`、`docs/demos/`、`docs/*/component/` 及对应的测试文件。禁止修改 CI/CD 配置（`.github/workflows/*`）、发布脚本（`scripts/publish.ts`、`scripts/release.ts`）和 `@vexip-ui/*` 包内的 lint 配置。

## 核心行为规则

组件源码以 `.vue` SFC（绝大多数 `<script setup lang="ts">`，少数用 `<script lang="ts">` + `defineComponent`）为主，部分复杂组件使用 `.tsx` + `defineComponent`。`.vue` 文件中禁止 `<style>` 块。

启动开发服务器或运行测试前：先执行 `pnpm run build:common`。创建/重命名组件后：执行 `pnpm run bootstrap`（会重新生成 `style/index.scss` 等聚合文件）。

文件修改流程：读取当前内容 → 确认结构 → 编辑 → 运行相关测试。

## 代码规范

| 规则   | 约束                                                                                                              |
| ------ | ----------------------------------------------------------------------------------------------------------------- |
| Props  | `props.ts` 中用 `buildProps`（自动注入 `inherit`）或 `wrapProps`（不注入 `inherit`）定义。导出 `XxxCProps` 类型。 |
| 默认值 | `useProps('组件名', _props, defaults)`                                                                            |
| 类名   | `useNameHelper('组件名')` —— BEM，默认命名空间 `vxp`                                                              |
| 样式   | 新建 `style/<组件>.scss`，运行 `pnpm run bootstrap` 自动聚合。禁止在组件 `.vue` 中写 `<style>` 块。               |
| 类型   | Props 类型在 `props.ts` 中。`InjectionKey` 仅在需要 provide/inject 的 `symbol.ts` 中定义。                        |
| 测试   | `components/<name>/tests/*.spec.tsx`，必须含 `ssr.spec.tsx`（`createSSRApp` + `renderToString`）。                |
| 国际化 | UI 文本通过 `@vexip-ui/config` 的 locale 系统引入，禁止硬编码。                                                   |

## 项目结构

```text
components/<name>/          # 组件源码
  <name>.vue / <name>.tsx   # 主实现
  index.ts, props.ts, symbol.ts, style.ts, css.ts
  tests/*.spec.tsx, tests/ssr.spec.tsx

style/                      # SCSS 源码（design/ 设计令牌，dark/ 暗黑主题）
docs/                       # VitePress 文档（demos/ 演示，zh-CN/ en-US/ 文档）
common/                     # 内部包：config, hooks, utils, bem-helper, scripts, plugins, meta, icons
```

## 工具与工作流

| 任务              | 命令                                              |
| ----------------- | ------------------------------------------------- |
| 安装 + 构建内部包 | `pnpm install && pnpm run build:common`           |
| 组件开发          | `pnpm run dev <组件名> [-p <端口>] [-l <语言>]`   |
| 文档开发          | `pnpm run dev:docs`                               |
| 创建组件          | `pnpm run create <名称>` → `pnpm run bootstrap`   |
| 测试              | `pnpm test` / `pnpm test:dev` / `pnpm test:cover` |
| 代码检查          | `pnpm run lint`                                   |
| 完整构建          | `pnpm run build`                                  |

**路径别名：** `@/` → 根目录，`@vexip-ui/*` → `common/*/src`。
