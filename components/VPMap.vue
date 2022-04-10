<script setup lang="ts">
import { ref, computed } from 'vue'
import { CententGroup } from './type-map'

const dataset = defineProps<{
  title?: string,
  data: CententGroup[]
}>()
const query = ref('')
const filtered = computed(() => dataset.data)
function slugify(text: string): string {
  return (
    text
      // 匹配特殊字符全部替换-中杠符号
      .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g, '-')
      // 删除连续分隔符
      .replace(/\-{2,}/g, '-')
      // 删除前尾分隔符
      .replace(/^\-+|\-+$/g, '')
      // 确保不要以数字开头
      .replace(/^(\d)/, '_$1')
      // 统一转为小写
      .toLowerCase()
  )
}
</script>

<template>
  <div class="base-panel">
    <div class="base-header">
      <h1>{{ title }}</h1>
      <input class="base-filter" placeholder="搜索" v-model="query" />
    </div>

    <div v-for="el in filtered" :key="el.text" class="base-section">
      <h2 :id="slugify(el.text)">{{ el.text }}</h2>
      <div class="base-groups">
        <div v-for="item in el.items" :key="item.text" class="base-group">
          <h3>{{ item.text }}</h3>
          <ul>
            <li v-for="h in item.headers" :key="h">
              <a :href="item.link + '.html#' + slugify(h)">{{ h }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="!filtered.length" class="no-match">
      没有找到匹配"{{query}}"
    </div>
  </div>
</template>

<style scoped>
.base-panel {
  max-width: 1024px;
  margin: 0 auto;
  padding: 64px 32px;
}
.base-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.base-filter {
  border: 1px solid var(--vt-c-divider);
  border-radius: 8px;
  padding: 6px 12px;
}
.base-filter:focus {
  border-color: var(--vt-c-green-light);
}
h1,h2,h3 {
  font-weight: 600;
  line-height: 1;
}
h1,h2 {
  letter-spacing: -0.02em;
}
h1 {
  font-size: 38px;
}
h2 {
  font-size: 24px;
  color: var(--vt-c-text-1);
  margin: 36px 0;
  transition: color 0.5s;
  padding-top: 36px;
  border-top: 1px solid var(--vt-c-divider-light);
}
h3 {
  letter-spacing: -0.01em;
  color: var(--vt-c-green);
  font-size: 18px;
  margin-bottom: 1em;
  transition: color 0.5s;
}
.base-section {
  margin-bottom: 64px;
}
.base-groups a {
  font-size: 15px;
  font-weight: 500;
  line-height: 2;
  color: var(--vt-c-text-code);
  transition: color 0.5s;
}
.dark base-groups a {
  font-weight: 400;
}
.base-groups a:hover {
  color: var(--vt-c-green);
  transition: none;
}
.base-group {
  break-inside: avoid;
  margin-bottom: 20px;
  background-color: var(--vt-c-bg-soft);
  border-radius: 8px;
  padding: 28px 32px;
  transition: background-color 0.5s;
}
.no-match {
  font-size: 1.2em;
  color: var(--vt-c-text-3);
  text-align: center;
  margin-top: 36px;
  padding-top: 36px;
  border-top: 1px solid var(--vt-c-divider-light);
}
@media (min-width: 768px) {
  .base-groups {
    columns: 2;
  }
}
@media (min-width: 1024px) {
  .base-groups {
    columns: 3;
  }
}
</style>