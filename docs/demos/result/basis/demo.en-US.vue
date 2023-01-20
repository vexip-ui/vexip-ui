<template>
  <Row style="gap: 30px;">
    <Result title="Success" type="success" description="success...">
      <template #extra>
        <Button type="primary">
          Back
        </Button>
      </template>
    </Result>
    <Result title="Warning" type="warning" description="warning...">
      <template #extra>
        <Button type="warning">
          Back
        </Button>
      </template>
    </Result>
    <Result title="Error" type="error" description="error...">
      <template #extra>
        <Button type="error">
          Back
        </Button>
      </template>
    </Result>
    <Result title="Info" type="info" description="info...">
      <template #extra>
        <Button type="info">
          Back
        </Button>
      </template>
    </Result>
  </Row>
</template>
