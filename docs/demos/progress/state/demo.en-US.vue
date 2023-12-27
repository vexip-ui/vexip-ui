<template>
  <div style="max-width: 500px">
    <Progress :percentage="30"></Progress>
    <Progress :percentage="75" state="success"></Progress>
    <Progress :percentage="45" state="warning"></Progress>
    <Progress :percentage="60" state="error"></Progress>
  </div>
</template>
