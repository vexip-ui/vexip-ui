<template>
  <Space vertical>
    <Text v-for="textType in types" :key="textType" :type="textType">
      {{ textType.charAt(0).toLocaleUpperCase() + textType.substring(1) }}
    </Text>
    <Text disabled>
      Disabled
    </Text>
    <Text
      v-for="textType in types"
      :key="textType"
      mark
      :type="textType"
    >
      {{ `Mark ${textType.charAt(0).toLocaleUpperCase() + textType.substring(1)}` }}
    </Text>
    <Text
      v-for="textType in types"
      :key="textType"
      mark
      reversed
      :type="textType"
    >
      {{ `Mark ${textType.charAt(0).toLocaleUpperCase() + textType.substring(1)} Reverse` }}
    </Text>
    <Text code>
      Code
    </Text>
    <Text underline>
      Underline
    </Text>
    <Text delete>
      Delete
    </Text>
    <Text strong>
      Strong
    </Text>
    <Text italic>
      Italic
    </Text>
    <Text keyboard>
      Keyboard
    </Text>
  </Space>
</template>

<script setup lang="ts">
const types = ['default', 'primary', 'info', 'success', 'warning', 'error'] as const
</script>
