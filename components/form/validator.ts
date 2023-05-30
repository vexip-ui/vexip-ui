import { isColor, isDefined, isObject, isPromise, toDate, toNumber } from '@vexip-ui/utils'

// export type Trigger = 'blur' | 'change'

export type Types =
  | 'string'
  | 'number'
  | 'boolean'
  | 'int'
  | 'float'
  | 'array'
  | 'object'
  | 'date'
  | 'url'
  | 'color'
  | 'email'
type Range = [number, number]
type ValidatorResult = boolean | string | Error | Promise<boolean | string | Error>

export interface Rule<T = any> {
  // trigger?: Trigger,
  required?: boolean,
  type?: Types,
  length?: number,
  range?: Range,
  strict?: boolean,
  enums?: T[],
  message?: string,
  validator?(value: T, model: Record<string, any>): ValidatorResult
}

type TypeOptions = Pick<Rule, 'length' | 'range' | 'strict'>

const DEFAULT_MESSAGE = 'Validate failed'

const N_100_200 = '1\\d\\d|2([0-4]\\d|5[0-5])'
const IPV4_FIRST = `[1-9](\\d)?|${N_100_200}`
const IPV4_UNIT = `\\d{1,2}|${N_100_200}`
const IPV4_REG = `(?:${IPV4_FIRST})\\.(?:${IPV4_UNIT})\\.(?:${IPV4_UNIT})\\.(?:${IPV4_UNIT})`

const HOST_REG = '(?:[a-zA-Z0-9][\\w-]*\\.)?(?:[a-zA-Z0-9][\\w-]*)(?:\\.[a-zA-Z]+){1,2}'
const PARAM_REG =
  '(?:(?:[\\/]+[^\\?\\.]+)+)?(?:[\\/]*)?(\\?([^&\\.]+=[^&\\.]*)(&[^&\\.]+=[^&\\.]*)*)?(#.*)?'
const URL_REG = new RegExp(
  `^(?:[a-z]{2,5}:(\\/+)?)?\\/\\/((?:${IPV4_REG})|(?:${HOST_REG}))(?:${PARAM_REG})?$`
)

const EMAIL_REG = /^(?:[a-zA-Z0-9][\w-]*)@(?:[a-zA-Z0-9][\w-]*)(?:\.[a-zA-Z]+){1,2}$/

const TYPE_LIST = new Set([
  'string',
  'number',
  'boolean',
  'int',
  'float',
  'array',
  'object',
  'date',
  'url',
  'color',
  'email'
] as Types[])

export async function validate(
  rules: Rule | Rule[],
  value: unknown,
  model: Record<string, unknown>,
  validateAll = true,
  defaultMsg = DEFAULT_MESSAGE
) {
  if (!Array.isArray(rules)) {
    rules = [rules]
  }

  const errors: string[] = []

  for (const rule of rules as Rule[]) {
    const { message = defaultMsg, validator } = rule

    if (typeof validator === 'function') {
      let result

      try {
        result = validator(value, model)

        if (isPromise(result)) {
          result = await result
        }
      } catch (error) {
        result = error instanceof Error ? error.message : error
      }

      if (result !== true) {
        const errorMessage = typeof result === 'string' ? result : message

        errors.push(errorMessage)

        if (!validateAll) break
      }
    }

    if (rule.required && !validateRequirement(value)) {
      errors.push(message)

      if (!validateAll) break
    }

    if (isDefined(value) && value !== '') {
      if (rule.enums && !validateEnumeration(value, rule.enums)) {
        errors.push(message)

        if (!validateAll) break
      }

      if (rule.type && !validateType(value, rule.type, rule)) {
        errors.push(message)

        if (!validateAll) break
      }
    }
  }

  return errors
}

export function validateRequirement(value: any) {
  return !(
    !isDefined(value) ||
    value.toString().trim() === '' ||
    (Array.isArray(value) && !value.length) ||
    (isObject(value) && !Object.keys(value).length)
  )
}

export function validateEnumeration<T>(value: T | T[], options: T[]) {
  if (!Array.isArray(options) || !options.length) return true

  if (Array.isArray(value)) {
    const enumSet = new Set(options)

    for (const item of value) {
      if (!enumSet.has(item)) {
        return false
      }
    }

    return true
  } else {
    return options.includes(value)
  }
}

export function validateType(value: unknown, type: Types, options: TypeOptions = {}) {
  if (!TYPE_LIST.has(type)) return true

  switch (type) {
    case 'string':
      return validateString(value, options.length, options.range)
    case 'number':
      return validateNumber(value, options.strict, options.length, options.range)
    case 'boolean':
      return validateBoolean(value, options.strict)
    case 'int':
      return validateInt(value, options.strict, options.length, options.range)
    case 'float':
      return validateFloat(value, options.strict, options.length, options.range)
    case 'array':
      return Array.isArray(value)
    case 'object':
      return isObject(value)
    case 'date':
      return validateDate(value, options.strict)
    case 'url':
      return validateUrl(value)
    case 'color':
      return typeof value === 'string' && isColor(value)
    case 'email':
      return validateEmail(value)
  }
}

export function validateString(value: unknown, length?: number, range?: Range) {
  if (typeof value !== 'string') return false

  if (isDefined(length) && value.length !== length) {
    return false
  }

  if (Array.isArray(range)) {
    const [min, max] = range

    if (min && value.length < min) return false

    if (max && value.length > max) return false
  }

  return true
}

export function validateNumber(value: unknown, strict?: boolean, length?: number, range?: Range) {
  if (strict) {
    if (typeof value !== 'number') return false
  } else {
    value = Number(value)

    if (Number.isNaN(value)) return false
  }

  const number = value as number

  if (isDefined(length) && number.toString().length !== length) {
    return false
  }

  if (Array.isArray(range)) {
    const [min, max] = range

    if (isDefined(min) && number < min) return false

    if (isDefined(max) && number > max) return false
  }

  return true
}

export function validateBoolean(value: unknown, strict?: boolean) {
  if (!strict) {
    if (typeof value === 'string') {
      return value === 'true' || value === 'false'
    }

    if (typeof value === 'number') {
      return value === 1 || value === 0
    }
  }

  return typeof value === 'boolean'
}

export function validateInt(value: unknown, strict?: boolean, length?: number, range?: Range) {
  if (validateNumber(value, strict, length, range)) {
    const number = toNumber(value as any)

    return Math.ceil(number) === number
  }

  return false
}

export function validateFloat(value: unknown, strict?: boolean, length?: number, range?: Range) {
  if (validateNumber(value, strict, length, range)) {
    const number = toNumber(value as any)

    return strict ? Math.ceil(number) !== number : number.toString().includes('.')
  }

  return false
}

export function validateDate(value: unknown, strict?: boolean) {
  if (strict && !(value instanceof Date)) {
    return false
  }

  try {
    toDate(value as any)
  } catch (e) {
    return false
  }

  return true
}

export function validateUrl(value: unknown) {
  return typeof value === 'string' && URL_REG.test(value)
}

export function validateEmail(value: unknown) {
  return typeof value === 'string' && EMAIL_REG.test(value)
}
