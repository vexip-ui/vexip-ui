### Highlight Props

| Name        | Type    | Description                       | Default | Since |
| ----------- | ------- | -------------------------- | ------ | --- |
| content     | `string`  | 设置高亮的原始内容         | `''`     | - |
| key-words   | `string[]`   | 设置需要检索并高亮的关键词 | `[]`     | - |
| ignore-case | `boolean` | 设置在检索时是否忽略大小写 | `false`  | - |

### Highlight Slots

| Name    | Description                                                         | Parameters  | Since |
| ------- | ------------------------------------------------------------ | --- | --- |
| default | 未高亮的内容的插槽，接收对象返回未高亮的内容 | `(text: string)` | - |
| light   | 高亮的内容的插槽，接收对象返回高亮的内容     | `(text: string)` | - |
