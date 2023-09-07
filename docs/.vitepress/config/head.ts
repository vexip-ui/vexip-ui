import type { HeadConfig } from 'vitepress'

const LANG_SCRIPT = `
(() => {
  const lang = typeof navigator !== 'undefined'
    ? ['zh-CN', 'en-US'].find(l => l  === navigator.language) || 'zh-CN'
    : 'zh-CN'
  if (location.pathname === '/') {
    window.location.href = \`/\${lang}/\`
  }
})()
`

const GOOGLE_MANAGER = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WWH5JG2X');
`

const GOOGLE_GTAG = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-YDXQW4BVVX');
`

export function getHeadConfig(): HeadConfig[] {
  return [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vexip-ui.svg' }],

    ['meta', { 'http-equiv': 'Expires', content: '0' }],
    ['meta', { 'http-equiv': 'Pragma', content: 'no-cache' }],
    ['meta', { 'http-equiv': 'Cache', content: 'no-cache' }],
    ['meta', { 'http-equiv': 'Cache-control', content: 'no-store,no-cache,must-revalidate' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Vexip UI' }],
    ['meta', { property: 'og:url', content: 'https://www.vexipui.com/' }],

    ['script', {}, LANG_SCRIPT],
    ['script', {}, GOOGLE_MANAGER],
    ['script', {}, GOOGLE_GTAG],
    ['script', { async: 'true', src: 'https://www.googletagmanager.com/gtag/js?id=G-YDXQW4BVVX' }]
  ]
}
