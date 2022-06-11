<template>
  <Dropdown trigger="click">
    <Button type="primary">
      嵌套使用
    </Button>
    <template #drop>
      <DropdownList>
        <DropdownItem>选项一</DropdownItem>
        <DropdownItem>选项二</DropdownItem>
        <Dropdown trigger="click">
          <DropdownItem>
            选项三
            <Icon :scale="0.8">
              <CaretRight></CaretRight>
            </Icon>
          </DropdownItem>
          <template #drop>
            <DropdownList>
              <DropdownItem>子选项一</DropdownItem>
              <DropdownItem disabled>
                子选项二
              </DropdownItem>
              <DropdownItem>子选项三</DropdownItem>
            </DropdownList>
          </template>
        </Dropdown>
        <DropdownItem>选项四</DropdownItem>
      </DropdownList>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { CaretRight } from '@vexip-ui/icons'
</script>
