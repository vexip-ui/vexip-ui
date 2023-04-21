# Loading

It is usually used to feedback some global loading status, such as page routing switch, global request, etc.

## Demos

:::demo loading/basis

### Basis Usage

The simplest usage, pass in a number from `0` ~ `100` to refresh the current progress, until `100` is passed in, the loading is considered complete.

:::

:::demo loading/height

### Bar Stroke Width

Setting the `strokeWidth` option can change the vertical width of the progress bar, and this parameter needs to be kept the same during a round of loading.

:::

:::demo loading/max

### Intermittent Value

The `maxPercent` option can be used to set the maximum progress of this call. After reaching the maximum, the progress bar will be in a paused state waiting for the next call.

:::

:::demo loading/state

### Loading State

Setting the `state` option can change the state of the progress bar.

Also, this example shows how to use the Loading component in a composition API.

:::

## API

### Loading Options

| Name        | Type                                             | Description                                                                                                                                                                                     | Default     | Since |
| ----------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ----- |
| percent     | `number`                                         | Set the current progress of the progress bar, the value range is `0` ~ `100`                                                                                                                    | `0`         | -     |
| strokeWidth | `number`                                         | Set the vertical width (height) `px` of the progress bar. In a round of loading, you need to pass in the same value every time you call the `open` method to keep the vertical width consistent | `2`         | -     |
| state       | `'default' \| 'success' \| 'error' \| 'warning'` | Set the state of the progress bar                                                                                                                                                               | `'default'` | -     |
| position    | `'top' \| 'bottom'`                              | Set the position of the progress bar                                                                                                                                                            | `'top'`     | -     |
| maxPercent  | `number`                                         | Set the intermediate value of the progress bar this time, after the progress reaches this value, it will wait for the next call                                                                 | `95`        | -     |
