### Breadcrumb Props

| Name      | Type    | Description                     | Default |
| --------- | ------- | ------------------------ | ------ |
| separator | `string`  | 设置面包屑的分隔符       | `'/'`    |
| border    | `boolean` | 设置是否开启 border 模式 | `false`  |
| options | `string[]` | 快捷设置子元素，使用插槽后失效 | `[]` |

### Breadcrumb Events

| Name               | Description                                                                                | Parameters  |
| ------------------ | ----------------------------------------------------------------------------------- | ----- |
| select          | 当某个子元素被点击时触发，返回该元素的标签 (索引)                                   | `(label: string \| number)` |
| separator-click | 当某个子元素的分隔符被点击时触发，返回该元素的标签 (索引)，一般配合 border 模式使用 | `(label: string \| number)` |

### Breadcrumb Slots

| Name      | Description                   | Parameters  |
| --------- | ---------------------- | --- |
| default   | 面包屑的子元素         | - |
| separator | 自定义分隔符内容的插槽 | `(label: string \| number)` |

### BreadcrumbItem Props

| Name  | Type             | Description                                     | Default |
| ----- | ---------------- | ---------------------------------------- | ------ |
| label | `string \| number` | 元素的唯一标签，不设置时会使用内置的索引 | `null`   |

### BreadcrumbItem Events

| Name               | Description                                         | Parameters  |
| ------------------ | -------------------------------------------- | ----- |
| select          | 当元素被点击时触发，返回该元素的标签         | `(label: string \| number)` |
| separator-click | 当元素的分隔符被点击时触发，返回该元素的标签 | `(label: string \| number)` |

### BreadcrumbItem Slots

| Name      | Description                   | Parameters  |
| --------- | ---------------------- | --- |
| default   | 面包屑元素的内容         | - |
| separator | 自定义分隔符内容的插槽 | - |
