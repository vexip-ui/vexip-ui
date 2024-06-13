import { MenuItem } from '@/components/menu-item'
import { MenuGroup } from '@/components/menu-group'
import { Overflow } from '@/components/overflow'

import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  renderSlot,
  toRef,
  watch
} from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { callIfFunc, isBoolean, isDefined } from '@vexip-ui/utils'
import MenuRest from './menu-rest'
import { menuProps } from './props'
import { MENU_STATE } from './symbol'

import type { RouteLocationRaw, RouteRecordRaw } from 'vue-router'
import type { MenuItemState, MenuMarkerType, MenuOptions, MenuState } from './symbol'

const menuMarkerTypes = Object.freeze<MenuMarkerType[]>(['top', 'right', 'bottom', 'left', 'none'])

export default defineComponent({
  name: 'Menu',
  components: {
    MenuRest,
    MenuItem,
    MenuGroup,
    Overflow
  },
  props: menuProps,
  emits: ['update:active'],
  setup(_props, { slots, emit, expose }) {
    const props = useProps('menu', _props, {
      active: {
        default: null,
        static: true
      },
      accordion: false,
      markerType: {
        default: 'right',
        validator: value => menuMarkerTypes.includes(value)
      },
      reduced: false,
      horizontal: false,
      transfer: false,
      trigger: 'hover',
      groupType: {
        default: 'collapse',
        validator: value => ['collapse', 'dropdown'].includes(value)
      },
      tooltipReverse: null,
      options: {
        default: () => [],
        static: true
      },
      router: null,
      manualRoute: false,
      indent: null,
      onlyOne: false
    })

    const nh = useNameHelper('menu')
    const menuItemSet = new Set<MenuItemState>()
    const currentActive = ref(props.active)
    const isReduced = ref(false)

    const wrapper = ref<HTMLElement>()
    const rest = ref<InstanceType<typeof MenuRest>>()

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
          [nh.bm('inherit')]: props.inherit,
          [nh.bm('reduced')]: isReduced.value,
          [nh.bm('dropdown')]: props.groupType === 'dropdown',
          [nh.bm('horizontal')]: props.horizontal
        }
      ]
    })
    const style = computed(() => {
      const style: Record<string, string> = {}

      if (isDefined(props.indent)) {
        style[nh.cv('indent-width')] =
          typeof props.indent === 'number' ? `${props.indent}px` : props.indent
      }

      return style
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
        onlyOne: toRef(props, 'onlyOne'),
        renderMenuItem,
        markerType,
        handleSelect,
        handleExpand,
        increaseItem,
        decreaseItem,
        doForEachItem
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
        currentActive.value = (value.meta?.label as string) ?? value.path
      }
    })

    onMounted(() => {
      nextTick(() => {
        if (!props.horizontal && props.reduced) handleMenuReduce()
      })

      if (props.router && !props.manualRoute && !currentActive.value) {
        const route = currentRoute.value

        if (route) {
          currentActive.value = (route.meta?.label as string) ?? currentRoute.value.path
        }
      }
    })

    expose({ expandItemByLabel })

    function parseRoutesToMenus(routes: Readonly<RouteRecordRaw[]>) {
      const root: MenuOptions = { label: '', children: [] }
      const loop = Array.from(routes).map(route => ({ parent: root, route }))

      while (loop.length) {
        const { parent, route } = loop.shift()!
        const routeMeta = (route.meta || {}) as any

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

    function doForEachItem(cb: (item: MenuItemState) => void) {
      for (const item of menuItemSet) {
        cb(item)
      }
    }

    function handleSelect(label: string, meta: Record<string, any>, route?: RouteLocationRaw) {
      if (currentActive.value !== label) {
        currentActive.value = label

        emit('update:active', label)
        emitEvent(props.onSelect, label, meta)

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
        item.cachedExpanded = item.showGroup

        if (!firstExpandedItem && item.showGroup) {
          firstExpandedItem = item
        }

        item.toggleGroupExpanded(false)
      }

      isReduced.value = true
    }

    function handleMenuExpand() {
      if (props.horizontal) return

      isReduced.value = false

      if (wrapper.value) {
        const el = wrapper.value
        const callback = () => {
          requestAnimationFrame(() => {
            el.removeEventListener('transitionend', callback)

            const selectedItem = Array.from(menuItemSet).find(
              item => item.label === currentActive.value
            )

            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                for (const item of menuItemSet) {
                  item.groupExpanded = item.cachedExpanded
                }

                if (selectedItem) {
                  let parent = selectedItem.parentState

                  while (parent) {
                    parent.groupExpanded = true
                    parent = parent.parentState
                  }
                }
              })
            })
          })
        }

        el.addEventListener('transitionend', callback)
      }
    }

    function expandItemByLabel(label: string) {
      for (const item of menuItemSet) {
        if (item.label === label) {
          item.toggleGroupExpanded(true, true)
        }
      }
    }

    function renderMenuItem(menuItem: MenuOptions) {
      const item =
        (isBoolean(menuItem.onlyOne) ? menuItem.onlyOne : props.onlyOne) &&
        menuItem.children?.length === 1
          ? {
              ...menuItem,
              ...menuItem.children[0],
              meta: {
                _parent: menuItem.meta,
                ...menuItem.children[0].meta
              }
            }
          : menuItem

      return (
        <MenuItem
          label={item.label}
          icon={item.icon}
          icon-props={item.iconProps}
          disabled={item.disabled}
          children={item.children}
          route={item.route}
          meta={item.meta}
          only-one={item.onlyOne}
        >
          {item.name ? callIfFunc(item.name) : item.label}
        </MenuItem>
      )
    }

    function renderMenus() {
      return menus.value.map(menu =>
        menu.group ? (
          <MenuGroup key={menu.label} label={menu.name ? callIfFunc(menu.name) : menu.label}>
            {menu.children?.length ? menu.children.map(renderMenuItem) : null}
          </MenuGroup>
        ) : (
          renderMenuItem(menu)
        )
      )
    }

    return () => {
      return (
        <ul ref={wrapper} class={className.value} role={'menu'} tabindex={-1} style={style.value}>
          {renderSlot(slots, 'default', {}, () => {
            return props.horizontal
              ? [
                <Overflow class={nh.be('overflow')} inherit key={0}>
                  {{
                    default: renderMenus,
                    counter: ({ count }: { count: number }) => (
                      <MenuRest ref={rest} menus={menus.value.slice(-count)}></MenuRest>
                    )
                  }}
                </Overflow>
                ]
              : renderMenus()
          })}
        </ul>
      )
    }
  }
})
