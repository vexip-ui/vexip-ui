export type EventType = number | string | symbol
export type EventHandler = (...payload: any[]) => void
export type EventHandlerSet = Set<EventHandler>
export type EventHandlerMap = Map<EventType, EventHandlerSet>

export interface EventEmitter {
  /**
   * 为指定的事件添加回调方法
   *
   * @param type 事件类型
   * @param handler 回调方法
   */
  on: (type: EventType, handler: EventHandler) => void,
  /**
   * 为指定的事件移除回调方法
   *
   * @param type 事件类型
   * @param handler 回调方法
   */
  off: (type: EventType, handler: EventHandler) => void,
  /**
   * 为指定的事件清除所有回调方法
   *
   * @param type 事件类型
   */
  clear: (type: EventType) => void,
  /**
   * 清除所有事件的所有回调方法
   */
  clearAll: () => void,
  /**
   * 派发特定的事件
   *
   * @param type 事件类型
   * @param payload 传入事件回调方法的参数
   */
  emit: (type: EventType, ...payload: any[]) => void
}

/**
 * 创建一个自定义的事件发射器
 *
 * @returns 事件发射器
 */
export function createEventEmitter() {
  const handlerMap: EventHandlerMap = new Map()

  return {
    on(type, handler) {
      const handlers = handlerMap.get(type)
      const added = handlers?.add(handler)

      if (!added) {
        handlerMap.set(type, new Set([handler]))
      }
    },
    off(type, handler) {
      const handlers = handlerMap.get(type)

      if (handlers) {
        handlers.delete(handler)
      }
    },
    clear(type) {
      const handlers = handlerMap.get(type)

      if (handlers) {
        handlers.clear()
      }
    },
    clearAll() {
      handlerMap.clear()
    },
    emit(type, ...payload) {
      const handlers = handlerMap.get(type)

      if (handlers) {
        handlers.forEach(handler => {
          handler(...payload)
        })
      }
    }
  } as EventEmitter
}
