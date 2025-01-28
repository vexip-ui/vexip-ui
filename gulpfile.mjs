import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import fs from 'fs-extra'
import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'

const rootDir = resolve(fileURLToPath(import.meta.url), '..')

const { dest, parallel, series, src } = gulp
const { existsSync, emptyDirSync, mkdirSync } = fs

const cssDir = resolve(rootDir, 'css')
const themesDir = resolve(rootDir, 'themes')

function buildStyle() {
  ensureEmptyDir(cssDir)

  const sass = gulpSass(dartSass)

  return src(resolve(rootDir, 'style/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(cssDir))
}

function buildDark() {
  ensureEmptyDir(resolve(cssDir, 'dark'))

  const sass = gulpSass(dartSass)

  return src(resolve(rootDir, 'style/dark/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(resolve(cssDir, 'dark')))
}

function buildThemes() {
  ensureEmptyDir(themesDir)
  ensureEmptyDir(resolve(themesDir, 'dark'))

  const sass = gulpSass(dartSass)

  return src(resolve(rootDir, 'style/dark/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(resolve(themesDir, 'dark')))
}

export default parallel(series(buildStyle, buildDark), buildThemes)

/**
 * @param {string} dir
 */
function ensureEmptyDir(dir) {
  existsSync(dir) ? emptyDirSync(dir) : mkdirSync(dir)
}
