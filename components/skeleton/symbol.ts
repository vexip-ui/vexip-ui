import type { InjectionKey } from 'vue'
import type { ComponentSize } from '@vexip-ui/config'

export interface GroupState {
  size: ComponentSize,
  itemTag: string,
  activated: boolean,
  round: boolean,
  circle: boolean,
  block: boolean,
  loading: boolean,
}

export const GROUP_STATE = '__VXP_SKELETON_GROUP_STATE' as unknown as InjectionKey<GroupState>
