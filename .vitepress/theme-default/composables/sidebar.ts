import { useData, useRoute } from 'vitepress'
import { computed } from 'vue'
import { getSidebar } from '../support/sidebar'
import { useConfig } from './config'

export function useSidebar() {
  const { frontmatter } = useData()
  const { config } = useConfig()
  const route = useRoute()

  const sidebar = computed(() => {
    const sidebarConfig = config.value.sidebar
    const relativePath = route.data.relativePath
    return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : []
  })

  const hasSidenar = computed(
    () => frontmatter.value.sidebar !== false && sidebar.value.length > 0
  )
  return { sidebar, hasSidenar }
}
