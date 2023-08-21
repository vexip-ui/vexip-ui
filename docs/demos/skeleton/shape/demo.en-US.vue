<template>
  <Skeleton :width="200" :height="40"></Skeleton>
  <Skeleton :width="200" :height="40" round></Skeleton>
  <Skeleton :height="40" circle></Skeleton>
  <br />
  <br />
  <Skeleton :width="200" :height="160" image></Skeleton>
  <Skeleton
    :width="200"
    :height="160"
    image
    round
  ></Skeleton>
  <Skeleton :height="160" image circle></Skeleton>
</template>

<style scoped>
.vxp-skeleton {
  margin-inline-end: 10px;
}
</style>
