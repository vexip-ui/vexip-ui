# 配置注入 ConfigProvider

配置注入用于为其内部组件的提供各项配置。

当遇到需要大面积为同一种组件设置同一个属性值时，基于配置注入可覆写组件属性默认值的能力能够快速实现属性调整。

想了解全局配置请参考 [全局配置](/zh-CN/guides/global)。

## 代码示例

:::demo configprovider/basis

### 基础用法

为所有子级组件提供配置注入。

:::

:::demo configprovider/function

### 函数默认值

某些属性为对象类型时，应该使用函数的方式返回一个全新的值，以防止发生对象被意外的修改。

:::

:::demo configprovider/nesting

### 嵌套使用

配置注入时会动态合并上层提供的配置，再注入到下层。

:::

## API

### ConfigProvider 属性

| 名称   | 类型                                                                                                    | 说明                                                                                                       | 默认值 | 始于    |
| ------ | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------ | ------- |
| props  | `Record<string, any>`                                                                                   | 需要注入的组件属性配置，键值为组件的驼峰命名，值为对应组件的属性配置，注入的属性将覆盖组件原有的属性默认值 | `{}`   | -       |
| locale | [`LocaleOptions`](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/locale/helper.ts#L5) | 需要注入的国际化配置                                                                                       | `{}`   | -       |
| icons  | [`IconsOptions`](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/icons.ts#L88)         | 需要注入的内部图标配置                                                                                     | `{}`   | `2.1.9` |
