<template>
  <div class="bubble-example">
    <div class="left">
      <Avatar circle>
        老板
      </Avatar>
      <Bubble placement="right-start">
        小伙子
      </Bubble>
    </div>
    <div class="left">
      <Avatar circle>
        老板
      </Avatar>
      <Bubble placement="right-start">
        今天天气这么好，不来加个班嘛？
      </Bubble>
    </div>
    <div class="right">
      <Bubble placement="left-start">
        你在逗我嘛？
      </Bubble>
      <Avatar circle>
        打工人
      </Avatar>
    </div>
  </div>
</template>

<style scoped>
.bubble-example {
  width: 500px;
  padding: 20px;
  border: var(--vxp-border-base);
  border-radius: var(--vxp-radius-base);
}

.bubble-example .left,
.bubble-example .right {
  display: flex;
  padding: 10px 0;
}

.bubble-example .right {
  justify-content: flex-end;
}

.bubble-example .vxp-bubble {
  max-width: 360px;
}
</style>
