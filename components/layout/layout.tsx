import { defineComponent, ref, toRef, reactive, computed, watch, provide } from 'vue'
import { Menu } from '@/components/menu'
import { NativeScroll } from '@/components/native-scroll'
import { useNameHelper, useProps, emitEvent } from '@vexip-ui/config'
import { useMounted } from '@vexip-ui/hooks'
import { isClient } from '@vexip-ui/utils'
import LayoutMain from './layout-main'
import LayoutHeader from './layout-header'
import LayoutFooter from './layout-footer'
import LayoutAside from './layout-aside'
import { layoutProps } from './props'
import { useMediaQuery } from './helper'
import { LAYOUT_STATE } from './symbol'

import type {
  LayoutConfig,
  LayoutSignType,
  LayoutHeaderExposed,
  LayoutAsideExposed
} from './symbol'

export default defineComponent({
  name: 'Layout',
  components: {
    LayoutAside,
    LayoutFooter,
    LayoutHeader,
    LayoutMain,
    Menu,
    NativeScroll
  },
  props: layoutProps,
  emits: ['update:reduced', 'update:sign-type', 'update:color'],
  setup(_props, { slots, emit, expose }) {
    const props = useProps('layout', _props, {
      noAside: false,
      footer: false,
      tag: 'section',
      menus: {
        default: () => [],
        static: true
      },
      menuProps: null,
      logo: '',
      signName: '',
      config: () => ['nav', 'theme', 'color'] as LayoutConfig[],
      user: null,
      actions: () => [],
      reduced: false,
      avatarCircle: false,
      signType: 'aside',
      headerFixed: 'lg',
      asideFixed: 'lg',
      copyright: '',
      links: () => [],
      colors: () => ['#339af0', '#f03e3e', '#be4bdb', '#7950f2', '#1b9e44', '#f76707'],
      color: '',
      miniHeaderSign: 'lg',
      verticalLinks: 'md',
      onReducedChange: null,
      onSignClick: null,
      onMenuSelect: null,
      onUserAction: null
    })

    const nh = useNameHelper('layout')
    const scrollHeight = ref(0)
    const asideReduced = ref(props.reduced)
    const currentSignType = ref<LayoutSignType>(props.signType)
    const userDropped = ref(false)
    const currentColor = ref(props.color)

    const { isMounted } = useMounted()

    const section = ref<HTMLElement>()
    const scroll = ref<InstanceType<typeof NativeScroll>>()
    const header = ref<LayoutHeaderExposed | null>(null)
    const aside = ref<LayoutAsideExposed | null>(null)

    const affixMatched = useMediaQuery(toRef(props, 'headerFixed'))
    const expandMatched = useMediaQuery(toRef(props, 'asideFixed'))
    const signNameMatched = useMediaQuery(toRef(props, 'miniHeaderSign'))

    const state = reactive({
      isLayout: true,
      locked: false,
      affixed: false,
      scrollY: 0,
      affixMatched,
      expanded: false,
      reduced: asideReduced,
      navConfig: computed(() => !props.noAside)
    })

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('no-aside')]: props.noAside,
          [nh.bm('header-main')]: currentSignType.value === 'header'
        }
      ]
    })
    const rootEl = computed(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isMounted.value
      return isClient ? document.documentElement : null
    })
    const signInHeader = computed(() => {
      return props.noAside || currentSignType.value === 'header' || state.expanded
    })
    const menu = computed(() => aside.value?.menu || header.value?.menu || null)

    provide(LAYOUT_STATE, state)

    expose({ scroll, menu, expandMenuByLabel })

    watch(affixMatched, value => {
      state.affixMatched = value
      state.affixed = !state.affixMatched && state.scrollY >= 50
    })
    watch(
      () => props.reduced,
      value => {
        asideReduced.value = value
      }
    )
    watch(
      () => state!.locked,
      value => {
        if (!section.value || !scroll.value?.content) return

        if (value) {
          section.value.style.transitionDuration = '0ms'
          scroll.value.content.style.transitionDuration = '0ms'
        } else {
          section.value.style.transitionDuration = ''
          scroll.value.content.style.transitionDuration = ''
        }
      }
    )
    watch(currentSignType, value => {
      emitEvent(props.onNavChange, value)
      emit('update:sign-type', value)
    })
    watch(
      () => props.color,
      value => {
        currentColor.value = value || props.colors?.[0] || getBaseColor()
      }
    )
    watch(currentColor, value => {
      emitEvent(props.onColorChange, value)
      emit('update:color', value)
    })

    function getBaseColor() {
      if (rootEl.value) {
        return getComputedStyle(rootEl.value).getPropertyValue('--vxp-color-primary-base')
      }

      return '#339af0'
    }

    function toggleReduce(target = !asideReduced.value) {
      asideReduced.value = target

      emitEvent(props.onReducedChange, target)
      emit('update:reduced', target)
    }

    function handleSignClick(event: MouseEvent) {
      emitEvent(props.onSignClick, event)
    }

    function handleMenuSelect(label: string, meta: Record<string, any>) {
      emitEvent(props.onMenuSelect, label, meta)
    }

    function handleScroll({ clientY }: { clientY: number }) {
      state.scrollY = clientY
      state.affixed = !state.affixMatched && clientY >= 50
    }

    function handleUserAction(label: string, meta: Record<string, any>) {
      emitEvent(props.onUserAction, label, meta)
    }

    function expandMenuByLabel(label: string) {
      menu.value?.expandItemByLabel(label)
    }

    function getSlotParams() {
      return { reduced: asideReduced.value, toggleReduce }
    }

    function renderSign() {
      if (!props.logo && !props.signName && !slots.sign) {
        return null
      }

      if (slots.sign) {
        return slots.sign(getSlotParams())
      }

      const showSignName = props.signName && !(signInHeader.value && !signNameMatched.value)

      return (
        <div
          class={[nh.be('sign'), !showSignName && nh.bem('sign', 'logo-only')]}
          onClick={handleSignClick}
        >
          {[
            props.logo && (
              <div class={nh.be('logo')}>
                <img src={props.logo} alt={'Logo'} />
              </div>
            ),
            showSignName && <span class={nh.be('sign-name')}>{props.signName}</span>
          ]}
        </div>
      )
    }

    function renderHeader() {
      if (slots.header) {
        return slots.header(getSlotParams())
      }

      return (
        <LayoutHeader
          ref={header}
          v-model:sign-type={currentSignType.value}
          v-model:user-dropped={userDropped.value}
          v-model:color={currentColor.value}
          user={props.user}
          actions={props.actions}
          config={props.config}
          avatar-circle={props.avatarCircle}
          menus={props.noAside ? props.menus : []}
          menu-props={props.noAside ? props.menuProps : null}
          colors={props.colors}
          onUserAction={handleUserAction}
          onReducedChange={toggleReduce}
          onMenuSelect={handleMenuSelect}
        >
          {{
            left:
              slots['header-left'] ||
              slots.headerLeft ||
              (() => (signInHeader.value ? renderSign() : null)),
            default: slots['header-main'] || slots.headerMain || null,
            right: slots['header-right'] || slots.headerRight || null,
            user: slots['header-user'] || slots.headerUser || null,
            avatar: slots['header-avatar'] || slots.headerAvatar || null
          }}
        </LayoutHeader>
      )
    }

    function renderAside() {
      if (slots.aside) {
        return slots.aside(getSlotParams())
      }

      if (props.noAside) {
        return null
      }

      return (
        <LayoutAside
          ref={aside}
          v-model:reduced={asideReduced.value}
          menus={props.menus}
          menu-props={props.menuProps}
          fixed={props.asideFixed}
          onReducedChange={toggleReduce}
          onMenuSelect={handleMenuSelect}
        >
          {{
            top:
              slots['aside-top'] ||
              slots.asideTop ||
              (() => (!signInHeader.value ? renderSign() : null)),
            default: slots['aside-main'] || slots.asideMain || null,
            bottom: slots['aside-bottom'] || slots.asideBottom || null,
            expand: slots['aside-expand'] || slots.asideExpand || null
          }}
        </LayoutAside>
      )
    }

    function renderMain() {
      if (slots.default) {
        return slots.default(getSlotParams())
      }

      return (
        <LayoutMain style={{ minHeight: `${scrollHeight.value}px` }}>
          {{
            default: slots.main
          }}
        </LayoutMain>
      )
    }

    function renderFooter() {
      if (slots.footer) {
        return slots.footer(getSlotParams())
      }

      return (
        <LayoutFooter
          copyright={props.copyright}
          links={props.links}
          vertical-links={props.verticalLinks}
        >
          {{
            links: slots['footer-links'] || slots.footerLinks || null,
            copyright: slots['footer-copyright'] || slots.footerCopyright || null
          }}
        </LayoutFooter>
      )
    }

    function renderScroll() {
      return (
        <NativeScroll
          ref={scroll}
          scroll-class={[
            nh.be('scroll'),
            expandMatched.value && nh.bem('scroll', 'away'),
            asideReduced.value && nh.bem('scroll', 'reduced')
          ]}
          height={'100%'}
          use-y-bar
          bar-class={nh.be('scrollbar')}
          onScroll={handleScroll}
        >
          {renderMain()}
          {props.footer && renderFooter()}
        </NativeScroll>
      )
    }

    return () => {
      const CustomTag = (props.tag || 'section') as any

      return (
        <CustomTag class={className.value}>
          {currentSignType.value === 'aside'
            ? [
                renderAside(),
                <section
                  ref={section}
                  class={[
                    nh.be('section'),
                    {
                      [nh.bem('section', 'away')]: expandMatched.value,
                      [nh.bem('section', 'reduced')]: asideReduced.value,
                      [nh.bem('section', 'locked')]: state.locked
                    }
                  ]}
                >
                  <div class={nh.be('container')}>
                    {renderHeader()}
                    {renderScroll()}
                  </div>
                </section>
              ]
            : [
                renderHeader(),
                <section class={nh.be('section')}>
                  <div class={nh.be('container')}>
                    {renderAside()}
                    {renderScroll()}
                  </div>
                </section>
              ]}
        </CustomTag>
      )
    }
  }
})
