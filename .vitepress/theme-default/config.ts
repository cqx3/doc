import { MenuItemWithLink, MenuItemChildWithChildren } from './types/menu'
import { SocialLink } from './types/socialLink'

export interface MultiSidebarConfig {
  [path: string]: SidebarGroup[]
}

export type SidebarConfig = SidebarGroup[] | MultiSidebarConfig

export interface SidebarGroup {
  text: string
  items: MenuItemWithLink[]
}

export type NavItem = NavItemWithLink | NavItemWithChildren

export type NavItemWithLink = MenuItemWithLink & {
  activeMatch?: string
}

export interface NavItemWithChildren {
  text?: string
  activeMatch?: string
  items: (NavItemWithLink | MenuItemChildWithChildren)[]
}

export interface Config {
  // 外观选项，以启用/禁用亮/暗模式
  appearance?: boolean
  // 显示在导航栏末尾,比如github之类的
  socialLinks?: SocialLink[]
  // 导航菜单配置项
  nav?: NavItem[]
  // 侧边栏配置项
  sidebar?: SidebarConfig
  // 编辑完整链接，xx/docs#next，默认是mian
  editLink?: {
    repo?: string
    text: string
  }
  footer?: {
    license?: {
      text: string
      link: string
    }
    copyright?: string
  }
}
