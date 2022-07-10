import { defineComponent, h, computed } from 'vue'
import { Avatar } from '@/components/avatar'
import { Dropdown } from '@/components/dropdown'
import { DropdownList } from '@/components/dropdown-list'
import { DropdownItem } from '@/components/dropdown-item'
import { Icon } from '@/components/icon'
import { User, ArrowRightFromBracket } from '@vexip-ui/icons'
import { useNameHelper, useProps, useLocale, booleanProp } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { HeaderUser, HeaderUserActions } from './symbol'

export default defineComponent({
  name: 'LayoutHeader',
  props: {
    tag: String,
    user: Object as PropType<HeaderUser>,
    avatarCircle: booleanProp
  },
  emits: ['user-action'],
  setup(_props, { emit, slots }) {
    const props = useProps('layout', _props, {
      tag: 'header',
      user: {
        default: () => ({
          name: 'VexipUI',
          email: 'email@vexipui.com'
        }),
        static: true
      },
      avatarCircle: false
    })

    const nh = useNameHelper('layout')
    const locale = useLocale('layout')

    const className = computed(() => {
      return [nh.be('header')]
    })
    const userActions = computed(() => {
      if (!props.user.actions) {
        return [
          {
            label: 'signOut',
            name: locale.value.signOut,
            icon: ArrowRightFromBracket
          }
        ] as HeaderUserActions[]
      }

      return props.user.actions
    })

    function handleUserActionSelect(label: string, meta: Record<string, any>) {
      emit('user-action', label, meta)
    }

    return () => {
      return h(
        props.tag || 'header',
        {
          class: className.value
        },
        [
          slots.left && <div class={nh.be('header-left')}>{slots.left}</div>,
          <div class={nh.be('header-main')}>{slots.default?.()}</div>,
          slots.right && <div class={nh.be('header-right')}>{slots.right()}</div>,
          slots.user
            ? (
                slots.user()
              )
            : (
            <Dropdown class={nh.be('user')} placement={'bottom-end'} trigger={'click'}>
              {{
                default: () => {
                  if (typeof props.user?.avatar === 'string') {
                    return (
                      <Avatar
                        src={props.user.avatar}
                        icon={User}
                        circle={props.avatarCircle}
                      ></Avatar>
                    )
                  }

                  return (
                    <Avatar icon={props.user.avatar || User} circle={props.avatarCircle}></Avatar>
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
              )
        ]
      )
    }
  }
})
