<template>
  <div style="max-width: 500px">
    <Progress info-type="inside" :percentage="30" :stroke-width="20">
      百分之30
    </Progress>
    <Progress :percentage="68">
      68/100
    </Progress>
    <Progress info-type="bubble-top" :percentage="45" style="margin-top: 40px">
      进行中...
    </Progress>
  </div>
</template>
