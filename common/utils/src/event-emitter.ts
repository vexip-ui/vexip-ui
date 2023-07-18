export type EventType = number | string | symbol
export type EventHandler = (...payload: any[]) => void
export type EventHandlerSet = Set<EventHandler>
export type EventHandlerMap = Map<EventType, EventHandlerSet>

export interface EventEmitter {
  on: (type: EventType, handler: EventHandler) => void,
  off: (type: EventType, handler: EventHandler) => void,
  clear: (type: EventType) => void,
  clearAll: () => void,
  emit: (type: EventType, ...payload: any[]) => void
}

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
