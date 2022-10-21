<template>
  <Space vertical>
    <Pagination :total="50" :page-size="10" size="small"></Pagination>
    <Pagination :total="50" :page-size="10"></Pagination>
    <Pagination :total="50" :page-size="10" size="large"></Pagination>
    <Pagination :total="50" :page-size="10" style="--vxp-pagination-size: 40px;"></Pagination>
  </Space>
</template>
