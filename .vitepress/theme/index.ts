import { h } from 'vue'
import { VPTheme } from '../theme-default'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    return h(VPTheme.Layout, null)
  }
})
