import { Header } from 'vitepress'
import { onMounted, onUnmounted, onUpdated, Ref } from 'vue'
import { MenuItemWithLink } from '../types/menu'
import { useMediaQuery } from '@vueuse/core'

interface HeaderWithChildren extends Header {
  children?: Header[]
}
interface MenuItemWithLinkAndChildren extends MenuItemWithLink {
  children?: MenuItemWithLinkAndChildren[]
}

export function resolveHeaders(headers: Header[]) {
  return mapHeaders(groupHeaders(headers))
}

function mapHeaders(
  headers: HeaderWithChildren[]
): MenuItemWithLinkAndChildren[] {
  return headers.map((header) => ({
    text: header.title,
    link: `#${header.slug}`,
    children: header.children ? mapHeaders(header.children) : undefined
  }))
}
function groupHeaders(headers: Header[]): HeaderWithChildren[] {
  headers = headers.map((h) => Object.assign({}, h))
  let lastH2: HeaderWithChildren | undefined
  for (const h of headers) {
    if (h.level === 2) {
      lastH2 = h
    } else if (lastH2 && h.level <= 3) {
      ;(lastH2.children || (lastH2.children = [])).push(h)
    }
  }
  return headers.filter((h) => h.level === 2)
}

function throttleAndDebounce(fn: () => void, delay: number): () => void {
  let timeout: number
  let called = false
  return () => {
    timeout && clearTimeout(timeout)
    if (!called) {
      fn()
      called = true
      setTimeout(() => {
        called = false
      }, delay)
    } else {
      timeout = window.setTimeout(fn, delay)
    }
  }
}

const pageOffset = 56
function getAnchorTop(anchor: HTMLAnchorElement): number {
  return anchor.parentElement!.offsetTop - pageOffset - 15
}

function isAnchorActive(
  index: number,
  anchor: HTMLAnchorElement,
  nextAnchor: HTMLAnchorElement | undefined
): [boolean, string | null] {
  const scrollTop = window.scrollY
  if (index === 0 && scrollTop === 0) {
    return [true, null]
  }
  if (scrollTop < getAnchorTop(anchor)) {
    return [false, null]
  }
  if (!nextAnchor || scrollTop < getAnchorTop(nextAnchor)) {
    return [true, anchor.hash]
  }
  return [false, null]
}

export function useActiveAnchor(
  container: Ref<HTMLElement>,
  bg: Ref<HTMLElement>
) {
  const isOutlineEnabled = useMediaQuery('(min-width: 1280px)')
  function setActiveLink(): void {
    if (!isOutlineEnabled.value) {
      return
    }
    const links = [].slice.call(
      document.querySelectorAll('.outline-link')
    ) as HTMLAnchorElement[]
    const anchors = [].slice
      .call(document.querySelectorAll('.content .header-anchor'))
      .filter((anchor: HTMLAnchorElement) =>
        links.some((link) => link.hash === anchor.hash)
      ) as HTMLAnchorElement[]
    if (
      anchors.length &&
      window.scrollY + window.innerHeight === document.body.offsetHeight
    ) {
      activateLink(anchors[anchors.length - 1].hash)
      return
    }
    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i]
      const nextAnchor = anchors[i + 1]
      const [isActive, hash] = isAnchorActive(i, anchor, nextAnchor)
      if (isActive) {
        history.replaceState(null, document.title, hash ? hash : '')
        activateLink(hash)
        return
      }
    }
  }
  let prevActiveLink: HTMLAnchorElement | null = null
  function activateLink(hash: string | null): void {
    prevActiveLink && prevActiveLink.classList.remove('active')
    const activeLink = (prevActiveLink =
      hash === null
        ? null
        : (container.value.querySelector(
            `a[href="${decodeURIComponent(hash)}"]`
          ) as HTMLAnchorElement))
    if (activeLink) {
      activeLink.classList.add('active')
      bg.value.style.opacity = '1'
      bg.value.style.top = activeLink.offsetTop + 5 + 'px'
    } else {
      bg.value.style.opacity = '0'
      bg.value.style.top = '5px'
    }
  }
  const onScroll = throttleAndDebounce(setActiveLink, 100)
  onMounted(() => {
    requestAnimationFrame(setActiveLink)
    window.addEventListener('scroll', onScroll)
  })
  onUpdated(() => {
    activateLink(location.hash)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })
}
