<template>
  <div :class="className">
    <ResizeObserver throttle :on-resize="computeBodyHeight">
      <div ref="header" :class="nh.be('header')">
        <Checkbox :class="nh.be('checkbox')"></Checkbox>
        <div :class="nh.be('reverse')" :title="locale.reverse">
          <Icon :scale="1.2">
            <Retweet></Retweet>
          </Icon>
        </div>
        <div :class="nh.be('counter')">
          {{ `0/${options.length}` }}
        </div>
        <span v-if="title || $slots.title" :class="nh.be('title')">
          <slot name="title">
            {{ title }}
          </slot>
        </span>
      </div>
    </ResizeObserver>
    <ResizeObserver v-if="filter" throttle :on-resize="computeBodyHeight">
      <div ref="search" :class="nh.be('filter')">
        <Input :suffix="MagnifyingGlass"></Input>
      </div>
    </ResizeObserver>
    <NativeScroll
      v-if="paged || $slots.body"
      :class="nh.be('body')"
      use-y-bar
      wrapper-tag="ul"
      :height="bodyHeight"
    >
      <slot name="body">
        <li
          v-for="(option, index) in options"
          :key="index"
          :class="nh.be('option')"
          @click="toggleSelect(option)"
        >
          <slot name="option" :option="option" :index="index">
            <Checkbox :class="nh.be('checkbox')" :checked="selected.has(option.value)"></Checkbox>
            <span :class="nh.be('label')">
              <slot name="label" :option="option" :index="index">
                {{ option.label }}
              </slot>
            </span>
          </slot>
        </li>
      </slot>
    </NativeScroll>
    <VirtualList
      v-else
      :class="nh.be('body')"
      :items="options"
      :item-size="32"
      use-y-bar
      id-key="value"
      :height="bodyHeight"
    >
      <template #default="{ item: option, index }">
        <li :class="nh.be('option')" @click="toggleSelect(option)">
          <slot name="option" :option="option" :index="index">
            <Checkbox :class="nh.be('checkbox')" :checked="selected.has(option.value)"></Checkbox>
            <span :class="nh.be('label')">
              <slot name="label" :option="option" :index="index">
                {{ option.label }}
              </slot>
            </span>
          </slot>
        </li>
      </template>
    </VirtualList>
    <ResizeObserver v-if="paged || $slots.footer" throttle :on-resize="computeBodyHeight">
      <div ref="footer" :class="nh.be('footer')">
        <slot name="footer">
          <div :class="nh.be('pagination')"></div>
        </slot>
      </div>
    </ResizeObserver>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { Checkbox } from '@/components/checkbox'
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import { NativeScroll } from '@/components/native-scroll'
import { ResizeObserver } from '@/components/resize-observer'
import { VirtualList } from '@/components/virtual-list'
import { MagnifyingGlass, Retweet } from '@vexip-ui/icons'
import { useNameHelper, useLocale, sizeProp, stateProp } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { TransferOptionState } from './symbol'

export default defineComponent({
  name: 'TransferPanel',
  components: {
    Checkbox,
    Icon,
    Input,
    NativeScroll,
    ResizeObserver,
    VirtualList,
    Retweet
  },
  props: {
    size: {
      type: sizeProp,
      default: 'default'
    },
    state: {
      type: stateProp,
      default: 'default'
    },
    paged: {
      type: Boolean,
      default: false
    },
    filter: {
      type: [Boolean, Function] as PropType<
        | boolean
        | ((value: string | number, options: { label: string, value: string | number }) => boolean)
      >,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    options: {
      type: Array as PropType<TransferOptionState[]>,
      default: () => []
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    }
  },
  setup(props) {
    const nh = useNameHelper('transfer')
    const locale = useLocale('transfer')

    const bodyHeight = ref('100%')
    const selected = ref(new Set<string | number>())

    const header = ref<HTMLElement | null>(null)
    const footer = ref<HTMLElement | null>(null)
    const search = ref<HTMLElement | null>(null)

    const className = computed(() => {
      return {
        [nh.be('panel')]: true,
        [nh.bem('panel', props.size)]: props.size !== 'default',
        [nh.bem('panel', props.state)]: props.state !== 'default'
      }
    })

    function computeBodyHeight() {
      const headerHeight = header.value ? header.value.offsetHeight : 0
      const searchHeight = search.value ? search.value.offsetHeight : 0
      const footerHeight = footer.value ? footer.value.offsetHeight : 0

      bodyHeight.value = `calc(100% - ${headerHeight + searchHeight + footerHeight}px)`
    }

    function toggleSelect(option: TransferOptionState) {
      if (selected.value.has(option.value)) {
        selected.value.delete(option.value)
      } else {
        selected.value.add(option.value)
      }
    }

    return {
      MagnifyingGlass,

      nh,
      locale,
      bodyHeight,
      selected,

      className,

      header,
      footer,

      computeBodyHeight,
      toggleSelect
    }
  }
})
</script>
