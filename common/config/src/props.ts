export type ComponentSize = 'small' | 'default' | 'large'

export function createSizeProp() {
  return {
    default: 'default' as ComponentSize,
    validator(value: ComponentSize) {
      return ['small', 'default', 'large'].includes(value)
    }
  }
}

export type ComponentState = 'default' | 'success' | 'error' | 'warning'

export function createStateProp() {
  return {
    default: 'default' as ComponentState,
    validator(value: ComponentState) {
      return ['default', 'success', 'error', 'warning'].includes(value)
    }
  }
}
