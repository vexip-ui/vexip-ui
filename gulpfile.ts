import { resolve } from 'path'
// import chalk from 'chalk'
import { dest, src, parallel } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import { emptyDir, mkdirSync } from 'fs-extra'

const cssDir = resolve(__dirname, 'css')
const themesDir = resolve(__dirname, 'themes')

function buildStyle() {
  emptyDir(cssDir)

  const sass = gulpSass(dartSass)

  return src(resolve(__dirname, 'style/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(cssDir))
}

function buildThemes() {
  emptyDir(themesDir)
  mkdirSync(resolve(themesDir, 'dark'))

  const sass = gulpSass(dartSass)

  return src(resolve(__dirname, 'style/dark/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(resolve(themesDir, 'dark')))
}

export default parallel(buildStyle, buildThemes)
