import { defineComponent, ref, reactive, toRef, computed, watchEffect, watch } from 'vue'
import TransferPanel from './transfer-panel.vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { useFieldStore } from '@/components/form'
import { ChevronRight, ChevronLeft, Spinner } from '@vexip-ui/icons'
import { useNameHelper, useProps, useLocale, createStateProp, emitEvent } from '@vexip-ui/config'
import { isNull } from '@vexip-ui/utils'
import { transferProps } from './props'

import type { TransferKeyConfig, TransferOptionState } from './symbol'

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
  props: transferProps,
  emits: ['update:value'],
  setup(_props, { slots, emit, expose }) {
    const { idFor, state, disabled, loading, validateField, getFieldValue, setFieldValue } =
      useFieldStore<(string | number)[]>(() => source.value?.$el?.focus())

    const props = useProps('transfer', _props, {
      state: createStateProp(state),
      locale: null,
      options: {
        default: () => [],
        static: true
      },
      value: {
        default: () => getFieldValue([]),
        static: true
      },
      disabled: () => disabled.value,
      paged: false,
      filter: false,
      emptyText: null,
      keyConfig: () => ({}),
      optionHeight: {
        default: 32,
        validator: value => value > 0
      },
      ignoreCase: false,
      sourceTitle: null,
      targetTitle: null,
      deepState: false,
      loading: () => loading.value,
      loadingIcon: Spinner,
      loadingLock: false,
      loadingEffect: 'pulse-in'
    })

    const nh = useNameHelper('transfer')
    const locale = useLocale('transfer', toRef(props, 'locale'))

    const currentValue = ref<Set<string | number>>(null!)
    const sourceSelected = ref(new Set<string | number>())
    const targetSelected = ref(new Set<string | number>())
    const sourceOptions = ref<TransferOptionState[]>([])
    const targetOptions = ref<TransferOptionState[]>([])
    const optionStates = ref<TransferOptionState[]>([])

    const source = ref<InstanceType<typeof TransferPanel>>()
    const target = ref<InstanceType<typeof TransferPanel>>()

    const keyConfig = computed(() => ({ ...defaultKeyConfig, ...props.keyConfig }))

    let optionValueMap = new Map<string | number, TransferOptionState>()
    let emittedValue = props.value

    const updateTrigger = ref(0)

    watchEffect(() => {
      /* eslint-disable @typescript-eslint/no-unused-expressions */
      props.keyConfig.value
      props.keyConfig.label
      props.keyConfig.disabled
      props.options
      /* eslint-enable */

      updateTrigger.value++
    })

    watch(updateTrigger, initOptions, { immediate: true })

    watchEffect(() => {
      if (!currentValue.value.size) {
        sourceOptions.value = Array.from(optionStates.value)
        targetOptions.value = []
        return
      }

      const selectedValues = new Set(currentValue.value)
      const target: TransferOptionState[] = []
      const source: TransferOptionState[] = []

      for (const option of optionStates.value) {
        if (selectedValues.has(option.value)) {
          target.push(option)
        } else {
          source.push(option)
        }
      }

      targetOptions.value = target
      sourceOptions.value = source
    })

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
      currentValue.value = new Set(emittedValue)
    }

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('inherit')]: props.inherit,
          [nh.bm(props.state)]: props.state !== 'default'
        }
      ]
    })
    const actionType = computed(() => {
      return props.deepState && props.state !== 'default' ? props.state : 'primary'
    })
    const toTargetEnabled = computed(() => !!sourceSelected.value.size)
    const toSourceEnabled = computed(() => !!targetSelected.value.size)
    const defaultFilter = computed(() => {
      return props.ignoreCase
        ? (value: string, option: TransferOptionState) =>
            String(option.value).toLocaleLowerCase().includes(value)
        : (value: string, option: TransferOptionState) => String(option.value).includes(value)
    })
    const sourceFilter = computed(() => getFilterMethod('source'))
    const targetFilter = computed(() => getFilterMethod('target'))

    watch(
      () => props.value,
      value => {
        emittedValue = value
        currentValue.value = new Set(emittedValue)
      }
    )

    expose({ handleToTarget, handleToSource, handlePanelFocus, handlePanelBlur })

    function getFilterMethod(type: 'source' | 'target') {
      const filter = props.filter

      if (!filter) return undefined

      if (typeof filter === 'function') {
        return (value: string, option: TransferOptionState) => filter(value, option, type)
      }

      return defaultFilter.value
    }

    function handleChange() {
      emittedValue = Array.from(currentValue.value)

      setFieldValue(emittedValue)
      emitEvent(props.onChange, emittedValue)
      emit('update:value', emittedValue)
      validateField()
    }

    function handleToTarget() {
      for (const value of sourceSelected.value) {
        currentValue.value.add(value)
      }

      sourceSelected.value.clear()
      handleChange()
    }

    function handleToSource() {
      for (const value of targetSelected.value) {
        currentValue.value.delete(value)
      }

      targetSelected.value.clear()
      handleChange()
    }

    function handleSelect(type: 'source' | 'target') {
      const selected = {
        source: Array.from(sourceSelected.value),
        target: Array.from(targetSelected.value)
      }
      const data = {
        source: selected.source.map(value => optionValueMap.get(value)?.data ?? ''),
        target: selected.target.map(value => optionValueMap.get(value)?.data ?? '')
      }

      emitEvent(props.onSelect, type, selected, data)
    }

    function handlePanelFocus(type: 'source' | 'target') {
      if (type === 'source') {
        source.value?.$el.focus()
      } else {
        target.value?.$el.focus()
      }
    }

    function handlePanelBlur() {
      source.value?.$el.blur()
      target.value?.$el.blur()
    }

    return () => {
      return (
        <div id={idFor.value} class={className.value}>
          <TransferPanel
            ref={source}
            v-model:selected={sourceSelected.value}
            type={'source'}
            class={nh.bem('panel', 'source')}
            state={props.state}
            paged={props.paged}
            filter={sourceFilter.value}
            disabled={props.disabled}
            title={props.sourceTitle || locale.value.source}
            options={sourceOptions.value}
            empty-text={props.emptyText || locale.value.empty}
            option-height={props.optionHeight}
            ignore-case={props.ignoreCase}
            deep-state={props.deepState}
            loading={props.loading}
            loading-icon={props.loadingIcon}
            loading-lock={props.loadingLock}
            loading-effect={props.loadingEffect}
            locale={locale.value}
            onSelect={() => handleSelect('source')}
            onEnter={handleToTarget}
            onSwitch={() => handlePanelFocus('target')}
          >
            {{
              header: slots['source-header'] || slots.sourceHeader || slots.header,
              title: slots['source-title'] || slots.sourceTitle || slots.title,
              body: slots['source-body'] || slots.sourceBody || slots.body,
              footer: slots['source-footer'] || slots.sourceFooter || slots.footer,
              option: slots['source-option'] || slots.sourceOption || slots.option
            }}
          </TransferPanel>
          <div class={nh.be('actions')}>
            {slots.actions
              ? slots.actions({ handleToTarget, handleToSource })
              : [
                  <Button
                    inherit
                    class={nh.be('action')}
                    type={actionType.value}
                    size={'small'}
                    disabled={props.disabled || !toTargetEnabled.value}
                    loading={props.loading && props.loadingLock}
                    loading-icon={props.loadingIcon}
                    loading-effect={props.loadingEffect}
                    style={{ marginBottom: '6px' }}
                    onClick={handleToTarget}
                  >
                    {{
                      icon: () => (
                        <Icon label="to right">
                          <ChevronRight></ChevronRight>
                        </Icon>
                      )
                    }}
                  </Button>,
                  <Button
                    inherit
                    class={nh.be('action')}
                    type={actionType.value}
                    size={'small'}
                    disabled={props.disabled || !toSourceEnabled.value}
                    loading={props.loading && props.loadingLock}
                    loading-icon={props.loadingIcon}
                    loading-effect={props.loadingEffect}
                    style={{ margin: '0' }}
                    onClick={handleToSource}
                  >
                    {{
                      icon: () => (
                        <Icon label="to left">
                          <ChevronLeft></ChevronLeft>
                        </Icon>
                      )
                    }}
                  </Button>
                ]}
          </div>
          <TransferPanel
            ref={target}
            v-model:selected={targetSelected.value}
            type={'target'}
            class={nh.bem('panel', 'target')}
            state={props.state}
            paged={props.paged}
            filter={targetFilter.value}
            disabled={props.disabled}
            title={props.targetTitle || locale.value.target}
            options={targetOptions.value}
            empty-text={props.emptyText || locale.value.empty}
            option-height={props.optionHeight}
            ignore-case={props.ignoreCase}
            deep-state={props.deepState}
            loading={props.loading}
            loading-icon={props.loadingIcon}
            loading-lock={props.loadingLock}
            loading-effect={props.loadingEffect}
            locale={locale.value}
            onSelect={() => handleSelect('target')}
            onEnter={handleToSource}
            onSwitch={() => handlePanelFocus('source')}
          >
            {{
              header: slots['target-header'] || slots.targetHeader || slots.header,
              title: slots['target-title'] || slots.targetTitle || slots.title,
              body: slots['target-body'] || slots.targetBody || slots.body,
              footer: slots['target-footer'] || slots.targetFooter || slots.footer,
              option: slots['target-option'] || slots.targetOption || slots.option
            }}
          </TransferPanel>
        </div>
      )
    }
  }
})
