### Ellipsis Props

| Name            | Type                                | Description                                                                                                | Default      | Since |
| --------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------ | ----- |
| placement       | `Placement`                         | Set the position of the prompt bubble, the optional value is the same as Popper.js                         | `'top'`      | -     |
| transfer        | `boolean \| string`                 | Set the rendering position of the prompt bubble. When set to `true`, it will render to `<body>` by default | `'body'`     | -     |
| no-hover        | `boolean`                           | Set whether to make the prompt bubble unhoverable                                                          | `false`      | -     |
| transition-name | `string`                            | Set the transition effect of showing and hiding the prompt gas                                             | `'vxp-fade'` | -     |
| tooltip-theme   | `string`                            | Set the theme of the tooltip, optional values are `light`, `dark`                                          | `'dark'`     | -     |
| tip-class       | `string \| Record<string, boolean>` | Custom class name for tip content                                                                          | `null`       | -     |
| max-lines       | `number` | Set the max displayed lines                          | `null`       | -     |
