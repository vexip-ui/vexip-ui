import { NativeScroll } from '@/components/native-scroll'
import { ResizeObserver } from '@/components/resize-observer'

import {
  computed,
  defineComponent,
  provide,
  reactive,
  ref,
  renderSlot,
  shallowReadonly,
  toRef,
  watch
} from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { createSlotRender, useMounted } from '@vexip-ui/hooks'
import { getYBorder, isClient, runQueueFrame } from '@vexip-ui/utils'
import LayoutMain from './layout-main'
import LayoutHeader from './layout-header'
import LayoutFooter from './layout-footer'
import LayoutAside from './layout-aside'
import { layoutProps } from './props'
import { useMediaQuery } from './helper'
import { LAYOUT_STATE } from './symbol'

import type { NativeScrollExposed } from '@/components/native-scroll'
import type {
  LayoutAsideExposed,
  LayoutConfig,
  LayoutHeaderExposed,
  LayoutSignType
} from './symbol'

export default defineComponent({
  name: 'Layout',
  props: layoutProps,
  emits: [
    'update:expanded',
    'update:reduced',
    'update:sign-type',
    'update:color',
    'update:dark-mode'
  ],
  setup(_props, { slots, emit, expose }) {
    const props = useProps('layout', _props, {
      locale: null,
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
      expanded: false,
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
      darkMode: null,
      fixedMain: false,
      fitWindow: false,
      innerClasses: () => ({}),
      noHeader: false
    })

    const nh = useNameHelper('layout')
    const locked = ref(false)
    // const asideActive = ref(!props.noAside)
    const asideExpanded = ref(props.expanded)
    const asideReduced = ref(props.reduced)
    const currentSignType = ref<LayoutSignType>(props.signType)
    const userDropped = ref(false)
    const currentColor = ref(props.color)

    const { isMounted } = useMounted('frame')

    const section = ref<HTMLElement>()
    const scroll = ref<NativeScrollExposed>()
    const header = ref<LayoutHeaderExposed>()
    const aside = ref<LayoutAsideExposed>()

    const affixMatched = useMediaQuery(toRef(props, 'headerFixed'))
    const expandMatched = useMediaQuery(toRef(props, 'asideFixed'))
    const signNameMatched = useMediaQuery(toRef(props, 'miniHeaderSign'))

    const state = reactive({
      isLayout: true,
      locked: computed(() => locked.value),
      affixed: false,
      scrollY: 0,
      affixMatched,
      expandMatched,
      useExpand: false,
      expanded: asideExpanded,
      reduced: asideReduced,
      navConfig: computed(() => !props.noAside),
      classes: toRef(props, 'innerClasses'),
      changeInLock
    })

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('inherit')]: props.inherit,
          [nh.bm('no-aside')]: props.noAside,
          [nh.bm('no-header')]: props.noHeader,
          [nh.bm('header-main')]: currentSignType.value === 'header',
          [nh.bm('locked')]: !isMounted.value || locked.value,
          [nh.bm('fit-window')]: props.fitWindow
        }
      ]
    })
    const rootEl = computed(() => {
      return isClient && isMounted.value ? document.documentElement : null
    })
    const signInHeader = computed(() => {
      return props.noAside || currentSignType.value === 'header' || state.useExpand
    })
    const menu = computed(() => aside.value?.menu || header.value?.menu)
    const isDark = ref(props.darkMode)
    const viewHeight = ref('100%')

    const style = computed(() => {
      return {
        [nh.cv('view-height')]: props.fitWindow ? '100vh' : viewHeight.value
      }
    })

    const slotParams = shallowReadonly(
      reactive({
        expanded: asideExpanded,
        reduced: asideReduced,
        toggleExpanded,
        toggleReduced
      })
    )

    provide(LAYOUT_STATE, state)

    expose({ scroll, menu, toggleExpanded, toggleReduced, expandMenuByLabel })

    watch(affixMatched, value => {
      state.affixed = !value && state.scrollY >= 50
    })
    watch(
      () => props.expanded,
      value => {
        asideExpanded.value = value
      }
    )
    watch(
      () => props.reduced,
      value => {
        asideReduced.value = value
      }
    )
    // watch(
    //   () => props.noAside,
    //   value => {
    //     changeInLock(() => (asideActive.value = value))
    //   }
    // )
    watch(currentSignType, value => {
      emit('update:sign-type', value)
      emitEvent(props.onNavChange, value)
    })
    watch(
      () => props.color,
      value => {
        currentColor.value = value || props.colors?.[0] || getBaseColor()
      }
    )
    watch(currentColor, value => {
      emit('update:color', value)
      emitEvent(props.onColorChange, value)
    })
    watch(
      () => props.darkMode,
      value => {
        isDark.value = value
      }
    )

    function getBaseColor() {
      if (rootEl.value) {
        return getComputedStyle(rootEl.value).getPropertyValue('--vxp-color-primary-base')
      }

      return '#339af0'
    }

    function toggleExpanded(expanded = !asideReduced.value) {
      asideExpanded.value = expanded

      emit('update:expanded', expanded)
      emitEvent(props.onExpandedChange, expanded)
    }

    function toggleReduced(reduced = !asideReduced.value) {
      asideReduced.value = reduced

      emit('update:reduced', reduced)
      emitEvent(props.onReducedChange, reduced)
    }

    function handleSignClick(event: MouseEvent) {
      emitEvent(props.onSignClick, event)
    }

    function handleMenuSelect(label: string, meta: Record<string, any>) {
      emitEvent(props.onMenuSelect, label, meta)
    }

    function handleToggleTheme(isDark: boolean) {
      emit('update:dark-mode', isDark)
      emitEvent(props.onToggleTheme, isDark)
    }

    function handleUserAction(label: string, meta: Record<string, any>) {
      emitEvent(props.onUserAction, label, meta)
    }

    function expandMenuByLabel(label: string) {
      menu.value?.expandItemByLabel(label)
    }

    function handleResize() {
      if (scroll.value?.$el) {
        viewHeight.value = `${scroll.value.$el.offsetHeight - getYBorder(scroll.value.$el)}px`
      }

      emitEvent(props.onContentResize)
    }

    let cancelChange: (() => void) | undefined

    function changeInLock(doChange: () => void) {
      cancelChange?.()
      cancelChange = runQueueFrame([
        () => (locked.value = true),
        doChange,
        () => (locked.value = false)
      ])
    }

    function stopAndPrevent(event: Event) {
      event.stopPropagation()
      event.preventDefault()
    }

    function renderSign() {
      if (!props.logo && !props.signName && !slots.sign) {
        return null
      }

      if (slots.sign) {
        return renderSlot(slots, 'sign', slotParams)
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
      if (props.noHeader) {
        return <header role={'none'} aria-hidden style={'display: none'}></header>
      }

      if (slots.header) {
        return renderSlot(slots, 'header', slotParams)
      }

      return (
        <LayoutHeader
          ref={header}
          v-model:sign-type={currentSignType.value}
          v-model:user-dropped={userDropped.value}
          v-model:color={currentColor.value}
          v-model:dark-mode={isDark.value}
          inherit
          locale={props.locale}
          user={props.user}
          actions={props.actions}
          config={props.config}
          avatar-circle={props.avatarCircle}
          menus={props.noAside ? props.menus : []}
          menu-props={props.noAside ? props.menuProps : null}
          colors={props.colors}
          onUserAction={handleUserAction}
          onExpandedChange={toggleExpanded}
          onReducedChange={toggleReduced}
          onMenuSelect={handleMenuSelect}
          onToggleTheme={handleToggleTheme}
          {...{
            onWheel: stopAndPrevent,
            onMousemove: stopAndPrevent
          }}
        >
          {{
            left: createSlotRender(slots, ['header-left', 'headerLeft'], () =>
              signInHeader.value ? renderSign() : null
            ),
            default: createSlotRender(slots, ['header-main', 'headerMain']),
            right: createSlotRender(slots, ['header-right', 'headerRight']),
            user: createSlotRender(slots, ['header-user', 'headerUser']),
            avatar: createSlotRender(slots, ['header-avatar', 'headerAvatar'])
          }}
        </LayoutHeader>
      )
    }

    function renderAside() {
      if (props.noAside) {
        return <div role={'none'} aria-hidden style={'display: none'}></div>
      }

      return (
        <div
          class={[
            nh.be('sidebar'),
            !expandMatched.value && nh.bem('sidebar', 'away'),
            props.innerClasses.sidebar
          ]}
          onWheel={stopAndPrevent}
          onMousemove={stopAndPrevent}
        >
          {slots.aside
            ? (
                renderSlot(slots, 'aside', slotParams)
              )
            : (
              <LayoutAside
                ref={aside}
                v-model:expanded={asideExpanded.value}
                v-model:reduced={asideReduced.value}
                inherit
                sign-type={currentSignType.value}
                menus={props.menus}
                menu-props={props.menuProps}
                fixed={props.asideFixed}
                onExpandedChange={toggleExpanded}
                onReducedChange={toggleReduced}
                onMenuSelect={handleMenuSelect}
              >
                {{
                  top: createSlotRender(slots, ['aside-top', 'asideTop'], () =>
                    !signInHeader.value ? renderSign() : null
                  ),
                  default: createSlotRender(slots, ['aside-main', 'asideMain']),
                  bottom: createSlotRender(slots, ['aside-bottom', 'asideBottom']),
                  expand: createSlotRender(slots, ['aside-expand', 'asideExpand'])
                }}
              </LayoutAside>
              )}
        </div>
      )
    }

    function renderMain() {
      if (slots.default) {
        return renderSlot(slots, 'default', slotParams)
      }

      return (
        <LayoutMain fixed={props.fixedMain}>
          {{
            default: createSlotRender(slots, ['main'])
          }}
        </LayoutMain>
      )
    }

    function renderFooter() {
      if (slots.footer) {
        return renderSlot(slots, 'footer', slotParams)
      }

      return (
        <LayoutFooter
          inherit
          copyright={props.copyright}
          links={props.links}
          vertical-links={props.verticalLinks}
        >
          {{
            links: createSlotRender(slots, ['footer-links', 'footerLinks']),
            copyright: createSlotRender(slots, ['footer-copyright', 'footerCopyright'])
          }}
        </LayoutFooter>
      )
    }

    function renderWrapper() {
      const CustomTag = (props.tag || 'section') as any

      return (
        <CustomTag
          class={[
            nh.be('wrapper'),
            props.fixedMain && nh.bem('wrapper', 'fixed'),
            props.innerClasses.wrapper
          ]}
        >
          {currentSignType.value === 'header' && renderHeader()}
          {renderAside()}
          <section
            ref={section}
            class={[
              nh.be('section'),
              {
                [nh.bem('section', 'away')]: expandMatched.value,
                [nh.bem('section', 'reduced')]: asideReduced.value,
                [nh.bem('section', 'locked')]: locked.value,
                [nh.bem('section', 'fixed')]: props.fixedMain
              },
              props.innerClasses.section
            ]}
          >
            {currentSignType.value === 'aside' && renderHeader()}
            {renderMain()}
            {props.footer && renderFooter()}
          </section>
        </CustomTag>
      )
    }

    return () => {
      if (props.fitWindow) {
        return (
          <section class={className.value} style={style.value}>
            <ResizeObserver throttle onResize={handleResize}>
              {renderWrapper()}
            </ResizeObserver>
          </section>
        )
      }

      return (
        <NativeScroll
          ref={scroll}
          class={className.value}
          inherit={props.inherit}
          use-y-bar
          observe-deep
          bar-class={[nh.be('scrollbar'), props.innerClasses.scrollbar]}
          style={style.value}
          onResize={handleResize}
        >
          {renderWrapper()}
        </NativeScroll>
      )
    }
  }
})
