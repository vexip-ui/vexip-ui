import { eventProp, wrapProps } from '@vexip-ui/config'

import type { ExtractPropTypes } from 'vue'

export const optionProps = wrapProps({
  value: {
    type: [String, Number],
    default: null
  },
  label: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  divided: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  hitting: {
    type: Boolean,
    default: false
  },
  noHover: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Boolean,
    default: false
  },
  onSelect: eventProp()
})

export type OptionProps = ExtractPropTypes<typeof optionProps>

export const optionGroupProps = wrapProps({
  label: {
    type: String,
    default: ''
  },
  divided: {
    type: Boolean,
    default: false
  }
})

export type OptionGroupProps = ExtractPropTypes<typeof optionGroupProps>
