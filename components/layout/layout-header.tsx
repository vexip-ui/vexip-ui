import { defineComponent, ref, computed, watch, onBeforeMount } from 'vue'
import { Avatar } from '@/components/avatar'
import { Dropdown } from '@/components/dropdown'
import { DropdownList } from '@/components/dropdown-list'
import { DropdownItem } from '@/components/dropdown-item'
import { Icon } from '@/components/icon'
import { User, ArrowRightFromBracket, Check } from '@vexip-ui/icons'
import { useNameHelper, useProps, useLocale, booleanProp } from '@vexip-ui/config'
import { computeSeriesColors, useLayoutState } from './helper'

import type { PropType } from 'vue'
import type { LayoutConfig, HeaderUser, HeaderAction, LayoutSignType } from './symbol'

export default defineComponent({
  name: 'LayoutHeader',
  props: {
    tag: String,
    logo: String,
    signName: String,
    user: Object as PropType<HeaderUser>,
    userDropped: booleanProp,
    avatarCircle: booleanProp,
    config: Array as PropType<LayoutConfig[]>,
    actions: Array as PropType<HeaderAction[]>,
    signType: String as PropType<LayoutSignType>,
    colors: Array as PropType<string[]>,
    color: String,
    onNavChange: Function as PropType<(type: LayoutSignType) => void>,
    onColorChange: Function as PropType<(color: string) => void>,
    onUserAction: Function as PropType<(label: string, meta: Record<string, any>) => void>,
    onSignClick: Function as PropType<(event: MouseEvent) => void>,
    onDropChange: Function as PropType<(target: boolean) => void>,
    onReducedChange: Function as PropType<(reduced: boolean) => void>
  },
  emits: ['update:sign-type', 'update:color', 'update:user-dropped'],
  setup(_props, { emit, slots }) {
    const props = useProps('layout', _props, {
      tag: 'header',
      logo: '',
      signName: '',
      user: {
        default: () => ({ name: '' }),
        static: true
      },
      userDropped: false,
      avatarCircle: false,
      config: () => ['nav', 'color'] as LayoutConfig[],
      actions: () => [],
      signType: 'aside',
      colors: () => ['#339af0', '#f03e3e', '#be4bdb', '#7950f2', '#1b9e44', '#f76707'],
      color: '',
      onNavChange: null,
      onColorChange: null,
      onUserAction: null,
      onSignClick: null
    })

    const nh = useNameHelper('layout')
    const locale = useLocale('layout')
    const layoutState = useLayoutState()
    const currentSignType = ref<LayoutSignType>(props.signType)
    const currentUserDropped = ref(props.userDropped)

    const rootEl = document.documentElement
    const rootStyle = getComputedStyle(rootEl)
    const currentColor = ref(
      props.color || props.colors?.[0] || rootStyle.getPropertyValue('--vxp-color-primary-base')
    )

    const className = computed(() => {
      return [
        nh.be('header'),
        {
          [nh.bs('vars')]: !layoutState.isLayout,
          [nh.bem('header', 'affixed')]: layoutState.affixed
        }
      ]
    })
    const userActions = computed(() => {
      if (!props.actions?.length) {
        return [
          {
            label: 'signOut',
            name: locale.value.signOut,
            icon: ArrowRightFromBracket
          }
        ] as HeaderAction[]
      }

      return props.actions
    })
    const hasLeft = computed(() => {
      return !!(props.logo || props.signName || slots.left)
    })

    watch(
      () => props.signType,
      value => {
        currentSignType.value = value
      }
    )
    watch(
      () => props.color,
      value => {
        currentColor.value =
          value || props.colors?.[0] || rootStyle.getPropertyValue('--vxp-color-primary-base')
      }
    )
    watch(
      () => props.userDropped,
      value => {
        currentUserDropped.value = value
      }
    )
    watch(currentColor, computeSeriesColors)

    onBeforeMount(() => {
      computeSeriesColors(currentColor.value)
    })

    function handleUserActionSelect(label: string, meta: Record<string, any>) {
      props.onUserAction?.(label, meta)
    }

    function handleSignTypeChange(type: LayoutSignType) {
      const queue: Array<() => void> = [
        () => {
          layoutState.locked = true
        },
        () => {
          currentSignType.value = type

          props.onNavChange?.(type)
          emit('update:sign-type', type)
        },
        () => {
          layoutState.locked = false
        }
      ]

      const run = () => {
        queue.shift()?.()
        queue.length && requestAnimationFrame(run)
      }

      run()
    }

    function toggleReduce(target = !layoutState.reduced) {
      layoutState.reduced = target

      props.onReducedChange?.(target)
    }

    function handleColorChange(color: string) {
      currentColor.value = color

      props.onColorChange?.(color)
      emit('update:color', color)
    }

    function handleSignClick(event: MouseEvent) {
      props.onSignClick?.(event)
    }

    function toggleUserDrop(target = !currentUserDropped.value) {
      currentUserDropped.value = target

      props.onDropChange?.(target)
      emit('update:user-dropped', target)
    }

    function getSlotParams() {
      return {
        reduced: layoutState.reduced,
        toggleReduce,
        handleColorChange,
        toggleUserDrop
      }
    }

    function renderCheck() {
      return (
        <Icon>
          <Check></Check>
        </Icon>
      )
    }

    function renderLayoutConfig() {
      return (
        <div class={nh.be('config-unit')}>
          <div
            class={[nh.be('brief-block'), nh.bem('brief-block', 'aside')]}
            onClick={() => handleSignTypeChange('aside')}
          >
            {currentSignType.value === 'aside' && renderCheck()}
          </div>
          <div class={nh.be('brief-block')} onClick={() => handleSignTypeChange('header')}>
            {currentSignType.value === 'header' && renderCheck()}
          </div>
        </div>
      )
    }

    function renderColorConfig() {
      if (!props.colors?.length) {
        return null
      }

      return (
        <div class={nh.be('config-unit')}>
          {props.colors.map(color => (
            <div
              class={nh.be('major-color')}
              style={{
                backgroundColor: color
              }}
              onClick={() => handleColorChange(color)}
            >
              {currentColor.value === color && renderCheck()}
            </div>
          ))}
        </div>
      )
    }

    return () => {
      const CustomTag = (props.tag || 'header') as any

      return (
        <CustomTag class={className.value}>
          {hasLeft.value && (
            <div class={nh.be('header-left')}>
              {slots.left
                ? (
                    slots.left(getSlotParams())
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
          )}
          <div class={nh.be('header-main')}>{slots.default?.(getSlotParams())}</div>
          {slots.right && <div class={nh.be('header-right')}>{slots.right(getSlotParams())}</div>}
          {slots.user
            ? (
                slots.user(getSlotParams())
              )
            : (
            <Dropdown
              class={nh.be('user')}
              transfer
              placement={'bottom-end'}
              visible={currentUserDropped.value}
              trigger={'custom'}
              onClickoutside={() => toggleUserDrop(false)}
            >
              {{
                default: () => {
                  if (typeof props.user?.avatar === 'string') {
                    return (
                      <Avatar
                        src={props.user.avatar}
                        icon={User}
                        circle={props.avatarCircle}
                        onClick={() => toggleUserDrop()}
                      ></Avatar>
                    )
                  }

                  return (
                    <Avatar
                      icon={props.user.avatar || User}
                      circle={props.avatarCircle}
                      onClick={() => toggleUserDrop()}
                    ></Avatar>
                  )
                },
                drop: () => (
                  <DropdownList>
                    {props.user?.name && (
                      <li class={nh.be('user-profile')}>
                        <span>{props.user.name}</span>
                        {props.user.email && (
                          <span class={nh.be('user-email')}>{props.user.email}</span>
                        )}
                      </li>
                    )}
                    {props.config?.length
                      ? (
                      <li class={nh.be('config')}>
                        {props.config.includes('nav') &&
                          layoutState.navConfig && [
                            <div class={nh.be('config-label')}>{locale.value.signType}</div>,
                            renderLayoutConfig()
                        ]}
                        {props.config.includes('color') && [
                          <div class={nh.be('config-label')}>{locale.value.majorColor}</div>,
                          renderColorConfig()
                        ]}
                      </li>
                        )
                      : null}
                    {userActions.value.map(action => (
                      <DropdownItem
                        class={nh.be('user-action')}
                        label={action.label}
                        disabled={action.disabled}
                        divided={action.divided}
                        onSelect={() => handleUserActionSelect(action.label, action.meta || {})}
                      >
                        {action.icon && (
                          <Icon icon={action.icon} style={{ marginRight: '6px' }}></Icon>
                        )}
                        {action.name || action.label}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                )
              }}
            </Dropdown>
              )}
        </CustomTag>
      )
    }
  }
})
