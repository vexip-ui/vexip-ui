<template>
  <div :class="className">
    <TransferPanel
      :class="nh.bem('panel', 'left')"
      :size="props.size"
      :state="props.state"
      :paged="props.paged"
      :filter="props.filter"
      :title="locale.source"
      :empty-text="props.emptyText || locale.empty"
    >
    </TransferPanel>
    <div :class="nh.be('actions')">
      <Button
        :class="nh.be('action')"
        type="primary"
        size="small"
        :icon="AngleLeft"
        style="margin-bottom: 4px;"
      ></Button>
      <Button
        :class="nh.be('action')"
        type="primary"
        size="small"
        :icon="AngleRight"
        style="margin: 0;"
      ></Button>
    </div>
    <TransferPanel
      :class="nh.bem('panel', 'right')"
      :size="props.size"
      :state="props.state"
      :paged="props.paged"
      :filter="props.filter"
      :title="locale.target"
      :empty-text="props.emptyText || locale.empty"
    >
    </TransferPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watchEffect, watch } from 'vue'
import { Button } from '@/components/button'
import TransferPanel from './transfer-panel.vue'
import { useFieldStore } from '@/components/form'
import { AngleLeft, AngleRight } from '@vexip-ui/icons'
import {
  useNameHelper,
  useProps,
  useLocale,
  createSizeProp,
  createStateProp,
  booleanProp,
  sizeProp,
  stateProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { isNull } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { TransferKeyConfig, TransferOptionState } from './symbol'

type RawOption = string | Record<string, any>

const defaultKeyConfig: Required<TransferKeyConfig> = {
  value: 'value',
  label: 'label',
  disabled: 'disabled'
}

export default defineComponent({
  name: 'Transfer',
  components: {
    Button,
    TransferPanel
  },
  props: {
    size: sizeProp,
    state: stateProp,
    options: Array as PropType<RawOption[]>,
    value: Array as PropType<(string | number)[]>,
    disabled: booleanProp,
    paged: booleanProp,
    filter: {
      type: [Boolean, Function] as PropType<
        | boolean
        | ((value: string | number, options: { label: string, value: string | number }) => boolean)
      >,
      default: null
    },
    emptyText: String,
    keyConfig: Object as PropType<TransferKeyConfig>,
    onChange: eventProp<(values: (string | number)[]) => void>()
  },
  emits: [],
  setup(_props) {
    const { state, validateField, getFieldValue, setFieldValue } =
      useFieldStore<(string | number)[]>()

    const props = useProps('transfer', _props, {
      size: createSizeProp(),
      state: createStateProp(state),
      options: {
        default: () => [],
        static: true
      },
      value: {
        default: () => getFieldValue([]),
        static: true
      },
      disabled: false,
      paged: false,
      filter: false,
      emptyText: null,
      keyConfig: () => ({})
    })

    const nh = useNameHelper('transfer')
    const locale = useLocale('transfer')
    const optionStates = ref<TransferOptionState[]>([])

    const keyConfig = computed(() => ({ ...defaultKeyConfig, ...props.keyConfig }))

    let optionValueMap = new Map<string | number, TransferOptionState>()

    const updateTrigger = ref(0)

    watchEffect(() => {
      /* eslint-disable no-unused-expressions */
      props.keyConfig.value
      props.keyConfig.label
      props.keyConfig.disabled
      props.options
      /* eslint-disable no-unused-expressions */

      updateTrigger.value++
    })

    watch(updateTrigger, initOptions, { immediate: true })

    function initOptions() {
      const { value: valueKey, label: labelKey, disabled: disabledKey } = keyConfig.value
      const oldMap = optionValueMap
      const map = new Map<string | number, TransferOptionState>()

      props.options.forEach(option => {
        const rawOption = typeof option === 'string' ? { [valueKey]: option } : option
        const value = rawOption[valueKey]

        if (isNull(value)) return

        const label = rawOption[labelKey] || String(value)
        const { [disabledKey]: disabled = false } = rawOption
        const oldState = oldMap.get(rawOption.value)
        const optionState = reactive({
          disabled,
          value,
          label,
          hidden: oldState?.hidden ?? false,
          hitting: oldState?.hitting ?? false,
          data: option
        })

        map.set(value, optionState)
      })

      optionValueMap = map
      optionStates.value = Array.from(map.values())
    }

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm(props.state)]: props.state !== 'default'
        }
      ]
    })
    // const hasSourceBody = computed(() => {})

    function handleChange(values: (string | number)[]) {
      setFieldValue(values)
      emitEvent(props.onChange, values)
      validateField()
    }

    return {
      AngleLeft,
      AngleRight,

      props,
      nh,
      locale,

      className,

      handleChange
    }
  }
})
</script>
