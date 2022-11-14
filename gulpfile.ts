import { resolve } from 'node:path'
import fs from 'fs-extra'
import { dest, src, parallel } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'

const { existsSync, emptyDir, mkdirSync } = fs

const cssDir = resolve(__dirname, 'css')
const themesDir = resolve(__dirname, 'themes')

function buildStyle() {
  ensureEmptyDir(cssDir)

  const sass = gulpSass(dartSass)

  return src(resolve(__dirname, 'style/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(cssDir))
}

function buildThemes() {
  ensureEmptyDir(themesDir)
  ensureEmptyDir(resolve(themesDir, 'dark'))

  const sass = gulpSass(dartSass)

  return src(resolve(__dirname, 'style/dark/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(resolve(themesDir, 'dark')))
}

export default parallel(buildStyle, buildThemes)

function ensureEmptyDir(dir: string) {
  existsSync(dir) ? emptyDir(dir) : mkdirSync(dir)
}
