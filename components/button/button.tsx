import { defineComponent, h, ref, computed } from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Icon } from '@/components/icon'
import { createSizeProp, useConfiguredProps } from '@vexip-ui/config'
import { Spinner } from '@vexip-ui/icons'

import type { ButtonType, ButtonAttrType } from './symbol'

const props = useConfiguredProps('button', {
  size: createSizeProp(),
  type: {
    default: 'default' as ButtonType,
    validator: (value: ButtonType) => {
      return [
        'default',
        'primary',
        'dashed',
        'text',
        'info',
        'success',
        'warning',
        'error'
      ].includes(value)
    }
  },
  simple: {
    type: Boolean,
    default: false
  },
  ghost: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  circle: {
    type: Boolean,
    default: false
  },
  loadingIcon: {
    type: Object,
    default: Spinner
  },
  loadingSpin: {
    type: Boolean,
    default: false
  },
  icon: {
    type: Object,
    default: null
  },
  textColor: {
    type: String,
    default: null
  },
  buttonType: {
    type: String,
    default: 'button'
  },
  block: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: 'button'
  },
  attrType: {
    default: 'button' as ButtonAttrType,
    validator: (value: ButtonAttrType) => {
      return ['button', 'submit', 'reset'].includes(value)
    }
  }
})

export default defineComponent({
  name: 'Button',
  components: {
    CollapseTransition,
    Icon
  },
  props,
  emits: ['on-click'],
  setup(props, { emit, slots }) {
    const prefix = 'vxp-button'
    const pulsing = ref(false)
    const isIconOnly = computed(() => {
      return !slots.default
    })
    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--${props.type}`]: props.type !== 'default',
        [`${prefix}--simple`]: !props.ghost && props.simple,
        [`${prefix}--ghost`]: props.ghost,
        [`${prefix}--disabled`]: props.disabled,
        [`${prefix}--loading`]: props.loading,
        [`${prefix}--circle`]: props.circle,
        [`${prefix}--icon-only`]: isIconOnly.value,
        [`${prefix}--${props.size}`]: props.size !== 'default',
        [`${prefix}--pulsing`]: pulsing.value
      }
    })
    const style = computed(() => {
      return { color: props.textColor }
    })

    function handleClick(event: MouseEvent) {
      if (props.disabled || props.loading || event.button) return

      pulsing.value = false

      requestAnimationFrame(() => {
        pulsing.value = true
      })

      emit('on-click', event)
    }

    function handleAnimationEnd() {
      pulsing.value = false
    }

    function renderIconWithDefined() {
      return props.loading ? (
        <div class={[`${prefix}__icon`, `${prefix}__icon--loading`]}>
          {slots.loading ? (
            slots.loading()
          ) : props.loadingSpin ? (
            <Icon spin icon={props.loadingIcon}></Icon>
          ) : (
            <Icon pulse icon={props.loadingIcon}></Icon>
          )}
        </div>
      ) : (
        <div class={`${prefix}__icon`}>
          <Icon icon={props.icon}></Icon>
        </div>
      )
    }

    function renderCollapseIcon() {
      return (
        <CollapseTransition appear horizontal fade-effect>
          {props.loading && (
            <div class={[`${prefix}__icon`, `${prefix}__icon--loading`]}>
              {slots.loading ? (
                slots.loading()
              ) : props.loadingSpin ? (
                <Icon spin icon={props.loadingIcon}></Icon>
              ) : (
                <Icon pulse icon={props.loadingIcon}></Icon>
              )}
            </div>
          )}
        </CollapseTransition>
      )
    }

    return () => h(
      props.tag || 'button',
      {
        type: props.attrType,
        class: className.value,
        style: style.value,
        disabled: props.disabled,
        onClick: handleClick,
        onAnimationend: handleAnimationEnd
      },
      [
        props.icon ? renderIconWithDefined() : renderCollapseIcon(),
        slots.default ? slots.default() : null
      ]
    )
  }
})
