<template>
  <Row style="max-width: 840px;gap:30px;">
    <Result
      title="Success"
      type="success"
      description="success..."
    >
      <template #extra>
        <Button type="primary">
          返回
        </Button>
      </template>
    </Result>
    <Result
      title="Warning"
      type="warning"
      description="warning..."
    >
      <template #extra>
        <Button type="warning">
          返回
        </Button>
      </template>
    </Result>
    <Result title="Error" type="error" description="error...">
      <template #extra>
        <Button type="error">
          返回
        </Button>
      </template>
    </Result>
    <Result title="Info" type="info" description="info...">
      <template #extra>
        <Button type="info">
          返回
        </Button>
      </template>
    </Result>
  </Row>
</template>
