import { Icon } from '@/components/icon'
import { MenuItem } from '@/components/menu-item'
import { Popper } from '@/components/popper'

import { computed, defineComponent, inject, nextTick, provide, reactive, ref, watch } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'
import { useClickOutside, usePopper, useSetTimeout } from '@vexip-ui/hooks'
import { callIfFunc } from '@vexip-ui/utils'
import { MENU_ITEM_STATE, MENU_STATE } from './symbol'

import type { PropType } from 'vue'
import type { PopperExposed } from '@/components/popper'
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
    const popper = ref<PopperExposed>()
    const { reference, transferTo, updatePopper } = usePopper({
      placement: ref('bottom'),
      transfer,
      wrapper,
      popper: computed(() => popper.value?.wrapper)
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

    let mouseInList = false
    let reproduce = false

    function handleMouseEnter() {
      clearTimeout(timer.hover)

      if (mouseInList || dropTrigger.value !== 'hover') return

      if (!groupExpanded.value && popperShow.value) {
        reproduce = true
        return
      }

      timer.hover = setTimeout(() => {
        groupExpanded.value = true
      }, 250)
    }

    function handleMouseLeave() {
      clearTimeout(timer.hover)

      if (mouseInList || !popperShow.value || dropTrigger.value !== 'hover') return

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
      groupExpanded.value = false

      if (reproduce) {
        reproduce = false
        groupExpanded.value = true
      }
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
          meta={item.meta}
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
          <Popper
            ref={popper}
            class={[nh.be('popper'), nh.bs('vars'), nh.bem('popper', 'drop')]}
            visible={popperShow.value && groupExpanded.value}
            alive={!transferTo.value || popperShow.value}
            to={transferTo.value}
            transition={nh.ns('drop')}
            onAfterLeave={handlePopperHide}
            onMouseenter={() => ((mouseInList = true), handleMouseEnter())}
            onMouseleave={() => ((mouseInList = false), handleMouseLeave())}
          >
            <ul class={[nh.be('list'), nh.bem('list', 'theme')]}>{renderMenuItems()}</ul>
          </Popper>
        </div>
      )
    }
  }
})
