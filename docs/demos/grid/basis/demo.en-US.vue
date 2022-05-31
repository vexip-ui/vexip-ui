<template>
  <Grid :gap="8">
    <Cell>
      <div class="content">
        width-24
      </div>
    </Cell>
  </Grid>
  <br />
  <Grid :gap="8" :columns="24">
    <Cell :width="12">
      <div class="content">
        width-12
      </div>
    </Cell>
    <Cell :width="12">
      <div class="content">
        width-12
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
