<template>
  <Grid :gap="16" :columns="24">
    <Cell v-for="n in 12" :key="n" :width="6">
      <div class="content">
        width-6
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
