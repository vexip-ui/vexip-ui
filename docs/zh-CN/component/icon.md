# Icon 图标

:::info
从 `v2.3` 开始，Vexip UI 使用 [lucide](https://lucide.dev/) 图标库提供组件的内部图标。
:::

Vexip UI 提供 `@vexip-ui/icons` 作为图标库，该图标库基于 [Font Awesome](https://fontawesome.com/) 6.x 的免费图标，将其 SVG 封装成了 Vue 组件。

你可以直接在这个 [页面](https://fontawesome.com/search?m=free) 查询图标（他们给图标起名一直很奇怪）。

当然你完全可以直接在 Icon 组件下放置任何 SVG 内容。如果你想要更换组件内置的图标，请参考 [全局配置](/zh-CN/guide/global-config.html#内置图标)。

:::warning
图标库内置的所有 Font Awesome 的图标默认都是 0.85x 倍缩放的，原始的图标着实有点大。
:::

图标组件命名是遵循一定的规则从原图标名转换过来的：

- 一般情况下，就是把短横线小写命名换成首字母大写的驼峰命名（如：`angle-down` -> `AngleDown`）
- 如果是 `regular` 或者 `brands` 包下的图标，在名字的最后加上 `R` 或者 `B` 的后缀即可（如：`regular/bell` -> `BellR`、`brands/github` -> `GithubB`）
- 有少数图标是数字开头的，需要在名字前面加上 `I` 前缀（如：`7` -> `I7`、`brands/500px` -> `I500pxB`）

## 代码示例

:::demo icon/basis

### 基本使用

你可以直接把 SVG 组件丢给 `icon` 属性，也可以直接放默认插槽下。

:::

:::demo icon/color

### 修改颜色

==!s|2.2.5==

通过 `color` 属性可以快速修改图标的颜色。

:::

:::demo icon/scale

### 调整尺寸

设置 `scale` 属性来进行缩放。

也可以通过 `size` 属性设置一个合法的 CSS 值直接指定图标的大小。

:::

:::demo icon/spin

### 回转效果

设置 `effect` 属性为 `spin-in` 或 `spin-out` 可以让图标原地转圈。

:::

:::demo icon/pulse

### 脉冲效果

设置 `effect` 属性为 `pulse-in` 或 `pulse-out` 可以让图标具有脉冲效果。

:::

:::demo icon/flip

### 翻转效果

通过 `flip` 属性可以设置图标的翻转效果。

:::

:::demo icon/rotate

### 旋转

==!s|2.2.5==

一个出招指令？

:::

:::demo icon/package

### 不同类型

默认情况下，会直接使用 `solid` 下的图标。

若想使用其他图标集，参考最上方的命名转换规则的说明，这里不重复了。

:::

:::demo icon/custom

### 自定义图标

去外面随便找个 SVG 图标丢进来，彩色也可以。

:::

:::demo icon/renderer

### 自定义渲染

==!s|2.2.11==

如果上面还不满足需求，你可以通过 `renderer` 属性指定自定义的渲染方法。

注意，如果使用自定义渲染，你需要自行处理图标的所有特性。

配合 [全局配置](/zh-CN/guide/global-config) 你甚至可以做到完全替换组件库内部图标的渲染逻辑。

:::

## API

### 预设类型

```ts
type IconEffect = 'spin-in' | 'spin-out' | 'pulse-in' | 'pulse-out' | string
type IconRenderer = (
  props: Omit<IconProps, 'renderer'>,
  attrs: Record<string, any>,
  renderDefault: () => any
) => any
```

### Icon 属性

| 名称     | 类型                                   | 说明                               | 默认值 | 始于     |
| -------- | -------------------------------------- | ---------------------------------- | ------ | -------- |
| icon     | `Record<string, any> \| (() => any)`   | 图标 `<svg>` 组件                  | `null` | `2.0.0`  |
| scale    | `number \| string`                     | 设置图标的缩放比例                 | `1`    | -        |
| flip     | `'horizontal' \| 'vertical' \| 'both'` | 设置图标是否翻转                   | `null` | -        |
| title    | `string`                               | 设置图标的标题属性                 | `''`   | -        |
| effect   | `IconEffect`                           | 设置效果动画名称或一个自定义类名称 | `null` | `2.1.0`  |
| size     | `string`                               | 指定图标的大小                     | `null` | `2.2.5`  |
| color    | `string`                               | 设置图标的颜色                     | `null` | `2.2.5`  |
| rotate   | `number \| string`                     | 设置图标的旋转角度                 | `null` | `2.2.5`  |
| renderer | `IconRenderer`                         | 自定义的渲染方法                   | `null` | `2.2.11` |
