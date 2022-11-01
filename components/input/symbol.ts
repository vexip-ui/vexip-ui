export type InputType = 'text' | 'password' | 'date' | 'datetime' | 'time'

export interface InputExposed {
  input?: HTMLElement | null,
  focus: () => void,
  blur: () => void
}
