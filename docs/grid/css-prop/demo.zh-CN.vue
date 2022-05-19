<template>
  <Grid :gap="8" :columns="['300px', 'repeat(2, 1fr)']">
    <Cell :width="1" :height="2">
      <div class="content">
        width-1, height-2 (300px)
      </div>
    </Cell>
    <Cell v-for="n in 4" :key="n" :width="1">
      <div class="content">
        width-1 (1fr)
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
