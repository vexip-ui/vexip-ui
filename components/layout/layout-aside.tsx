import { defineComponent, h, ref, computed, watch } from 'vue'
import { Icon } from '@/components/icon'
import { Menu } from '@/components/menu'
import { Indent, Outdent } from '@vexip-ui/icons'
import { useNameHelper, useProps, booleanProp } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { MenuOptions } from '@/components/menu'
import type { AsideMenuProps } from './symbol'

export default defineComponent({
  name: 'LayoutAside',
  props: {
    tag: String,
    expanded: booleanProp,
    reduced: booleanProp,
    menus: Object as PropType<MenuOptions[]>,
    menuActive: String,
    menuProps: Object as PropType<AsideMenuProps>,
    logo: String,
    signName: String,
    onReducedChange: Function as PropType<(reduced: boolean) => void>
  },
  emits: ['sign-click', 'menu-select', 'update:reduced'],
  setup(_props, { emit, slots }) {
    const props = useProps('layout', _props, {
      tag: 'aside',
      reduced: false,
      menus: {
        default: () => [],
        static: true
      },
      menuActive: {
        default: null,
        static: true
      },
      menuProps: null,
      logo: 'https://www.vexipui.com/logo.png',
      signName: 'Vexip UI',
      onReducedChange: null
    })

    const nh = useNameHelper('layout')
    const currentReduced = ref(props.reduced)

    const className = computed(() => {
      return [
        nh.be('aside'),
        {
          [nh.bem('aside', 'expanded')]: props.expanded,
          [nh.bem('aside', 'reduced')]: currentReduced.value
        }
      ]
    })
    const hasTop = computed(() => {
      return !!(props.logo || props.signName || slots.top)
    })

    watch(
      () => props.reduced,
      value => {
        currentReduced.value = value
      }
    )

    function toggleReduce(target = !currentReduced.value) {
      currentReduced.value = target

      props.onReducedChange?.(target)
      emit('update:reduced', target)
    }

    function handleSignClick(event: MouseEvent) {
      emit('sign-click', event)
    }

    function handleMenuSelect(label: string, meta: Record<string, any>) {
      emit('menu-select', label, meta)
    }

    return () => {
      return h(
        props.tag || 'aside',
        {
          class: className.value
        },
        [
          hasTop.value && (
            <div class={nh.be('aside-top')}>
              {slots.top
                ? (
                    slots.top(currentReduced.value)
                  )
                : (
                <div class={nh.be('sign')} onClick={handleSignClick}>
                  {props.logo && (
                    <div class={nh.be('logo')}>
                      <img src={props.logo} alt={'Logo'} />
                    </div>
                  )}
                  {props.signName && <span class={nh.be('sign-name')}>{props.signName}</span>}
                </div>
                  )}
            </div>
          ),
          <div class={nh.be('aside-main')}>
            {slots.default
              ? slots.default(currentReduced.value)
              : props.menus?.length && (
                  <Menu
                    {...(props.menuProps || {})}
                    options={props.menus}
                    reduced={currentReduced.value}
                    onSelect={handleMenuSelect}
                  ></Menu>
              )}
          </div>,
          <div class={nh.be('aside-bottom')}>
            {slots.bottom
              ? (
                  slots.bottom(currentReduced.value)
                )
              : (
              <div class={nh.be('reduce-handler')} onClick={() => toggleReduce()}>
                <Icon icon={currentReduced.value ? Indent : Outdent}></Icon>
              </div>
                )}
          </div>
        ]
      )
    }
  }
})
