<template>
  <Form ref="form" :model="formModel" style="max-width: 400px">
    <FormItem
      v-for="(_, index) in formModel.skills"
      :key="index"
      hide-label
      style="margin-bottom: 0"
    >
      <FormItem :prop="`skills.${index}.priority`" label="Priority" flex="auto">
        <NumberInput style="width: 80px"></NumberInput>
      </FormItem>
      <FormItem
        :prop="`skills.${index}.value`"
        :label="`Skill ${index + 1}`"
        flex="auto"
        style="margin-inline-start: 10px"
      >
        <Input style="flex: 1"></Input>
        <Button
          type="error"
          :icon="Minus"
          circle
          size="small"
          :disabled="!index"
          style="margin-inline-start: 6px"
          @click="removeSkill(index)"
        ></Button>
      </FormItem>
    </FormItem>
    <FormItem action>
      <Button type="success" :icon="Plus" @click="addSkill">
        添加
      </Button>
      <FormSubmit :icon="Check" @submit="handleSubmit" @error="handleError"></FormSubmit>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import { Check, Minus, Plus } from '@vexip-ui/icons'

import type { Form } from 'vexip-ui'

const formModel = reactive({
  skills: [
    {
      value: '',
      priority: 0,
    },
  ],
})

const form = ref<InstanceType<typeof Form>>()

function addSkill() {
  formModel.skills.push({ value: '', priority: 0 })
}

function removeSkill(index: number) {
  if (formModel.skills.length <= 1) {
    return
  }

  formModel.skills.splice(index, 1)
}

function handleSubmit() {
  console.info('validation passed')
}

function handleError(errors: string[]) {
  console.error(errors)
}
</script>
