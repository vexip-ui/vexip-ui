# Tour ^[Since v2.2.0](!s)

Used to guide users on how to use certain features.

## Demos

:::demo tour/basis

### Basis Usage

Simplest usage.

:::

:::demo tour/template

### Template Step

Use the TourStep component to configure tour steps.

:::

:::demo tour/placement

### Tip Placement

By setting the `placement` prop in the step options, you can specify the placement of the step's tooltip.

When no valid `target` is specified, the tooltip will be centered.

:::

:::demo tour/types

### Tip Type

The type of tips can be specified via the `type` prop.

You can also set the `type` prop in the step options to specify the tip type for the step alone.

:::

:::demo tour/sign-type

### Sign Type

The type of sign can be specified by the `sign-type` prop.

Of course, you can customize the content of the sign through the `sign` slot.

:::

:::demo tour/permeable

### Permeable

By default, the target area will be masked off and cannot be interacted with.

Add the `permeable` prop to make the click interaction of the target area permeable.

:::

:::demo tour/slots

### Using Slots

The Tour component provides various slots to satisfy the tip content of the steps.

When you want to fully customize the tip content of a certain step, you can use the default slot of the TourStep component.

:::

## API

### Preset Types

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

### Tour Props

| Name      | Type                   | Description                                                            | Default     | Since |
| --------- | ---------------------- | ---------------------------------------------------------------------- | ----------- | ----- |
| active    | `boolean`              | Set whether to display the tour, you can use `v-model` two-way binding | `false`     | -     |
| index     | `number`               | Set the current step of tour, you can use `v-model` two-way binding    | `0`         | -     |
| steps     | `TourStepOptions[]`    | Tour steps configuration                                               | `[]`        | -     |
| type      | `TourType`             | Set the type of tips for tour steps                                    | `'default'` | -     |
| hide-mask | `boolean`              | Set whether to hide the mask layer                                     | `false`     | -     |
| sign-type | `TourSignType`         | Set the type of step sign                                              | `'dot'`     | -     |
| padding   | `number \| number`     | Set the padding of the target area                                     | `10`        | -     |
| closable  | `boolean`              | Set whether to display a close button                                  | `true`      | -     |
| permeable | `boolean`              | Set whether mouse events can penetrate to the target area              | `false`     | -     |
| locale    | `LocaleConfig['tour']` | Set the locale config                                                  | `null`      | -     |

### Tour Events

| Name   | Description                                                | Parameters                               | Since |
| ------ | ---------------------------------------------------------- | ---------------------------------------- | ----- |
| toggle | Emitted when the active state of tour changes              | `(active: boolean)`                      | -     |
| change | Emitted when the current step of the tour changes          | `(index: number, step: TourStepOptions)` | -     |
| close  | Emitted when the close button is used to trigger the close | -                                        | -     |

### Tour Slots

| Name    | Description                            | Parameters       | Since |
| ------- | -------------------------------------- | ---------------- | ----- |
| default | Used to define the TourStep components | -                | -     |
| header  | The header slot for tips               | `TourSlotParams` | -     |
| title   | The title slot for the tips            | `TourSlotParams` | -     |
| close   | The close button slot for the tips     | `TourSlotParams` | -     |
| body    | The content slot for the tips          | `TourSlotParams` | -     |
| footer  | The footer slot for tips               | `TourSlotParams` | -     |
| sign    | The sign slot for the tips             | `TourSlotParams` | -     |
| actions | The actions slots for tips             | `TourSlotParams` | -     |

### TourStep Props

| Name      | Type               | Description                                                                   | Default     | Since |
| --------- | ------------------ | ----------------------------------------------------------------------------- | ----------- | ----- |
| target    | `TourTarget`       | Set the target for the tip                                                    | `null`      | -     |
| placement | `Placement`        | Set the placement of the tip, the optional values are the same as floating-ui | `'bottom'`  | -     |
| title     | `string`           | Set the title of the tip                                                      | `''`        | -     |
| content   | `string`           | Set the content of the tip                                                    | `''`        | -     |
| order     | `number`           | Set the order of the tip                                                      | `0`         | -     |
| type      | `TourType`         | Set the type of tip                                                           | `'default'` | -     |
| renderer  | `TourStepRenderFn` | Custom render function for the tip                                            | `null`      | -     |
