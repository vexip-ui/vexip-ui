### 预设类型

```ts
type IconEffect = 'spin-in' | 'spin-out' | 'pulse-in' | 'pulse-out' | string
```

### Icon 属性

| 名称      | 类型                                   | 说明                               | 默认值  | 始于    |
| --------- | -------------------------------------- | ---------------------------------- | ------- | ------- |
| icon      | `Record<string, any>`                  | 图标 `<svg>` 组件                  | `null`  | `2.0.0` |
| scale     | `number`                               | 用于调整图标尺寸                   | `1`     | -       |
| ~~spin~~  | `boolean \| 'in' \| 'out'`             | 设置图标是否需要旋转               | `false` | -       |
| ~~pulse~~ | `boolean \| 'in' \| 'out'`             | 设置图标是否具有脉冲效果           | `false` | -       |
| flip      | `'horizontal' \| 'vertical' \| 'both'` | 设置图标是否翻转                   | `null`  | -       |
| title     | `string`                               | 设置图标的标题属性                 | `''`    | -       |
| effect    | `IconEffect`                           | 设置效果动画名称或一个自定义类名称 | `null`  | `2.1.0` |
