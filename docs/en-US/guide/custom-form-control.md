# Custom Form Control

In Vexip UI, form control components can automatically two-way bind to the corresponding field value under the FormItem and their state is controlled by the form. See [Form Documentation](/zh-CN/component/form).

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

When the existing form control components are not enough, you may want to customize some and hope that they have the above features.

Luckily, the ability of form control components in Vexip UI is open. Through the following steps, you can create a form control component by yourself.

## Create Control

Let's first take a look at what features a general form control component should have:

- Disabled
- Loading
- State
- Get and set value
- Size (Optional)

So we created a component as follows (for illustrative purposes only, not guaranteed for actual use):

<<< @/.vitepress/theme/components/control-demo.vue

As you can see, the component has a `value` prop that supports two-way binding, and uses `disabled`, `loading`, `state`, and `size` props to control other features.

## Inject Field Store

Vexip UI provides a `useFieldStore` method which can quickly improt the filed store.

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

This method returns a series of states of control and some control methods.

Among them, the `focus` as a parameter provides the focus method of the control, and the `idFor` in the return value is used for the id attribute of the control.

The next step is to adjust the component's props so that they can use the value provided by the form when no valid value is received.

We modify the content of defineProps and change the default value of each prop to `null`:

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

Next, define a `reactive` to store and process the values, and replace the use of the original props with the corresponding props in the `store` mentioned above:

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

Next, we need to add the use of control methods in some places:

```ts
function handleChange(event: Event) {
  if (store.disabled) return

  currentValue.value = (event.target as HTMLInputElement).value
  setFieldValue(currentValue.value)
  emit('change', currentValue.value)
  emit('update:value', currentValue.value)
  validateField()
}

// It the control has clear action
function handleClear() {
  // do something
  nextTick(clearField)
}
```

With this, a form control component is complete.

It follows the conventions of FormItem just like any other form control component in Vexip UI and has automatic two-way binding. The relevant props of it are controlled by the Form component when no value is passed from the user.

## Full Code

<<< @/.vitepress/theme/components/control-demo-after.vue
