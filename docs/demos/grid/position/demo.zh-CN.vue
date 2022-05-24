<template>
  <Grid :gap="8">
    <Cell :left="0" :right="8">
      <div class="content">
        width-8
      </div>
    </Cell>
    <Cell :width="8" :left="16">
      <div class="content">
        width-8
      </div>
    </Cell>
    <Cell :width="8" :top="1" :right="16">
      <div class="content">
        width-8
      </div>
    </Cell>
    <Cell :width="8" :top="2">
      <div class="content">
        width-8
      </div>
    </Cell>
    <Cell :width="8" :top="2" :left="16">
      <div class="content">
        width-8
      </div>
    </Cell>
  </Grid>
</template>

<style>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 48px;
  color: #fff;
  background-color: #339af0;
  border-radius: 4px;
}
</style>
