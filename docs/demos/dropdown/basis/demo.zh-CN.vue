<template>
  <Dropdown>
    <Button type="primary">
      下拉菜单
    </Button>
    <template #drop>
      <DropdownList>
        <DropdownItem name="选项一">
          选项一
        </DropdownItem>
        <DropdownItem name="选项二" divided>
          选项二
        </DropdownItem>
        <DropdownItem name="选项三">
          选项三
        </DropdownItem>
      </DropdownList>
    </template>
  </Dropdown>
</template>
