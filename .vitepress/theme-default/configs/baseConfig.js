module.exports = async () => ({
  head: [
    ['link', { rel: 'icon', href: '/icon.svg' }],
    [
      'script',
      {},
      require('fs').readFileSync(
        require('path').resolve(__dirname, './applyDarMode.js'),
        'utf-8'
      )
    ]
  ]
})
