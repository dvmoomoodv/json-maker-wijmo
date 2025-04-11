<template>
  <div class="border rounded p-4 mt-8 bg-white shadow-md">
    <h2 class="text-lg font-semibold mb-4">📊 Wijmo 미리보기</h2>

    <wj-flex-grid :itemsSource="data" class="w-full h-[400px]">
      <wj-flex-grid-column
        v-for="col in columns"
        :key="col.binding"
        :header="col.header"
        :binding="col.binding"
      />
      <!-- :data-type="col.dataType"
        :width="col.width"
        :is-read-only="col.isReadOnly" -->
    </wj-flex-grid>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { ColumnItem } from '@/utils/generateGridCode'
import { faker } from '@faker-js/faker'
import { WjFlexGrid, WjFlexGridColumn } from '@grapecity/wijmo.vue2.grid'

const props = defineProps<{ columns: ColumnItem[] }>()
const data = ref<any[]>([])

function generateFakeData(columns: ColumnItem[], count = 10): any[] {
  return Array.from({ length: count }, () => {
    const row: Record<string, any> = {}
    for (const col of columns) {
      switch (col.dataType) {
        case 'number':
          row[col.binding] = faker.number.int({ min: 1, max: 1000 })
          break
        case 'boolean':
          row[col.binding] = faker.datatype.boolean()
          break
        case 'date':
          row[col.binding] = faker.date.recent().toISOString()
          break
        case 'string':
        default:
          row[col.binding] = faker.word.words(2)
          break
      }
    }
    return row
  })
}

watch(
  () => props.columns,
  (cols) => {
    data.value = generateFakeData(cols)
  },
  { immediate: true },
)
</script>
