<template>
  <Row>
    <Column :span="16">
      <div
        v-if="isRaw"
        ref="scroll"
        style="height: 400px; margin-right: 15px; overflow: auto; box-shadow: 0 0 1px;"
      >
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <p style="height: 50px;">
          内容内容内容内容内容内容
        </p>
        <template v-for="label in anchors" :key="label">
          <h2 :id="`anchor-${label}`">
            锚点 {{ label }}
          </h2>
          <p style="height: 50px;">
            内容内容内容内容内容内容
          </p>
          <p style="height: 50px;">
            内容内容内容内容内容内容
          </p>
          <p style="height: 50px;">
            内容内容内容内容内容内容
          </p>
        </template>
      </div>
      <div v-else style="margin-right: 15px; box-shadow: 0 0 1px;">
        <Scroll
          v-if="!isNative"
          ref="scroll"
          use-y-bar
          :height="400"
        >
          <p style="height: 50px;">
            内容内容内容内容内容内容
          </p>
          <p style="height: 50px;">
            内容内容内容内容内容内容
          </p>
          <p style="height: 50px;">
            内容内容内容内容内容内容
          </p>
          <template v-for="label in anchors" :key="label">
            <h2 :id="`anchor-${label}`">
              锚点 {{ label }}
            </h2>
            <p style="height: 50px;">
              内容内容内容内容内容内容
            </p>
            <p style="height: 50px;">
              内容内容内容内容内容内容
            </p>
            <p style="height: 50px;">
              内容内容内容内容内容内容
            </p>
          </template>
        </Scroll>
        <NativeScroll
          v-else
          ref="scroll"
          use-y-bar
          :height="400"
        >
          <p style="height: 50px;">
            内容内容内容内容内容内容
          </p>
          <p style="height: 50px;">
            内容内容内容内容内容内容
          </p>
          <p style="height: 50px;">
            内容内容内容内容内容内容
          </p>
          <template v-for="label in anchors" :key="label">
            <h2 :id="`anchor-${label}`">
              锚点 {{ label }}
            </h2>
            <p style="height: 50px;">
              内容内容内容内容内容内容
            </p>
            <p style="height: 50px;">
              内容内容内容内容内容内容
            </p>
            <p style="height: 50px;">
              内容内容内容内容内容内容
            </p>
          </template>
        </NativeScroll>
      </div>
    </Column>
    <Column :span="8">
      <div id="toc-anchor"></div>
      <Portal to="#toc-anchor">
        <Anchor v-model:active="active" marker>
          <AnchorLink to="#anchor-1">
            锚点 1
          </AnchorLink>
          <AnchorLink to="#anchor-2">
            锚点 2
          </AnchorLink>
          <AnchorLink to="#anchor-3">
            锚点 3
            <template #group>
              <AnchorLink to="#anchor-3-1">
                锚点 3-1
              </AnchorLink>
              <AnchorLink to="#anchor-3-2">
                锚点 3-2
              </AnchorLink>
              <AnchorLink to="#anchor-3-3">
                锚点 3-3
              </AnchorLink>
            </template>
          </AnchorLink>
        </Anchor>
      </Portal>
    </Column>
  </Row>
  <p>
    Anchor Active:
    <br />
    {{ active }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Column } from '@/components/column'
import { NativeScroll } from '@/components/native-scroll'
import { Portal } from '@/components/portal'
import { Row } from '@/components/row'
import { Scroll } from '@/components/scroll'
import Anchor from '../anchor.vue'
import AnchorLink from '../anchor-link.vue'

export default defineComponent({
  name: 'App',
  components: {
    Anchor,
    AnchorLink,
    Column,
    NativeScroll,
    Portal,
    Row,
    Scroll
  },
  data() {
    return {
      isRaw: false,
      isNative: true,
      active: '',
      anchors: ['1', '2', '3', '3-1', '3-2', '3-3']
    }
  }
})
</script>

<style lang="scss"></style>
