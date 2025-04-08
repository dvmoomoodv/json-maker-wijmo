<template>
  <transition name="slide">
    <div
      v-if="show"
      class="fixed top-0 right-0 w-full max-w-2xl h-full bg-white shadow-xl z-50 overflow-y-auto p-6"
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">📄 Vue 파일 미리보기</h2>
        <button @click="$emit('close')" class="text-gray-500 hover:text-black">✕</button>
      </div>

      <pre
        class="bg-black text-green-300 p-4 rounded text-sm overflow-x-auto whitespace-pre-wrap"
        >{{ vueCode }}</pre
      >

      <div class="flex justify-end mt-4">
        <button @click="copyCode" class="mr-2 bg-blue-600 text-white px-4 py-2 rounded">
          📋 복사
        </button>
        <button @click="downloadCode" class="bg-green-600 text-white px-4 py-2 rounded">
          ⬇️ 다운로드
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ColumnItem } from '@/utils/generateGridCode'
import { generateGridCode } from '@/utils/generateGridCode'

const props = defineProps<{ show: boolean; columns: ColumnItem[] }>()
const emit = defineEmits(['close'])

const vueCode = computed(() => generateGridCode(props.columns))

function copyCode() {
  navigator.clipboard.writeText(vueCode.value)
}

function downloadCode() {
  const blob = new Blob([vueCode.value], { type: 'text/plain' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'GeneratedGrid.vue'
  link.click()
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
