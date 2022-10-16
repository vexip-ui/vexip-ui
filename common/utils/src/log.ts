function logOnce(message: string, cache: Set<string>, logFn: (...data: any[]) => void) {
  if (message && !cache.has(message)) {
    logFn(message)
    cache.add(message)
  }
}

const infoCache = new Set<string>()

export function infoOnce(message: string, logFn = console.info) {
  logOnce(message, infoCache, logFn)
}

const warnCache = new Set<string>()

export function warnOnce(message: string, logFn = console.warn) {
  logOnce(message, warnCache, logFn)
}

const errorCache = new Set<string>()

export function errorOnce(message: string, logFn = console.warn) {
  logOnce(message, errorCache, logFn)
}
