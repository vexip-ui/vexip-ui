### Use Router

Passing a `vue-router` Router object through the `router` prop can quickly create a menu based on the routes.

When using router, each `route.meta` is assumed to be parsed as a menu options, and the route itself is automatically set to `route` option.

Configure `route.meta.menu` to `false` to exclude a route when parsing.

If you don't want Menu to handle route changes automatically, you can add the `munual-route` prop.
