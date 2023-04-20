# Renderer

## Demos

You may need it when you want to use render functions in `<template>`.

:::demo renderer/basis

### Simple Example

Helps to use render function in template for content rendering.

Works better with the `tsx` syntax.

:::

## API

### Renderer Props

| Name     | Type                      | Description                                                      | Default     | Since |
| -------- | ------------------------- | ---------------------------------------------------------------- | ----------- | ----- |
| renderer | `(...args: any[]) => any` | Set the render function                                          | `null`      | -     |
| data     | `Record<string, any>`     | Set the parameters that need to be passed to the render function | `undefined` | -     |
