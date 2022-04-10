import { readFileSync, statSync } from 'fs'
import { join } from 'path'

const headersCache = new Map<
  string,
  { headers: string[]; timestamp: number }
>()

function parsePageHeaders(link: string) {
  const fullPath = join(__dirname, '../src', link) + '.md'
  const timestamp = statSync(fullPath).mtimeMs
  const cached = headersCache.get(fullPath)
  // 根据文件数据没有发生变化获取Map缓存数据
  if (cached && timestamp === cached.timestamp) {
    return cached.headers
  }
  const src = readFileSync(fullPath, 'utf-8')
  const h2s = src.match(/^## [^\n]+/gm)
  let headers: string[] = []
  if (h2s) {
    headers = h2s.map((h) =>
      h
        .slice(2)
        .replace(/<sup class=.*/, '')
        .replace(/\\</g, '<')
        .replace(/`([^`]+)`/g, '$1')
        .trim()
    )
  }
  headersCache.set(fullPath, { timestamp, headers })
  return headers
}

export interface CententGroup {
  text: string
  items: {
    text: string
    link: string
    headers: string[]
  }[]
}

export function getData(data: CententGroup[]) {
  return data.map((el) => ({
    text: el.text,
    items: el.items.map((item) => ({
      ...item,
      headers: parsePageHeaders(item.link)
    }))
  }))
}
