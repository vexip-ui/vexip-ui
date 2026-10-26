function logOnce(message: string, cache: Set<string>, logFn: (...data: any[]) => void) {
  if (message && !cache.has(message)) {
    logFn(message)
    cache.add(message)
  }
}

const infoCache = new Set<string>()

/**
 * 仅发出一次的提示消息
 *
 * @param message 消息内容
 * @param logFn 输出函数
 */
export function infoOnce(message: string, logFn = console.info) {
  logOnce(message, infoCache, logFn)
}

const warnCache = new Set<string>()

/**
 * 仅发出一次的警告消息
 *
 * @param message 消息内容
 * @param logFn 输出函数
 */
export function warnOnce(message: string, logFn = console.warn) {
  logOnce(message, warnCache, logFn)
}

const errorCache = new Set<string>()

/**
 * 仅发出一次的错误消息
 *
 * @param message 消息内容
 * @param logFn 输出函数
 */
export function errorOnce(message: string, logFn = console.warn) {
  logOnce(message, errorCache, logFn)
}
