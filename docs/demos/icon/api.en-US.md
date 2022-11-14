### Preset Types

```ts
type IconEffect = 'spin-in' | 'spin-out' | 'pulse-in' | 'pulse-out' | string
```

### Icon Props

| Name      | Type                                   | Description                                         | Default | Since   |
| --------- | -------------------------------------- | --------------------------------------------------- | ------- | ------- |
| icon      | `Record<string, any>`                  | Set `<svg>` vue component                           | `null`  | `2.0.0` |
| scale     | `number`                               | Used to adjust icon size                            | `1`     | -       |
| ~~spin~~  | `boolean \| 'in' \| 'out'`             | Set whether the icon is spin                        | `false` | -       |
| ~~pulse~~ | `boolean \| 'in' \| 'out'`             | Set whether the icon has a pulse effect             | `false` | -       |
| flip      | `'horizontal' \| 'vertical' \| 'both'` | Set whether the icon is flipped                     | `null`  | -       |
| title     | `string`                               | Set the title prop of the icon                      | `''`    | -       |
| effect    | `IconEffect`                           | Set effect animation name or a customize class name | `null`  | `2.1.0` |
