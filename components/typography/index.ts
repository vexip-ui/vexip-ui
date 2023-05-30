import Title from './title'
import Text from './text'
import Blockquote from './blockquote'
import OL from './ol'
import UL from './ul'
import { H1, H2, H3, H4, H5, H6 } from './h'
import P from './p'
import Strong from './strong'

export { Title, Text, Blockquote, OL, UL, H1, H2, H3, H4, H5, H6, P, Strong }

export {
  titleProps,
  textProps,
  blockquoteProps,
  olProps,
  ulProps,
  h1Props,
  h2Props,
  h3Props,
  h4Props,
  h5Props,
  h6Props,
  pProps,
  strongProps
} from './props'

export type TitleExposed = InstanceType<typeof Title>
export type TextExposed = InstanceType<typeof Text>
export type BlockquoteExposed = InstanceType<typeof Blockquote>
export type OLExposed = InstanceType<typeof OL>
export type ULExposed = InstanceType<typeof UL>
export type H1Exposed = InstanceType<typeof H1>
export type H2Exposed = InstanceType<typeof H2>
export type H3Exposed = InstanceType<typeof H3>
export type H4Exposed = InstanceType<typeof H4>
export type H5Exposed = InstanceType<typeof H5>
export type H6Exposed = InstanceType<typeof H6>
export type PExposed = InstanceType<typeof P>
export type StrongExposed = InstanceType<typeof Strong>

export type {
  TextProps,
  TextCProps,
  PProps,
  PCProps,
  StrongProps,
  StrongCProps,
  TitleProps,
  TitleCProps,
  H1Props,
  H2Props,
  H3Props,
  H4Props,
  H5Props,
  H6Props,
  H1CProps,
  H2CProps,
  H3CProps,
  H4CProps,
  H5CProps,
  H6CProps,
  BlockquoteProps,
  BlockquoteCProps,
  OLProps,
  OLCProps,
  ULProps,
  ULCProps
} from './props'
export type { TypographyType, TitleLevel } from './symbol'
