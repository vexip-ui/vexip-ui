# 自定义表单控件

在 Vexip UI 中，表单控件组件可以在 FormItem 下自动双向绑定表单对应字段的值，并且其状态受控于表单，详见 [Form 文档](/zh-CN/component/form)。

```vue
<template>
  <Form :model="model">
    <FormItem label="Name" prop="name">
      <Input></Input>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

interface Model {
  name: string
}

const model = reactive({} as Model)
</script>
```

当现有的表单控件组件不够用时，你可能想要自定义一些并希望其同时具备上述的特性。

幸运的是，Vexip UI 表单控件组件的这种能力是开放的。通过下面的步骤，你可以自己创建一个表单控件组件。

## 创建控件

我们先来看看一个通用的表单控件组件应该具备哪些要素：

- 禁用
- 加载中
- 状态
- 值的获取与设置
- 大小（可选）

于是我们创建了一个如下的组件（仅表达逻辑，不保证实际使用）：

<<< @/.vitepress/theme/components/control-demo.vue

可以看到组件具有支持双向绑定的 `value` 属性，并通过 `disbaled`、`loading`、`state` 和 `size` 属性分别控制其他要素。

## 注入字段 Store

Vexip UI 提供了一个 `useFieldStore` 方法，可以快速完成字段 Store 的引入。

```ts
import { useFieldStore } from 'vexip-ui'

const {
  idFor,
  state,
  disabled,
  loading,
  size,
  validateField,
  clearField,
  getFieldValue,
  setFieldValue
} = useFieldStore<string>(focus)
```

该方法返回了一系列的控件状态以及一些控制方法。

其中，作为参数的 `focus` 提供了控件的聚焦方法，返回值的 `idFor` 用于控件的 `id` 属性。

下一步要做的就是调整组件的属性使其可以在未接收到有效值时采用表单所提供的值。

我们修改 `defineProps` 的内容，将各个属性默认值修改为 `null`：

```ts
const props = defineProps({
  value: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: null
  },
  loading: {
    type: Boolean,
    default: null
  },
  state: {
    type: String as PropType<ComponentState>,
    default: null
  },
  size: {
    type: String as PropType<ComponentSize>,
    default: null
  }
})
```

接着再定义一个 `reactive` 用于存储处理后的值，并将原有的属性的使用替换为上述的 `store` 中对应的属性：

```ts
import { computed, reactive, watch } from 'vue'

const get = <V = any>(value: V, def: V) => value != null ? value : def

const store = reactive({
  value: computed(() => get(props.value, getFieldValue(''))),
  disabled: computed(() => get(props.disabled, disabled.value)),
  loading: computed(() => get(props.loading, loading.value)),
  state: computed(() => get(props.state, state.value)),
  size: computed(() => get(props.size, size.value))
})
```

下一步，我们需要在一些地方加入对控制方法的使用：

```ts
function handleChange(event: Event) {
  if (store.disabled) return

  currentValue.value = (event.target as HTMLInputElement).value
  setFieldValue(currentValue.value)
  emit('change', currentValue.value)
  emit('update:value', currentValue.value)
  validateField()
}

// 如果控件具有清除操作
function handleClear() {
  // do something
  nextTick(clearField)
}
```

至此，一个表单控件组件就完成了。

它与 Vexip UI 中任意的表单控件组件一样，遵循 FormItem 的约定，具备自动双向绑定特性，相关的属性在用户未传值时受控于 Form 组件。

## 完整代码

<<< @/.vitepress/theme/components/control-demo-after.vue
