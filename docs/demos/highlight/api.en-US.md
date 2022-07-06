### Highlight Props

| Name        | Type    | Description                       | Default | Since |
| ----------- | ------- | -------------------------- | ------ | --- |
| content | `string` | Set the highlighted original content | `''` | - |
| key-words | `string[]` | Set keywords to search and highlight | `[]` | - |
| ignore-case | `boolean` | Set whether to ignore case when retrieving | `false` | - |

### Highlight Slots

| Name    | Description                                                         | Parameters  | Since |
| ------- | ------------------------------------------------------------ | --- | --- |
| default | Slot for unhighlighted content, receiving object returns unhighlighted content | `{ text: string }` | - |
| light | Slot for highlighted content, receiving object returns highlighted content | `{ text: string }` | - |
