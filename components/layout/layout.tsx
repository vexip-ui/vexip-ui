import { defineComponent, h, ref, computed } from 'vue'
import LayoutAside from './layout-aside'
import LayoutFooter from './layout-footer'
import LayoutHeader from './layout-header'
import LayoutMain from './layout-main'
import { NativeScroll } from '@/components/native-scroll'
import { ResizeObserver } from '@/components/resize-observer'
import { useNameHelper, useProps, booleanProp } from '@vexip-ui/config'

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
    tag: String
  },
  setup(_props) {
    const props = useProps('layout', _props, {
      noAside: false,
      footer: false,
      tag: 'section'
    })

    const nh = useNameHelper('layout')
    const scrollHeight = ref(0)

    const className = computed(() => {
      return [nh.b(), nh.bs('vars')]
    })

    function createHeaderElement() {
      return <LayoutHeader></LayoutHeader>
    }

    function createAsideElement() {
      return <LayoutAside></LayoutAside>
    }

    function createMainElement() {
      return <LayoutMain style={{ minHeight: `${scrollHeight.value}px` }}></LayoutMain>
    }

    function createFooterElement() {
      return <LayoutFooter></LayoutFooter>
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
          createAsideElement(),
          <section class={nh.be('section')}>
            {createHeaderElement()}
            <ResizeObserver throttle onResize={handleScrollResize}>
              <NativeScroll class={nh.be('scroll')} use-y-bar bar-class={nh.be('scrollbar')}>
                {createMainElement()}
                {props.footer && createFooterElement()}
              </NativeScroll>
            </ResizeObserver>
          </section>
        ]
      )
    }
  }
})
