# Global Config

Vexip UI provides some configurations to change components behavior when install.

## Props Default Value

Vexip UI provides a ability to change the props default value of components.

Imagine, in an application with hundreds of form controls, a requirement to change all form controls size from `'default'` to `'large'`, you may to do like following:

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

Lousy work.

By using Vexip UI, you just need to pass an object in the second parameter of `app.use` and specify the `props` option:

```ts
import { createApp } from 'vue'
import { install } from 'vexip-ui'

createApp(App)
  .use(install, {
    props: {
      // The props of all components can be modified via 'default'
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

Once set, the default value of the `size` prop of these components will be changed to `'large'`。

You can also change the default value of partial components with the `props` prop of the ConfigProvider component, please refer to the ConfigProvider [Documentation](/en-US/components/config-provider).

## Namespace

There are two concepts of namespace in Vexip UI.

The first is the namespace for the class name, which needs to be used together with the namespace variable in `sass`. The second is the namespace for the component name.

### Class Name Namespace

The class name prefix of all components can be modified by passing the `namespace` option in the second parameter when calling `app.use`.

Also, when import styles, you need to import it through `sass` and set the `$namespace` variable to the same value to ensure the styles are effectively.

```ts
createApp(App).use(install, { namespace: 'vxp' })
```

```scss
// you can omit index.scss in scss import
@use 'vexip-ui/style' with (
  $namespace: 'vxp'
);
```

### Component Name Namespace

A common prefix can be set for the name of all components by passing the `prefix` option in the second parameter when calling `app.use`.

When used with some other components, naming conflicts may occur, which can be easily resolved using this feature.

```ts
createApp(App).use(install, { prefix: 'V' })
```

After set, all components name will be prefixed with `V`.

```vue
<template>
  <VButton></VButton>
  <VInput></VInput>
</template>
```

## Internationalization

I18n can be configured by passing the `locale` option in the second parameter when calling `app.use`.

```ts
app.use(install, {
  locale: {
    locale: 'en-US'
  }
})
```

The default language used can be set through `locale.locale`. Currently, Vexip UI provides two built-in languages, `'zh-CN'` and `'en-US'`.

Also you can customize the i18n for each components:

```ts
app.use(install, {
  locale: {
    locale: 'zh-CN',
    input: {
      placeholder: 'Try to input something'
    }
  }
})
```

> The full i18n options can be viewed [here](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/locale/helper.ts).
