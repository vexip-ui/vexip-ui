# Change Icons

In Vexip UI, the internal icons used by all components can be customized through [Global Configuration](/en-US/guide/global-config#internal-icons) or [ConfigProvider](/en-US/component/config-provider).

```ts
import { CircleXmark, Spinner, Xmark } from '@vexip-ui/icons'

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

## List of Internal Icons

:::warning
Some more semantic names are used in the configuration, which is usually different from the name of the icon itself, so please do not confuse them.
:::

<InternalIcons></InternalIcons>

## Replace with Iconify

==!s|2.2.11==

Nowadays [Iconify](https://iconify.design/) is used generally, and people often ask how to replace the icons in the library with Iconify.

The following example demonstrates how to render Iconify icons by modifying the default value of the Icon component's [`renderer` prop](/en-US/component/icon#icon-props). You can see that when the `name` attribute is passed in, let it render the `iconify-icon` element, otherwise the default rendering method is used.

In this way, you can gradually replace the icons with Iconify without destroying the original icons.

<<< @/.vitepress/theme/components/iconify-demo.vue

As you can see, the replaced icons will be rendered as Iconify icons, while the unreplaced icons will still be original:

<IconifyDemo></IconifyDemo>

The above example partially replaces the icons through ConfigProvider. In a real project, you can handle this by library initializing.

## Prev Internal Icons

<InternalPrevIcons></InternalPrevIcons>

You can use prev internal icons via the following config:

<<< @/.vitepress/theme/components/internal-prev-icons.vue#snippet{ts}
