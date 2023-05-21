import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import express from 'express'
import { green } from 'kolorist'

import type { ViteDevServer } from 'vite'

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort?: number
) {
  const rootDir = path.dirname(fileURLToPath(import.meta.url))
  const resolve = (p: string) => path.resolve(rootDir, p)

  const indexProd = isProd ? fs.readFileSync(resolve('./dist/index.html'), 'utf-8') : ''

  /* eslint-disable operator-linebreak */
  const manifest = isProd
    ? // @ts-ignore
      (await import('./dist/client/ssr-manifest.json')).default
    : {}
  /* eslint-enable operator-linebreak */

  const app = express()

  let vite: ViteDevServer | undefined

  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        },
        hmr: {
          port: hmrPort
        }
      },
      appType: 'custom'
    })

    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use((await import('compression')).default())
    app.use(
      '/',
      // @ts-ignore
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false
      })
    )
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render

      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite!.transformIndexHtml(url, template)
        render = (await vite!.ssrLoadModule('/entry-server.ts')).render
      } else {
        template = indexProd
        // @ts-ignore
        render = (await import('./dist/server/entry-server.js')).render
      }

      const [appHtml, preloadLinks] = await render(url, manifest)
      const html = template
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--app-html-->', appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e: any) {
      vite && vite.ssrFixStacktrace(e)
      console.error(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app, vite }
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(6173, () => {
      console.log(`${green('SSR started at')} http://localhost:6173`)
    })
  )
}
