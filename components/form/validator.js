import { isNull, isDefined, isPromise, getType } from '../../src/utils/common'
import { toDate } from '../../src/utils/date'
import { isColor } from '../../src/utils/color'

const DEFAULT_MESSAGE = '验证未通过'

const N_100_200 = '1\\d\\d|2([0-4]\\d|5[0-5])'
const IPV4_FIRST = `[1-9](\\d)?|${N_100_200}`
const IPV4_UNIT = `\\d{1,2}|${N_100_200}`
const IPV4_REG = `(?:${IPV4_FIRST})\\.(?:${IPV4_UNIT})\\.(?:${IPV4_UNIT})\\.(?:${IPV4_UNIT})`

const HOST_REG =
  '(?:[a-zA-Z0-9][\\w-]*\\.)?(?:[a-zA-Z0-9][\\w-]*)(?:\\.[a-zA-Z]+){1,2}'
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
])

export async function validate(rules, value, model, validateAll = true) {
  if (!Array.isArray(rules)) {
    rules = [rules]
  }

  const errors = []

  for (const rule of rules) {
    const { message = DEFAULT_MESSAGE, validator } = rule

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
      if (rule.enum && !validateEnumeration(value, rule.enum)) {
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

export function validateRequirement(value) {
  return !(
    isNull(value) ||
    value.toString().trim() === '' ||
    (Array.isArray(value) && !value.length) ||
    !Object.keys(value).length
  )
}

export function validateEnumeration(value, options) {
  if (!Array.isArray(options) || !options.length) return true

  options = new Set(options)

  if (Array.isArray(value)) {
    for (const item of value) {
      if (!options.has(item)) {
        return false
      }
    }

    return true
  } else {
    return options.has(value)
  }
}

export function validateType(value, type, options = {}) {
  if (!TYPE_LIST.has(type)) return true

  switch (type) {
    case 'string':
      return validateString(value, options.length, options.range)
    case 'number':
      return validateNumber(
        value,
        options.strict,
        options.length,
        options.range
      )
    case 'boolean':
      return validateBoolean(value, options.strict)
    case 'int':
      return validateInt(value, options.strict, options.length, options.range)
    case 'float':
      return validateFloat(value, options.strict, options.length, options.range)
    case 'array':
      return Array.isArray(value)
    case 'object':
      return getType(value) === 'object'
    case 'date':
      return validateDate(value, options.strict)
    case 'url':
      return validateUrl(value)
    case 'color':
      return isColor(value)
    case 'email':
      return validateEmail(value)
  }
}

export function validateString(value, length, range) {
  if (typeof value !== 'string') return false

  if (length && value.length !== length) {
    return false
  }

  if (Array.isArray(range)) {
    const [min, max] = range

    if (min && value.length < min) return false

    if (max && value.length > max) return false
  }

  return true
}

export function validateNumber(value, strict, length, range) {
  if (strict) {
    if (typeof value !== 'number') return false
  } else {
    value = Number(value)

    if (Number.isNaN(value)) return false
  }

  if (isDefined(length) && value !== length) {
    return false
  }

  if (Array.isArray(range)) {
    const [min, max] = range

    if (isDefined(min) && value < min) return false

    if (isDefined(max) && value > max) return false
  }

  return true
}

export function validateBoolean(value, strict) {
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

export function validateInt(value, strict, length, range) {
  return (
    validateNumber(value, strict, length, range) && Math.ceil(value) !== value
  )
}

export function validateFloat(value, strict, length, range) {
  return !validateInt(value, strict, length, range)
}

export function validateDate(value, strict) {
  if (strict && !(value instanceof Date)) {
    return false
  }

  try {
    toDate(value)
  } catch (e) {
    return false
  }

  return true
}

export function validateUrl(value) {
  return typeof value === 'string' && URL_REG.test(value)
}

export function validateEmail(value) {
  return typeof value === 'string' && EMAIL_REG.test(value)
}
