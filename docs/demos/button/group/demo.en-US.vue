<template>
  <ButtonGroup>
    <Button> Button 1 </Button>
    <Button> Button 2 </Button>
    <Button> Button 3 </Button>
  </ButtonGroup>
  <br />
  <br />
  <ButtonGroup size="large">
    <Button> Button 1 </Button>
    <Button> Button 2 </Button>
    <Button> Button 3 </Button>
  </ButtonGroup>
  <br />
  <br />
  <ButtonGroup circle type="primary">
    <Tooltip reverse>
      <template #trigger>
        <Button> Button 1 </Button>
      </template>
      Button 1
    </Tooltip>
    <Tooltip reverse>
      <template #trigger>
        <Button> Button 2 </Button>
      </template>
      Button 2
    </Tooltip>
    <Tooltip reverse>
      <template #trigger>
        <Button type="warning">
          Button 3
        </Button>
      </template>
      Button 3
    </Tooltip>
  </ButtonGroup>
</template>
