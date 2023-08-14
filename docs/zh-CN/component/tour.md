# 漫游指引 Tour

常用于引导用户了解如何使用某些功能。

## Demos

:::demo tour/basis

### 基础用法

最简单的用法。

:::

:::demo tour/template

### 模版定义

使用 TourStep 组件可以以模版的形式配置漫游。

:::

:::demo tour/placement

### 提示位置

在步骤选项设置 `placement` 属性，可以指定该步骤的提示相对于目标的位置。

当没有指定有效的 `target` 时，提示将会居中。

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
type TourTarget = MaybeRef<any> | (() => string | MaybeElement)

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

| 名称      | 类型                   | 说明 | 默认值      | 始于 |
| --------- | ---------------------- | ---- | ----------- | ---- |
| active    | `boolean`              |      | `false`     | -    |
| index     | `number`               |      | `0`         | -    |
| steps     | `TourStepOptions[]`    |      | `[]`        | -    |
| type      | `TourType`             |      | `'default'` | -    |
| hideMask  | `boolean`              |      | `false`     | -    |
| signType  | `TourSignType`         |      | `'dot'`     | -    |
| padding   | `number \| number`     |      | `10`        | -    |
| closable  | `boolean`              |      | `true`      | -    |
| permeable | `boolean`              |      | `false`     | -    |
| locale    | `LocaleConfig['tour']` |      | `null`      | -    |

### Tour 事件

| 名称 | 说明 | 参数 | 始于 |
| ---- | ---- | ---- | ---- |

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

| 名称      | 类型               | 说明                                 | 默认值      | 始于 |
| --------- | ------------------ | ------------------------------------ | ----------- | ---- |
| target    | `TourTarget`       | 提示的目标                           | `null`      | -    |
| placement | `Placement`        | 提示出现的位置，可选值同 floating-ui | `'bottom'`  | -    |
| title     | `string`           | 提示的标题                           | `''`        | -    |
| content   | `string`           | 提示的内容                           | `''`        | -    |
| order     | `number`           | 提示出现的顺序                       | `0`         | -    |
| type      | `TourType`         | 提示的类型                           | `'default'` | -    |
| renderer  | `TourStepRenderFn` | 提示的自定义渲染函数                 | `null`      | -    |
