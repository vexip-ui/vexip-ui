<template>
  <div style="max-width: 500px">
    <Progress info-type="inside" :percentage="30" :stroke-width="20">
      30 percent
    </Progress>
    <Progress :percentage="68">
      68/100
    </Progress>
    <Progress info-type="bubble-top" :percentage="45" style="margin-top: 40px">
      Processing...
    </Progress>
  </div>
</template>
