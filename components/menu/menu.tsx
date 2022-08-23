import {
  defineComponent,
  ref,
  toRef,
  reactive,
  computed,
  watch,
  onMounted,
  nextTick,
  provide
} from 'vue'
import MenuRest from './menu-rest'
import { MenuItem } from '@/components/menu-item'
import { MenuGroup } from '@/components/menu-group'
import { Overflow } from '@/components/overflow'
import {
  useNameHelper,
  useProps,
  booleanProp,
  booleanStringProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { MENU_STATE } from './symbol'

import type { PropType } from 'vue'
import type { Router, RouteRecordRaw, RouteLocationRaw } from 'vue-router'
import type { MenuOptions, MenuMarkerType, MenuGroupType, MenuItemState, MenuState } from './symbol'

const menuMarkerTypes = Object.freeze<MenuMarkerType>(['top', 'right', 'bottom', 'left', 'none'])

export default defineComponent({
  name: 'Menu',
  components: {
    MenuRest,
    MenuItem,
    MenuGroup,
    Overflow
  },
  props: {
    active: String,
    accordion: booleanProp,
    markerType: String as PropType<MenuMarkerType>,
    reduced: booleanProp,
    horizontal: booleanProp,
    transfer: booleanStringProp,
    trigger: String as PropType<'hover' | 'click'>,
    groupType: String as PropType<MenuGroupType>,
    tooltipReverse: booleanProp,
    options: Array as PropType<MenuOptions[]>,
    router: Object as PropType<Router>,
    manualRoute: booleanProp,
    onSelect: eventProp<(label: string, meta: Record<string, any>) => void>(),
    onExpand: eventProp<(label: string, meta: Record<string, any>) => void>(),
    onReduce: eventProp<(label: string, meta: Record<string, any>) => void>()
  },
  emits: ['update:active'],
  setup(_props, { slots, emit }) {
    const props = useProps('menu', _props, {
      active: {
        default: null,
        static: true
      },
      accordion: false,
      markerType: {
        default: 'right' as MenuMarkerType,
        validator: value => menuMarkerTypes.includes(value)
      },
      reduced: false,
      horizontal: false,
      transfer: false,
      trigger: 'hover',
      groupType: {
        default: 'collapse' as MenuGroupType,
        validator: (value: MenuGroupType) => ['collapse', 'dropdown'].includes(value)
      },
      tooltipReverse: null,
      options: {
        default: () => [],
        static: true
      },
      router: null,
      manualRoute: false
    })

    const nh = useNameHelper('menu')
    const menuItemSet = new Set<MenuItemState>()
    const currentActive = ref(props.active)
    const isReduced = ref(false)

    const wrapper = ref<HTMLElement | null>(null)
    const rest = ref<InstanceType<typeof MenuRest> | null>(null)

    const markerType = computed(() => {
      if (props.horizontal && (props.markerType === 'left' || props.markerType === 'right')) {
        return 'bottom'
      } else if (
        !props.horizontal &&
        (props.markerType === 'top' || props.markerType === 'bottom')
      ) {
        return 'right'
      } else {
        return props.markerType ?? (props.horizontal ? 'bottom' : 'right')
      }
    })
    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(`marker-${markerType.value}`),
        {
          [nh.bm('reduced')]: isReduced.value,
          [nh.bm('dropdown')]: props.groupType === 'dropdown',
          [nh.bm('horizontal')]: props.horizontal
        }
      ]
    })
    const menus = computed(() => {
      if (props.options?.length) {
        return props.options
      }

      const routes = props.router?.options.routes

      if (!routes?.length) {
        return []
      }

      return parseRoutesToMenus(routes)
    })
    const currentRoute = computed(() => props.router?.currentRoute.value)

    provide<MenuState>(
      MENU_STATE,
      reactive({
        currentActive,
        isReduced,
        horizontal: toRef(props, 'horizontal'),
        accordion: toRef(props, 'accordion'),
        groupType: toRef(props, 'groupType'),
        tooltipReverse: toRef(props, 'tooltipReverse'),
        transfer: toRef(props, 'transfer'),
        trigger: toRef(props, 'trigger'),
        markerType,
        handleSelect,
        handleExpand,
        increaseItem,
        decreaseItem,
        beforeExpand: () => {
          if (props.accordion) {
            for (const item of menuItemSet) {
              item.groupExpanded = false
            }
          }
        }
      })
    )

    watch(
      () => props.active,
      value => {
        if (value !== currentActive.value) {
          currentActive.value = value
        }
      }
    )
    watch(
      () => props.reduced,
      value => {
        if (props.horizontal) return

        if (value) {
          handleMenuReduce()
        } else {
          handleMenuExpand()
        }
      }
    )
    watch(currentRoute, value => {
      if (!props.manualRoute && value) {
        currentActive.value = (value.meta?.label as string) || value.path
      }
    })

    onMounted(() => {
      nextTick(() => {
        if (!props.horizontal && props.reduced) handleMenuReduce()
      })
    })

    function parseRoutesToMenus(routes: Readonly<RouteRecordRaw[]>) {
      const root: MenuOptions = { label: '', children: [] }
      const loop = Array.from(routes).map(route => ({ parent: root, route }))

      while (loop.length) {
        const { parent, route } = loop.shift()!
        const routeMeta = route.meta || {}

        if (routeMeta.menu === false) {
          continue
        }

        const options = {
          ...routeMeta,
          route,
          label: routeMeta.label || route.path,
          name: routeMeta.name || route.name
        } as MenuOptions

        if (!parent.children) {
          parent.children = []
        }

        parent.children.push(options)

        if (route.children) {
          loop.push(...route.children.map(route => ({ parent: options, route })))
        }
      }

      return root.children!
    }

    function increaseItem(state: MenuItemState) {
      menuItemSet.add(state)
    }

    function decreaseItem(state: MenuItemState) {
      menuItemSet.delete(state)
    }

    function handleSelect(label: string, meta: Record<string, any>, route?: RouteLocationRaw) {
      if (currentActive.value !== label) {
        currentActive.value = label

        emitEvent(props.onSelect, label, meta)
        emit('update:active', label)

        if (!props.manualRoute && props.router && route) {
          props.router.push(route)
        }
      }
    }

    function handleExpand(label: string, expanded: boolean, meta: Record<string, any>) {
      if (expanded) {
        emitEvent(props.onExpand, label, meta)
      } else {
        emitEvent(props.onReduce, label, meta)
      }
    }

    function handleMenuReduce() {
      if (props.horizontal) return

      let firstExpandedItem: MenuItemState | null = null

      for (const item of menuItemSet) {
        if (!firstExpandedItem && item.groupExpanded) {
          firstExpandedItem = item
        }

        item.toggleGroupExpanded(false)
      }

      const handler = () => {
        isReduced.value = true
      }

      if (firstExpandedItem?.el) {
        const el = firstExpandedItem.el
        const callback = () => {
          nextTick(handler)
          el.removeEventListener('transitionend', callback)
        }

        el.addEventListener('transitionend', callback)
      } else {
        handler()
      }
    }

    function handleMenuExpand() {
      if (props.horizontal) return

      isReduced.value = false

      if (wrapper.value) {
        const el = wrapper.value
        const callback = () => {
          const selectedItem = Array.from(menuItemSet).find(
            item => item.label === currentActive.value
          )

          if (selectedItem) {
            let parent = selectedItem.parentState

            while (parent) {
              parent.groupExpanded = true
              parent = parent.parentState
            }
          }

          el.removeEventListener('transitionend', callback)
        }

        el.addEventListener('transitionend', callback)
      }
    }

    function renderMenuItem(item: MenuOptions) {
      return (
        <MenuItem
          label={item.label}
          icon={item.icon}
          icon-props={item.iconProps}
          disabled={item.disabled}
          children={item.children}
          route={item.route}
        >
          {item.name || item.label}
        </MenuItem>
      )
    }

    function renderMenus() {
      return menus.value.map(menu =>
        menu.group
          ? (
          <MenuGroup label={menu.name || menu.label}>
            {menu.children?.length ? menu.children.map(renderMenuItem) : null}
          </MenuGroup>
            )
          : (
              renderMenuItem(menu)
            )
      )
    }

    return () => {
      return (
        <ul ref={wrapper} class={className.value} role={'menu'} tabindex={-1}>
          {slots.default
            ? (
                slots.default()
              )
            : props.horizontal
              ? (
            <Overflow>
              {{
                default: renderMenus,
                counter: ({ count }: { count: number }) => (
                  <MenuRest ref={rest} menus={menus.value.slice(-count)}></MenuRest>
                )
              }}
            </Overflow>
                )
              : (
                  renderMenus()
                )}
        </ul>
      )
    }
  }
})
