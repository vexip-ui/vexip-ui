<template>
  <div style="position: relative; padding-inline-start: 16px">
    <div
      :style="{
        position: 'absolute',
        top: '0',
        bottom: '0',
        left: '0',
        width: '16px',
        backgroundColor: 'var(--vxp-fill-color-humble)'
      }"
    ></div>
    <H4 marker top>
      Title
    </H4>
    <H4 marker type="success">
      Title
    </H4>
    <H4 marker aligned type="error">
      Title
    </H4>
    <H4 marker aligned marker-type="primary">
      Title
    </H4>
    <H4 marker type="info" marker-type="warning">
      Title
    </H4>
    <H4 marker marker-type="pink">
      Title
    </H4>
  </div>
</template>
