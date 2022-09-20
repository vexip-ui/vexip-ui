<template>
  <Badge is-dot>
    <Button>Message</Button>
  </Badge>
  <Badge :content="11" style="margin-left: 8px;">
    <Button>Message</Button>
  </Badge>
  <br />
  <br />
  <Space>
    <Badge :content="12" type="primary"></Badge>
    <Badge :content="12" type="success"></Badge>
    <Badge :content="12" type="warning"></Badge>
    <Badge :content="12" type="info"></Badge>
    <Badge :content="12" type="disabled"></Badge>
  </Space>
</template>
