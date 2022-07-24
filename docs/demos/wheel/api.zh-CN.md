### Wheel 属性

| 名称         | 类型                                             | 说明                                             | 默认值      | 始于    |
| ------------ | ------------------------------------------------ | ------------------------------------------------ | ----------- | ------- |
| state        | `'default' \| 'success' \| 'error' \| 'warning'` | 设置滚轮的状态                                   | `'default'` | `2.0.0` |
| options      | `RawOption[]`                                    | 设置滚轮的选项                                   | `[]`        | `2.0.0` |
| horizontal   | `boolean`                                        | 设置滚轮的是否为横向模式                         | `false`     | -       |
| value        | `string \| number`                               | 当前激活元素的索引，可以使用 `v-model` 双向绑定  | `0`         | -       |
| candidate    | `number`                                         | 设置滚轮上下的候选个数，可选范围为 0 ~ 3         | `2`         | -       |
| arrow        | `boolean`                                        | 设置是否使用滚轮的箭头指示器                     | `false`     | -       |
| insert-empty | `boolean \| string`                              | 设置是否插入空值，传入字符串可以指定空值的显示值 | `false`     | `2.0.0` |
| disabled     | `boolean`                                        | 设置是否禁用滚轮                                 | `false`     | `2.0.0` |

一些内置类型：

```ts
type RawOption =
  | string
  | number
  | {
      value: string | number,
      label?: string,
      disabled?: boolean
    }
```

### Wheel 事件

| 名称   | 说明                                               | 参数                        | 始于 |
| ------ | -------------------------------------------------- | --------------------------- | ---- |
| change | 当前激活的元素发生改变时触发，返回该元素的索引和值 | `(value: string \| number)` | -    |
