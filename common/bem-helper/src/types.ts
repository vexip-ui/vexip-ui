/**
 * BEM name helper, without namespace.
 *
 * @typeParam B the block type
 */
export interface BEM<B extends string> {
  /**
   * Get `block` class name.
   */
  b: () => B,
  /**
   * Get `block__element` class name.
   *
   * @param e the element
   */
  be: <E extends string>(e: E) => `${B}__${E}`,
  /**
   * Get `block--modifier` class name.
   *
   * @param m the modifier
   */
  bm: <M extends string>(m: M) => `${B}--${M}`,
  /**
   * Get `block__element--modifier` class name.
   *
   * @param e the element
   * @param m the modifier
   */
  bem: <E extends string, M extends string>(e: E, m: M) => `${B}__${E}--${M}`,
  /**
   * Get `block-suffix` class name.
   *
   * @param s the suffix
   */
  bs: <S extends string>(s: S) => `${B}-${S}`,
  /**
   * Get `.block` CSS class name.
   */
  cb: () => `.-${B}`,
  /**
   * Get `.block__element` CSS class name.
   *
   * @param e the element
   */
  cbe: <E extends string>(e: E) => `.${B}__${E}`,
  /**
   * Get `.block--modifier` CSS class name.
   *
   * @param m the modifier
   */
  cbm: <M extends string>(m: M) => `.${B}--${M}`,
  /**
   * Get `.block__element--modifier` CSS class name.
   *
   * @param e the element
   * @param m the modifier
   */
  cbem: <E extends string, M extends string>(e: E, m: M) => `.${B}__${E}--${M}`,
  /**
   * Get `.block-suffix` CSS class name.
   *
   * @param s the suffix
   */
  cbs: <S extends string>(s: S) => `.${B}-${S}`,
  /**
   * Get `--block-variable` CSS variable.
   *
   * @param v the variable
   */
  cv: <V extends string>(v: V) => `--${B}-${V}`,
  /**
   * Transform give map's each key to `--block-key`.
   *
   * @param v the variable
   * @param s the result map
   *
   * @example
   * ```ts
   * const bem = useBEM('foo')
   * const style = bem.cvm({
   *   color: '#fff',
   *   'bg-color': '#333'
   * } as const)
   *
   * // type and value: '#fff'
   * style['--foo-color']
   * // type and value: '#333'
   * style['--foo-bg-color']
   * ```
   */
  cvm: <M extends Record<string, any>, S extends Record<any, any>>(
    m: M,
    s?: S,
  ) => {
    [K in keyof M extends `${infer I}` ? `--${B}-${I}` : string]: K extends `--${B}-${infer I}`
      ? M[I]
      : never
  } & S,
  /**
   * Get `var(--block-variable)` CSS style value.
   *
   * @param v the variable
   */
  gcv: <V extends string>(v: V) => `var(--${B}-${V})`,
  /**
   * Get `--block-variable: style;` CSS style content.
   *
   * @param v the variable
   * @param s the style
   */
  scv: <V extends string, S extends string>(v: V, s: S) => `--${B}-${V}: ${S};`,
}

/**
 * BEM name helper, without namespace.
 *
 * @typeParam B the block type
 * @typeParam N the namespace type
 */
export interface NBEM<B extends string, N extends string> {
  /**
   * Get `namespace-block` class name.
   */
  b: () => `${N}-${B}`,
  /**
   * Get `namespace-block__element` class name.
   *
   * @param e the element
   */
  be: <E extends string>(e: E) => `${N}-${B}__${E}`,
  /**
   * Get `namespace-block--modifier` class name.
   *
   * @param m the modifier
   */
  bm: <M extends string>(m: M) => `${N}-${B}--${M}`,
  /**
   * Get `namespace-block__element--modifier` class name.
   *
   * @param e the element
   * @param m the modifier
   */
  bem: <E extends string, M extends string>(e: E, m: M) => `${N}-${B}__${E}--${M}`,
  /**
   * Get `namespace-block-suffix` class name.
   *
   * @param s the suffix
   */
  bs: <S extends string>(s: S) => `${N}-${B}-${S}`,
  /**
   * Get `namespace-suffix` class name.
   *
   * @param s the suffix
   */
  ns: <S extends string>(s: S) => `${N}-${S}`,
  /**
   * Get `.namespace-block` CSS class name.
   */
  cb: () => `.${N}-${B}`,
  /**
   * Get `.namespace-block__element` CSS class name.
   *
   * @param e the element
   */
  cbe: <E extends string>(e: E) => `.${N}-${B}__${E}`,
  /**
   * Get `.namespace-block--modifier` CSS class name.
   *
   * @param m the modifier
   */
  cbm: <M extends string>(m: M) => `.${N}-${B}--${M}`,
  /**
   * Get `.namespace-block__element--modifier` CSS class name.
   *
   * @param e the element
   * @param m the modifier
   */
  cbem: <E extends string, M extends string>(e: E, m: M) => `.${N}-${B}__${E}--${M}`,
  /**
   * Get `.namespace-block-suffix` CSS class name.
   *
   * @param s the suffix
   */
  cbs: <S extends string>(s: S) => `.${N}-${B}-${S}`,
  /**
   * Get `.namespace-suffix` CSS class name.
   *
   * @param s the suffix
   */
  cns: <S extends string>(s: S) => `.${N}-${S}`,
  /**
   * Get `--namespace-block-variable` CSS variable.
   *
   * @param v the variable
   */
  cv: <V extends string>(v: V) => `--${N}-${B}-${V}`,
  /**
   * Transform give map's each key to `--namespace-block-key`.
   *
   * @param v the variable
   * @param s the result map
   *
   * @example
   * ```ts
   * const bem = useBEM('foo', 'vxp')
   * const style = bem.cvm({
   *   color: '#fff',
   *   'bg-color': '#333'
   * } as const)
   *
   * // type and value: '#fff'
   * style['--vxp-foo-color']
   * // type and value: '#333'
   * style['--vxp-foo-bg-color']
   * ```
   */
  cvm: <M extends Record<string, any>, S extends Record<any, any>>(
    m: M,
    s?: S,
  ) => {
    [K in keyof M extends `${infer I}`
      ? `--${N}-${B}-${I}`
      : string]: K extends `--${N}-${B}-${infer I}` ? M[I] : never
  } & S,
  /**
   * Get `var(--namespace-block-variable)` CSS style value.
   *
   * @param v the variable
   */
  gcv: <V extends string>(v: V) => `var(--${N}-${B}-${V})`,
  /**
   * Get `--namespace-block-variable: style;` CSS style content.
   *
   * @param v the variable
   * @param s the style
   */
  scv: <V extends string, S extends string>(v: V, s: S) => `--${N}-${B}-${V}: ${S};`,
  /**
   * Get `--namespace-variable` CSS variable.
   *
   * @param v the variable
   */
  nv: <V extends string>(v: V) => `--${N}-${V}`,
  /**
   * Transform give map's each key to `--namespace-key`.
   *
   * @param v the variable
   * @param s the result map
   *
   * @example
   * ```ts
   * const bem = useBEM('foo', 'vxp')
   * const style = bem.nvm({
   *   color: '#fff',
   *   'bg-color': '#333'
   * } as const)
   *
   * // type and value: '#fff'
   * style['--vxp-color']
   * // type and value: '#333'
   * style['--vxp-bg-color']
   * ```
   */
  nvm: <M extends Record<string, any>, S extends Record<any, any>>(
    m: M,
    s?: S,
  ) => {
    [K in keyof M extends `${infer I}` ? `--${N}-${I}` : string]: K extends `--${N}-${infer I}`
      ? M[I]
      : never
  } & S,
  /**
   * Get `var(--namespace-variable)` CSS style value.
   *
   * @param v the variable
   */
  gnv: <V extends string>(v: V) => `var(--${N}-${V})`,
  /**
   * Get `--namespace-variable: style;` CSS style content.
   *
   * @param v the variable
   * @param s the style
   */
  snv: <V extends string, S extends string>(v: V, s: S) => `--${N}-${V}: ${S};`,
}
