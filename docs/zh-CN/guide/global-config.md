# 全局配置

Vexip UI 在初始化时可以提供一个配置项以改变一些组件行为，包括组件**属性默认值**、**组件命名空间**、**国际化**、**组件内置图标**等等。

## 默认属性

Vexip UI 提供了以配置的形式改变属性默认值的能力。

设想一下，在一个有数百个表单控件的应用中，需求提出将所有的表单控件的大小从 `'default'` 改为 `'large'`，你可能需要这样做：

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

此时，你只需要在 `app.use` 时在第二个参数传入一个对象，并指定 `props` 属性：

```ts
import { createApp } from 'vue'
import { install } from 'vexip-ui'

createApp(App)
  .use(install, {
    props: {
      // 通过 default 可以修改全部组件的属性
      // default: {
      //   size: 'large'
      // },
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

结合 ConfigProvider 组件的 `props` 属性，你还可以为局部的区域改变对应组件的默认值，详情请查阅 [ConfigProvider 文档](/zh-CN/component/config-provider)。

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
// 在 scss 里你可以省略 index.scss
@use 'vexip-ui/style' with (
  $namespace: 'vxp'
);
```

### 组件名命名空间

在调用 `app.use` 时通过在第二个参数传入 `prefix` 属性可以为所有组件的组件名设置一个共同的前缀。

当与一些其他的组件一同使用时, 可能会发生命名冲突，使用该特性可以轻松地解决这个问题。

```ts
createApp(App).use(install, { prefix: 'V' })
```

配置后, 所有的组件在使用时名称将带有 `V` 前缀。

```vue
<template>
  <VButton></VButton>
  <VInput></VInput>
</template>
```

## 国际化

Vexip UI 的默认语言为 `'zh-CN'`，在调用 `app.use` 时通过在第二个参数传入 `locale` 选项可以为所有组件配置国际化。

```ts
import { enUSLocale, install } from 'vexip-ui'

app.use(install, {
  locale: enUSLocale()
})
```

动态切换语言时，你可以通过 `registerLocale` 方法注册并缓存一个语言包，随后通过修改 `locale.locale` 属性快速切换。

```ts
import { ref } from 'vue'
import { enUSLocale, install, registerLocale } from 'vexip-ui'

registerLocale(enUSLocale())

const vexipuiLocale = ref({
  locale: 'zh-CN'
})

app.use(install, {
  locale: vexipuiLocale
})

// 切换时
vexipuiLocale.value.locale = 'en-US'
```

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

结合 ConfigProvider 组件的 `locale` 属性，你还可以为局部的区域配置国际化，详情请查阅 [ConfigProvider 文档](/zh-CN/component/config-provider)。

如果你想配置其他的语言，你需要根据完整的配置项自行完成，详见 [国际化](/zh-CN/guide/i18n)。

> 完整的国际化选项可以浏览 [此处](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/locale/helper.ts#L5)。

## 内置图标

一部分的组件中会包含图标内容，这些图标在组件的内部，使用者无法控制。

尽管其中的大部分都提供了属性或插槽以满足定制化，但如果你想批量替换某一种图标（比如：加载中图标）仍会是一项不愉快的工作。

因此 Vexip UI 提供了一种全局配置组件内置图标的方式。

在调用 `app.use` 时通过在第二个参数传入 `icons` 选项即可自定义所有的组件内置图标。

```ts
import { CircleXmark, Spinner, Xmark } from '@vexip-ui/icons'

app.use(install, {
  icons: {
    close: Xmark,

    // 可以传入一个函数，并返回一个组件
    clear: () => CircleXmark,

    // 可以传入一个数组，并在第二个参数配置自定义参数
    loading: [
      Spinner,
      { effect: 'pulse-in' }
    ]
  }
})
```

结合 ConfigProvider 组件的 `icons` 属性，你还可以为局部的区域自定义图标，详情请查阅 [ConfigProvider 文档](/zh-CN/component/config-provider)。

> 完整的内置图标选项可以浏览 [此处](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/icons.ts#L90)。

所有的内置图标预览可以参考 [自定义内置图标](/zh-CN/guide/custom-internal-icons#内部图标一览) 章节。

最后，我们来看一个实际的效果替换后的效果：

<IconDemo></IconDemo>

> 具体的代码可以浏览 [此处](https://github.com/vexip-ui/vexip-ui/blob/main/docs/.vitepress/theme/components/icon-demo.vue)。

## 完整配置

| 名称       | 类型                                                                                                 | 说明                                                                                             | 默认值         | 始于     |
| ---------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------- | -------- |
| props      | [`PropsOptions`](https://github.com/vexip-ui/vexip-ui/blob/main/components/props.ts)                 | 组件属性配置，键值为组件的驼峰命名，值为对应组件的属性配置，注入的属性将覆盖组件原有的属性默认值 | `null`         | -        |
| locale     | [`LocaleOptions`](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/locale/helper.ts) | 国际化配置                                                                                       | `zhCNLocale()` | -        |
| icons      | [`IconsOptions`](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/icons.ts)          | 内部图标配置                                                                                     | `globalIcons`  | `2.1.9`  |
| zIndex     | `number`                                                                                             | 基础层级数                                                                                       | `2000`         | `2.1.17` |
| hoverDelay | `number`                                                                                             | 悬停延迟毫秒数                                                                                   | `100`          | `2.2.11` |
