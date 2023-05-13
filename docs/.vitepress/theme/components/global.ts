import type { Component } from 'vue'
import Demo from './demo.vue'
import AudioButton from './audio-button.vue'
import IconDemo from './icon-demo.vue'
import Contributor from './contributor.vue'

export const Global: [string, Component][] = [
  ['Demo', Demo],
  ['AudioButton', AudioButton],
  ['IconDemo', IconDemo],
  ['Contributor', Contributor]
]
