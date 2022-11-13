import { describe, it, expect } from 'vitest'
import { nextTick } from 'vue'
import { Cell } from '@/components/cell'
import { mount } from '@vue/test-utils'
import { Grid } from '..'

describe('Grid', () => {
  it('render', () => {
    const wrapper = mount(() => (
      <Grid>
        <Cell width={16}></Cell>
        <Cell width={8}></Cell>
      </Grid>
    ))
    const cells = wrapper.findAll('.vxp-cell')

    expect(wrapper.find('.vxp-grid').attributes('style')).toContain(
      'grid-template-columns: repeat(24, 1fr);'
    )
    expect(cells.length).toEqual(2)
    expect(cells[0].attributes('style')).toContain('grid-column-start: span 16;')
    expect(cells[1].attributes('style')).toContain('grid-column-start: span 8;')
  })

  it('gap', async () => {
    const wrapper = mount(Grid, {
      props: { gap: 16 }
    })

    expect(wrapper.attributes('style')).toContain('gap: 16px;')

    await wrapper.setProps({ gap: [12, 20] })
    expect(wrapper.attributes('style')).toContain('gap: 12px 20px;')
  })

  it('columns', async () => {
    const wrapper = mount(Grid, {
      props: { columns: 10 },
      slots: {
        default: () => <Cell></Cell>
      }
    })

    expect(wrapper.attributes('style')).toContain('grid-template-columns: repeat(10, 1fr);')
    expect(wrapper.find('.vxp-cell').attributes('style')).toContain('grid-column-start: span 10;')

    await wrapper.setProps({
      columns: ['300px', 'repeat(2, 1fr)']
    })
    await nextTick()
    expect(wrapper.attributes('style')).toContain('grid-template-columns: 300px repeat(2, 1fr);')
    // not responsive
    expect(wrapper.find('.vxp-cell').attributes('style')).toContain('grid-column-start: span 10;')
  })

  it('justify', () => {
    (['start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'] as const).forEach(
      justify => {
        const wrapper = mount(() => <Grid justify={justify}></Grid>)

        expect(wrapper.find('.vxp-grid').classes()).toContain(`vxp-grid--${justify}`)
      }
    )
  })

  it('align', () => {
    (['top', 'middle', 'bottom', 'stretch'] as const).forEach(align => {
      const wrapper = mount(() => <Grid align={align}></Grid>)

      if (align !== 'stretch') {
        expect(wrapper.find('.vxp-grid').classes()).toContain(`vxp-grid--${align}`)
      } else {
        expect(wrapper.find('.vxp-grid').classes()).not.toContain('vxp-grid--stretch')
      }
    })
  })

  it('densc', () => {
    const wrapper = mount(() => <Grid dense></Grid>)

    expect(wrapper.find('.vxp-grid').classes()).toContain('vxp-grid--dense')
  })

  it('tag', () => {
    const wrapper = mount(() => (
      <Grid tag={'ul'}>
        <Cell tag={'li'}></Cell>
      </Grid>
    ))

    expect(wrapper.find('.vxp-grid').element.tagName).toEqual('UL')
    expect(wrapper.find('.vxp-cell').element.tagName).toEqual('LI')
  })

  it('free layout', () => {
    const wrapper = mount(() => (
      <Grid>
        <Cell left={0} right={8}></Cell>
        <Cell left={8} right={16}></Cell>
        <Cell width={8} top={1} right={16}></Cell>
        <Cell width={8} top={2}></Cell>
        <Cell width={8} top={2} right={16}></Cell>
      </Grid>
    ))
    const cells = wrapper.findAll('.vxp-cell')

    expect(cells.length).toEqual(5)

    // snapshots
    expect(cells[0].attributes('style')).toContain('grid-column-start: 1; grid-column-end: 9;')
    expect(cells[1].attributes('style')).toContain('grid-column-start: 9; grid-column-end: 17;')
    expect(cells[2].attributes('style')).toContain('grid-row-start: 2; grid-row-end: span 1;')
    expect(cells[2].attributes('style')).toContain(
      'grid-column-start: span 8; grid-column-end: 17;'
    )
    expect(cells[3].attributes('style')).toContain('grid-row-start: 3; grid-row-end: span 1;')
    expect(cells[3].attributes('style')).toContain('grid-column-start: span 8;')
    expect(cells[4].attributes('style')).toContain('grid-row-start: 3; grid-row-end: span 1;')
    expect(cells[4].attributes('style')).toContain(
      'grid-column-start: span 8; grid-column-end: 17;'
    )
  })

  it('cell use flex', () => {
    const wrapper = mount(() => (
      <Grid>
        <Cell use-flex></Cell>
      </Grid>
    ))

    expect(wrapper.find('.vxp-cell').classes()).toContain('vxp-cell--flex')
    expect(wrapper.find('.vxp-cell').classes()).toContain('vxp-cell--start')
    expect(wrapper.find('.vxp-cell').classes()).toContain('vxp-cell--top')
  })

  it('row cell flex', () => {
    const wrapper = mount(() => (
      <Grid cell-flex>
        <Cell></Cell>
      </Grid>
    ))

    expect(wrapper.find('.vxp-cell').classes()).toContain('vxp-cell--flex')
    expect(wrapper.find('.vxp-cell').classes()).toContain('vxp-cell--start')
    expect(wrapper.find('.vxp-cell').classes()).toContain('vxp-cell--top')
  })
})
