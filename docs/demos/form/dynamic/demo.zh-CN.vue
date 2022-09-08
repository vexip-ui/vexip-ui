<template>
  <Form ref="form" :model="formModel" style="max-width: 400px;">
    <FormItem
      v-for="(_, index) in formModel.skills"
      :key="index"
      required
      :prop="`skills.${index}.value`"
      :label="`Skill ${index + 1}`"
    >
      <Input style="flex: 1;"></Input>
      <Button
        type="error"
        :icon="Minus"
        circle
        size="small"
        :disabled="!index"
        style="margin-left: 6px;"
        @click="removeSkill(index)"
      ></Button>
    </FormItem>
    <FormItem action>
      <Button type="success" :icon="Plus" @click="addSkill">
        添加
      </Button>
      <Button type="primary" :icon="Check" @click="handleSubmit">
        提交
      </Button>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Minus, Plus, Check } from '@vexip-ui/icons'

import type { Form } from 'vexip-ui'

const formModel = reactive({
  skills: [
    {
      value: ''
    }
  ]
})

const form = ref<InstanceType<typeof Form> | null>(null)

function addSkill() {
  formModel.skills.push({ value: '' })
}

function removeSkill(index: number) {
  if (formModel.skills.length <= 1) {
    return
  }

  formModel.skills.splice(index, 1)
}

function handleSubmit() {
  form.value?.validate()
}
</script>
