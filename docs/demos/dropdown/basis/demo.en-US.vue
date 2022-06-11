<template>
  <Dropdown>
    <Button type="primary">
      Dropdown
    </Button>
    <template #drop>
      <DropdownList>
        <DropdownItem name="Option 1">
          Option 1
        </DropdownItem>
        <DropdownItem name="Option 2" divided>
          Option 2
        </DropdownItem>
        <DropdownItem name="Option 3">
          Option 3
        </DropdownItem>
      </DropdownList>
    </template>
  </Dropdown>
</template>
