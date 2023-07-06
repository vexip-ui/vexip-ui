import { Icon } from '@/components/icon'
import { Linker } from '@/components/linker'

import { computed, defineComponent, renderSlot, toRef } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { layoutFooterProps } from './props'
import { useLayoutState, useMediaQuery } from './helper'

export default defineComponent({
  name: 'LayoutFooter',
  props: layoutFooterProps,
  setup(_props, { slots }) {
    const props = useProps('layoutFooter', _props, {
      tag: 'footer',
      copyright: '',
      links: () => [],
      verticalLinks: 'md'
    })

    const nh = useNameHelper('layout')
    const layoutState = useLayoutState()
    const horizontalMatched = useMediaQuery(toRef(props, 'verticalLinks'))

    const className = computed(() => {
      return [
        nh.be('footer'),
        {
          [nh.bs('vars')]: !layoutState.isLayout,
          [nh.bem('footer', 'inherit')]: layoutState.isLayout || props.inherit
        },
        layoutState.classes.footer
      ]
    })

    function renderLinks() {
      if (!props.links?.length) {
        return null
      }

      return (
        <div
          class={[
            nh.be('links'),
            !horizontalMatched.value && nh.bem('links', 'vertical'),
            layoutState.classes.footerLinks
          ]}
        >
          <div class={nh.be('links-row')}>
            {props.links.map(group => (
              <div
                class={[
                  nh.be('link-group'),
                  !horizontalMatched.value && nh.bem('link-group', 'vertical')
                ]}
              >
                <div class={[nh.be('link-name'), nh.bem('link-name', 'group')]}>
                  {group.to
                    ? (
                    <Linker icon={group.icon} to={group.to} target={group.target}>
                      {group.name}
                    </Linker>
                      )
                    : (
                        [group.icon && <Icon icon={group.icon}></Icon>, group.name]
                      )}
                  {group.subname && <div class={nh.be('link-subname')}>{`- ${group.subname}`}</div>}
                </div>
                {group.children?.length
                  ? group.children.map(link => (
                      <div class={nh.be('link')}>
                        <Linker icon={link.icon} to={link.to} target={link.target}>
                          {link.name}
                        </Linker>
                        {link.subname && (
                          <div class={nh.be('link-subname')}>{`- ${link.subname}`}</div>
                        )}
                      </div>
                  ))
                  : null}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return () => {
      const CustomTag = (props.tag || 'footer') as any

      return (
        <CustomTag class={className.value}>
          {slots.links ? renderSlot(slots, 'links') : renderLinks()}
          <div class={[nh.be('copyright'), layoutState.classes.copyright]}>
            {slots.copyright ? slots.copyright() : props.copyright}
          </div>
        </CustomTag>
      )
    }
  }
})
