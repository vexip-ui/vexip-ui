import { FullScreen } from '@/components/full-screen'
import { Icon } from '@/components/icon'

import {
  Transition,
  computed,
  defineComponent,
  provide,
  reactive,
  ref,
  renderSlot,
  watch
} from 'vue'

import { emitEvent, useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import VideoControl from './video-control.vue'
import VideoProgress from './video-progress.vue'
import VideoTimer from './video-timer.vue'
import VideoVolume from './video-volume.vue'
import { useListener, useSetTimeout } from '@vexip-ui/hooks'
import { decimalLength, isClient, toNumber } from '@vexip-ui/utils'
import { videoProps } from './props'
import { VIDEO_STATE, videoDefaultControlLayout } from './symbol'

import type { FullScreenExposed } from '@/components/full-screen'
import type { VideoControlConfig, VideoPlayRate } from './symbol'

export default defineComponent({
  name: 'Video',
  props: videoProps,
  setup(_props, { slots, expose }) {
    const props = useProps('video', _props, {
      src: '',
      noControls: false,
      videoAttrs: null,
      playRates: () => [0.5, 1, 1.25, 1.5, 2],
      // kernel: null,
      controlLayout: () => videoDefaultControlLayout,
      poster: '',
      video: null,
      segments: () => []
    })

    const nh = useNameHelper('video')
    const locale = useLocale('video')
    const icons = useIcons()

    const { timer } = useSetTimeout()

    // const idIndex = getIdIndex()
    const pipEnabled = isClient && document.pictureInPictureEnabled

    const playing = ref(false)
    const currentTime = ref(0)
    const duration = ref(1e5)
    const volume = ref(100)
    const pip = ref(false)
    const stateShow = ref(true)
    const currentRate = ref(1)
    const loadedData = ref(false)
    const interacting = ref(false)
    const hasPlayed = ref(false)
    const flipped = ref(false)
    const iconScale = ref(1.3)

    const screen = ref<FullScreenExposed>()
    const wrapper = computed(() => screen.value?.wrapper)
    const video = ref<HTMLVideoElement>()

    const placeId = computed(() => screen.value?.placeId)
    const videoRef = computed(() => {
      return typeof slots.player === 'function' ? props.video : video.value
    })
    const className = computed(() => {
      return [nh.b(), nh.bs('vars')]
    })
    const playIcon = computed(() => (playing.value ? icons.value.pause : icons.value.play))
    const stateIcon = computed(() => {
      return playing.value ? icons.value.pauseState : icons.value.playState
    })
    const rateOptions = computed(() => {
      const rates = props.playRates
        .map(raw => {
          const rate = typeof raw === 'number' ? { value: raw } : raw

          rate.value = toNumber(rate.value)
          rate.label =
            rate.label || `${decimalLength(rate.value) ? rate.value : rate.value.toFixed(1)}x`

          return rate
        })
        .filter(rate => rate.value > 0)
        .sort((prev, next) => next.value - prev.value)

      if (!rates.find(rate => rate.value === 1)) {
        const index = rates.findIndex(rate => rate.value < 1)

        rates.splice((index + rates.length) % rates.length, 0, { value: 1, label: '1.0x' })
      }

      return rates
    })
    const segments = computed(() => {
      return props.segments
        .map(segment => (typeof segment === 'number' ? { time: segment } : segment))
        .filter(segment => segment.time >= 0 && segment.time <= duration.value)
        .sort((prev, next) => prev.time - next.time)
    })

    watch(() => props.src, resetMetaState, { flush: 'pre' })
    watch(playing, value => {
      if (value) {
        requestAnimationFrame(() => {
          stateShow.value = false
        })
      } else {
        stateShow.value = true
      }
    })

    provide(VIDEO_STATE, reactive({ placeId, iconScale }))

    useListener(videoRef, 'canplay', () => {
      duration.value = videoRef.value?.duration ?? 0
    })
    useListener(videoRef, 'timeupdate', () => {
      currentTime.value = videoRef.value?.currentTime ?? 0
    })
    useListener(videoRef, 'ended', handleEnded)
    useListener(videoRef, 'loadeddata', () => {
      loadedData.value = true
    })
    useListener(videoRef, 'enterpictureinpicture', () => {
      pip.value = true
    })
    useListener(videoRef, 'leavepictureinpicture', () => {
      pip.value = false
    })

    expose({
      playing,
      currentTime,
      duration,
      pip,
      interacting,
      wrapper,
      video
    })

    function togglePlaying() {
      playing.value = !playing.value

      if (playing.value) {
        hasPlayed.value = true
        videoRef.value?.play()
      } else {
        videoRef.value?.pause()
      }

      wrapper.value?.focus()
      emitEvent(playing.value ? props.onPlay : props.onPause)
    }

    function handleEnded() {
      playing.value = false

      videoRef.value?.pause()
      emitEvent(props.onEnded)
    }

    async function togglePip() {
      if (!pipEnabled || !videoRef.value) return

      if (pip.value) {
        await document.exitPictureInPicture()
      } else {
        await videoRef.value.requestPictureInPicture()
      }
    }

    function changeRate(rate: VideoPlayRate) {
      currentRate.value = rate.value

      if (videoRef.value) {
        videoRef.value.playbackRate = rate.value
      }
    }

    function changeTime(time: number) {
      currentTime.value = time

      if (videoRef.value) {
        videoRef.value.currentTime = time
      }
    }

    function changeVolume(newVolume: number) {
      volume.value = newVolume

      if (videoRef.value) {
        videoRef.value.volume = newVolume / 100
      }
    }

    function toggleFlip() {
      flipped.value = !flipped.value
    }

    function resetMetaState() {
      playing.value = false
      currentTime.value = 0
      duration.value = 0
      loadedData.value = false
      pip.value = false
      hasPlayed.value = false

      videoRef.value?.pause()
    }

    function handleInteract() {
      clearTimeout(timer.interact)

      interacting.value = true
      timer.interact = setTimeout(() => {
        interacting.value = false
      }, 3000)
    }

    function handlePointerLeave() {
      clearTimeout(timer.interact)
      timer.interact = setTimeout(() => {
        interacting.value = false
      }, 500)
    }

    function renderPlayPrev() {
      return (
        <VideoControl name={locale.value.playPrev} onClick={togglePlaying}>
          <Icon
            {...icons.value.playPrev}
            scale={+(icons.value.playPrev.scale || 1) * iconScale.value}
          ></Icon>
        </VideoControl>
      )
    }

    function renderPlay() {
      return (
        <VideoControl
          name={playing.value ? locale.value.pause : locale.value.play}
          onClick={togglePlaying}
        >
          <Icon
            {...playIcon.value}
            scale={+(playIcon.value.scale || 1) * iconScale.value * 1.16}
          ></Icon>
        </VideoControl>
      )
    }

    function renderPlayNext() {
      return (
        <VideoControl name={locale.value.playPrev} onClick={togglePlaying}>
          <Icon
            {...icons.value.playNext}
            scale={+(icons.value.playNext.scale || 1) * iconScale.value}
          ></Icon>
        </VideoControl>
      )
    }

    function renderRefresh() {
      return (
        <VideoControl name={locale.value.refresh} onClick={togglePlaying}>
          <Icon
            {...icons.value.refresh}
            scale={+(icons.value.refresh.scale || 1) * iconScale.value}
          ></Icon>
        </VideoControl>
      )
    }

    function renderTimer() {
      return (
        <VideoTimer
          time={currentTime.value}
          duration={duration.value}
          onChange={changeTime}
        ></VideoTimer>
      )
    }

    function renderPlayRate() {
      return (
        <VideoControl
          class={nh.be('play-rate')}
          type={'select'}
          value={currentRate.value}
          options={rateOptions.value}
          onSelect={changeRate}
        ></VideoControl>
      )
    }

    function renderVolume() {
      return <VideoVolume volume={volume.value} onChange={changeVolume}></VideoVolume>
    }

    function renderFlip() {
      return (
        <VideoControl name={locale.value.flip} onClick={toggleFlip}>
          <Icon
            {...icons.value.flipX}
            scale={+(icons.value.flipX.scale || 1) * iconScale.value}
          ></Icon>
        </VideoControl>
      )
    }

    function renderPip() {
      if (!pipEnabled || !video.value) return null

      return (
        <VideoControl name={locale.value.requestPip} onClick={togglePip}>
          <Icon {...icons.value.pip} scale={+(icons.value.pip.scale || 1) * iconScale.value}></Icon>
        </VideoControl>
      )
    }

    function renderFullWindow() {
      return (
        <VideoControl name={locale.value.fullWindow} onClick={() => screen.value?.toggle('window')}>
          <Icon
            {...icons.value.fullWindow}
            scale={+(icons.value.fullWindow.scale || 1) * iconScale.value}
          ></Icon>
        </VideoControl>
      )
    }

    function renderFullBrowser() {
      return (
        <VideoControl
          name={locale.value.fullScreen}
          shortcut={'F'}
          onClick={() => screen.value?.toggle('browser')}
        >
          <Icon
            {...icons.value.fullScreen}
            scale={+(icons.value.fullScreen.scale || 1) * iconScale.value}
          ></Icon>
        </VideoControl>
      )
    }

    function renderControl(name: VideoControlConfig) {
      switch (name) {
        case 'play-prev':
          return renderPlayPrev()
        case 'play':
          return renderPlay()
        case 'play-next':
          return renderPlayNext()
        case 'refresh':
          return renderRefresh()
        case 'timer':
          return renderTimer()
        case 'play-rate':
          return renderPlayRate()
        case 'volume':
          return renderVolume()
        case 'flip':
          return renderFlip()
        case 'pip':
          return renderPip()
        case 'full-window':
          return renderFullWindow()
        case 'full-browser':
          return renderFullBrowser()
        default:
          return renderSlot(slots, `control-${name}`)
      }
    }

    function renderControls() {
      if (props.noControls) return null

      return (
        <div
          class={{
            [nh.be('controls')]: true,
            [nh.bem('controls', 'collapsed')]: hasPlayed.value && !interacting.value
          }}
        >
          <section class={nh.be('controls-top')}>
            <VideoProgress
              time={currentTime.value}
              duration={duration.value}
              segments={segments.value}
              onChange={changeTime}
            ></VideoProgress>
          </section>
          <section class={nh.be('controls-bottom')}>
            <div class={nh.be('controls-left')}>
              {(props.controlLayout.left ?? videoDefaultControlLayout.left).map(renderControl)}
            </div>
            <div class={nh.be('controls-center')}>
              {(props.controlLayout.center ?? videoDefaultControlLayout.center).map(renderControl)}
            </div>
            <div class={nh.be('controls-right')}>
              {(props.controlLayout.right ?? videoDefaultControlLayout.right).map(renderControl)}
            </div>
          </section>
        </div>
      )
    }

    function renderMain() {
      return (
        <div class={nh.be('main')}>
          <div
            class={[nh.be('player'), flipped.value && nh.bem('player', 'flipped')]}
            onClick={togglePlaying}
          >
            {renderSlot(slots, 'player', {}, () => [
              <video
                {...props.videoAttrs}
                ref={video}
                class={nh.be('video')}
                src={props.src || props.videoAttrs?.src}
              >
                {renderSlot(slots, 'default')}
              </video>
            ])}
          </div>
          {!loadedData.value && (props.poster || slots.poster) && (
            <div class={nh.be('poster')}>
              {renderSlot(slots, 'poster', {}, () => [<img src={props.poster} />])}
            </div>
          )}
          <Transition name={nh.bs('state-effect')}>
            {stateShow.value && (
              <div class={nh.be('state')}>
                <Icon {...stateIcon.value} scale={+(stateIcon.value.scale || 1) * 5}></Icon>
              </div>
            )}
          </Transition>
          {renderControls()}
          {renderSlot(slots, 'extra')}
        </div>
      )
    }

    return () => {
      return (
        <FullScreen
          ref={screen}
          class={className.value}
          tabindex={'-1'}
          onToggle={() => wrapper.value?.focus()}
          onPointermove={handleInteract}
          onPointerleave={handlePointerLeave}
        >
          {{ default: renderMain }}
        </FullScreen>
      )
    }
  }
})
