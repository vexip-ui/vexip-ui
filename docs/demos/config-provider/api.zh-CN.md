### ConfigProvider 属性

| 名称   | 类型                                                                                                    | 说明                                                                                                       | 默认值 | 始于    |
| ------ | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------ | ------- |
| props  | `Record<string, any>`                                                                                   | 需要注入的组件属性配置，键值为组件的驼峰命名，值为对应组件的属性配置，注入的属性将覆盖组件原有的属性默认值 | `{}`   | -       |
| locale | [`LocaleOptions`](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/locale/helper.ts#L5) | 需要注入的国际化配置                                                                                       | `{}`   | -       |
| icons  | [`IconsOptions`](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/icons.ts#L88)         | 需要注入的内部图标配置                                                                                     | `{}`   | `2.1.9` |
