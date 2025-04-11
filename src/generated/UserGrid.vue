<template>
  <wj-flex-grid :itemsSource="data">
    <wj-flex-grid-column
      header="Id number
  name text
  isActive boolean"
      binding="id number
  name text
  isActive boolean"
      data-type="string"
    />
  </wj-flex-grid>
</template>

<script setup lang="ts">
import '@grapecity/wijmo.vue2.grid'
import { ref } from 'vue'

const data = ref<User[]>([])
</script>

<script lang="ts">
import type { User } from './User'
</script>
