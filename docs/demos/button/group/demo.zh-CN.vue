<template>
  <ButtonGroup>
    <Button> 按钮 1 </Button>
    <Button> 按钮 2 </Button>
    <Button> 按钮 3 </Button>
  </ButtonGroup>
  <br />
  <br />
  <ButtonGroup size="large">
    <Button> 按钮 1 </Button>
    <Button> 按钮 2 </Button>
    <Button> 按钮 3 </Button>
  </ButtonGroup>
  <br />
  <br />
  <ButtonGroup circle type="primary">
    <Tooltip reverse>
      <template #trigger>
        <Button> 按钮 1 </Button>
      </template>
      按钮 1
    </Tooltip>
    <Tooltip reverse>
      <template #trigger>
        <Button> 按钮 2 </Button>
      </template>
      按钮 2
    </Tooltip>
    <Tooltip reverse>
      <template #trigger>
        <Button type="warning">
          按钮 3
        </Button>
      </template>
      按钮 3
    </Tooltip>
  </ButtonGroup>
</template>
