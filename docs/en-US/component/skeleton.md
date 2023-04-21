# Skeleton

A placeholder, often used where you need to wait for loading.

## Demos

:::demo skeleton/basis

### Basis Usage

Use it as an inline element to create the effect of a paragraph.

:::

:::demo skeleton/activated

### Activated Status

Add the `activated` prop to make the skeleton activated.

:::

:::demo skeleton/group

### Skeleton Group

Sometimes it is a little troublesome to set props and switch one by one skeleton.

:::

:::demo skeleton/loading

### Loading Status

Using the `loading` prop can be convenient when switching content.

:::

:::demo skeleton/shape

### Skeleton Shape

The shape of the skeleton can be changed via the `round` and `circle` props.

:::

## API

### Skeleton Props

| Name       | Type                              | Description                                                                                    | Default | Since    |
| ---------- | --------------------------------- | ---------------------------------------------------------------------------------------------- | ------- | -------- |
| size       | `'small' \| 'default' \| 'large'` | Set the built-in size for the skeleton, generally used to align the size of other components   | `null`  | -        |
| width      | `number \| string`                | Set the width of the skeleton, you can pass in a legal css size value css 大小值               | `null`  | -        |
| height     | `number \| string`                | Set the height of the skeleton, you can pass in a legal css size value                         | `null`  | -        |
| repeat     | `number`                          | Set the number of repeated renderings of the skeleton                                          | `1`     | -        |
| tag        | `string`                          | Set the element for skeleton rendering                                                         | `'div'` | -        |
| activated  | `boolean`                         | Set whether the skeleton is activated                                                          | `false` | -        |
| image      | `boolean`                         | Set whether the skeleton is as image                                                           | `false` | -        |
| imageIcon  | `Record<string, any>`             | Set icon for image skeleton                                                                    | `null`  | -        |
| iconScale  | `Number`                          | Set icon scale for image skeleton                                                              | `4`     | -        |
| round      | `boolean`                         | Set whether it is a round skeleton                                                             | `false` | -        |
| circle     | `boolean`                         | Set whether it is a circular skeleton. After setting, the `width` prop will be invalid         | `false` | -        |
| block      | `boolean`                         | Set whether is a `block` element                                                               | `false` | -        |
| spread     | `number`                          | Set the bottom margin of the skeleton                                                          | `0`     | -        |
| loading    | `boolean`                         | Set whether in loading, the content of the default slot will be directly rendered when `false` | `true`  | -        |
| scroll-tag | `string`                          | Custom tag for scroll content wrapping element                                                 | `'div'` | `2.0.13` |
