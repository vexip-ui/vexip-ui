export interface CaptchaHollowOptions {
  ctx: CanvasRenderingContext2D,
  /**
   * The x coordinate of slide target center
   */
  x: number,
  /**
   * The y coordinate of slide target center
   */
  y: number,
  /**
   * Current canvas width
   */
  width: number,
  /**
   * Current canvas height
   */
  height: number
}

/**
 * Specify the react of the hollow's shape
 */
export type CaptchaHollowResult = [x: number, y: number, width: number, height: number]
export type CaptchaHollowProcess = (options: CaptchaHollowOptions) => CaptchaHollowResult

export type CaptchaHollowType = 'square' | 'puzzle' | 'shield' | 'heart'

export const squarePath: CaptchaHollowProcess = ({ ctx, x, y, width, height }) => {
  const side = Math.min(width, height) * 0.25
  const halfSide = side * 0.5

  ctx.moveTo(x - halfSide, y - halfSide)
  ctx.lineTo(x + halfSide, y - halfSide)
  ctx.lineTo(x + halfSide, y + halfSide)
  ctx.lineTo(x - halfSide, y + halfSide)
  ctx.closePath()

  return [x - halfSide - 2, y - halfSide - 2, side + 4, side + 4]
}

export const puzzlePath: CaptchaHollowProcess = ({ ctx, x, y, width, height }) => {
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

export const shieldPath: CaptchaHollowProcess = ({ ctx, x, y, width, height }) => {
  const side = Math.min(width, height) * 0.25
  const halfSide = side * 0.5

  ctx.moveTo(x, y - halfSide)
  ctx.bezierCurveTo(
    x,
    y - halfSide + side * 0.05,
    x - halfSide + side * 0.3,
    y - halfSide * 0.5 + side * 0.1,
    x - halfSide,
    y - halfSide * 0.7
  )
  ctx.bezierCurveTo(x - halfSide, y + side * 0.3, x - side * 0.1, y + halfSide, x, y + halfSide)
  ctx.bezierCurveTo(
    x + side * 0.1,
    y + halfSide,
    x + halfSide,
    y + side * 0.3,
    x + halfSide,
    y - halfSide * 0.7
  )
  ctx.bezierCurveTo(
    x + halfSide - side * 0.3,
    y - halfSide * 0.5 + side * 0.1,
    x,
    y - halfSide + side * 0.05,
    x,
    y - halfSide
  )

  return [x - halfSide - 2, y - halfSide - 2, side + 4, side + 4]
}

export const heartPath: CaptchaHollowProcess = ({ ctx, x, y, width, height }) => {
  const side = Math.min(width, height) * 0.25
  const halfSide = side * 0.5

  ctx.moveTo(x, y - side * 0.25)
  ctx.bezierCurveTo(
    x,
    y - side * 0.4,
    x - side * 0.1,
    y - halfSide,
    x - halfSide * 0.5,
    y - halfSide
  )
  ctx.bezierCurveTo(
    x - halfSide * 0.5 - side * 0.1,
    y - halfSide,
    x - halfSide,
    y - side * 0.4,
    x - halfSide,
    y - side * 0.2
  )
  ctx.bezierCurveTo(
    x - halfSide,
    y + side * 0.2,
    x - side * 0.05,
    y + halfSide * 0.8,
    x,
    y + halfSide * 0.8
  )
  ctx.bezierCurveTo(
    x + side * 0.05,
    y + halfSide * 0.8,
    x + halfSide,
    y + side * 0.2,
    x + halfSide,
    y - side * 0.2
  )
  ctx.bezierCurveTo(
    x + halfSide,
    y - side * 0.4,
    x + halfSide * 0.5 + side * 0.1,
    y - halfSide,
    x + halfSide * 0.5,
    y - halfSide
  )
  ctx.bezierCurveTo(x + side * 0.1, y - halfSide, x, y - side * 0.4, x, y - side * 0.25)

  return [x - halfSide - 2, y - halfSide - 2, side + 4, side * 0.9 + 4]
}
