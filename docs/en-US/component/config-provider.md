# ConfigProvider

ConfigProvider is used to provide configurations for its internal components.

When it is necessary to set the same property value for the same component in a large area, the ability to override the default value of ConfigProvider can quickly adjust the property.

If you want global configuration, see [Global Config](/zh-CN/guides/global).

## Demos

:::demo config-provider/basis

### Basis Usage

Provides config for all child components.

:::

:::demo config-provider/nesting

### Nesting Usage

It will auto dynamically merge the config provided by the upstream durning injection, and then provided to the lower.

:::

:::demo config-provider/function

### Function Default

Some props are object type, you should use a function to return a new value to prevent accidental modification of the object.

:::

## API

### ConfigProvider Props

| Name   | Type                                                                                                    | Description                                                                                                                                                                                                                                     | Default | Since   |
| ------ | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| props  | `Record<string, any>`                                                                                   | The component props configuration to be injected, the key value is the camel case name of the component, the value is the props configuration of the component, the injected values will override the component's original props default values | `{}`    | -       |
| locale | [`LocaleOptions`](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/locale/helper.ts#L5) | The internationalization configuration to be injected                                                                                                                                                                                           | `{}`    | -       |
| icons  | [`IconsOptions`](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/icons.ts#L88)         | The internal icons configuration to be injected                                                                                                                                                                                                 | `{}`    | `2.1.9` |