import type { BEM, NBEM } from './types'

export * from './types'

/**
 * Get `--variable` CSS variable.
 *
 * @param v the variable
 */
export const cv = <V extends string>(v: V) => `--${v}` as const
/**
 * Get `var(--variable)` CSS style value.
 *
 * @param v the variable
 */
export const gcv = <V extends string>(v: V) => `var(--${v})` as const
/**
 * Get `--variable: style;` CSS style content.
 *
 * @param v the variable
 * @param s the style
 */
export const scv = <V extends string, S extends string>(v: V, s: S) => `--${v}: ${s};` as const

export function useBEM<B extends string>(block: B): BEM<B>
export function useBEM<B extends string, N extends string>(block: B, namespace: N): NBEM<B, N>
export function useBEM<B extends string, N extends string>(
  block: B,
  namespace: (isVar?: boolean) => N
): NBEM<B, N>
export function useBEM<B extends string, N extends string>(
  block: B,
  namespace?: N | ((isVar?: boolean) => N),
) {
  if (!namespace) {
    return <BEM<B>>{
      b: () => `${block}`,
      be: e => `${block}__${e}`,
      bm: m => `${block}--${m}`,
      bem: (e, m) => `${block}__${e}--${m}`,
      bs: s => `${block}-${s}`,

      cb: () => `.${block}`,
      cbe: e => `.${block}__${e}`,
      cbm: m => `.${block}--${m}`,
      cbem: (e, m) => `.${block}__${e}--${m}`,
      cbs: s => `.${block}-${s}`,

      cv: v => cv(`${block}-${v}`),
      cvm: (m, s = {} as any) => {
        for (const key of Object.keys(m)) {
          s[cv(`${block}-${key}`)] = m[key]
        }

        return s
      },
      gcv: v => gcv(`${block}-${v}`),
      scv: (v, s) => scv(`${block}-${v}`, s),
    }
  }

  const n = (isVar?: boolean) => (typeof namespace === 'function' ? namespace(isVar) : namespace)

  return <NBEM<B, N>>{
    b: () => `${n()}-${block}`,
    be: e => `${n()}-${block}__${e}`,
    bm: m => `${n()}-${block}--${m}`,
    bem: (e, m) => `${n()}-${block}__${e}--${m}`,
    bs: s => `${n()}-${block}-${s}`,
    ns: s => `${n()}-${s}`,

    cb: () => `.${n()}-${block}`,
    cbe: e => `.${n()}-${block}__${e}`,
    cbm: m => `.${n()}-${block}--${m}`,
    cbem: (e, m) => `.${n()}-${block}__${e}--${m}`,
    cbs: s => `.${n()}-${block}-${s}`,
    cns: s => `.${n()}-${s}`,

    cv: v => cv(`${n(true)}-${block}-${v}`),
    cvm: (m, s = {} as any) => {
      const namespace = n(true)

      for (const key of Object.keys(m)) {
        s[cv(`${namespace}-${block}-${key}`)] = m[key]
      }

      return s
    },
    gcv: v => gcv(`${n(true)}-${block}-${v}`),
    scv: (v, s) => scv(`${n(true)}-${block}-${v}`, s),
    nv: v => cv(`${n(true)}-${v}`),
    nvm: (m, s = {} as any) => {
      const namespace = n(true)

      for (const key of Object.keys(m)) {
        s[cv(`${namespace}-${key}`)] = m[key]
      }

      return s
    },
    gnv: v => gcv(`${n(true)}-${v}`),
    snv: (v, s) => scv(`${n(true)}-${v}`, s),
  }
}
