<template>
  <div class="p-6 space-y-6 max-w-4xl mx-auto relative">
    <!-- 컬럼 입력 -->
    <div>
      <label class="block text-lg font-semibold mb-2">📝 컬럼 이름 입력</label>
      <textarea
        v-model="rawInput"
        rows="6"
        class="w-full border rounded p-2 text-sm font-mono"
      ></textarea>
    </div>

    <!-- 변환 버튼 -->
    <div class="flex justify-between items-center">
      <button
        @click="convertColumnNames"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        🪄 컬럼명 camelCase로 변환
      </button>
      <button
        @click="showDrawer = true"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        📄 Vue 파일 생성
      </button>
    </div>

    <!-- 컬럼별 설정 -->
    <div v-if="columns.length" class="space-y-4">
      <h2 class="text-lg font-semibold">🔧 컬럼 세부 설정</h2>
      <div v-for="(col, index) in columns" :key="col.binding" class="border p-4 rounded bg-gray-50">
        <div class="font-bold text-blue-600">{{ col.binding }}</div>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <label class="block">📦 Data Type</label>
            <select v-model="col.dataType" class="border rounded px-2 py-1 w-full">
              <option value="string">string</option>
              <option value="number">number</option>
              <option value="date">date</option>
              <option value="boolean">boolean</option>
            </select>
          </div>
          <div>
            <label class="block">📏 Width</label>
            <input
              type="number"
              v-model.number="col.width"
              class="border rounded px-2 py-1 w-full"
            />
          </div>
          <div>
            <label class="block">📝 Header (표시용 이름)</label>
            <input type="text" v-model="col.header" class="border rounded px-2 py-1 w-full" />
          </div>
          <div>
            <label class="inline-flex items-center mt-2">
              <input type="checkbox" v-model="col.isReadOnly" class="mr-2" /> Read Only
            </label>
          </div>
        </div>
      </div>
    </div>

    <VueCodeDrawer :show="showDrawer" :columns="columns" @close="showDrawer = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ColumnItem } from '@/utils/generateGridCode'
import { toCamelCase, capitalizeFirst } from '@/utils/generateGridCode'
import VueCodeDrawer from './VueCodeDrawer.vue'

const rawInput = ref('')
const showDrawer = ref(false)
const columns = ref<ColumnItem[]>([])

watch(rawInput, (val) => {
  const lines = val
    .split('\n')
    .map((line) => line.replace(/,/g, ' ').trim())
    .flatMap((line) => line.split(' '))
    .filter((line) => line)

  columns.value = lines.map((name) => {
    const camel = toCamelCase(name)
    return {
      header: capitalizeFirst(camel),
      binding: camel,
      dataType: 'string',
      isReadOnly: false,
      width: 120,
    }
  })
})

function convertColumnNames() {
  columns.value = columns.value.map((col) => {
    const camel = toCamelCase(col.binding)
    return { ...col, header: capitalizeFirst(camel), binding: camel }
  })
}
</script>
