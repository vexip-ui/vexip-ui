# Renderer

You may need it when you want to use render functions in `<template>`.

## Demos

:::demo renderer/basis

### Simple Example

Helps to use render function in template for content rendering.

Works better with the `tsx` syntax.

:::

:::demo renderer/slot

### Slot Usage

Sometimes, you want to be able to define variables in the template and use them multiple times. Unfortunately, Vue has no official feature support yet.

This example demonstrates how to use the Renderer component to store variables in the template and reuse them.

:::

## API

### Renderer Props

| Name     | Type                      | Description                                                      | Default     | Since |
| -------- | ------------------------- | ---------------------------------------------------------------- | ----------- | ----- |
| renderer | `(...args: any[]) => any` | Set the render function                                          | `null`      | -     |
| data     | `Record<string, any>`     | Set the parameters that need to be passed to the render function | `undefined` | -     |
