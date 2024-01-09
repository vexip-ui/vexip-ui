<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { Message } from 'vexip-ui'
import { getDemoPrefix, setDemoPrefix } from '../common/demo-prefix'

defineProps({
  inputClass: {
    type: [String, Array, Object],
    default: null
  }
})

const { t } = useI18n({ useScope: 'global' })

const demoPrefix = ref(getDemoPrefix())
const invalid = ref(false)
const showError = computed(() => !!demoPrefix.value && invalid.value)

const validRE = /^[a-zA-Z]([0-9a-zA-Z]+)?$/

watch(demoPrefix, value => {
  invalid.value = !validRE.test((value || '').trim())
})

function handleSavePrefix() {
  if (showError.value) return

  setDemoPrefix(demoPrefix.value)
  Message.success(t('common.prefixChanged'))
}
</script>

<template>
  <div class="demo-prefix">
    <P
      class="demo-prefix__text"
      :type="showError ? 'error' : 'default'"
      style="margin: 0 0 16px; font-size: 15px"
    >
      {{ showError ? t('common.invalidPrefix') : t('common.changePrefix') }}
    </P>
    <Input
      v-model:value="demoPrefix"
      sync
      :class="['demo-prefix__input', inputClass]"
      placeholder="e.g. Vxp"
    >
      <template #after-action>
        <Button type="primary" :disabled="showError" @click="handleSavePrefix">
          {{ t('common.apply') }}
        </Button>
      </template>
    </Input>
  </div>
</template>

<style lang="scss">
.demo-prefix {
  display: flex;
  flex-direction: column;
}
</style>
