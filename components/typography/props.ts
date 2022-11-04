import { buildProps, omitProps, booleanProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { TypographyType, TitleLevel } from './symbol'

export const textProps = buildProps({
  type: String as PropType<TypographyType>,
  tag: String,
  delete: booleanProp,
  strong: booleanProp,
  italic: booleanProp,
  underline: booleanProp,
  code: booleanProp,
  mark: booleanProp,
  disabled: booleanProp,
  keyboard: booleanProp,
  thin: booleanProp,
  reversed: booleanProp
})

export type TextProps = ExtractPropTypes<typeof textProps>
export type TextCProps = ConfigurableProps<TextProps>

export const pProps = omitProps(textProps, ['tag', 'code'])

export type PProps = ExtractPropTypes<typeof pProps>
export type PCProps = ConfigurableProps<PProps>

export const strongProps = omitProps(textProps, ['tag', 'strong', 'code'])

export type StrongProps = ExtractPropTypes<typeof strongProps>
export type StrongCProps = ConfigurableProps<StrongProps>

export const titleProps = buildProps({
  type: String as PropType<TypographyType>,
  level: Number as PropType<TitleLevel>,
  top: booleanProp,
  marker: booleanProp,
  aligned: booleanProp,
  thin: booleanProp,
  markerType: String
})

export type TitleProps = ExtractPropTypes<typeof titleProps>
export type TitleCProps = ConfigurableProps<TitleProps>

export const hProps = omitProps(titleProps, ['level'])

export const h1Props = hProps
export const h2Props = hProps
export const h3Props = hProps
export const h4Props = hProps
export const h5Props = hProps
export const h6Props = hProps

export type HProps = ExtractPropTypes<typeof hProps>
export type HCProps = ConfigurableProps<HProps>

export type H1Props = HProps
export type H2Props = HProps
export type H3Props = HProps
export type H4Props = HProps
export type H5Props = HProps
export type H6Props = HProps

export type H1CProps = HCProps
export type H2CProps = HCProps
export type H3CProps = HCProps
export type H4CProps = HCProps
export type H5CProps = HCProps
export type H6CProps = HCProps

export const blockquoteProps = buildProps({
  type: String as PropType<TypographyType>
})

export type BlockquoteProps = ExtractPropTypes<typeof blockquoteProps>
export type BlockquoteCProps = ConfigurableProps<BlockquoteProps>

export const olProps = buildProps({
  type: String as PropType<'a' | 'A' | 'i' | 'I' | '1'>
})

export type OLProps = ExtractPropTypes<typeof olProps>
export type OLCProps = ConfigurableProps<OLProps>

export const ulProps = buildProps({
  listStyle: String
})

export type ULProps = ExtractPropTypes<typeof ulProps>
export type ULCProps = ConfigurableProps<ULProps>
