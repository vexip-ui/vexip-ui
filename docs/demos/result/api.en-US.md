### Result Props

| Name          | Type                                          | Description                                                                                                  | Default  | Since   |
| ------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------- | ------- |
| type          | `'info' \| 'success' \| 'warning' \| 'error'` | The type of result  icon                                                                                        | `'info'` | -       |
| size         | `'small' \| 'default' \| 'large'`                                       | The size of the result                                                                 | `'default'` | -       |
| title         | `string`                                      | Set the title of the result, it will be invalid after using the same name slot                      | `''`     | -       |
| description      | `string`                                     | Set the description of the result, it will be invalid after using the same name slot                                                                        | `''`  | -       |
| icon-color    | `string`                                      | Set the color of the result icon                                                                              | `''`     



### Result Slots

| Name    | Description                                  | Parameters | Since |
| ------- | -------------------------------------------- | ---------- | ----- |
| icon | Custom icon              | -          | -     |
| title   | Title content slot for result        | -          | -     |
| description   | Description content slot for result        | -          | -     |
| extra   | Extra content slot for result,  you can set the button and so on       | -          | -     |