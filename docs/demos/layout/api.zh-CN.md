### Layout 属性

| 名称          | 类型                   | 说明                                                                   | 默认值             | 始于 |
| ------------- | ---------------------- | ---------------------------------------------------------------------- | ------------------ | ---- |
| no-aside      | `boolean`              | 设置是否禁用边栏                                                       | `false`            | -    |
| footer        | `boolean`              | 设置是否使用页脚                                                       | `false`            | -    |
| tag           | `string`               | 设置渲染的表现                                                         | `'section'`        | -    |
| menus         | `MenuOptions[]`        | 设置菜单选项                                                           | `[]`               | -    |
| menu-props    | `AsideMenuProps`       | 设置菜单属性                                                           | `null`             | -    |
| logo          | `string`               | 设置 Logo 图片地址                                                     | `''`               | -    |
| sign-name     | `string`               | 设置标语                                                               | `''`               | -    |
| config        | `('nav' \| 'color')[]` | 设置用户下拉面板具备的配置选项                                         | `['nav', 'color']` | -    |
| user          | `HeaderUser`           | 设置用户信息                                                           | `null`             | -    |
| actions       | `HeaderAction[]`       | 设置用户下拉面板的操作选项                                             | `[]`               | -    |
| reduced       | `boolean`              | 设置边栏是否为缩小状态，可以使用 `v-model` 双向绑定                    | `false`            | -    |
| avatar-circle | `boolean`              | 设置用户头像是否为圆形                                                 | `false`            | -    |
| sign-type     | `'aside' \| 'header'`  | 设置标语所在的块                                                       | `'aside'`          | -    |
| header-fixed  | `boolean \| string`    | 设置头部是固定，可以传入一个断点或媒体查询字符串，当满足该查询时才固定 | `'lg'`             | -    |
| aside-fixed   | `boolean \| string`    | 设置边栏是固定，可以传入一个断点或媒体查询字符串，当满足该查询时才固定 | `'lg'`             | -    |
| copyright     | `string`               | 设置页脚的版权信息                                                     | `''`               | -    |
| links         | `FooterLink[]`         | 设置页脚的链接选项                                                     | `[]`               | -    |

### Layout 事件

| 名称           | 说明                                       | 参数                                         | 始于 |
| -------------- | ------------------------------------------ | -------------------------------------------- | ---- |
| reduced-change | 当边栏缩小状态改变时触发，返回当前缩小状态 | `(target: boolean)`                          | -    |
| sign-click     | 当标语被点击时触发                         | `(event: MouseEvent)`                        | -    |
| menu-select    | 当菜单被选择时触发                         | `(label: string, meta: Record<string, any>)` | -    |
| user-action    | 当用户下拉面板操作被点击时触发             | `(label: string, meta: Record<string, any>)` | -    |

### Layout 插槽

| 名称             | 说明                                                                                    | 参数                                                                                                                                                   | 始于 |
| ---------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---- |
| sign             | 标语的内容插槽，默认情况下会根据 `sign-type` 作用在 `header-left` 或 `aside-top` 插槽上 | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                        | -    |
| header           | 头部的内容插槽，使用它将覆盖整个头部                                                    | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                        | -    |
| header-left      | 头部左侧的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }` | -    |
| header-main      | 头部中央的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }` | -    |
| header-right     | 头部右侧的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }` | -    |
| header-user      | 头部用户的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, handleColorChange: (color: string) => void, toggleUserDrop: (target: boolean) => void }` | -    |
| aside            | 标语的内容插槽，使用他将覆盖整个边栏                                                    | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                        | -    |
| aside-top        | 边栏上部的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void }`                                               | -    |
| aside-main       | 边栏中央的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void }`                                               | -    |
| aside-bottom     | 边栏下部的内容插槽                                                                      | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void }`                                               | -    |
| aside-expand     | 边栏触发收起弹出的手柄的插槽                                                            | `{ reduced: boolean, toggleReduce: (target: boolean) => void, toggleExpand: (target: boolean) => void }`                                               | -    |
| default          | 主页面的内容插槽，使用它将覆盖整个主页面                                                | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                        | -    |
| main             | 主页面的内容插槽                                                                        | -                                                                                                                                                      | -    |
| footer           | 页脚的内容插槽，使用它将覆盖整个页脚                                                    | `{ reduced: boolean, toggleReduce: (target: boolean) => void }`                                                                                        | -    |
| footer-links     | 页脚链接的内容插槽                                                                      | -                                                                                                                                                      | -    |
| footer-copyright | 页脚版权信息的内容插槽                                                                  | -                                                                                                                                                      | -    |
