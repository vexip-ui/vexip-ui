<template>
  <Breadcrumb>
    <BreadcrumbItem>This Computer</BreadcrumbItem>
    <BreadcrumbItem>Document (D:)</BreadcrumbItem>
    <BreadcrumbItem>vexip-ui</BreadcrumbItem>

    <template #separator="{ label }">
      {{ label }}
    </template>
  </Breadcrumb>
</template>
