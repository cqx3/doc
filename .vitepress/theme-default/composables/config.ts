import { useData } from 'vitepress'
import { MenuItem, MenuItemChild } from '../types/menu'
import {
  Config,
  MultiSidebarConfig,
  SidebarConfig,
  SidebarGroup
} from '../config'
import { normalizeLink } from '../support/utils'
import {
  Component,
  computed,
  defineComponent,
  h,
  inject,
  InjectionKey,
  provide,
  Ref
} from 'vue'

const configSymbol: InjectionKey<Ref<Config>> = Symbol('config')

export function useConfig() {
  return {
    config: inject(configSymbol)!
  }
}

function normalizeMenuItem<T extends MenuItem | MenuItemChild>(
  item: T
): T {
  if ('link' in item) {
    return Object.assign({}, item, {
      link: normalizeLink(item.link)
    })
  } else {
    return Object.assign({}, item, {
      items: item.items.map(normalizeMenuItem)
    })
  }
}

function normalizeSideBar(sidebar: SidebarConfig): SidebarConfig {
  if (Array.isArray(sidebar)) {
    return sidebar.map(normalizeMenuItem)
  } else {
    const ret: MultiSidebarConfig = {}
    for (const key in sidebar) {
      ret[key] = normalizeSideBar(sidebar[key]) as SidebarGroup[]
    }
    return ret
  }
}

function resolveConfig(config: Config): Config {
  return Object.assign({ appearance: true }, config, {
    nav: config.nav?.map(normalizeMenuItem),
    sidebar: config.sidebar && normalizeSideBar(config.sidebar)
  })
}

// 提供解析主题配置，方便整个应用程序中重用相同的计算引用，而不是每个组件中重新创建一个
export function withConfigProvider(App: Component) {
  return defineComponent({
    name: 'VPConfigProvider',
    setup(_, { slots }) {
      const { theme } = useData()
      const config = computed(() => resolveConfig(theme.value))
      provide(configSymbol, config)
      return () => h(App, null, slots)
    }
  })
}
