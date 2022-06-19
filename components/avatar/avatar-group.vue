<template>
  <div :class="className" :style="style">
    <div v-for="(option, index) in renderAvatars" :key="index" :class="nh.be('item')">
      <slot :option="option" :index="index">
        <Avatar
          :src="option.src"
          :icon="option.icon"
          :alt="option.alt"
          :fit="option.fit"
          :src-set="option.srcSet"
          :gap="option.gap"
          :icon-scale="option.iconScale"
          :fallback-src="option.fallbackSrc"
        >
          {{ option.text }}
        </Avatar>
      </slot>
    </div>
    <div v-if="restAvatars.length" :class="[nh.be('item'), nh.bem('item', 'rest')]">
      <Tooltip v-if="props.showTip" :trigger="props.tipTrigger" :tip-class="nh.be('rest')">
        <slot name="rest" :options="restAvatars" :count="restAvatars.length">
          <Avatar :color="props.restColor" :background="props.restBackground">
            {{ `+${restAvatars.length}` }}
          </Avatar>
        </slot>
        <template #tip>
          <slot name="tip" :options="restAvatars" :count="restAvatars.length">
            <Avatar
              v-for="(option, index) in restAvatars"
              :key="index"
              :src="option.src"
              :icon="option.icon"
              :alt="option.alt"
              :fit="option.fit"
              :src-set="option.srcSet"
              :gap="option.gap"
              :icon-scale="option.iconScale"
              :fallback-src="option.fallbackSrc"
            >
              {{ option.text }}
            </Avatar>
          </slot>
        </template>
      </Tooltip>
      <slot
        v-else
        name="rest"
        :options="restAvatars"
        :count="restAvatars.length"
      >
        <Avatar :color="props.restColor" :background="props.restBackground">
          {{ `+${restAvatars.length}` }}
        </Avatar>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, provide } from 'vue'
import { Avatar } from '@/components/avatar'
import { Tooltip } from '@/components/tooltip'
import { useNameHelper, useProps, booleanProp } from '@vexip-ui/config'
import { GROUP_STATE } from './symbol'

import type { PropType } from 'vue'
import type { ComponentSize, StyleType } from '@vexip-ui/config'
import type { AvatarOption } from './symbol'

export default defineComponent({
  name: 'AvatarGroup',
  components: {
    Avatar,
    Tooltip
  },
  props: {
    size: [Number, String] as PropType<number | ComponentSize>,
    options: Object as PropType<AvatarOption[]>,
    circle: booleanProp,
    max: Number,
    showTip: booleanProp,
    tipTrigger: String as PropType<'hover' | 'click'>,
    vertical: booleanProp,
    offset: Number,
    restColor: String,
    restBackground: String
  },
  setup(_props) {
    const props = useProps('avatarGroup', _props, {
      size: 'default' as ComponentSize,
      options: {
        default: () => [],
        static: true
      },
      circle: false,
      max: null,
      showTip: false,
      tipTrigger: 'hover',
      vertical: false,
      offset: null,
      restColor: null,
      restBackground: null
    })

    const nh = useNameHelper('avatar-group')

    const renderAvatars = ref<AvatarOption[]>([])
    const restAvatars = ref<AvatarOption[]>([])

    watchEffect(() => {
      const size = props.options.length

      if (props.max > 0 && size > props.max) {
        renderAvatars.value = props.options.slice(0, props.max - 1)
        restAvatars.value = props.options.slice(props.max - 1)
      } else {
        renderAvatars.value = Array.from(props.options)
        restAvatars.value = []
      }
    })

    provide(GROUP_STATE, props)

    const className = computed(() => {
      return {
        [nh.b()]: true,
        'vxp-avatar-vars': true,
        [nh.bm(props.size)]: typeof props.size !== 'number' && props.size !== 'default',
        [nh.bm('circle')]: props.circle,
        [nh.bm('vertical')]: props.vertical
      }
    })
    const style = computed(() => {
      const style: StyleType = {}

      if (typeof props.offset === 'number') {
        style['--vxp-avatar-group-offset'] = `${props.offset}px`
      }

      return style
    })

    return {
      props,
      nh,
      renderAvatars,
      restAvatars,

      className,
      style
    }
  }
})
</script>
