import type { InjectionKey } from 'vue'

export interface FrameAreaState {
  fencing: boolean,
  top: number,
  left: number,
  width: number,
  height: number
}

export const FRAME_AREA_STATE: InjectionKey<FrameAreaState> = Symbol('FRAME_AREA_STATE')
