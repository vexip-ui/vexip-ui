import { defineComponent, h, ref, computed, watch } from 'vue'
import LayoutAside from './layout-aside'
import LayoutFooter from './layout-footer'
import LayoutHeader from './layout-header'
import LayoutMain from './layout-main'
import { NativeScroll } from '@/components/native-scroll'
import { ResizeObserver } from '@/components/resize-observer'
import { useNameHelper, useProps, booleanProp } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { MenuOptions } from '@/components/menu'

export default defineComponent({
  name: 'Layout',
  components: {
    LayoutAside,
    LayoutFooter,
    LayoutHeader,
    LayoutMain,
    NativeScroll
  },
  props: {
    noAside: booleanProp,
    footer: booleanProp,
    tag: String,
    menus: Object as PropType<MenuOptions[]>,
    logo: String,
    signName: String,
    reduced: booleanProp,
    avatarCircle: booleanProp
  },
  emits: ['reduced-change', 'sign-click', 'menu-select', 'update:reduced'],
  setup(_props, { emit, slots }) {
    const props = useProps('layout', _props, {
      noAside: false,
      footer: false,
      tag: 'section',
      menus: {
        default: () => [],
        static: true
      },
      logo: 'https://www.vexipui.com/logo.png',
      signName: 'Vexip UI',
      reduced: false,
      avatarCircle: false
    })

    const nh = useNameHelper('layout')
    const scrollHeight = ref(0)
    const asideReduced = ref(props.reduced)

    const className = computed(() => {
      return [nh.b(), nh.bs('vars')]
    })

    watch(
      () => props.reduced,
      value => {
        asideReduced.value = value
      }
    )

    function toggleReduce(target = !asideReduced.value) {
      asideReduced.value = target

      emit('reduced-change', target)
      emit('update:reduced', target)
    }

    function handleSignClick(event: MouseEvent) {
      emit('sign-click', event)
    }

    function renderSign() {
      return (
        <div class={nh.be('sign')} onClick={handleSignClick}>
          {props.logo && (
            <div class={nh.be('logo')}>
              <img src={props.logo} alt={'Logo'} />
            </div>
          )}
          {props.signName && <span class={nh.be('sign-name')}>{props.signName}</span>}
        </div>
      )
    }

    function renderHeader() {
      if (slots.header) {
        return slots.header
      }

      return (
        <LayoutHeader avatar-circle={props.avatarCircle}>
          {{
            left: slots.headerLeft ? slots.headerLeft : null,
            main: slots.headerMain ? slots.headerMain : null,
            right: slots.headerRight ? slots.headerRight : null,
            user: slots.user ? slots.user : null
          }}
        </LayoutHeader>
      )
    }

    function renderAside() {
      if (slots.aside) {
        return slots.aside()
      }

      return (
        <LayoutAside
          v-model:reduced={asideReduced.value}
          menus={props.menus}
          onReducedChange={toggleReduce}
        >
          {{
            top: slots.asideTop ? slots.asideTop : renderSign,
            default: slots.asideMain ? slots.asideMain : null,
            bottom: slots.asideBottom ? slots.asideBottom : null
          }}
        </LayoutAside>
      )
    }

    function renderMain() {
      if (slots.default) {
        return slots.default()
      }

      return (
        <LayoutMain style={{ minHeight: `${scrollHeight.value}px` }}>{slots.main?.()}</LayoutMain>
      )
    }

    function renderFooter() {
      if (slots.footer) {
        return slots.footer()
      }
      return <LayoutFooter>{slots.footerMain?.()}</LayoutFooter>
    }

    function handleScrollResize(entry: ResizeObserverEntry) {
      scrollHeight.value = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
    }

    return () => {
      return h(
        props.tag || 'section',
        {
          class: className.value
        },
        [
          renderAside(),
          <section class={[nh.be('section'), asideReduced.value && nh.bem('section', 'reduced')]}>
            <div class={nh.be('container')}>
              {renderHeader()}
              <div class={nh.be('scroll')}>
                <ResizeObserver throttle onResize={handleScrollResize}>
                  <NativeScroll height={'100%'} use-y-bar bar-class={nh.be('scrollbar')}>
                    {renderMain()}
                    {props.footer && renderFooter()}
                  </NativeScroll>
                </ResizeObserver>
              </div>
            </div>
          </section>
        ]
      )
    }
  }
})
