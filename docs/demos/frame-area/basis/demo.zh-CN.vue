<template>
  <FrameArea style="width: 800px; height: 500px">
    <FrameAreaItem> Item 1 </FrameAreaItem>
    <div style="display: flex">
      <FrameAreaItem>
        <div>Item 2</div>
      </FrameAreaItem>
      <FrameAreaItem wrapper>
        <div>Item 3</div>
        <Button>Item 3 Button</Button>
      </FrameAreaItem>
    </div>
  </FrameArea>
</template>

<script setup lang="ts"></script>
