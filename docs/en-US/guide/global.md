# Global Config

Vexip UI provides some configurations to change components behavior when install, includes **props default value**, **component namespace**, **i18n** and **internal icons of components**.

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

And now, you just need to pass an object in the second parameter of `app.use` and specify the `props` option:

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

You can also change the default value of partial components with the `props` prop of the ConfigProvider component, see [ConfigProvider Documentation](/en-US/components/config-provider).

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
import { enUSLocale } from 'vexip-ui'

app.use(install, {
  locale: enUSLocale()
})
```

The default language of Vexip UI is `'zh-CN'`. You can register a locale via `registerLocale` method, and then change the locale config via `locale.locale` property.

```ts
import { registerLocale, enUSLocale } from 'vexip-ui'

registerLocale(enUSLocale())

app.use(install, {
  locale: { locale: 'en-US' }
})
```

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

You can also change i18n of partial components with the `locale` prop of the ConfigProvider component, see [ConfigProvider Documentation](/en-US/components/config-provider).

If you want to configure a other language, you need do it yourself by following the full i18n options.

> The full i18n options can be viewed [here](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/locale/helper.ts#L5).

## Internal Icons

Part of components include internal icons which place inside components and cannot be controlled by users.

Most of those components have provided props or slots to custom internal icons, but it will be a unhappy work if you need to batch replace any icon (such as loading icon).

So Vexip UI provides a way to globally config internal icons of components.

Internal icons can be configured by passing the `icons` option in the second parameter when calling `app.use`.

```ts
import { Xmark, CircleXmark, Spinner } from '@vexip-ui/icons'

app.use(install, {
  icons: {
    close: Xmark,

    // can be a function that returns a component
    clear: () => CircleXmark,

    // can be an array, and set parameters in second item
    loading: [
      Spinner,
      { effect: 'pulse-in' }
    ]
  }
})
```

You can also change internal icons of partial components with the `icons` prop of the ConfigProvider component, see [ConfigProvider Documentation](/en-US/components/config-provider).

> The full internal icons options can be viewed [here](https://github.com/vexip-ui/vexip-ui/blob/main/common/config/src/icons.ts#L88).

Finally, let's take a look at an actual effect after configuration:

<IconDemo></IconDemo>

> The details code can be viewed [here](https://github.com/vexip-ui/vexip-ui/blob/main/docs/common/icon-demo).