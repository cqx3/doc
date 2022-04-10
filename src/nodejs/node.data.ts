import sidebar from '../../.vitepress/configs/sidebar'
import { CententGroup, getData } from '../../components/type-map'

export type DataGroup = CententGroup
export declare const data: CententGroup[]

export default {
  watch: './*.md',
  load(): CententGroup[] {
    return getData(sidebar['/nodejs/'] as CententGroup[])
  }
}
