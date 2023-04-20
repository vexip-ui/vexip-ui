# 面包屑 Breadcrumb

## 代码示例

显示当前页面在系统层级结构中的位置，并能向上返回。

:::demo breadcrumb/basis

### 基本使用

最简单的用法，没什么好说的。

:::

:::demo breadcrumb/border

### 边框模式

添加 `border` 属性可以开启边框模式。

:::

:::demo breadcrumb/example

### 文件导航

一个类似于 Windows 10 文件管理器顶部面包屑导航的用例。

:::

:::demo breadcrumb/options

### 使用选项

通过 `options` 属性可以快速创建面包屑。

:::

## API

### 预设类型

```ts
interface BreadcrumbOptions {
  label: string,
  name?: string | (() => string)
}
```

### Breadcrumb 属性

| 名称      | 类型                              | 说明                           | 默认值  | 始于 |
| --------- | --------------------------------- | ------------------------------ | ------- | ---- |
| separator | `string`                          | 设置面包屑的分隔符             | `'/'`   | -    |
| border    | `boolean`                         | 设置是否开启 border 模式       | `false` | -    |
| options   | `(string \| BreadcrumbOptions)[]` | 快捷设置子元素，使用插槽后失效 | `[]`    | -    |

### Breadcrumb 事件

| 名称            | 说明                                                                                | 参数                        | 始于 |
| --------------- | ----------------------------------------------------------------------------------- | --------------------------- | ---- |
| select          | 当某个子元素被点击时触发，返回该元素的标签 (索引)                                   | `(label: string \| number)` | -    |
| separator-click | 当某个子元素的分隔符被点击时触发，返回该元素的标签 (索引)，一般配合 border 模式使用 | `(label: string \| number)` | -    |

### Breadcrumb 插槽

| 名称      | 说明                   | 参数                        | 始于 |
| --------- | ---------------------- | --------------------------- | ---- |
| default   | 面包屑的子元素         | -                           | -    |
| separator | 自定义分隔符内容的插槽 | `(label: string \| number)` | -    |

### BreadcrumbItem 属性

| 名称  | 类型               | 说明                                     | 默认值 | 始于 |
| ----- | ------------------ | ---------------------------------------- | ------ | ---- |
| label | `string \| number` | 元素的唯一标签，不设置时会使用内置的索引 | `null` | -    |

### BreadcrumbItem 事件

| 名称            | 说明                                         | 参数                        | 始于 |
| --------------- | -------------------------------------------- | --------------------------- | ---- |
| select          | 当元素被点击时触发，返回该元素的标签         | `(label: string \| number)` | -    |
| separator-click | 当元素的分隔符被点击时触发，返回该元素的标签 | `(label: string \| number)` | -    |

### BreadcrumbItem 插槽

| 名称      | 说明                   | 参数 | 始于 |
| --------- | ---------------------- | ---- | ---- |
| default   | 面包屑元素的内容       | -    | -    |
| separator | 自定义分隔符内容的插槽 | -    | -    |
