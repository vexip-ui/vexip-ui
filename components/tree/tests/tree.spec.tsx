import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { Tree } from '..'

describe('Tree', () => {
  it('render', async () => {
    const data = [
      {
        id: 1,
        label: 'n1',
        parent: 0,
        expanded: true
      },
      {
        id: 2,
        label: 'n2',
        parent: 1
      },
      {
        id: 3,
        label: 'n3',
        parent: 1
      }
    ]
    const wrapper = mount(() => <Tree data={data}></Tree>)

    expect(wrapper.classes()).toContain('vxp-tree-vars')

    await nextTick()
    const nodes = wrapper.findAll('.vxp-tree__node')
    expect(nodes.length).toEqual(3)
    expect(nodes[0].find('.vxp-tree__arrow').exists()).toBe(true)
    expect(nodes[0].find('.vxp-tree__label').exists()).toBe(true)
    expect(nodes[0].text()).toEqual('n1')
    expect(nodes[1].text()).toEqual('n2')
    expect(nodes[2].text()).toEqual('n3')
  })

  it('select/cancel node', async () => {
    const onNodeSelect = vi.fn()
    const onNodeCancel = vi.fn()
    const data = [
      {
        id: 1,
        label: 'n1'
      }
    ]
    const wrapper = mount(() => (
      <Tree data={data} onNodeSelect={onNodeSelect} onNodeCancel={onNodeCancel}></Tree>
    ))

    await nextTick()
    await wrapper.find('.vxp-tree__label').trigger('click')
    expect(wrapper.find('.vxp-tree__node').classes()).toContain('vxp-tree__node--selected')
    expect(onNodeSelect).toHaveBeenCalled()
    expect(onNodeSelect).toHaveBeenCalledWith(data[0], expect.objectContaining({ data: data[0] }))

    await wrapper.find('.vxp-tree__label').trigger('click')
    expect(wrapper.find('.vxp-tree__node').classes()).not.toContain('vxp-tree__node--selected')
    expect(onNodeCancel).toHaveBeenCalled()
    expect(onNodeCancel).toHaveBeenCalledWith(data[0], expect.objectContaining({ data: data[0] }))
  })

  it('click node', async () => {
    const onNodeClick = vi.fn()
    const data = [
      {
        id: 1,
        label: 'n1'
      }
    ]
    const wrapper = mount(() => <Tree data={data} onNodeClick={onNodeClick}></Tree>)

    await nextTick()
    await wrapper.find('.vxp-tree__node').trigger('click')
    expect(onNodeClick).toHaveBeenCalled()
    expect(onNodeClick).toHaveBeenCalledWith(data[0], expect.objectContaining({ data: data[0] }))
  })

  it('empty', async () => {
    const wrapper = mount(Tree, {
      props: {
        emptyTip: 'empty'
      }
    })

    expect(wrapper.find('.vxp-tree__empty-tip').exists()).toBe(true)
    expect(wrapper.find('.vxp-tree__empty-tip').text()).toEqual('empty')
  })

  it('empty slot', async () => {
    const wrapper = mount(Tree, {
      props: {
        emptyTip: 'empty'
      },
      slots: {
        empty: () => <span class={'empty'}></span>
      }
    })

    expect(wrapper.find('.vxp-tree__empty-tip').exists()).toBe(true)
    expect(wrapper.find('.empty').exists()).toBe(true)
    expect(wrapper.find('.vxp-tree__empty-tip').text()).toEqual('')
  })

  it('checkbox', async () => {
    const data = [
      {
        id: 1,
        label: 'n1'
      }
    ]
    const wrapper = mount(() => <Tree data={data} checkbox></Tree>)

    await nextTick()
    expect(wrapper.find('.vxp-tree__checkbox').exists()).toBe(true)
  })

  it('toggle check', async () => {
    const onNodeChange = vi.fn()
    const data = [
      {
        id: 1,
        label: 'n1',
        parent: 0,
        expanded: true
      },
      {
        id: 2,
        label: 'n2',
        parent: 1
      },
      {
        id: 3,
        label: 'n3',
        parent: 1
      }
    ]
    const wrapper = mount(() => <Tree data={data} checkbox onNodeChange={onNodeChange}></Tree>)

    await nextTick()
    const nodes = wrapper.findAll('.vxp-tree__node')

    await nodes[0].find('.vxp-tree__checkbox').trigger('click')
    nodes.forEach(node => {
      expect(node.find('.vxp-tree__checkbox').classes()).toContain('vxp-checkbox--checked')
    })
    expect(onNodeChange).toHaveBeenCalled()
    expect(onNodeChange).toHaveBeenCalledWith(
      data[0],
      expect.objectContaining({ data: data[0] }),
      true
    )

    await nodes[1].find('.vxp-tree__checkbox').trigger('click')
    expect(nodes[0].find('.vxp-tree__checkbox').classes()).toContain('vxp-checkbox--partial')
    expect(nodes[1].find('.vxp-tree__checkbox').classes()).not.toContain('vxp-checkbox--checked')
  })

  it('toggle check with no cascaded', async () => {
    const data = [
      {
        id: 1,
        label: 'n1',
        parent: 0,
        expanded: true
      },
      {
        id: 2,
        label: 'n2',
        parent: 1
      },
      {
        id: 3,
        label: 'n3',
        parent: 1
      }
    ]
    const wrapper = mount(() => <Tree data={data} checkbox no-cascaded></Tree>)

    await nextTick()
    const nodes = wrapper.findAll('.vxp-tree__node')

    await nodes[0].find('.vxp-tree__checkbox').trigger('click')
    expect(nodes[0].find('.vxp-tree__checkbox').classes()).toContain('vxp-checkbox--checked')
    expect(nodes[1].find('.vxp-tree__checkbox').classes()).not.toContain('vxp-checkbox--checked')
  })

  it('suffix checkbox', async () => {
    const data = [
      {
        id: 1,
        label: 'n1'
      }
    ]
    const wrapper = mount(() => <Tree data={data} checkbox suffix-checkbox></Tree>)

    await nextTick()
    expect(wrapper.find('.vxp-tree__checkbox').exists()).toBe(true)
    expect(wrapper.find('.vxp-tree__checkbox').classes()).toContain('vxp-tree__checkbox--suffix')
  })

  it('expand node', async () => {
    const onNodeExpand = vi.fn()
    const onNodeReduce = vi.fn()
    const data = [
      {
        id: 1,
        label: 'n1',
        parent: 0
      },
      {
        id: 2,
        label: 'n2',
        parent: 1
      },
      {
        id: 3,
        label: 'n3',
        parent: 1
      }
    ]
    const wrapper = mount(() => (
      <Tree data={data} onNodeExpand={onNodeExpand} onNodeReduce={onNodeReduce}></Tree>
    ))

    await nextTick()
    let nodes = wrapper.findAll('.vxp-tree__node')
    expect(nodes.length).toEqual(1)

    await nodes[0].find('.vxp-tree__arrow').trigger('click')
    nodes = wrapper.findAll('.vxp-tree__node')
    expect(nodes.length).toEqual(3)
    expect(onNodeExpand).toHaveBeenCalled()
    expect(onNodeExpand).toHaveBeenCalledWith(data[0], expect.objectContaining({ data: data[0] }))

    await nodes[0].find('.vxp-tree__arrow').trigger('click')
    nodes = wrapper.findAll('.vxp-tree__node')
    expect(nodes.length).toEqual(1)
    expect(onNodeReduce).toHaveBeenCalled()
    expect(onNodeReduce).toHaveBeenCalledWith(data[0], expect.objectContaining({ data: data[0] }))
  })

  it('floor select', async () => {
    const onNodeExpand = vi.fn()
    const onNodeReduce = vi.fn()
    const data = [
      {
        id: 1,
        label: 'n1',
        parent: 0
      },
      {
        id: 2,
        label: 'n2',
        parent: 1
      },
      {
        id: 3,
        label: 'n3',
        parent: 1
      }
    ]
    const wrapper = mount(() => (
      <Tree data={data} floor-select onNodeExpand={onNodeExpand} onNodeReduce={onNodeReduce}></Tree>
    ))

    await nextTick()
    let nodes = wrapper.findAll('.vxp-tree__node')
    expect(nodes.length).toEqual(1)

    await nodes[0].find('.vxp-tree__label').trigger('click')
    nodes = wrapper.findAll('.vxp-tree__node')
    expect(nodes.length).toEqual(3)
    expect(nodes[0].classes()).toContain('vxp-tree__node--expanded')
    expect(onNodeExpand).toHaveBeenCalled()
    expect(onNodeExpand).toHaveBeenCalledWith(data[0], expect.objectContaining({ data: data[0] }))

    await nodes[0].find('.vxp-tree__label').trigger('click')
    nodes = wrapper.findAll('.vxp-tree__node')
    expect(nodes.length).toEqual(1)
    expect(nodes[0].classes()).not.toContain('vxp-tree__node--expanded')
    expect(onNodeReduce).toHaveBeenCalled()
    expect(onNodeReduce).toHaveBeenCalledWith(data[0], expect.objectContaining({ data: data[0] }))
  })

  it('node disabled', async () => {
    const onNodeSelect = vi.fn()
    const onNodeChange = vi.fn()
    const data = [
      {
        id: 1,
        label: 'n1',
        disabled: true
      }
    ]
    const wrapper = mount(() => (
      <Tree data={data} checkbox onNodeSelect={onNodeSelect} onNodeChange={onNodeChange}></Tree>
    ))

    await nextTick()
    expect(wrapper.find('.vxp-tree__node').classes()).toContain('vxp-tree__node--disabled')
    expect(wrapper.find('.vxp-tree__checkbox').classes()).toContain('vxp-checkbox--disabled')

    await wrapper.find('.vxp-tree__label').trigger('click')
    expect(wrapper.find('.vxp-tree__node').classes()).not.toContain('vxp-tree__node--selected')
    expect(onNodeSelect).not.toHaveBeenCalled()

    await wrapper.find('.vxp-tree__checkbox').trigger('click')
    expect(wrapper.find('.vxp-tree__checkbox').classes()).not.toContain('vxp-checkbox--checked')
    expect(onNodeChange).not.toHaveBeenCalled()
  })
})
