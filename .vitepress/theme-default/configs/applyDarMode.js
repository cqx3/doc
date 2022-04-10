;(() => {
  const dark = 'dark'
  const saved = localStorage.getItem('wow-theme-appearance')
  const query = window.matchMedia(`(prefers-color-scheme: ${dark})`)
  const isDark =
    !saved || saved === 'auto' ? query.matches : saved === dark
  isDark && document.documentElement.classList.add(dark)
})()
