# Tour 漫游指引 ==!s|2.2.0==

常用于引导用户了解如何使用某些功能。

## Demos

:::demo tour/basis

### 基础用法

最简单的用法。

:::

:::demo tour/template

### 模版步骤

使用 TourStep 组件可以以模版的形式配置漫游的步骤。

:::

:::demo tour/placement

### 提示位置

在步骤选项设置 `placement` 属性，可以指定该步骤的提示相对于目标的位置。

当没有指定有效的 `target` 时，提示将会居中。

:::

:::demo tour/types

### 提示类型

通过 `type` 属性可以指定提示的类型。

你也可以在步骤选项设置 `type` 属性，单独指定该步骤的提示的类型。

:::

:::demo tour/sign-type

### 标志类型

通过 `sign-type` 属性可以指定标志的类型。

当然，你可以通过 `sign` 插槽自定义标志的内容。

:::

:::demo tour/permeable

### 点击穿透

默认情况下，目标区域会被遮罩隔开无法交互。

添加 `permeable` 属性可以使得目标区域的点击交互可穿透。

:::

:::demo tour/slots

### 使用插槽

Tour 组件提供了各种插槽以满足自定义步骤的提示内容。

当你想要完全自定义某个步骤的提示内容，可以使用 TourStep 组件的默认插槽。

:::

## API

### 预设类型

```ts
type TourType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
type TourSignType = 'dot' | 'bar' | 'count'

interface TourVirtual {
  getBoundingClientRect(): { top: number, left: number, width: number, height: number }
}

type TourTarget =
  | MaybeRef<string | MaybeInstance | TourVirtual>
  | (() => string | MaybeElement | TourVirtual)

interface TourPayload {
  start(): void,
  prev(): void,
  next(autoClose?: boolean): void,
  close(): void
}

type TourStepRenderFn = (payload: TourPayload) => any

interface TourStepOptions {
  target?: TourTarget,
  placement?: Placement,
  title?: string,
  content?: string,
  order?: number,
  renderer?: TourStepRenderFn
}

type TourSlotParams = TourPayload & { step: TourStepOptions, index: number }
```

### Tour 属性

| 名称      | 类型                   | 说明                                            | 默认值      | 始于 |
| --------- | ---------------------- | ----------------------------------------------- | ----------- | ---- |
| active    | `boolean`              | 设置漫游是否显示，可以使用 `v-model` 双向绑定   | `false`     | -    |
| index     | `number`               | 设置漫游当前的步骤，可以使用 `v-model` 双向绑定 | `0`         | -    |
| steps     | `TourStepOptions[]`    | 漫游的步骤配置                                  | `[]`        | -    |
| type      | `TourType`             | 设置漫游步骤的提示类型                          | `'default'` | -    |
| hide-mask | `boolean`              | 设置是否隐藏遮罩层                              | `false`     | -    |
| sign-type | `TourSignType`         | 设置步骤标志的类型                              | `'dot'`     | -    |
| padding   | `number \| number`     | 设置目标区域的内边距                            | `10`        | -    |
| closable  | `boolean`              | 设置是否具有关闭按钮                            | `true`      | -    |
| permeable | `boolean`              | 设置鼠标事件是否可以穿透到目标区域              | `false`     | -    |
| locale    | `LocaleConfig['tour']` | 设置多语言配置                                  | `null`      | -    |

### Tour 事件

| 名称   | 说明                       | 参数                                     | 始于 |
| ------ | -------------------------- | ---------------------------------------- | ---- |
| toggle | 当漫游的激活状态改变时触发 | `（active: boolean）`                    | -    |
| change | 当漫游的当前步骤改变时触发 | `(index: number, step: TourStepOptions)` | -    |
| close  | 当用关闭功能触发关闭时触发 | -                                        | -    |

### Tour 插槽

| 名称    | 说明                   | 参数             | 始于 |
| ------- | ---------------------- | ---------------- | ---- |
| default | 用于定义 TourStep 组件 | -                | -    |
| header  | 提示的头部插槽         | `TourSlotParams` | -    |
| title   | 提示的标题插槽         | `TourSlotParams` | -    |
| close   | 提示的关闭按钮插槽     | `TourSlotParams` | -    |
| body    | 提示的内容插槽         | `TourSlotParams` | -    |
| footer  | 提示的脚部插槽         | `TourSlotParams` | -    |
| sign    | 提示的标志插槽         | `TourSlotParams` | -    |
| actions | 提示的操作插槽         | `TourSlotParams` | -    |

### TourStep 属性

| 名称      | 类型               | 说明                                     | 默认值      | 始于 |
| --------- | ------------------ | ---------------------------------------- | ----------- | ---- |
| target    | `TourTarget`       | 设置提示的目标                           | `null`      | -    |
| placement | `Placement`        | 设置提示出现的位置，可选值同 floating-ui | `'bottom'`  | -    |
| title     | `string`           | 设置提示的标题                           | `''`        | -    |
| content   | `string`           | 设置提示的内容                           | `''`        | -    |
| order     | `number`           | 设置提示出现的顺序                       | `0`         | -    |
| type      | `TourType`         | 设置提示的类型                           | `'default'` | -    |
| renderer  | `TourStepRenderFn` | 设置提示的自定义渲染函数                 | `null`      | -    |
