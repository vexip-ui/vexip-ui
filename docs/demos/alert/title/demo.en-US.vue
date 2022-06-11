<template>
  <div>
    <Alert title="Alert Title">
      Some content to alert
    </Alert>
    <Alert type="success" title="Alert Title">
      Some content to alert
    </Alert>
    <Alert type="warning">
      <template #title>
        Alert Title
      </template>
      Some content to alert
    </Alert>
    <Alert type="error">
      <template #title>
        Alert Title
      </template>
      Some content to alert
    </Alert>
  </div>
</template>
