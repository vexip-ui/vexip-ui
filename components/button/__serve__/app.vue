<template>
  <template v-for="(meta, index) in renderMeta" :key="index">
    <div :style="{ padding: meta.ghost ? '20px' : '0', backgroundColor: meta.ghost ? '#345' : undefined }">
      <template v-for="(type) in types" :key="type">
        <Button
          :type="type"
          :simple="meta.simple"
          :ghost="meta.ghost"
          :disabled="meta.disabled"
        >
          {{ type.charAt(0).toLocaleLowerCase() + type.substring(1) }}
        </Button>
      </template>
    </div>
    <br />
  </template>
  <Button type="primary" icon="search">
    搜索
  </Button>
  <Button type="primary" icon="search"></Button>
  <Button circle type="primary" icon="search">
    搜索
  </Button>
  <Button circle type="primary" icon="search"></Button>
  <br />
  <br />
  <ButtonGroup>
    <Button>
      按钮一
    </Button>
    <Button>
      按钮一
    </Button>
    <Button>
      按钮三
    </Button>
  </ButtonGroup>
</template>

<script setup lang="ts">
import { Button } from '..'
import { ButtonGroup } from '@/components/button-group'

import '@/common/icons/search'

const renderMeta = [
  { ghost: false, simple: false, disabled: false },
  { ghost: false, simple: false, disabled: true },
  { ghost: false, simple: true, disabled: false },
  { ghost: false, simple: true, disabled: true },
  { ghost: true, simple: false, disabled: false },
  { ghost: true, simple: false, disabled: true }
]

const types = [
  'default',
  'primary',
  'dashed',
  'text',
  'info',
  'success',
  'warning',
  'error'
] as const
</script>
