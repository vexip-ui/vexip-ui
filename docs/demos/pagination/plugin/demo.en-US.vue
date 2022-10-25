<template>
  <Space vertical>
    <Pagination :total="100" :page-size="10" :plugins="['total', , 'size', 'jump']"></Pagination>
    <Pagination :total="1e5" :page-size="10" :plugins="['total', , 'size', 'jump']"></Pagination>
  </Space>
</template>
