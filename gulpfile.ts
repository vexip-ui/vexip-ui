import { resolve } from 'path'
// import chalk from 'chalk'
import { dest, src } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import { emptyDir } from './scripts/utils'

const outDir = resolve(__dirname, 'css')

export default () => {
  emptyDir(outDir)

  const sass = gulpSass(dartSass)

  return src(resolve(__dirname, 'style/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(outDir))
}
