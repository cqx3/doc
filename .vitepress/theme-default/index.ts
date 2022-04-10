import './styles/index.css'
import { withConfigProvider } from './composables/config'
import { Theme } from 'vitepress'
import VPApp from './components/VPApp.vue'
import VPNotFound from './components/VPNotFound.vue'

const VPTheme: Theme = {
  Layout: withConfigProvider(VPApp),
  NotFound: VPNotFound
}
export { VPTheme }
