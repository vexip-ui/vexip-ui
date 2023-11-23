import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Tree } from '..'
import { User } from '@vexip-ui/icons'

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

  it('tree data', async () => {
    const data = [
      {
        label: 'n1',
        expanded: true,
        children: [{ label: 'n2', expanded: true, children: [{ label: 'n3' }] }, { label: 'n4' }]
      },
      { label: 'n5' }
    ]
    const wrapper = mount(() => <Tree data={data} no-build-tree></Tree>)

    await nextTick()
    const nodes = wrapper.findAll('.vxp-tree__node')
    expect(nodes.length).toEqual(5)
    expect(nodes[0].text()).toEqual('n1')
    expect(nodes[1].text()).toEqual('n2')
    expect(nodes[2].text()).toEqual('n3')
    expect(nodes[3].text()).toEqual('n4')
    expect(nodes[4].text()).toEqual('n5')
  })

  it('select/cancel node', async () => {
    const onNodeSelect = vi.fn()
    const onNodeCancel = vi.fn()
    const data = [
      {
        id: 1,
        label: 'n1'
      },
      {
        id: 2,
        label: 'n2'
      }
    ]
    const wrapper = mount(() => (
      <Tree data={data} onNodeSelect={onNodeSelect} onNodeCancel={onNodeCancel}></Tree>
    ))

    await nextTick()
    const nodes = wrapper.findAll('.vxp-tree__node')
    await nodes[0].find('.vxp-tree__label').trigger('click')
    expect(nodes[0].classes()).toContain('vxp-tree__node--selected')
    expect(onNodeSelect).toHaveBeenCalled()
    expect(onNodeSelect).toHaveBeenCalledWith(data[0], expect.objectContaining({ data: data[0] }))

    await nodes[1].find('.vxp-tree__label').trigger('click')
    expect(nodes[1].classes()).toContain('vxp-tree__node--selected')
    expect(nodes[0].classes()).not.toContain('vxp-tree__node--selected')

    await nodes[1].find('.vxp-tree__label').trigger('click')
    expect(nodes[1].classes()).not.toContain('vxp-tree__node--selected')
    expect(onNodeCancel).toHaveBeenCalled()
    expect(onNodeCancel).toHaveBeenCalledWith(data[1], expect.objectContaining({ data: data[1] }))
  })

  it('multiple select', async () => {
    const data = [
      {
        id: 1,
        label: 'n1'
      },
      {
        id: 2,
        label: 'n2'
      }
    ]
    const wrapper = mount(() => <Tree data={data} multiple></Tree>)

    await nextTick()
    const nodes = wrapper.findAll('.vxp-tree__node')

    await nodes[0].find('.vxp-tree__label').trigger('click')
    expect(nodes[0].classes()).toContain('vxp-tree__node--selected')

    await nodes[1].find('.vxp-tree__label').trigger('click')
    expect(nodes[1].classes()).toContain('vxp-tree__node--selected')
    expect(nodes[0].classes()).toContain('vxp-tree__node--selected')
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
    const vm = wrapper.findComponent(Tree).vm
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
    expect(vm.getCheckedNodes().length).toBe(3)
    expect(vm.getCheckedNodeData().length).toBe(3)

    await nodes[1].find('.vxp-tree__checkbox').trigger('click')
    expect(nodes[0].find('.vxp-tree__checkbox').classes()).toContain('vxp-checkbox--partial')
    expect(nodes[1].find('.vxp-tree__checkbox').classes()).not.toContain('vxp-checkbox--checked')
    expect(vm.getCheckedNodes().length).toBe(1)
    expect(vm.getCheckedNodeData().length).toBe(1)
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
      <Tree
        data={data}
        no-transition
        onNodeExpand={onNodeExpand}
        onNodeReduce={onNodeReduce}
      ></Tree>
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
      <Tree
        data={data}
        floor-select
        no-transition
        onNodeExpand={onNodeExpand}
        onNodeReduce={onNodeReduce}
      ></Tree>
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
    const onNodeExpand = vi.fn()
    const data = [
      {
        id: 1,
        label: 'n1',
        disabled: true
      },
      {
        id: 2,
        label: 'n2',
        parent: 1
      }
    ]
    const wrapper = mount(() => (
      <Tree
        data={data}
        checkbox
        onNodeSelect={onNodeSelect}
        onNodeChange={onNodeChange}
        onNodeExpand={onNodeExpand}
      ></Tree>
    ))

    await nextTick()
    const nodes = wrapper.findAll('.vxp-tree__node')

    nodes.forEach(node => {
      expect(node.classes()).toContain('vxp-tree__node--disabled')
      expect(node.find('.vxp-tree__arrow').classes()).toContain('vxp-tree__arrow--disabled')
      expect(node.find('.vxp-tree__label').classes()).toContain('vxp-tree__label--disabled')
      expect(node.find('.vxp-tree__checkbox').classes()).toContain('vxp-checkbox--disabled')
    })

    await wrapper.find('.vxp-tree__label').trigger('click')
    expect(wrapper.find('.vxp-tree__node').classes()).not.toContain('vxp-tree__node--selected')
    expect(onNodeSelect).not.toHaveBeenCalled()

    await wrapper.find('.vxp-tree__checkbox').trigger('click')
    expect(wrapper.find('.vxp-tree__checkbox').classes()).not.toContain('vxp-checkbox--checked')
    expect(onNodeChange).not.toHaveBeenCalled()

    await wrapper.find('.vxp-tree__arrow').trigger('click')
    expect(wrapper.find('.vxp-tree__arrow').classes()).not.toContain('vxp-tree__arrow--expanded')
    expect(onNodeExpand).not.toHaveBeenCalled()
  })

  it('node disabled options', async () => {
    const onNodeSelect = vi.fn()
    const onNodeChange = vi.fn()
    const onNodeExpand = vi.fn()
    const data = [
      {
        id: 1,
        label: 'n1',
        selectDisabled: true,
        expandDisabled: true,
        checkDisabled: true
      },
      {
        id: 2,
        label: 'n2',
        parent: 1
      }
    ]
    const wrapper = mount(() => (
      <Tree
        data={data}
        checkbox
        onNodeSelect={onNodeSelect}
        onNodeChange={onNodeChange}
        onNodeExpand={onNodeExpand}
      ></Tree>
    ))

    await nextTick()
    expect(wrapper.find('.vxp-tree__arrow').classes()).toContain('vxp-tree__arrow--disabled')
    expect(wrapper.find('.vxp-tree__label').classes()).toContain('vxp-tree__label--disabled')
    expect(wrapper.find('.vxp-tree__checkbox').classes()).toContain('vxp-checkbox--disabled')

    await wrapper.find('.vxp-tree__label').trigger('click')
    expect(wrapper.find('.vxp-tree__node').classes()).not.toContain('vxp-tree__node--selected')
    expect(onNodeSelect).not.toHaveBeenCalled()

    await wrapper.find('.vxp-tree__checkbox').trigger('click')
    expect(wrapper.find('.vxp-tree__checkbox').classes()).not.toContain('vxp-checkbox--checked')
    expect(onNodeChange).not.toHaveBeenCalled()

    await wrapper.find('.vxp-tree__arrow').trigger('click')
    expect(wrapper.find('.vxp-tree__arrow').classes()).not.toContain('vxp-tree__arrow--expanded')
    expect(onNodeExpand).not.toHaveBeenCalled()
  })

  it('draggable', async () => {
    const data = [
      {
        id: 1,
        label: 'n1',
        disabled: true
      }
    ]
    const wrapper = mount(() => <Tree data={data} draggable></Tree>)

    await nextTick()
    expect(wrapper.find('.vxp-tree__node').attributes('draggable')).toEqual('true')
  })

  it('filter nodes', async () => {
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
    const wrapper = mount(Tree, {
      props: { data, filter: '2' }
    })

    await nextTick()
    let nodes = wrapper.findAll('.vxp-tree__node')
    expect(nodes.length).toEqual(2)
    expect(nodes[0].find('.vxp-tree__label').text()).toEqual('n1')
    expect(nodes[1].find('.vxp-tree__label').text()).toEqual('n2')

    await wrapper.setProps({ filter: '1' })
    await nextTick()
    nodes = wrapper.findAll('.vxp-tree__node')
    expect(nodes.length).toEqual(3)
  })

  it('filter leaf', async () => {
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
    const wrapper = mount(Tree, {
      props: { data, filterLeaf: true, filter: '1' }
    })

    await nextTick()
    let nodes = wrapper.findAll('.vxp-tree__node')
    expect(nodes.length).toEqual(0)

    await wrapper.setProps({ filter: '2' })
    await nextTick()
    nodes = wrapper.findAll('.vxp-tree__node')
    expect(nodes.length).toEqual(2)
  })

  it('async load', async () => {
    const onAsyncLoad = vi.fn()
    const data = [
      {
        id: 1,
        label: 'n1'
      }
    ]
    const wrapper = mount(() => <Tree data={data} on-async-load={onAsyncLoad}></Tree>)

    await nextTick()
    await wrapper.find('.vxp-tree__arrow').trigger('click')
    expect(onAsyncLoad).toHaveBeenCalled()
  })

  it('key config', async () => {
    const data = [
      {
        key: 1,
        name: 'n1',
        open: true
      },
      {
        key: 2,
        name: 'n2',
        parentKey: 1
      }
    ]
    const config = {
      id: 'key',
      label: 'name',
      parent: 'parentKey',
      expanded: 'open'
    }
    const wrapper = mount(() => <Tree data={data} key-config={config}></Tree>)

    await nextTick()
    const nodes = wrapper.findAll('.vxp-tree__node')
    expect(nodes.length).toEqual(2)
    expect(nodes[0].text()).toEqual('n1')
    expect(nodes[1].text()).toEqual('n2')
  })

  it('post create', async () => {
    const data = [
      {
        id: 1,
        label: 'n1'
      }
    ]
    const postCreate = (node: any) => {
      node.selected = true
    }
    const wrapper = mount(() => <Tree data={data} post-create={postCreate}></Tree>)

    await nextTick()
    expect(wrapper.find('.vxp-tree__node').classes()).toContain('vxp-tree__node--selected')
  })

  it('label, prefix, suffix slots', async () => {
    const data = [
      {
        id: 1,
        label: 'n1'
      }
    ]
    const wrapper = mount(() => (
      <Tree data={data}>
        {{
          label: ({ data }: any) => <span class={'label'}>{data.label}</span>,
          prefix: () => <span class={'prefix'}></span>,
          suffix: () => <span class={'suffix'}></span>
        }}
      </Tree>
    ))

    await nextTick()
    expect(wrapper.find('.label').exists()).toBe(true)
    expect(wrapper.find('.label').text()).toEqual('n1')
    expect(wrapper.find('.prefix').exists()).toBe(true)
    expect(wrapper.find('.suffix').exists()).toBe(true)
  })

  it('arrow icon', async () => {
    const data = [
      {
        id: 1,
        label: 'n1'
      },
      {
        id: 2,
        label: 'n2',
        parent: 1
      }
    ]
    const wrapper = mount(() => <Tree data={data} arrow-icon={User}></Tree>)

    await nextTick()
    expect(wrapper.findComponent(User).exists()).toBe(true)
  })

  it('arrow slot', async () => {
    const data = [
      {
        id: 1,
        label: 'n1'
      },
      {
        id: 2,
        label: 'n2',
        parent: 1
      }
    ]
    const wrapper = mount(() => (
      <Tree data={data}>
        {{
          arrow: () => <span class={'arrow'}></span>
        }}
      </Tree>
    ))

    await nextTick()
    expect(wrapper.find('.arrow').exists()).toBe(true)
  })

  it('block effect', async () => {
    const data = [
      {
        id: 1,
        label: 'n1'
      },
      {
        id: 2,
        label: 'n2',
        parent: 1
      }
    ]
    const wrapper = mount(Tree, {
      props: { data }
    })

    await nextTick()
    expect(wrapper.find('.vxp-tree__content').classes()).not.toContain('vxp-tree__content--effect')
    expect(wrapper.find('.vxp-tree__label').classes()).toContain('vxp-tree__label--effect')

    await wrapper.setProps({ blockEffect: true })
    expect(wrapper.find('.vxp-tree__content').classes()).toContain('vxp-tree__content--effect')
    expect(wrapper.find('.vxp-tree__label').classes()).not.toContain('vxp-tree__label--effect')
  })

  it('getTreeData / getFlattedData', async () => {
    const data = [
      {
        label: 'n1',
        expanded: true,
        children: [{ label: 'n2', expanded: true, children: [{ label: 'n3' }] }, { label: 'n4' }]
      },
      { label: 'n5' }
    ]

    const wrapper = mount(() => <Tree data={data} no-build-tree></Tree>)
    await nextTick()
    const vm = wrapper.findComponent(Tree).vm

    const treeData = vm.getTreeData()
    expect(treeData !== data).toBe(true)
    expect(treeData[0] !== data[0]).toBe(true)
    expect(treeData).toMatchObject(data)

    const flattedData = vm.getFlattedData()
    expect(flattedData).toMatchObject([
      { label: 'n1' },
      { label: 'n2' },
      { label: 'n3' },
      { label: 'n4' },
      { label: 'n5' }
    ])
  })
})
