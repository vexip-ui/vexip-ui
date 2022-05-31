# 配置项

## 默认属性

在使用过程中，可能需要针对所有组件或某些组件的个别属性进行统一的修改。

想象一下，在一个有数百个表单控件的应用中，需求提出将所有的表单控件从默认大小改为大号，你可能需要这样做：

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

这将是一件非常枯燥的工作。

Vexip UI 提供了全局改变所有或个别组件的某些属性的默认值的方法，你只需要在 `app.use` 时在第二个参数传入一个对象：

```js
import { createApp } from 'vue'
import { install } from 'vexip-ui'

createApp(App)
  .use(install, {
    prop: {
      defaults: {
        size: 'large'
      }
    }
  })
  .mount('#app')
```

设置完毕后，所有具有 `size` 属性的组件的默认尺寸将修改为 `'large'`。

设置通用全局属性时最好只设置 `size` 和 `transfer`，因为其余的属性在不同组件之间可能存在表现与使用的差异。

### 修改组件默认值

如果想要为某个特定的组件修改属性的默认值，可以按如下做法：

```js
import { createApp } from 'vue'
import prismjs from 'prismjs'

createApp(App)
  .use(install, {
    prop: {
      defaults: {
        size: 'large'
      },
      input: {
        size: 'default'
      },
      select: {
        transfer: true，
        clearable: true
      }
    }
  })
  .mount('#app')
```

> 大部分组件的每个属性都可以通过该配置进行修改默认值，配置中组件的名称需要满足驼峰命名。

## 命名空间

在调用 `Vue.use` 时通过在第二个参数传入 `prefix` 选项可以为所有组件设置一个共同的前缀。

::: warning
当与一些其他的组件一同使用时, 可能会发生命名冲突，使用该特性可以轻松地解决这个问题。
:::

### CapitalCase 命名

```js
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

```js
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

在调用 `Vue.use` 时通过在第二个参数传入 `locale` 选项可以为所有组件配置国际化。

```js
createApp(App).use(install, {
  locale: {
    input: { placeholder: '请输入' }
  }
})
```

或者直接使用 API 方法进行配置：

```js
import { configLocale } from 'vexip-ui'

configLocale({
  input: { placeholder: '请输入' }
})
```

> 完整的国际化选项可以浏览 [此处](//github.com/qmhc/vexip-ui/blob/main/common/config/locale.ts)。
