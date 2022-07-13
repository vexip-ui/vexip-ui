import { defineComponent, computed } from 'vue'
import { Icon } from '@/components/icon'
import { Linker } from '@/components/linker'
import { useNameHelper, useProps } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { FooterLink } from './symbol'

export default defineComponent({
  name: 'LayoutFooter',
  props: {
    tag: String,
    copyright: String,
    links: Array as PropType<FooterLink[]>
  },
  setup(_props, { slots }) {
    const props = useProps('layout', _props, {
      tag: 'footer',
      copyright: '',
      links: () => []
    })

    const nh = useNameHelper('layout')

    const className = computed(() => {
      return [nh.be('footer')]
    })

    function renderLinks() {
      if (!props.links?.length) {
        return null
      }

      return (
        <div class={nh.be('links')}>
          <div class={nh.be('links-row')}>
            {props.links.map(group => (
              <div class={nh.be('link-group')}>
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
          {slots.links ? slots.links() : renderLinks()}
          {slots.copyright
            ? (
                slots.copyright()
              )
            : (
            <div class={nh.be('copyright')}>{props.copyright}</div>
              )}
        </CustomTag>
      )
    }
  }
})
