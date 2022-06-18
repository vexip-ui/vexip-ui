# 配置项

Vexip UI 在初始化时可以提供一个配置项以改变一些组件行为。

## 默认属性

Vexip UI 提供了以配置的形式改变属性默认值的能力，使得可以区域性地为组件设置同一个属性。

设想一下，在一个有数百个表单控件的应用中，需求提出将所有的表单控件从默认大小改为大号，你可能需要这样做：

```vue
<!-- a.vue -->
<template>
  <Input size="large"></Input>
  <Input size="large"></Input>
  <Input size="large"></Input>
  <Input size="large"></Input>
</template>

<!-- b.vue -->
<template>
  <Select size="large"></Select>
  <Select size="large"></Select>
  <Select size="large"></Select>
  <Select size="large"></Select>
</template>

<!-- c.vue -->
<template>
  <Checkbox size="large"></Checkbox>
  <Checkbox size="large"></Checkbox>
  <Checkbox size="large"></Checkbox>
  <Checkbox size="large"></Checkbox>
</template>

<!-- x?.vue -->
```

这将是一件非常枯燥且繁琐的工作。

在 Vexip UI 中你只需要在 `app.use` 时在第二个参数传入一个对象，并指定 `props` 属性：

```ts
import { createApp } from 'vue'
import { install } from 'vexip-ui'

createApp(App)
  .use(install, {
    prop: {
      input: {
        size: 'large'
      },
      select: {
        size: 'large'
      },
      checkbox: {
        size: 'large'
      }
    }
  })
  .mount('#app')
```

设置完毕后，这些组件的 `size` 属性的默认值将修改为 `'large'`。

结合 ConfigProvider 组件的 `props` 属性，你还可以为局部的区域改变对应组件的默认值，详情请查阅 [ConfigProvider 文档](/zh-CN/components/config-provider)。

## 命名空间

在 Vexip UI 中有两种命名空间的概念。

第一种是针对类名的命名空间配置，需要同时配合 `sass` 中的命名空间变量一起使用；第二种则是针对组件名的命名空间。

### 类名命名空间

在调用 `app.use` 时通过在第二个参数传入 `namespace` 属性可以修改所有组件的类名前缀。

同时在引用样式时，你需要通过 `sass` 源码引入，并将 `$namespace` 变量设置为同样的值以保证样式的正常运作。


```ts
createApp(App).use(install, { namespace: 'vxp' })
```

```scss
@use 'vexip-ui/design' with (
  $namespace: 'vxp'
);
@use 'vexip-ui/style'; // 在 scss 里你可以省略 index.scss
```

### 组件名命名空间

在调用 `app.use` 时通过在第二个参数传入 `prefix` 属性可以为所有组件的组件名设置一个共同的前缀。

当与一些其他的组件一同使用时, 可能会发生命名冲突，使用该特性可以轻松地解决这个问题。

### CapitalCase 命名

```ts
createApp(App).use(install, { prefix: 'Vxp' })
```

配置后, 所有的组件在使用时名称将带有 `Vxp` 前缀。

```vue
<template>
  <VxpButton></VxpButton>
  <VxpInput></VxpInput>
</template>
```

### KebabCase 命名

> 如果传入了一个首字母小写的前缀, 所有的组件的命名将会变为由 `-` 连接的全小写形式。

```ts
createApp(App).use(install, { prefix: 'vxp' })
```

配置后, 所有的组件在使用时名称将带有 `vxp-` 前缀，并且变为 `kebab-case` 命名。

```vue
<template>
  <vxp-button></vxp-button>
  <vxp-input></vxp-input>
</template>
```

## 国际化

在调用 `app.use` 时通过在第二个参数传入 `locale` 选项可以为所有组件配置国际化。

```ts
app.use(install, {
  locale: {
    locale: 'zh-CN'
  }
})
```

通过 `locale.locale` 可以设置使用的默认语言，目前 Vexip UI 提供了 `'zh-CN'` 和 `'en-US'` 两种内置语言。

同时你还可以定制化一些组件的国际化：

```ts
app.use(install, {
  locale: {
    locale: 'zh-CN',
    input: {
      placeholder: '来写点东西'
    }
  }
})
```

> 完整的国际化选项可以浏览 [此处](https://github.com/qmhc/vexip-ui/blob/main/common/config/src/locale/helper.ts)。
