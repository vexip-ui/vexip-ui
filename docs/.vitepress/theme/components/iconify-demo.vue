<script setup lang="ts">
import 'iconify-icon'

import { h } from 'vue'

import type { IconsOptions, PropsOptions } from 'vexip-ui'

const providedProps: PropsOptions = {
  icon: {
    renderer: (props, attrs, renderDefault) => {
      if (attrs.name) {
        const { name, ...otherAttrs } = attrs

        return h('iconify-icon', {
          ...otherAttrs,
          icon: name,
          class: props.effect,
          inline: true,
          rotate: props.rotate,
          flip: props.flip === 'both' ? 'horizontal,vertical' : props.flip,
          style: props.size || (String(props.scale) !== '1' ? `font-size: ${props.scale}em` : ''),
        })
      }

      return renderDefault()
    },
  },
}

// 替换组件库内部图标
// Replace internal icons of library
const icons: IconsOptions = {
  loading: [{}, { name: 'eos-icons:three-dots-loading' }],
  clear: [{}, { name: 'icon-park-outline:clear-format' }],
  calendar: [{}, { name: 'radix-icons:calendar' }],
}
</script>

<template>
  <ConfigProvider :props="providedProps" :icons="icons">
    <Space vertical>
      <Button type="primary" loading>
        Loading
      </Button>
      <DatePicker :value="Date.now()" clearable style="max-width: 300px"></DatePicker>
      <Upload></Upload>
      <span style="display: flex; gap: 0 6px; padding: 3px">
        <!-- 直接使用图标 -->
        <!-- Use icons directly -->
        <Icon name="ri:airplay-line" scale="1.5"></Icon>
        <Icon name="ri:t-shirt-air-line" scale="1.5"></Icon>
        <Icon name="ant-design:heart-outlined" scale="1.5"></Icon>
        <Icon name="ant-design:check-circle-outlined" scale="1.5"></Icon>
      </span>
    </Space>
  </ConfigProvider>
</template>
