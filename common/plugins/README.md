# @vexip-ui/plugins

This package provides common plugins for vexip-ui components, it is published as a package that can be used standalone.

## VexipUIResolver

A resolver for `unplugin-vue-components` and `unplugin-auto-import`.

```ts
VexipUIResolver({ fullStyle: DEV_MODE })
```

## transformLogical

A postcss plugin to transform logical properties/values back to their physical properties/values.

```ts
transformLogical({ replace: true })
```

> Because it's NOT a common postcss plugin project, you need to manually import the plugin if you're using postcss config file.
