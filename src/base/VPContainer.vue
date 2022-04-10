<script setup lang="ts">
import { computed } from 'vue'
import { data, DataGroup } from './base.data'
import VPMap from '../../components/VPMap.vue'

const title = '常用技术'
const filtered = computed(() => data as DataGroup[])
</script>

<template>
  <VPMap :title="title" :data="filtered" />
</template>
