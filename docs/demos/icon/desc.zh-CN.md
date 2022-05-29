Vexip UI 使用 `@vexip-ui/icons` 作为图标库，该图标库基于 [Font Awesome](https://fontawesome.com/) 6.x 的免费图标，将其 svg 封装成了 vue 组件。

你可以直接在这个 [页面](https://fontawesome.com/search?m=free) 查询图标（他们给图标起名一直很奇怪）。

当然你完全可以直接在 Icon 组件下放置任何 svg 内容。

:::warning
图标库内置的所有 Font Awesome 的图标默认都是 0.85x 倍缩放的，原始的图标着实有点大。
:::

图标组件命名是遵循一定的规则从原图标名转换过来的：

- 一般情况下，就是把短横线小写命名换成首字母大写的驼峰命名（如：`angle-down` -> `AngleDown`）
- 如果是 `regular` 或者 `brands` 包下的图标，在名字的最后加上 `R` 或者 `B` 的后缀即可（如：`rugular/bell` -> `BellR`、`brands/github` -> `GithubB`）
- 有少数图标是数字开头的，需要在名字前面加上 `I` 前缀（如：`7` -> `I7`、`brands/500px` -> `I500pxB`）
