<template>
  <div class="bubble-example">
    <div class="left">
      <Avatar circle>
        Boss
      </Avatar>
      <Bubble placement="right-start">
        Hey guy
      </Bubble>
    </div>
    <div class="left">
      <Avatar circle>
        Boss
      </Avatar>
      <Bubble placement="right-start">
        The weather is so nice today, why not come to work overtime?
      </Bubble>
    </div>
    <div class="right">
      <Bubble placement="left-start">
        Are you kidding me?
      </Bubble>
      <Avatar circle>
        You
      </Avatar>
    </div>
  </div>
</template>

<style>
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
