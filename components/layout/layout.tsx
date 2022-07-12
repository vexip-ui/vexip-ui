import { defineComponent, ref, toRef, reactive, computed, watch, provide } from 'vue'
import LayoutAside from './layout-aside'
import LayoutFooter from './layout-footer'
import LayoutHeader from './layout-header'
import LayoutMain from './layout-main'
import { Menu } from '@/components/menu'
import { NativeScroll } from '@/components/native-scroll'
import { ResizeObserver } from '@/components/resize-observer'
import { useNameHelper, useProps, booleanProp } from '@vexip-ui/config'
import { useMediaQuery } from './helper'
import { LAYOUT_STATE } from './symbol'

import type { PropType } from 'vue'
import type { MenuOptions } from '@/components/menu'
import type { LayoutConfig, AsideMenuProps, LayoutSignType, HeaderUser, FooterLink } from './symbol'

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
    menuProps: Object as PropType<AsideMenuProps>,
    logo: String,
    signName: String,
    config: Array as PropType<LayoutConfig[]>,
    user: Object as PropType<HeaderUser>,
    reduced: booleanProp,
    avatarCircle: booleanProp,
    signType: String as PropType<LayoutSignType>,
    headerFixed: booleanProp,
    copyright: String,
    links: Array as PropType<FooterLink[]>,
    affixMedia: String,
    onReducedChange: Function as PropType<(target: boolean) => void>,
    onSignClick: Function as PropType<(event: MouseEvent) => void>,
    onMenuSelect: Function as PropType<(label: string, meta: Record<string, any>) => void>,
    onUserAction: Function as PropType<(label: string, meta: Record<string, any>) => void>
  },
  emits: ['update:reduced'],
  setup(_props, { emit, slots }) {
    const props = useProps('layout', _props, {
      noAside: false,
      footer: false,
      tag: 'section',
      menus: {
        default: () => [],
        static: true
      },
      logo: '',
      signName: '',
      config: () => ['nav', 'color'] as LayoutConfig[],
      user: null,
      reduced: false,
      avatarCircle: false,
      signType: 'aside',
      headerFixed: false,
      copyright: '',
      links: () => [],
      affixMedia: 'lg',
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

    const section = ref<HTMLElement | null>(null)
    const scroll = ref<HTMLElement | null>(null)

    const matched = useMediaQuery(toRef(props, 'affixMedia'))

    const state = reactive({
      isLayout: true,
      locked: false,
      affixed: false,
      scrollY: 0,
      affixMatched: matched.value,
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

    provide(LAYOUT_STATE, state)

    watch(matched, value => {
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
        if (!section.value || !scroll.value) return

        if (value) {
          section.value.style.transitionDuration = '0ms'
          scroll.value.style.transitionDuration = '0ms'
        } else {
          section.value.style.transitionDuration = ''
          scroll.value.style.transitionDuration = ''
        }
      }
    )

    function toggleReduce(target = !asideReduced.value) {
      asideReduced.value = target

      props.onReducedChange?.(target)
      emit('update:reduced', target)
    }

    function handleSignClick(event: MouseEvent) {
      props.onSignClick?.(event)
    }

    function handleMenuSelect(label: string, meta: Record<string, any>) {
      props.onMenuSelect?.(label, meta)
    }

    function handleScrollResize(entry: ResizeObserverEntry) {
      scrollHeight.value = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
    }

    function handleScroll({ clientY }: { clientY: number }) {
      state.scrollY = clientY
      state.affixed = !state.affixMatched && clientY >= 50
    }

    function handleUserAction(label: string, meta: Record<string, any>) {
      props.onUserAction?.(label, meta)
    }

    function renderSign() {
      if (!props.logo && !props.signName && !slots.sign) {
        return null
      }

      return (
        <div class={nh.be('sign')} onClick={handleSignClick}>
          {slots.sign
            ? slots.sign()
            : [
                props.logo && (
                  <div class={nh.be('logo')}>
                    <img src={props.logo} alt={'Logo'} />
                  </div>
                ),
                props.signName && <span class={nh.be('sign-name')}>{props.signName}</span>
              ]}
        </div>
      )
    }

    function renderHeader() {
      if (slots.header) {
        return slots.header
      }

      return (
        <LayoutHeader
          v-model:sign-type={currentSignType.value}
          v-model:user-dropped={userDropped.value}
          config={props.config}
          avatar-circle={props.avatarCircle}
          fixed={props.headerFixed}
          onUserAction={handleUserAction}
          onReducedChange={toggleReduce}
        >
          {{
            left:
              slots['header-left'] ||
              slots.headerLeft ||
              (() =>
                props.noAside || currentSignType.value === 'header' || state.expanded
                  ? renderSign()
                  : null),
            default:
              slots['header-main'] ||
              slots.headerMain ||
              (() =>
                props.noAside
                  ? (
                  <Menu
                    {...(props.menuProps || {})}
                    horizontal
                    options={props.menus}
                    onSelect={handleMenuSelect}
                  ></Menu>
                    )
                  : null),
            right: slots['header-right'] || slots.headerRight || null,
            user: slots['header-user'] || slots.headerUser || null
          }}
        </LayoutHeader>
      )
    }

    function renderAside() {
      if (slots.aside) {
        return slots.aside()
      }

      if (props.noAside) {
        return null
      }

      return (
        <LayoutAside
          v-model:reduced={asideReduced.value}
          menus={props.menus}
          menus-props={props.menuProps}
          onReducedChange={toggleReduce}
          onMenuSelect={handleMenuSelect}
        >
          {{
            top:
              slots['aside-top'] ||
              slots.asideTop ||
              (() => (currentSignType.value === 'aside' && !state.expanded ? renderSign() : null)),
            default: slots['aside-main'] || slots.asideMain || null,
            bottom: slots['aside-bottom'] || slots.asideBottom || null,
            expand: slots['aside-expand'] || slots.asideExpand || null
          }}
        </LayoutAside>
      )
    }

    function renderMain() {
      if (slots.default) {
        return slots.default()
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
        return slots.footer()
      }

      return (
        <LayoutFooter copyright={props.copyright} links={props.links}>
          {{
            links: slots['footer-links'] || slots.footerLinks || null,
            copyright: slots['footer-copyright'] || slots.footerCopyright || null
          }}
        </LayoutFooter>
      )
    }

    function renderScroll() {
      return (
        <div
          ref={scroll}
          class={[nh.be('scroll'), asideReduced.value && nh.bem('scroll', 'reduced')]}
        >
          <ResizeObserver throttle onResize={handleScrollResize}>
            <NativeScroll
              height={'100%'}
              use-y-bar
              bar-class={nh.be('scrollbar')}
              onScroll={handleScroll}
            >
              {renderMain()}
              {props.footer && renderFooter()}
            </NativeScroll>
          </ResizeObserver>
        </div>
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
