export interface CaptchaPathOptions {
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number
}

export type CaptchaPathResult = [x: number, y: number, width: number, height: number]
export type CaptchaPathProcess = (options: CaptchaPathOptions) => CaptchaPathResult

export const captchaRectPath: CaptchaPathProcess = ({ ctx, x, y, width, height }) => {
  const side = Math.min(width, height) * 0.25
  const halfSide = side * 0.5

  ctx.moveTo(x - halfSide, y - halfSide)
  ctx.lineTo(x + halfSide, y - halfSide)
  ctx.lineTo(x + halfSide, y + halfSide)
  ctx.lineTo(x - halfSide, y + halfSide)
  ctx.closePath()

  return [x - halfSide - 2, y - halfSide - 2, side + 4, side + 4]
}

export const captchaPuzzlePath: CaptchaPathProcess = ({ ctx, x, y, width, height }) => {
  const side = Math.min(width, height) * 0.2
  const halfSide = side * 0.5
  const left = x - halfSide
  const top = y - halfSide
  const radius = side * 0.2

  ctx.moveTo(left, top)
  ctx.arc(left + halfSide, top - radius + 2, radius, 0.72 * Math.PI, 2.26 * Math.PI)
  ctx.lineTo(left + side, top)
  ctx.arc(left + side + radius - 2, top + halfSide, radius, 1.21 * Math.PI, 2.78 * Math.PI)
  ctx.lineTo(left + side, top + side)
  ctx.lineTo(left, top + side)
  ctx.arc(left + radius - 2, top + halfSide, radius + 0.4, 2.76 * Math.PI, 1.24 * Math.PI, true)
  ctx.lineTo(left, top)

  return [x - halfSide - 2, y - side * 0.9 - 2, side * 1.4 + 4, side * 1.4 + 4]
}
