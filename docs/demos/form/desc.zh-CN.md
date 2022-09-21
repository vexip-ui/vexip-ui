用于需要收集、验证一些信息的时候，快速创建表单域。

:::warning
在 FormItem 组件下，我们约定最多只有一个顶层控件类组件（即 **表单** 组件分类下除 Form 以外的组件），在这个约定下 FormItem 会自动为其下的控件组件实现数据的双向绑定、状态同步等。
:::

在使用 `model` 属性初始化表单时，可直接传入一个空对象，组件内部会自动初始化字段默认值，不过类型仍需要你自己定义。

```vue
<template>
  <Form :model="model"></Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface Model {
  name: string
}

const model = reactive({} as Model)
</script>
```
