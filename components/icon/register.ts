export interface IconOptions {
  width: number,
  height: number,
  d?: string,
  points?: string,
  paths?: ({ d: string } & Record<string, any>)[],
  polygons?: ({ points: string } & Record<string, any>)[]
}

export const iconMap: Map<string, Required<Omit<IconOptions, 'd' | 'points'>>> = new Map()

export const register = (icons: Record<string, IconOptions>) => {
  Object.keys(icons).forEach(name => {
    if (iconMap.has(name)) return

    const icon = icons[name]
    const { paths = [], polygons = [], d, points, width, height } = icon

    if (d) {
      paths.push({ d })
    }

    if (points) {
      polygons.push({ points })
    }

    iconMap.set(name, { paths, polygons, width, height })
  })
}
