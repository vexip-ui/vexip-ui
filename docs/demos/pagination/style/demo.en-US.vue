<template>
  <Space vertical>
    <Pagination :total="100" :page-size="10"></Pagination>
    <Pagination :total="100" :page-size="10" background></Pagination>
    <Pagination :total="100" :page-size="10" no-border></Pagination>
    <Pagination
      :total="100"
      :page-size="10"
      background
      no-border
    ></Pagination>
  </Space>
</template>
