# Custom Internal Icons

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

:::info
Some more semantic names are used in the configuration, which is usually different from the name of the icon itself, so please do not confuse them.
:::

<InternalIcons></InternalIcons>
