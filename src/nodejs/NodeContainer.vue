<script setup lang="ts">
import { computed } from 'vue'
import { data, DataGroup } from './node.data'
import VPMap from '../../components/VPMap.vue'

const title = 'typeScript'
const filtered = computed(() => data as DataGroup[])
</script>

<template>
  <VPMap :title="title" :data="filtered" />
</template>
