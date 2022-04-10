import { withBase } from 'vitepress'
import { ref } from 'vue'

const outboundRE = /^[a-z]+:/i
const hashRE = /#.*$/
const inBrowser = typeof window !== 'undefined'
const hashRef = ref(inBrowser ? location.hash : '')
const extRe = /(index)?\.(md|html)$/

function isExternal(path: string): boolean {
  return outboundRE.test(path)
}

export function ensureStartingSlash(path: string): string {
  return /^\//.test(path) ? path : `/${path}`
}

export function normalizeLink(url: string): string {
  if (isExternal(url)) {
    return url
  }
  const { pathname, search, hash } = new URL(url, 'http://cq3w.com')
  return withBase(
    pathname.endsWith('/') || pathname.endsWith('.html')
      ? url
      : `${pathname.replace(/(\.md)?$/, '.html')}${search}${hash}`
  )
}

function normalize(path: string): string {
  return decodeURI(path).replace(hashRE, '').replace(extRe, '')
}

export function isActive(
  currentPath: string,
  matchPath?: string,
  asRegex = false
): boolean {
  if (matchPath === undefined) {
    return false
  }
  currentPath = normalize(`/${currentPath}`)
  if (asRegex) {
    return new RegExp(matchPath).test(currentPath)
  } else {
    if (normalize(matchPath) !== currentPath) {
      return false
    }
    const hashMatch = matchPath.match(hashRE)
    if (hashMatch) {
      return hashRef.value === hashMatch[0]
    }
    return true
  }
}
