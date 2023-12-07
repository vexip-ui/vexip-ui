<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { PropType } from 'vue'
import type { NavMenuItem } from '../types'

const props = defineProps({
  menu: {
    type: Object as PropType<NavMenuItem>,
    default: () => ({})
  }
})

const { t } = useI18n({ useScope: 'global' })

function openLink() {
  props.menu.link && window.open(props.menu.link)
}
</script>

<template>
  <li class="vxp-menu__item vxp-menu__item--no-icon" role="none">
    <a
      class="vxp-menu__label vxp-menu__label--marker-bottom"
      :href="menu.link"
      target="_blank"
      role="menuitem"
      tabindex="0"
      style="text-decoration: none"
      @keydown.space.stop.prevent="openLink"
    >
      <span class="vxp-menu__title">
        <slot>
          {{ menu.text || t(menu.i18n || menu.key) }}
        </slot>
      </span>
    </a>
  </li>
</template>
