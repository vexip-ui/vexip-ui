<template>
  <FullScreen ref="fullScreen" v-slot="{ toggle }" style="background-color: white;">
    <div style="position: relative; border: 1px solid red;">
      <p>I am FullScreen Content</p>
      <div>
        <Button type="primary" @click="toggle('window')">
          Window
        </Button>
        <Button type="primary" @click="toggle('browser')">
          Browser
        </Button>
      </div>
    </div>
  </FullScreen>
</template>
