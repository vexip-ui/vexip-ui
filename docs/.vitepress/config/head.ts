import type { HeadConfig } from 'vitepress'

const HOST_CHECK = "if (!location.host.includes('vexipui')) return;"

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
(function(w,d,s,l,i){${HOST_CHECK}w[l]=w[l]||[];w[l].push({'gtm.start':
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

const BAIDU_STAT = `
window._hmt = window._hmt || [];
(function() {
  ${HOST_CHECK}
  const hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?1a35ae01b3648fa8b858b3b221e73400";
  const s = document.getElementsByTagName("script")[0]; 
  s.parentNode ? s.parentNode.insertBefore(hm, s) : document.head.appendChild(hm);
})();
`

export function getHeadConfig(): HeadConfig[] {
  return [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/vexip-ui.svg' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],

    ['meta', { 'http-equiv': 'Expires', content: '0' }],
    ['meta', { 'http-equiv': 'Pragma', content: 'no-cache' }],
    ['meta', { 'http-equiv': 'Cache', content: 'no-cache' }],
    ['meta', { 'http-equiv': 'Cache-control', content: 'no-store,no-cache,must-revalidate' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Vexip UI' }],
    ['meta', { property: 'og:url', content: 'https://www.vexipui.com/' }],

    ['script', {}, BAIDU_STAT],
    ['script', {}, LANG_SCRIPT],
    ['script', {}, GOOGLE_MANAGER],
    ['script', {}, GOOGLE_GTAG],
    ['script', { async: 'true', src: 'https://www.googletagmanager.com/gtag/js?id=G-YDXQW4BVVX' }]
  ]
}
