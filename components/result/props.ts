import { buildProps, sizeProp } from '@vexip-ui/config'

import type { ResultType } from './symbol'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const resultProps = buildProps({
  title: String,
  size: sizeProp,
  type: String as PropType<ResultType>,
  description: String,
  iconColor: String
})

export type ResultProps = ExtractPropTypes<typeof resultProps>
export type ResultCProps = ConfigurableProps<ExtractPropTypes<typeof resultProps>>
