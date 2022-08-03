<template>
  <Form :model="form" :rules="rules" style="max-width: 500px;">
    <FormItem label="Input" prop="input">
      <Input></Input>
    </FormItem>
    <FormItem label="Input1" prop="input1">
      <Input></Input>
    </FormItem>
    <FormItem label="Input2" prop="input2">
      <Input></Input>
    </FormItem>
    <FormItem label="Input3" prop="input3">
      <Input></Input>
    </FormItem>
    <FormItem label="Input4" prop="input4">
      <Input></Input>
    </FormItem>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      form: {
        input: '',
        input1: '',
        input2: '',
        input3: '',
        input4: ''
      },
      rules: {
        // 下列任意的验证方式均可

        // 单个规则
        input: {
          enum: ['过桥米线', '干炒牛河', '大碗宽面', '油泼面', '新疆拌面'],
          message: '没有这个菜'
        },

        // 单个规则复合验证
        input1: {
          required: true,
          enum: ['过桥米线', '干炒牛河', '大碗宽面', '油泼面', '新疆拌面'],
          message: '没有这个菜'
        },

        // 多个规则
        input2: [
          {
            required: true,
            message: '点菜不可为空'
          },

          // 验证方法 + 错误信息
          // 验证通过需返回 true
          {
            validator: (value: string) =>
              ['过桥米线', '干炒牛河', '大碗宽面', '油泼面', '新疆拌面'].includes(value),
            message: '没有这个菜'
          }
        ],

        // 验证方法直接返回错误信息
        input3: {
          validator: (value: string) => {
            if (['过桥米线', '干炒牛河', '大碗宽面', '油泼面', '新疆拌面'].includes(value)) {
              return true
            }

            return '没有这个菜'
            // return new Error('没有这个菜')
          }
        },

        // 异步验证 (返回 Promise)
        input4: {
          validator: (value: string) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                // 直接 resolve 验证结果
                resolve(['过桥米线', '干炒牛河', '大碗宽面', '油泼面', '新疆拌面'].includes(value))

                // 验证不通过时抛出错误
                if (['过桥米线', '干炒牛河', '大碗宽面', '油泼面', '新疆拌面'].includes(value)) {
                  resolve(true)
                }

                reject(new Error())
                // reject(new Error('没有这个菜'))
              }, 1000)
            }),
          message: '没有这个菜'
        }
      }
    }
  }
})
</script>
