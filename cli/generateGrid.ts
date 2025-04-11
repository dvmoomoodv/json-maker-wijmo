import type { ParsedField } from './parseUstra.ts'

export function generateGridCode(modelName: string, fields: ParsedField[]): string {
  const colLines = fields
    .map((field) => {
      return `    <wj-flex-grid-column
      header="${capitalize(field.name)}"
      binding="${field.name}"
      data-type="${field.type}"
    />`
    })
    .join('\n')

  return `<template>
  <wj-flex-grid :itemsSource="data">
${colLines}
  </wj-flex-grid>
</template>

<script setup lang="ts">
import '@grapecity/wijmo.vue2.grid'
import { ref } from 'vue'

const data = ref<${modelName}[]>([])
</script>

<script lang="ts">
import type { ${modelName} } from './${modelName}'
</script>
`
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
