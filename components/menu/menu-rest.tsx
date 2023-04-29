import {
  defineComponent,
  ref,
  reactive,
  computed,
  watch,
  inject,
  provide,
  nextTick,
  Transition
} from 'vue'
import { Icon } from '@/components/icon'
import { MenuItem } from '@/components/menu-item'
import { Portal } from '@/components/portal'
import { useNameHelper, useIcons } from '@vexip-ui/config'
import { usePopper, useSetTimeout, useClickOutside } from '@vexip-ui/hooks'
import { callIfFunc } from '@vexip-ui/utils'
import { MENU_STATE, MENU_ITEM_STATE } from './symbol'

import type { PropType } from 'vue'
import type { MenuOptions } from './symbol'

export default defineComponent({
  name: 'MenuRest',
  props: {
    menus: {
      type: Array as PropType<MenuOptions[]>,
      default: () => []
    }
  },
  setup(props) {
    const menuState = inject(MENU_STATE, null)

    const nh = useNameHelper('menu')
    const icons = useIcons()
    const groupExpanded = ref(false)
    const sonSelected = ref(false)
    const popperShow = ref(false)

    const transfer = computed(() => menuState?.transfer ?? false)
    const dropTrigger = computed(() => menuState?.trigger || 'hover')

    const wrapper = useClickOutside(handleClickOutside)
    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement: ref('bottom'),
      transfer,
      wrapper
    })

    const itemState = reactive({
      el: wrapper,
      label: '',
      indent: 1,
      groupExpanded,
      showGroup: groupExpanded,
      isUsePopper: true,
      parentState: null,
      transfer,
      cachedExpanded: false,
      updateSonSelected,
      toggleGroupExpanded,
      handleMouseEnter,
      handleMouseLeave
    })

    provide(MENU_ITEM_STATE, itemState)

    watch(groupExpanded, value => {
      if (value) {
        popperShow.value = true
        updatePopper()
      }
    })

    function updateSonSelected(selected: boolean) {
      sonSelected.value = selected
    }

    function toggleGroupExpanded(expanded: boolean) {
      groupExpanded.value = expanded
    }

    const { timer } = useSetTimeout()

    function handleMouseEnter() {
      clearTimeout(timer.hover)

      if (dropTrigger.value !== 'hover') return

      timer.hover = setTimeout(() => {
        groupExpanded.value = true
      }, 250)
    }

    function handleMouseLeave() {
      clearTimeout(timer.hover)

      if (dropTrigger.value !== 'hover') return

      timer.hover = setTimeout(() => {
        groupExpanded.value = false
      }, 250)
    }

    function handleClick() {
      if (dropTrigger.value === 'click') {
        groupExpanded.value = true
      }
    }

    function handleClickOutside() {
      if (dropTrigger.value === 'click') {
        nextTick(() => {
          groupExpanded.value = false
        })
      }
    }

    function handlePopperHide() {
      popperShow.value = false
    }

    function renderMenuItems() {
      if (!props.menus?.length) {
        return null
      }

      return props.menus.map(item => (
        <MenuItem
          label={item.label}
          icon={item.icon}
          icon-props={item.iconProps}
          disabled={item.disabled}
          children={item.children}
          route={item.route}
        >
          {item.name ? callIfFunc(item.name) : item.label}
        </MenuItem>
      ))
    }

    return () => {
      return (
        <div
          ref={wrapper}
          class={nh.be('rest')}
          onMouseenter={handleMouseEnter}
          onMouseleave={handleMouseLeave}
        >
          <div
            ref={reference}
            class={[nh.be('rest-handler'), sonSelected.value && nh.bem('rest-handler', 'selected')]}
            onClick={handleClick}
          >
            <Icon {...icons.value.ellipsis}></Icon>
          </div>
          <Portal to={transferTo.value}>
            <Transition name={nh.ns('drop')} appear onAfterLeave={handlePopperHide}>
              {popperShow.value && (
                <div
                  v-show={groupExpanded.value}
                  ref={popper}
                  class={[nh.be('popper'), nh.bs('vars'), nh.bem('popper', 'drop')]}
                >
                  <ul class={[nh.be('list'), nh.bem('list', 'theme')]}>{renderMenuItems()}</ul>
                </div>
              )}
            </Transition>
          </Portal>
        </div>
      )
    }
  }
})
