import { TableColumn } from '@/components/table-column'

import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'

import { Table } from '..'
import TableBody from '../table-body.vue'

import type { DOMWrapper } from '@vue/test-utils'
import type { TableRowState } from '../symbol'

vi.useFakeTimers()

async function runScrollTimers() {
  vi.runAllTimers()
  await nextTick()
  vi.runAllTimers()
  await nextTick()
}

describe('Table', () => {
  it('render', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name'
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `${i}` }))
    const wrapper = mount(() => <Table columns={columns} data={data}></Table>)

    await runScrollTimers()

    expect(wrapper.classes()).toContain('vxp-table-vars')

    const head = wrapper.find('.vxp-table__head')
    const body = wrapper.find('.vxp-table__body')
    expect(head.exists()).toBe(true)
    expect(body.exists()).toBe(true)

    const headRow = head.find('.vxp-table__row')
    const rows = body.findAll('.vxp-table__row')
    expect(headRow.exists()).toBe(true)
    expect(headRow.find('.vxp-table__head-cell').exists()).toBe(true)
    expect(headRow.find('.vxp-table__head-cell').text()).toEqual('Name')
    expect(rows.length).toEqual(10)
    rows.forEach((row, i) => {
      expect(row.find('.vxp-table__cell').exists()).toBe(true)
      expect(row.find('.vxp-table__cell').text()).toEqual(data[i].name)
    })
  })

  it('set a new data', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name'
      }
    ]
    const data = [{ name: '1' }]
    const wrapper = mount(Table, {
      props: { columns, data }
    })

    await runScrollTimers()
    expect(wrapper.find('.vxp-table__cell').text()).toEqual(data[0].name)

    const newData = [{ name: '2' }]
    await wrapper.setProps({ data: newData })
    await runScrollTimers()
    expect(wrapper.find('.vxp-table__cell').text()).toEqual(newData[0].name)
  })

  it('empty text', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name'
      }
    ]
    const wrapper = mount(() => <Table columns={columns} locale={{ empty: 'empty' }}></Table>)

    expect(wrapper.find('.vxp-table__empty').exists()).toBe(true)
    expect(wrapper.find('.vxp-table__empty').text()).toEqual('empty')
  })

  it('empty slot', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name'
      }
    ]
    const wrapper = mount(() => (
      <Table columns={columns}>
        {{
          empty: () => <span class={'empty'}></span>
        }}
      </Table>
    ))

    expect(wrapper.find('.vxp-table__empty').exists()).toBe(true)
    expect(wrapper.find('.empty').exists()).toBe(true)
  })

  it('template columns', async () => {
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `${i}` }))
    const wrapper = mount(() => (
      <Table data={data}>
        <TableColumn id-key={'name'} name={'Name'}></TableColumn>
      </Table>
    ))

    await runScrollTimers()

    const head = wrapper.find('.vxp-table__head')
    const body = wrapper.find('.vxp-table__body')
    const headRow = head.find('.vxp-table__row')
    const rows = body.findAll('.vxp-table__row')

    expect(headRow.find('.vxp-table__head-cell').exists()).toBe(true)
    expect(headRow.find('.vxp-table__head-cell').text()).toEqual('Name')
    expect(rows.length).toEqual(10)
    rows.forEach((row, i) => {
      expect(row.find('.vxp-table__cell').exists()).toBe(true)
      expect(row.find('.vxp-table__cell').text()).toEqual(data[i].name)
    })
  })

  it('mixed columns', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name'
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `n${i}`, label: `l${i}` }))
    const wrapper = mount(() => (
      <Table columns={columns} data={data}>
        <TableColumn id-key={'label'} name={'Label'}></TableColumn>
      </Table>
    ))

    await runScrollTimers()

    const headRow = wrapper.find('.vxp-table__head .vxp-table__row')
    const rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    const headCells = headRow.findAll('.vxp-table__head-cell')

    expect(headCells.length).toBe(2)
    expect(headCells[0].text()).toEqual('Label')
    expect(headCells[1].text()).toEqual('Name')
    rows.forEach((row, i) => {
      const cells = row.findAll('.vxp-table__cell')

      expect(cells.length).toEqual(2)
      expect(cells[0].text()).toEqual(data[i].label)
      expect(cells[1].text()).toEqual(data[i].name)
    })
  })

  it('column order', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name'
      },
      {
        name: 'Title',
        key: 'title',
        order: -1
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({
      name: `n${i}`,
      label: `l${i}`,
      title: `t${i}`
    }))
    const wrapper = mount(() => (
      <Table columns={columns} data={data}>
        <TableColumn id-key={'label'} name={'Label'}></TableColumn>
      </Table>
    ))

    await runScrollTimers()

    const headRow = wrapper.find('.vxp-table__head .vxp-table__row')
    const headCells = headRow.findAll('.vxp-table__head-cell')
    expect(headCells[0].text()).toEqual('Title')
    expect(headCells[1].text()).toEqual('Label')
    expect(headCells[2].text()).toEqual('Name')
  })

  it('style props', async () => {
    const wrapper = mount(Table, {
      props: {
        stripe: true,
        border: true,
        transparent: true
      }
    })

    expect(wrapper.classes()).toContain('vxp-table--stripe')
    expect(wrapper.classes()).toContain('vxp-table--border')
    expect(wrapper.classes()).toContain('vxp-table--transparent')
  })

  it('highlight', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name'
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `${i}` }))
    const wrapper = mount(() => <Table highlight columns={columns} data={data}></Table>)

    await runScrollTimers()

    const rowGroup = wrapper.find('.vxp-table__body .vxp-table__group')

    await rowGroup.trigger('mouseenter')
    expect(rowGroup.find('.vxp-table__row').classes()).toContain('vxp-table__row--hover')

    await rowGroup.trigger('mouseleave')
    expect(rowGroup.find('.vxp-table__row').classes()).not.toContain('vxp-table__row--hover')
  })

  it('custom column class name', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name',
        className: 'test1'
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `n${i}`, label: `l${i}` }))
    const wrapper = mount(() => (
      <Table columns={columns} data={data}>
        <TableColumn id-key={'label'} name={'Label'} class-name={'test2'}></TableColumn>
      </Table>
    ))

    await runScrollTimers()

    const headRow = wrapper.find('.vxp-table__head .vxp-table__row')
    const rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    const headCells = headRow.findAll('.vxp-table__head-cell')

    expect(headCells[0].classes()).toContain('test2')
    expect(headCells[1].classes()).toContain('test1')
    rows.forEach(row => {
      const cells = row.findAll('.vxp-table__cell')

      expect(cells[0].classes()).toContain('test2')
      expect(cells[1].classes()).toContain('test1')
    })
  })

  it('row class', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name'
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `n${i}`, label: `l${i}` }))
    const wrapper = mount(Table, {
      props: {
        columns,
        data,
        rowClass: 'test'
      }
    })

    await runScrollTimers()

    const rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    rows.forEach(row => {
      expect(row.classes()).toContain('test')
    })

    await wrapper.setProps({
      rowClass: (data: any, i: number) => (i % 2 ? 'o' : 'e')
    })
    rows.forEach((row, i) => {
      expect(row.classes()).toContain(i % 2 ? 'o' : 'e')
    })
  })

  it('fixed columns', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name',
        fixed: true
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `n${i}`, label: `l${i}` }))
    const wrapper = mount(() => (
      <Table columns={columns} data={data}>
        <TableColumn id-key={'label'} name={'Label'} fixed={'right'}></TableColumn>
      </Table>
    ))

    await runScrollTimers()

    expect(wrapper.find('.vxp-table__fixed--left').exists()).toBe(true)
    expect(wrapper.find('.vxp-table__fixed--right').exists()).toBe(true)
  })

  it('sort by columns', async () => {
    const sortMethod = vi.fn((prev: any, next: any) => {
      if (Number.isNaN(Number(prev) - Number(next))) {
        return String(prev).localeCompare(next)
      }

      return prev - next
    })
    const columns = [
      {
        name: 'Name',
        key: 'name',
        sorter: {
          able: true,
          method: sortMethod
        }
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      name: `n${Math.floor(i / 2)}`,
      label: `l${i % 2}`
    })).sort(() => Math.random() - 0.5)
    const wrapper = mount(() => (
      <Table columns={columns} data={data}>
        <TableColumn id-key={'label'} name={'Label'} sorter></TableColumn>
      </Table>
    ))

    await runScrollTimers()

    const body = wrapper.findComponent(TableBody)
    const headRow = wrapper.find('.vxp-table__head .vxp-table__row')
    const headCells = headRow.findAll('.vxp-table__head-cell')

    headCells.forEach(cell => {
      expect(cell.find('.vxp-table__sorter').exists()).toBe(true)
      expect(cell.find('.vxp-table__sorter--asc').exists()).toBe(true)
      expect(cell.find('.vxp-table__sorter--desc').exists()).toBe(true)
    })

    let renderRows = body.vm.renderData as TableRowState[]

    const clickSorter = async (cell: DOMWrapper<Element>, type: 'asc' | 'desc') => {
      await cell.find(`.vxp-table__sorter--${type}`).trigger('click')
      await nextTick()
      renderRows = body.vm.renderData
    }

    await clickSorter(headCells[1], 'asc')
    expect(renderRows.map(row => row.data.name)).toEqual([
      'n0',
      'n0',
      'n1',
      'n1',
      'n2',
      'n2',
      'n3',
      'n3',
      'n4',
      'n4'
    ])
    expect(sortMethod).toHaveBeenCalled()

    await clickSorter(headCells[1], 'desc')
    expect(renderRows.map(row => row.data.name)).toEqual([
      'n4',
      'n4',
      'n3',
      'n3',
      'n2',
      'n2',
      'n1',
      'n1',
      'n0',
      'n0'
    ])

    await clickSorter(headCells[0], 'desc')
    expect(renderRows.map(row => `${row.data.label}${row.data.name}`)).toEqual([
      'l1n4',
      'l0n4',
      'l1n3',
      'l0n3',
      'l1n2',
      'l0n2',
      'l1n1',
      'l0n1',
      'l1n0',
      'l0n0'
    ])

    await clickSorter(headCells[0], 'asc')
    expect(renderRows.map(row => `${row.data.label}${row.data.name}`)).toEqual([
      'l0n4',
      'l1n4',
      'l0n3',
      'l1n3',
      'l0n2',
      'l1n2',
      'l0n1',
      'l1n1',
      'l0n0',
      'l1n0'
    ])
  })

  it('filter by columns', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name',
        filter: {
          able: true,
          options: [{ label: 'Includes A', value: 'A' }],
          method: (value: string, data: any) => data.name.includes(value)
        }
      }
    ]
    const multipleFilter = {
      able: true,
      options: [
        { label: 'Starts with D', value: 'D' },
        { label: 'Starts with F', value: 'F' }
      ],
      multiple: true,
      method: (values: string[], data: any) => {
        for (const value of values) {
          if (data.label.startsWith(value)) {
            return true
          }
        }

        return false
      }
    }
    const data = [
      { name: 'Angelique', label: 'Walsh' },
      { name: 'Aeris', label: 'Drake' },
      { name: 'Elisabeth', label: 'Rogers' },
      { name: 'Sharon', label: 'Tanner' },
      { name: 'Evie', label: 'Farmer' }
    ]
    const wrapper = mount(() => (
      <Table columns={columns} data={data}>
        <TableColumn id-key={'label'} name={'Label'} filter={multipleFilter}></TableColumn>
      </Table>
    ))

    await runScrollTimers()

    const headRow = wrapper.find('.vxp-table__head .vxp-table__row')
    const headCells = headRow.findAll('.vxp-table__head-cell')

    headCells.forEach(cell => {
      expect(cell.find('.vxp-table__filter').exists()).toBe(true)
    })

    await headCells[1].find('.vxp-table__filter-trigger').trigger('click')
    const single = document.querySelector('.vxp-table__filter-wrapper')!
    expect(single).not.toBeNull()

    const singleItems = single.querySelectorAll('.vxp-table__filter-item')
    expect(singleItems.length).toEqual(2)
    expect(singleItems[1].textContent).toEqual('Includes A')

    singleItems[1].dispatchEvent(new Event('click'))
    await nextTick()
    let rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows.length).toEqual(2)
    expect(rows.map(row => row.findAll('.vxp-table__cell')[1].text())).toEqual([
      'Angelique',
      'Aeris'
    ])

    singleItems[0].dispatchEvent(new Event('click'))
    await nextTick()
    rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows.length).toEqual(5)

    await headCells[0].find('.vxp-table__filter-trigger').trigger('click')
    const multiple = document.querySelector('.vxp-table__filter-wrapper--multiple')!
    expect(multiple).not.toBeNull()

    const multipleItems = multiple.querySelectorAll('.vxp-checkbox')
    const multipleButtons = multiple.querySelectorAll('.vxp-button')
    expect(multipleItems.length).toEqual(2)
    expect(multipleButtons.length).toEqual(2)
    expect(multipleItems[0].textContent).toEqual('Starts with D')
    expect(multipleItems[1].textContent).toEqual('Starts with F')

    multipleItems[0].querySelector('input')!.dispatchEvent(new Event('change'))
    multipleItems[1].querySelector('input')!.dispatchEvent(new Event('change'))
    await nextTick()
    ;(multipleButtons[0] as HTMLButtonElement).click()
    await nextTick()
    rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows.length).toEqual(2)
    expect(rows[0].find('.vxp-table__cell').text()).toEqual('Drake')
    expect(rows[1].find('.vxp-table__cell').text()).toEqual('Farmer')

    singleItems[1].dispatchEvent(new Event('click'))
    await nextTick()
    rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows.length).toEqual(1)
    expect(rows[0].findAll('.vxp-table__cell')[0].text()).toEqual('Drake')
    expect(rows[0].findAll('.vxp-table__cell')[1].text()).toEqual('Aeris')
    ;(multipleButtons[1] as HTMLButtonElement).click()
    await nextTick()
    rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows.length).toEqual(2)
  })

  it('selection column', async () => {
    const columns = [
      {
        type: 'selection',
        key: 'selection'
      },
      {
        name: 'Name',
        key: 'name'
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `${i}`, label: `l${i}` }))
    const wrapper = mount(() => (
      <Table columns={columns} data={data}>
        <TableColumn id-key={'label'} name={'Label'} order={1}></TableColumn>
      </Table>
    ))

    await runScrollTimers()

    const headRow = wrapper.find('.vxp-table__head .vxp-table__row')
    const rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    const headCells = headRow.findAll('.vxp-table__head-cell')

    expect(headCells[0].find('.vxp-table__selection').exists()).toBe(true)
    rows.forEach(row => {
      expect(row.find('.vxp-table__cell').find('.vxp-table__selection').exists()).toBe(true)
    })

    rows[0].find('.vxp-table__selection').trigger('click')
    await nextTick()
    expect(headCells[0].find('.vxp-checkbox').classes()).toContain('vxp-checkbox--partial')
    expect(rows[0].find('.vxp-checkbox').classes()).toContain('vxp-checkbox--checked')

    headCells[0].find('.vxp-table__selection').trigger('click')
    await nextTick()
    expect(headCells[0].find('.vxp-checkbox').classes()).toContain('vxp-checkbox--checked')
    rows.forEach(row => {
      expect(row.find('.vxp-checkbox').classes()).toContain('vxp-checkbox--checked')
    })
  })

  it('order column', async () => {
    const columns = [
      {
        type: 'order',
        key: 'order',
        name: 'Order'
      },
      {
        name: 'Name',
        key: 'name'
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `${i}`, label: `l${i}` }))
    const wrapper = mount(() => (
      <Table columns={columns} data={data}>
        <TableColumn id-key={'label'} name={'Label'} order={1}></TableColumn>
      </Table>
    ))

    await runScrollTimers()

    const headRow = wrapper.find('.vxp-table__head .vxp-table__row')
    const rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    const headCells = headRow.findAll('.vxp-table__head-cell')

    expect(headCells[0].text()).toEqual('Order')
    rows.forEach((row, i) => {
      expect(row.find('.vxp-table__cell').text()).toEqual(`${i + 1}`)
    })
  })

  it('expand column', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name'
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `${i}`, label: `l${i}` }))
    const wrapper = mount(() => (
      <Table columns={columns} data={data}>
        <TableColumn id-key={'expand'} type={'expand'}>
          <div class={'expand'}></div>
        </TableColumn>
        <TableColumn id-key={'label'} name={'Label'}></TableColumn>
      </Table>
    ))

    await runScrollTimers()

    const rowGroups = wrapper.findAll('.vxp-table__body .vxp-table__group')

    rowGroups.forEach(row => {
      expect(row.find('.vxp-table__expand').exists()).toBe(true)
    })

    await rowGroups[0].find('.vxp-table__expand').trigger('click')
    expect(rowGroups[0].find('.vxp-table__collapse').exists()).toBe(true)
    expect(rowGroups[0].find('.expand').exists()).toBe(true)

    await rowGroups[0].find('.vxp-table__expand').trigger('click')
    expect(rowGroups[0].find('.vxp-table__collapse').exists()).not.toBe(true)
    expect(rowGroups[0].find('.expand').exists()).not.toBe(true)
  })

  it('paged data', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name'
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `${i}`, label: `l${i}` }))
    const wrapper = mount(Table, {
      props: {
        columns,
        data,
        pageSize: 6
      },
      slots: {
        default: () => <TableColumn id-key={'label'} name={'Label'}></TableColumn>
      }
    })

    await runScrollTimers()

    let rows = wrapper.findAll('.vxp-table__body .vxp-table__row')

    expect(rows.length).toEqual(6)
    expect(rows[0].find('.vxp-table__cell').text()).toEqual(data[0].label)

    await wrapper.setProps({ currentPage: 2 })
    rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows.length).toEqual(4)
    expect(rows[0].find('.vxp-table__cell').text()).toEqual(data[6].label)
  })

  it('tree data', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name'
      }
    ]

    const data = Array.from<any, any>({ length: 3 }, (_, i) => ({ label: `l${i}` }))
    data[0].children = Array.from({ length: 3 }, (_, i) => ({ label: `l${3 + i}` }))
    data[0].treeExpanded = true
    data[0].children[0].children = Array.from({ length: 3 }, (_, i) => ({ label: `l${6 + i}` }))

    const wrapper = mount(() => (
      <Table columns={columns} data={data}>
        <TableColumn id-key={'label'} name={'Label'}></TableColumn>
        <TableColumn id-key={'label1'} name={'Label1'}></TableColumn>
      </Table>
    ))

    let rows = wrapper.findAll('.vxp-table__body .vxp-table__row')

    expect(rows.length).toEqual(6)
    expect(rows[0].find('.vxp-table__cell').find('.vxp-table__tree-expand').exists()).toBe(true)
    expect(
      rows[0].find('.vxp-table__cell').find('.vxp-table__tree-expand').classes()
    ).not.toContain('vxp-table__tree-expand--hidden')
    expect(rows[1].find('.vxp-table__cell').find('.vxp-table__tree-expand').exists()).toBe(true)
    expect(
      rows[1].find('.vxp-table__cell').find('.vxp-table__tree-expand').classes()
    ).not.toContain('vxp-table__tree-expand--hidden')
    expect(rows[1].find('.vxp-table__cell').find('.vxp-table__pad').attributes('style')).toContain(
      '--vxp-table-row-depth: 1;'
    )

    await rows[1].find('.vxp-table__cell').find('.vxp-table__tree-expand').trigger('click')
    rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows.length).toEqual(9)
    expect(rows[2].find('.vxp-table__cell').find('.vxp-table__pad').attributes('style')).toContain(
      '--vxp-table-row-depth: 2;'
    )

    await rows[0].find('.vxp-table__cell').find('.vxp-table__tree-expand').trigger('click')
    rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows.length).toEqual(3)
  })
})
