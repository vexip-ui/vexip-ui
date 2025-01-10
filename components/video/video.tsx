import { FullScreen } from '@/components/full-screen'
import { Icon } from '@/components/icon'
import { Progress } from '@/components/progress'
import { Renderer } from '@/components/renderer'

import {
  Transition,
  computed,
  defineComponent,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  renderSlot,
  shallowReadonly,
  watch
} from 'vue'

import { emitEvent, useIcons, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import VideoControl from './video-control.vue'
import VideoProgress from './video-progress.vue'
import VideoTimer from './video-timer.vue'
import VideoVolume from './video-volume.vue'
import { createSlotRender, useListener, useModifier, useSetTimeout } from '@vexip-ui/hooks'
import { decide, decimalLength, isClient, noop, toCapitalCase, toNumber } from '@vexip-ui/utils'
import { videoProps } from './props'
import { VIDEO_STATE, videoDefaultControlLayout, videoDefaultShortcuts } from './symbol'

import type { FullScreenExposed, FullScreenType } from '@/components/full-screen'
import type { VideoControlConfig, VideoPlaybackRate } from './symbol'

export default defineComponent({
  name: 'Video',
  props: videoProps,
  emits: ['update:src', 'update:time', 'update:volume', 'update:playback-rate'],
  setup(_props, { slots, emit, expose }) {
    const props = useProps('video', _props, {
      src: {
        static: true,
        default: ''
      },
      srcList: {
        static: true,
        default: null
      },
      noControls: false,
      videoAttrs: null,
      time: {
        static: true,
        default: 0
      },
      volume: 1,
      playbackRate: 1,
      playbackRates: () => [0.5, 1, 1.25, 1.5, 2],
      // kernel: null,
      controlLayout: () => videoDefaultControlLayout,
      poster: '',
      video: {
        static: true,
        default: null
      },
      segments: () => [],
      loading: false,
      loadingIcon: null,
      loadingEffect: null,
      shortcuts: () => ({}),
      slots: () => ({})
    })

    const nh = useNameHelper('video')
    const locale = useLocale('video')
    const icons = useIcons()

    const { timer } = useSetTimeout()

    const pipEnabled = isClient && document.pictureInPictureEnabled

    const currentSrc = ref(
      props.src || props.srcList?.[0] || (props.videoAttrs?.src as string) || ''
    )
    const playing = ref(false)
    const currentTime = ref(props.time)
    const canPlay = ref(false)
    const duration = ref(0)
    const currentVolume = ref(props.volume) // 0 ~ 1
    const pip = ref(false)
    const stateShow = ref(true)
    // record the state is invisible (whether finish transition)
    const stateHidden = ref(false)
    const currentRate = ref(props.playbackRate)
    // const loadedData = ref(false)
    const interacting = ref(false)
    const hasPlayed = ref(false)
    const flipped = ref(false)
    const iconScale = ref(1.3)

    const screen = ref<FullScreenExposed>()
    const wrapper = computed(() => screen.value?.wrapper as HTMLElement | undefined)
    const video = ref<HTMLVideoElement>()
    const volumeRef = ref<InstanceType<typeof VideoVolume>>()

    const placeId = computed(() => screen.value?.placeId)
    const full = computed<false | FullScreenType>(() => screen.value?.full ?? false)
    const videoRef = computed<HTMLVideoElement | undefined>(() => video.value || props.video)

    const shortcutRecord = reactive({} as Record<string, () => void>)
    const shortcuts = computed(() => ({ ...videoDefaultShortcuts, ...props.shortcuts }))

    function addShortcut(key: string, cb: () => void) {
      if (shortcutRecord[key]) {
        console.warn(`[vexip-ui:Video] duplicate shortcut key '${key}' and it will be ignored`)

        return noop
      }

      shortcutRecord[key] = cb

      return () => {
        delete shortcutRecord[key]
      }
    }

    useModifier({
      target: wrapper,
      passive: false,
      onKeyDown: (event, modifier) => {
        if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return

        decide(
          [
            [
              () => modifier.up,
              () => {
                currentVolume.value = Math.min(1, currentVolume.value + 0.05)
              }
            ],
            [
              () => modifier.down,
              () => (currentVolume.value = Math.max(0, currentVolume.value - 0.05))
            ],
            [
              () => modifier.right,
              () => (currentTime.value = Math.min(duration.value, currentTime.value + 5))
            ],
            [() => modifier.left, () => (currentTime.value = Math.max(0, currentTime.value - 5))],
            [() => modifier[shortcuts.value.volume || 'M'], () => volumeRef.value?.toggleMute()],
            ...Object.keys(shortcutRecord).map(key => {
              return [() => modifier[key], shortcutRecord[key]] as [() => boolean, () => void]
            })
          ],
          { afterMatchAny: modifier.resetAll }
        )
      }
    })

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('loading')]: props.loading
        }
      ]
    })
    const playIcon = computed(() => (playing.value ? icons.value.pause : icons.value.play))
    const stateIcon = computed(() => {
      return playing.value ? icons.value.pauseState : icons.value.playState
    })
    const rateOptions = computed(() => {
      const rates = props.playbackRates
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
    const percent = computed(() => {
      return duration.value ? (currentTime.value / duration.value) * 100 : 0
    })
    const srcFullList = computed(() => {
      const src = props.src || (props.videoAttrs?.src as string) || ''

      if (src && props.srcList && !props.srcList.includes(src)) {
        return [src].concat(props.srcList)
      }

      return props.srcList || [src]
    })
    const srcIndex = computed(() => {
      return srcFullList.value ? srcFullList.value.indexOf(currentSrc.value) : -1
    })

    const slotParams = shallowReadonly(
      reactive({
        playing,
        currentTime,
        currentVolume,
        currentRate,
        interacting,
        flipped,
        canPlay,
        duration,
        pip,
        hasPlayed,
        togglePlaying,
        togglePip,
        changeRate,
        changeTime,
        changeVolume,
        toggleFull
      })
    )

    watch(
      () => props.src,
      value => {
        resetMetaState()
        currentSrc.value = value
      },
      { flush: 'pre' }
    )
    watch(
      () => props.time,
      value => {
        changeTime(value, false)
      }
    )
    watch(
      () => props.volume,
      value => {
        changeVolume(value, false)
      }
    )
    watch(
      () => props.playbackRate,
      value => {
        changeRate(value, false)
      }
    )
    watch(playing, value => {
      if (value) {
        requestAnimationFrame(() => {
          stateShow.value = false
        })
      } else {
        stateShow.value = true
      }
    })
    watch(canPlay, value => {
      if (!value) {
        playing.value = false
      }
    })
    watch(stateShow, value => {
      if (value) {
        stateHidden.value = false
      }
    })

    onMounted(() => {
      nextTick(() => {
        if (isClient && !videoRef.value && screen.value?.wrapper) {
          video.value = (screen.value.wrapper as HTMLElement).querySelector('video') ?? undefined
        }

        if (videoRef.value && currentTime.value > 0) {
          videoRef.value.currentTime = currentTime.value
        }
      })
    })

    provide(VIDEO_STATE, reactive({ placeId, iconScale, addShortcut }))

    useListener(videoRef, 'canplay', () => {
      canPlay.value = true
      duration.value = videoRef.value?.duration ?? 0
    })
    useListener(videoRef, 'timeupdate', () => {
      currentTime.value = videoRef.value?.currentTime ?? 0

      emit('update:time', currentTime.value)
      emitEvent(props.onTimeChange, currentTime.value)
    })
    useListener(videoRef, 'ended', handleEnded)
    // useListener(videoRef, 'loadeddata', () => {
    //   loadedData.value = true
    // })
    useListener(videoRef, 'enterpictureinpicture', () => {
      pip.value = true
      emitEvent(props.onTogglePip, true)
    })
    useListener(videoRef, 'leavepictureinpicture', () => {
      pip.value = false
      emitEvent(props.onTogglePip, false)
    })

    expose({
      currentSrc,
      playing,
      currentTime,
      duration,
      pip,
      interacting,
      stateHidden,
      wrapper,
      video,
      resetMetaState
    })

    function togglePlaying(value = !playing.value) {
      if (!canPlay.value) {
        playing.value = false

        return
      }

      playing.value = value

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

    function changeRate(rate: number, dispatch = true) {
      currentRate.value = rate

      if (videoRef.value) {
        videoRef.value.playbackRate = rate
      }

      if (dispatch) {
        emit('update:playback-rate', rate)
        emitEvent(props.onRateChange, rate)
      }
    }

    function changeTime(time: number, dispatch = true) {
      currentTime.value = time

      if (videoRef.value && time !== videoRef.value.currentTime) {
        videoRef.value.currentTime = time
        time = videoRef.value.currentTime
      }

      if (dispatch) {
        emit('update:time', time)
        emitEvent(props.onTimeChange, time)
      }
    }

    function changeVolume(volume: number, dispatch = true) {
      currentVolume.value = volume

      if (videoRef.value) {
        videoRef.value.volume = volume
      }

      if (dispatch) {
        emit('update:volume', volume)
        emitEvent(props.onVolumeChange, volume)
      }
    }

    function toggleFlip(value = !flipped.value, dispatch = true) {
      flipped.value = value

      if (dispatch) {
        emitEvent(props.onToggleFlip, flipped.value)
      }
    }

    function onFullChange(full: false | FullScreenType) {
      nextTick(() => {
        wrapper.value?.focus()
        emitEvent(props.onToggleFull, full)
      })
    }

    function resetMetaState() {
      playing.value = false
      currentTime.value = 0
      canPlay.value = false
      duration.value = 0
      // loadedData.value = false
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

    function adjustSrc(amount: number) {
      const list = srcFullList.value

      if (props.srcList) {
        currentSrc.value = list[(srcIndex.value + amount + list.length) % list.length]
        emit('update:src', currentSrc.value)
      }
    }

    function playPrev() {
      adjustSrc(-1)
      emitEvent(props.onPrev)
    }

    function playNext() {
      adjustSrc(1)
      emitEvent(props.onNext)
    }

    function toggleFull(type: FullScreenType) {
      screen.value?.toggle(type)
    }

    function handleRefresh() {
      emitEvent(props.onRefresh)
    }

    function renderPlayPrev() {
      return (
        <VideoControl
          class={nh.be('play-prev')}
          label={locale.value.playPrev}
          shortcut={shortcuts.value['play-prev']}
          disabled={!!props.srcList && !srcIndex.value}
          onClick={playPrev}
        >
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
          class={nh.be('play')}
          label={playing.value ? locale.value.pause : locale.value.play}
          shortcut={shortcuts.value.play}
          disabled={!canPlay.value}
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
        <VideoControl
          class={nh.be('play-next')}
          label={locale.value.playNext}
          shortcut={shortcuts.value['play-next']}
          disabled={!!props.srcList && srcIndex.value === srcFullList.value.length - 1}
          onClick={playNext}
        >
          <Icon
            {...icons.value.playNext}
            scale={+(icons.value.playNext.scale || 1) * iconScale.value}
          ></Icon>
        </VideoControl>
      )
    }

    function renderRefresh() {
      return (
        <VideoControl
          class={nh.be('play-refresh')}
          label={locale.value.refresh}
          shortcut={shortcuts.value.refresh}
          onClick={handleRefresh}
        >
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
          disabled={!canPlay.value}
          onChange={changeTime}
        ></VideoTimer>
      )
    }

    function renderPlaybackRate() {
      return (
        <VideoControl
          class={nh.be('playback-rate')}
          type={'select'}
          value={currentRate.value}
          options={rateOptions.value}
          onSelect={(rate: VideoPlaybackRate) => changeRate(rate.value)}
        ></VideoControl>
      )
    }

    function renderVolume() {
      return (
        <VideoVolume
          ref={volumeRef}
          volume={currentVolume.value}
          onChange={changeVolume}
        ></VideoVolume>
      )
    }

    function renderFlip() {
      return (
        <VideoControl
          class={nh.be('flip')}
          label={locale.value.flip}
          shortcut={shortcuts.value.flip}
          onClick={toggleFlip}
        >
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
        <VideoControl
          class={nh.be('pip')}
          label={pip.value ? locale.value.exitPip : locale.value.requestPip}
          shortcut={shortcuts.value.pip}
          disabled={!canPlay.value}
          onClick={togglePip}
        >
          <Icon {...icons.value.pip} scale={+(icons.value.pip.scale || 1) * iconScale.value}></Icon>
        </VideoControl>
      )
    }

    function renderFullWindow() {
      return (
        <VideoControl
          class={nh.be('full-window')}
          label={full.value === 'window' ? locale.value.fullWindowExit : locale.value.fullWindow}
          shortcut={shortcuts.value['full-window']}
          onClick={() => toggleFull('window')}
        >
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
          class={nh.be('full-browser')}
          label={full.value === 'browser' ? locale.value.fullScreenExit : locale.value.fullScreen}
          shortcut={shortcuts.value['full-browser']}
          onClick={() => toggleFull('browser')}
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
        case 'playback-rate':
          return renderPlaybackRate()
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
          return createSlotRender(slots, [
            `control-${name}`,
            `control${toCapitalCase(name as string)}`
          ])?.(slotParams)
      }
    }

    function renderControls() {
      if (props.noControls) {
        return (
          <Progress
            class={nh.be('progress-line')}
            percentage={percent.value}
            stroke-width={1}
            info-type={'none'}
          ></Progress>
        )
      }

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
            onClick={() => togglePlaying()}
          >
            {renderSlot(slots, 'player', {}, () => [
              <video
                {...props.videoAttrs}
                ref={video}
                class={nh.be('video')}
                src={currentSrc.value || props.videoAttrs?.src}
              >
                {renderSlot(slots, 'default')}
              </video>
            ])}
          </div>
          {!hasPlayed.value && (props.poster || slots.poster || props.slots.poster) && (
            <div class={nh.be('poster')}>
              {renderSlot(slots, 'poster', undefined, () => [
                <Renderer renderer={props.slots.poster}>
                  <img src={props.poster} />
                </Renderer>
              ])}
            </div>
          )}
          <Transition name={nh.bs('state-effect')} onAfterLeave={() => (stateHidden.value = true)}>
            {canPlay.value && stateShow.value && (
              <div class={nh.be('state')}>
                {renderSlot(slots, 'state', { active: stateShow.value }, () => [
                  <Icon {...stateIcon.value} scale={+(stateIcon.value.scale || 1) * 5}></Icon>
                ])}
              </div>
            )}
          </Transition>
          <Transition name={nh.ns('fade')}>
            {((!canPlay.value && !stateShow.value) || (props.loading && stateHidden.value)) && (
              <div class={nh.be('loading')}>
                {renderSlot(slots, 'loading', {}, () => [
                  <Icon
                    {...icons.value.loading}
                    icon={props.loadingIcon || icons.value.loading.icon}
                    label={'loading'}
                    effect={props.loadingEffect || icons.value.loading.effect}
                    scale={+(stateIcon.value.scale || 1) * 5}
                  ></Icon>
                ])}
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
          onToggle={onFullChange}
          onPointermove={handleInteract}
          onPointerleave={handlePointerLeave}
        >
          {{ default: renderMain }}
        </FullScreen>
      )
    }
  }
})
