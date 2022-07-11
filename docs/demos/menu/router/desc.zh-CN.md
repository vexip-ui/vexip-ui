### 使用路由

通过 `router` 属性传入一个 `vue-router` 的 Router 对象可以快速根据路由创建菜单。

使用路由时，会假定每个 `route.meta` 为菜单选项进行解析，并自动将路由本身作为 `route` 属性。

配置 `route.meta.menu` 为 `false` 可以将特定的路由排除在解析外。

如果你不希望组件自动地处理路由变化，可以添加 `munual-route` 属性。
