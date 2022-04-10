import { defineConfigWithTheme, UserConfig } from 'vitepress'
import type { Config } from './theme-default/config'
import baseConfig from './theme-default/configs/baseConfig'
import nav from './configs/nav'
import sidebar from './configs/sidebar'

export default defineConfigWithTheme({
  extends: baseConfig as () => UserConfig<Config>,
  lang: 'zh-CN',
  title: '渐进式自学笔录',
  description: '个人笔记文档',
  srcDir: 'src',
  themeConfig: {
    nav,
    sidebar
  }
})
