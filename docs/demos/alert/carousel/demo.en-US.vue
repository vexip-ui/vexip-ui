<template>
  <Alert type="warning" :icon="Bullhorn">
    <Carousel
      class="alert-carousel"
      vertical
      :view-size="1"
      loop
      autoplay
      arrow="none"
      ignore-hover
      :height="30"
    >
      <CarouselItem> Some content to alert 1 </CarouselItem>
      <CarouselItem> Some content to alert 2 </CarouselItem>
      <CarouselItem> Some content to alert 3 </CarouselItem>
    </Carousel>
  </Alert>
</template>

<script setup lang="ts">
import { Bullhorn } from '@vexip-ui/icons'
</script>

<style scoped>
.alert-carousel:deep(.vxp-carousel__item) {
  display: flex;
  align-items: center;
  padding: 0 0 1px;
}
</style>

<style scoped>
.vxp-alert {
  max-width: 600px;
}
</style>
