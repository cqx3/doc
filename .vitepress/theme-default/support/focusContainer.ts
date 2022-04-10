import { onUnmounted, ref, Ref, watch } from 'vue'

interface FocusContainerOption {
  elRef: Ref<HTMLElement | undefined>
  onFocus?: () => void
  onBlur?: () => void
}

let active = false
let listeners = 0
const focusedElement = ref<HTMLElement>()
export function useFocusContainer(options: FocusContainerOption) {
  const containsFocus = ref(false)
  if (typeof window !== 'undefined') {
    !active && activeFocusTracking()
    listeners++
    const unwatch = watch(focusedElement, (el) => {
      if (
        el === options.elRef.value ||
        options.elRef.value?.contains(el as Node)
      ) {
        containsFocus.value = true
        options.onFocus?.()
      } else {
        containsFocus.value = false
        options.onBlur?.()
      }
    })
    onUnmounted(() => {
      unwatch()
      listeners--
      if (!listeners) {
        deactiveFocusTracking()
      }
    })
  }
}

function activeFocusTracking() {
  document.addEventListener('focusin', handleFocusIn)
  active = true
  focusedElement.value = document.activeElement as HTMLElement
}
function deactiveFocusTracking() {
  document.removeEventListener('focusin', handleFocusIn)
}
function handleFocusIn() {
  focusedElement.value = document.activeElement as HTMLElement
}
