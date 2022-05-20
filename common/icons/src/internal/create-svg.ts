import { defineComponent, h } from 'vue'

interface IconOptions {
  width: number,
  height: number,
  d?: string,
  points?: string,
  paths?: ({ d: string } & Record<string, any>)[],
  polygons?: ({ points: string } & Record<string, any>)[]
}

export function createSvg(name: string, options: IconOptions) {
  const { width, height, d, points, paths = [], polygons = [] } = options

  return defineComponent({
    name: name,
    setup() {
      return () => {
        return h(
          'svg',
          { viewBox: `0 0 ${width} ${height}` },
          (d ? [{ d }, ...paths] : paths)
            .map((path, index) => h('path', { fill: 'currentColor', ...path, key: index }))
            .concat(
              (points ? [{ points }, ...polygons] : polygons).map((polygon, index) =>
                h('polygon', { fill: 'currentColor', ...polygon, key: index })
              )
            )
        )
      }
    }
  })
}
