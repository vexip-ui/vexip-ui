# 配置注入 ConfigProvider ^[Since v2.0.0](!s)

配置注入用于为其内部组件的提供各项配置。

当遇到需要大面积为同一种组件设置同一个属性值时，基于配置注入可覆写组件属性默认值的能力能够快速实现属性调整。

想了解全局配置请参考 [全局配置](/zh-CN/guide/global-config)。

## 代码示例

:::demo config-provider/basis

### 基础用法

为作用域内的所有组件提供配置注入。

:::

:::demo config-provider/nesting

### 嵌套使用

配置注入时会动态合并上层提供的配置，再注入到下层。

:::

:::demo config-provider/function

### 函数默认值

某些属性为对象类型时，应该使用函数的方式返回一个全新的值，以防止发生对象被意外的修改。

:::

:::demo config-provider/theme

### 指定主题

通过 `theme` 属性可以为作用域指定一个主题。

指定主题后会使用一个元素包裹作用域并应用，并添加该主题对应的存放变量的类名。

:::

## API

### ConfigProvider 属性

| 名称    | 类型                                                                                                    | 说明                                                                                                       | 默认值 | 始于     |
| ------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------ | -------- |
| props   | `Record<string, any>`                                                                                   | 需要注入的组件属性配置，键值为组件的驼峰命名，值为对应组件的属性配置，注入的属性将覆盖组件原有的属性默认值 | `{}`   | -        |
| locale  | [`LocaleOptions`](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/locale/helper.ts#L5) | 需要注入的国际化配置                                                                                       | `{}`   | -        |
| icons   | [`IconsOptions`](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/icons.ts#L88)         | 需要注入的内部图标配置                                                                                     | `{}`   | `2.1.9`  |
| z-index | `number`                                                                                                | 需要注入的基础层级数                                                                                       | `null` | `2.1.17` |
| theme   | `string`                                                                                                | 设置作用域的主题                                                                                           | `null` | `2.1.24` |
