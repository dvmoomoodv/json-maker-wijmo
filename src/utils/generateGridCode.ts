export interface ColumnItem {
  header: string
  binding: string
  dataType: string
  isReadOnly: boolean
  width: number
}

export function toCamelCase(str: string) {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
}

export function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function generateGridCode(columns: ColumnItem[]): string {
  //   const colTemplates = columns
  //     .map((col) => {
  //       return `<wj-flex-grid-column
  //     :header=\"${col.header}\"
  //     :binding=\"${col.binding}\"
  //     :data-type=\"${col.dataType}\"
  //     :is-read-only=\"${col.isReadOnly}\"
  //     :width=\"${col.width}\"
  //   />`
  //     })
  //     .join('\n')
  const colTemplates = columns
    .map((col) => {
      return `<wj-flex-grid-column
    :header=\"${col.header}\"
    :binding=\"${col.binding}\"
    :isReadOnly=\"${col.isReadOnly}\"
    :width=\"${col.width}\"
  />`
    })
    .join('\n')
  //   return `<template>
  //     <wj-flex-grid :itemsSource=\"data\">
  //       ${colTemplates}
  //     </wj-flex-grid>
  //   </template>

  //   <script setup lang=\"ts\">
  //   import '@grapecity/wijmo.vue2.grid'
  //   import { ref } from 'vue'

  //   const data = ref<any[]>([])
  //   </script>`

  return `<template>
<wj-flex-grid :itemsSource=\"data\">
  ${colTemplates}
</wj-flex-grid>
</template>
`
}
