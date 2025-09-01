# Collapse

## Demos

:::demo collapse/basis

### Basis Usage

Each panel can expand and contract independently without affecting each other.

:::

:::demo collapse/card

### Card Mode

Add the `card` prop to enable card mode.

:::

:::demo collapse/ghost

### Borderless Mode

Add `ghost` prop to enable borderless mode, this attribute has no effect in card mode.

:::

:::demo collapse/accordion

### Accordion

Adding the `accordion` prop enables accordion mode, in which only one panel can be expanded at a time.

:::

:::demo collapse/arrow

### Adjust Arrow

Adding the value of the `arrow-type` prop can change the position of the panel arrow or hide the arrow.

:::

:::demo collapse/alive

### Keep Mounted

Use the `alive` prop to control the mounting behavior of the panel’s content.

`'mounted'` means that once the panel content is mounted for the first time, it will remain mounted and not be destroyed.

:::

:::demo collapse/single

### Use Alone

Not all cases require multiple panels to be juxtaposed, and the CollapsePanel component can be used alone.

:::

:::demo collapse/transition

### Transition Component

A custom Transition component is used inside the accordion panel to implement the accordion transition effect.

This component can be used independently to add collapsing transition effects to internal elements, while supporting all properties of native Transition.

:::

## API

### Preset Types

```ts
type CollapseArrowType = 'right' | 'left' | 'none'
type CollapseAliveType = 'always' | 'mounted' | 'never'

interface CollapsePanelSlots {
  arrow?: (params: { expanded: boolean }) => any,
}
```

### Collapse Props

| Name       | Type                                       | Description                                                                                                                               | Default   | Since    |
| ---------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| expanded   | `string \| number \| (string \| number)[]` | Set the label value of the expanded panel, can be passed in an array when not in accordion mode                                           | `null`    | -        |
| card       | `boolean`                                  | Set whether to be in card mode                                                                                                            | `false`   | -        |
| accordion  | `boolean`                                  | Set whether to accordion mode                                                                                                             | `false`   | -        |
| arrow-type | `'right' \| 'left' \| 'none'`              | Set the type of the panel's indicator arrow                                                                                               | `'right'` | -        |
| ghost      | `boolean`                                  | Set whether to set borderless mode                                                                                                        | `false`   | -        |
| alive      | `boolean \| 'always' \| 'after-loading'`   | Set whether the panel content should be continuously rendered, `true` is equivalent to `'always'`, and `false` is equivalent to `'never'` | `false`   | `2.3.37` |

### Collapse Events

| Name   | Description                                                                                | Parameters                         | Since |
| ------ | ------------------------------------------------------------------------------------------ | ---------------------------------- | ----- |
| change | Emitted when the expanded panel changes, returns the label of the currently expanded panel | `(expanded: (string \| number)[])` | -     |

### CollapsePanel Props

| Name          | Type                                     | Description                                                                                                                               | Default   | Since    |
| ------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| label         | `string \| number`                       | The label value of panel, unique within the same group                                                                                    | `null`    | -        |
| title         | `string`                                 | The title of the panel                                                                                                                    | `''`      | -        |
| disabled      | `boolean`                                | Set whether the panel is disabled                                                                                                         | `false`   | -        |
| content-style | `Record<string, any>`                    | The styles the content of the panel                                                                                                       | `null`    | -        |
| expanded      | `boolean`                                | Set whether the panel is expanded                                                                                                         | `false`   | -        |
| card          | `boolean`                                | Set whether to be in card mode                                                                                                            | `false`   | -        |
| arrow-type    | `'right' \| 'left' \| 'none'`            | Set the type of the panel's indicator arrow                                                                                               | `'right'` | -        |
| icon          | `string`                                 | Set the subordinate icon for the panel title                                                                                              | `''`      | -        |
| ghost         | `boolean`                                | Set whether to be in borderless mode                                                                                                      | `false`   | -        |
| alive         | `boolean \| 'always' \| 'after-loading'` | Set whether the panel content should be continuously rendered, `true` is equivalent to `'always'`, and `false` is equivalent to `'never'` | `null`    | `2.3.37` |

### CollapsePanel Events

| Name   | Description                                                                        | Parameters            | Since |
| ------ | ---------------------------------------------------------------------------------- | --------------------- | ----- |
| toggle | Emitted when the panel's expanded changes, returns the expanded state of the panel | `(expanded: boolean)` | -     |

### CollapsePanel Slots

| Name    | Description                   | Parameters              | Since    |
| ------- | ----------------------------- | ----------------------- | -------- |
| default | Content slot for the panel    | -                       | -        |
| title   | Title slot for the panel      | -                       | -        |
| arrow   | Arrow icon slot for the panel | `{ expanded: boolean }` | `2.3.36` |

### CollapseTransition Props

| Name        | Type                                | Description                                                                              | Default         | Since |
| ----------- | ----------------------------------- | ---------------------------------------------------------------------------------------- | --------------- | ----- |
| appear      | `boolean`                           | Set whether will be passed to vue native transition component                            | `false`         | -     |
| mode        | `'in-out' \| 'out-in' \| 'default'` | The transition mode, optional values are `default`, `out-in`, `in-out`                   | `'default '`    | -     |
| horizontal  | `boolean`                           | Set whether to fold horizontally                                                         | `false`         | -     |
| duration    | `number`                            | Set the duration of the folding transition effect in milliseconds, not less than `200ms` | `250`           | -     |
| timing      | `string`                            | The timing function to set transition effect                                             | `'ease-in-out'` | -     |
| fade-effect | `boolean`                           | Set whether to have fade-in effect when folding                                          | `false`         | -     |

> The CollapseTransition component supports 'before-enter', 'enter', 'after-enter', 'before-leave', 'leave', 'after-leave' events.
