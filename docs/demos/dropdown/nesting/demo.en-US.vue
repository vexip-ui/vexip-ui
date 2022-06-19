<template>
  <Dropdown trigger="click">
    <Button type="primary">
      Nesting
    </Button>
    <template #drop>
      <DropdownList>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <Dropdown trigger="click">
          <DropdownItem>
            Option 2
            <Icon :scale="0.8">
              <AngleRight></AngleRight>
            </Icon>
          </DropdownItem>
          <template #drop>
            <DropdownList>
              <DropdownItem>Son Option 1</DropdownItem>
              <DropdownItem disabled>
                Son Option 2
              </DropdownItem>
              <DropdownItem>Son Option 3</DropdownItem>
            </DropdownList>
          </template>
        </Dropdown>
        <DropdownItem>Option 4</DropdownItem>
      </DropdownList>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { AngleRight } from '@vexip-ui/icons'
</script>
