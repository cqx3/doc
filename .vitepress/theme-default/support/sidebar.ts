import { SidebarConfig, SidebarGroup } from '../config'
import { ensureStartingSlash } from './utils'

export function getSidebar(
  sidebar: SidebarConfig,
  path: string
): SidebarGroup[] {
  if (Array.isArray(sidebar)) {
    return sidebar
  }
  path = ensureStartingSlash(path)
  // 保证路由地址都有个斜杠 /xxx
  for (const dir in sidebar) {
    if (path.startsWith(ensureStartingSlash(dir))) {
      return sidebar[dir]
    }
  }
  return []
}
