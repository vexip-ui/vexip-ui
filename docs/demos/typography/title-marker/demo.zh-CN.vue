<template>
  <div style="position: relative; padding-inline-start: 16px">
    <div
      :style="{
        position: 'absolute',
        top: '0',
        bottom: '0',
        insetInlineStart: '0',
        width: '16px',
        backgroundColor: 'var(--vxp-fill-color-humble)'
      }"
    ></div>
    <H4 marker top>
      标题
    </H4>
    <H4 marker type="success">
      标题
    </H4>
    <H4 marker aligned type="error">
      标题
    </H4>
    <H4 marker aligned marker-type="primary">
      标题
    </H4>
    <H4 marker type="info" marker-type="warning">
      标题
    </H4>
    <H4 marker marker-type="pink">
      标题
    </H4>
  </div>
</template>
