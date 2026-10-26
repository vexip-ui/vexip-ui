import { describe, expect, it } from 'vitest'

import { cv, gcv, scv, useBEM } from '../src'

describe('transform', () => {
  it('Basis', () => {
    expect(cv('color')).toEqual('--color')
    expect(gcv('color')).toEqual('var(--color)')
    expect(scv('color', '#333')).toEqual('--color: #333;')
  })

  it('BEM', () => {
    const bem = useBEM('button')

    expect(bem.b()).toEqual('button')
    expect(bem.be('icon')).toEqual('button__icon')
    expect(bem.bm('active')).toEqual('button--active')
    expect(bem.bem('icon', 'active')).toEqual('button__icon--active')
    expect(bem.bs('group')).toEqual('button-group')
    expect(bem.cb()).toEqual('.button')
    expect(bem.cbe('icon')).toEqual('.button__icon')
    expect(bem.cbm('active')).toEqual('.button--active')
    expect(bem.cbem('icon', 'active')).toEqual('.button__icon--active')
    expect(bem.cbs('group')).toEqual('.button-group')
    expect(bem.cv('color')).toEqual('--button-color')
    expect(bem.cvm({ color: '#333', 'bg-color': '#fff' })).toMatchObject({
      '--button-color': '#333',
      '--button-bg-color': '#fff',
    })
    expect(bem.gcv('color')).toEqual('var(--button-color)')
    expect(bem.scv('color', '#444')).toEqual('--button-color: #444;')
  })

  it('NBEM', () => {
    const bem = useBEM('button', 'vxp')

    expect(bem.b()).toEqual('vxp-button')
    expect(bem.be('icon')).toEqual('vxp-button__icon')
    expect(bem.bm('active')).toEqual('vxp-button--active')
    expect(bem.bem('icon', 'active')).toEqual('vxp-button__icon--active')
    expect(bem.bs('group')).toEqual('vxp-button-group')
    expect(bem.ns('alert')).toEqual('vxp-alert')
    expect(bem.cb()).toEqual('.vxp-button')
    expect(bem.cbe('icon')).toEqual('.vxp-button__icon')
    expect(bem.cbm('active')).toEqual('.vxp-button--active')
    expect(bem.cbem('icon', 'active')).toEqual('.vxp-button__icon--active')
    expect(bem.cbs('group')).toEqual('.vxp-button-group')
    expect(bem.cns('alert')).toEqual('.vxp-alert')
    expect(bem.cv('color')).toEqual('--vxp-button-color')
    expect(bem.cvm({ color: '#333', 'bg-color': '#fff' })).toMatchObject({
      '--vxp-button-color': '#333',
      '--vxp-button-bg-color': '#fff',
    })
    expect(bem.gcv('color')).toEqual('var(--vxp-button-color)')
    expect(bem.scv('color', '#444')).toEqual('--vxp-button-color: #444;')
    expect(bem.nv('color')).toEqual('--vxp-color')
    expect(bem.nvm({ color: '#333', 'bg-color': '#fff' })).toMatchObject({
      '--vxp-color': '#333',
      '--vxp-bg-color': '#fff',
    })
    expect(bem.gnv('color')).toEqual('var(--vxp-color)')
    expect(bem.snv('color', '#444')).toEqual('--vxp-color: #444;')
  })
})
