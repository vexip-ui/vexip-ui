import { TableColumn } from '@/components/table-column'
import { TableSummary } from '@/components/table-summary'

import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'

import { User } from '@vexip-ui/icons'
import { noop } from '@vexip-ui/utils'
import { Table, defineColumns, defineSummaries } from '..'
import TableBody from '../table-body.vue'

import type { DOMWrapper } from '@vue/test-utils'
import type { TableRowState } from '../symbol'

vi.useFakeTimers()

async function runScrollTimers() {
  await nextTick()
  vi.runOnlyPendingTimers()
  await nextTick()
  vi.runOnlyPendingTimers()
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

  it('accessor', async () => {
    const columns = [
      {
        name: 'Value',
        key: 'value',
        accessor: (item: any) => item.value
      }
    ]
    const data = [{ value: 100 }]
    const wrapper = mount(() => <Table columns={columns} data={data}></Table>)

    await runScrollTimers()

    const body = wrapper.find('.vxp-table__body')
    const row = body.find('.vxp-table__row')

    expect(row.find('.vxp-table__cell').text()).toEqual(String(data[0].value))
  })

  it('formatter', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name',
        formatter: (n: string) => `Name: ${n}`
      },
      {
        name: 'Value',
        key: 'value',
        accessor: (item: any) => item.value,
        formatter: (v: number) => v + 1
      }
    ]
    const data = [{ name: 'n', value: 100 }]
    const wrapper = mount(() => <Table columns={columns} data={data}></Table>)

    await runScrollTimers()

    const body = wrapper.find('.vxp-table__body')
    const row = body.find('.vxp-table__row')

    expect(row.findAll('.vxp-table__cell')[0].text()).toEqual(`Name: ${data[0].name}`)
    expect(row.findAll('.vxp-table__cell')[1].text()).toEqual(String(data[0].value + 1))
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
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `${i}` }))
    const wrapper = mount(Table, {
      props: {
        data,
        stripe: true,
        border: true,
        transparent: true
      }
    })

    await runScrollTimers()

    expect(wrapper.classes()).toContain('vxp-table--stripe')
    expect(wrapper.classes()).toContain('vxp-table--border')
    expect(wrapper.classes()).toContain('vxp-table--transparent')

    let rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows[0].classes()).not.toContain('vxp-table__row--stripe')
    expect(rows[1].classes()).toContain('vxp-table__row--stripe')

    await wrapper.setProps({ stripe: false })
    rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows[0].classes()).not.toContain('vxp-table__row--stripe')
    expect(rows[1].classes()).not.toContain('vxp-table__row--stripe')
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
    expect(wrapper.classes()).toContain('vxp-table--highlight')

    await runScrollTimers()

    const rowGroup = wrapper.find('.vxp-table__body .vxp-table__group')

    await rowGroup.trigger('mouseenter')
    expect(rowGroup.find('.vxp-table__row').classes()).toContain('vxp-table__row--hover')

    await rowGroup.trigger('mouseleave')
    expect(rowGroup.find('.vxp-table__row').classes()).not.toContain('vxp-table__row--hover')

    const headGroup = wrapper.find('.vxp-table__head .vxp-table__group')

    await headGroup.trigger('mouseenter')
    expect(headGroup.find('.vxp-table__row').classes()).not.toContain('vxp-table__row--hover')
  })

  it('custom column class name', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name',
        class: 'test1'
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `n${i}`, label: `l${i}` }))
    const wrapper = mount(() => (
      <Table columns={columns} data={data}>
        <TableColumn id-key={'label'} name={'Label'} class={'test2'}></TableColumn>
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
        order: -1,
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

    let renderRows = body.vm.data as TableRowState[]

    const clickSorter = async (cell: DOMWrapper<Element>, type: 'asc' | 'desc') => {
      await cell.find(`.vxp-table__sorter--${type}`).trigger('click')
      await nextTick()
      renderRows = body.vm.data
    }

    await clickSorter(headCells[0], 'asc')
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

    await clickSorter(headCells[0], 'desc')
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

    await clickSorter(headCells[1], 'desc')
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

    await clickSorter(headCells[1], 'asc')
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

  it('data filter', async () => {
    const search = ref('A')
    const filter = (item: { name: string, label: string }) => item.name.includes(search.value)
    const data = [
      { name: 'Angelique', label: 'Walsh' },
      { name: 'Aeris', label: 'Drake' },
      { name: 'Elisabeth', label: 'Rogers' },
      { name: 'Sharon', label: 'Tanner' },
      { name: 'Evie', label: 'Farmer' }
    ]
    const wrapper = mount(() => (
      <Table data={data} data-filter={filter}>
        <TableColumn id-key={'name'} name={'Name'}></TableColumn>
        <TableColumn id-key={'label'} name={'Label'}></TableColumn>
      </Table>
    ))

    await runScrollTimers()

    let rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows.length).toBe(2)
    expect(rows[0].find('.vxp-table__cell').text()).toEqual('Angelique')
    expect(rows[1].find('.vxp-table__cell').text()).toEqual('Aeris')

    search.value = 'S'
    await nextTick()
    rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows.length).toBe(1)
    expect(rows[0].find('.vxp-table__cell').text()).toEqual('Sharon')
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
    expect(rowGroups[0].find('.vxp-table__expanded').exists()).toBe(true)
    expect(rowGroups[0].find('.expand').exists()).toBe(true)

    await rowGroups[0].find('.vxp-table__expand').trigger('click')
    expect(rowGroups[0].find('.vxp-table__expanded').exists()).not.toBe(true)
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

    await runScrollTimers()
    // await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))

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
    await runScrollTimers()
    rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows.length).toEqual(9)
    expect(rows[2].find('.vxp-table__cell').find('.vxp-table__pad').attributes('style')).toContain(
      '--vxp-table-row-depth: 2;'
    )

    await rows[0].find('.vxp-table__cell').find('.vxp-table__tree-expand').trigger('click')
    await runScrollTimers()
    rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    expect(rows.length).toEqual(3)
  })

  it('indented column', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name'
      },
      {
        name: 'Indented',
        key: 'indented',
        indented: true
      },
      {
        name: 'Indented1',
        key: 'indented1',
        indented: true
      }
    ]

    const data = Array.from<any, any>({ length: 3 }, (_, i) => ({ label: `l${i}` }))
    data[0].children = Array.from({ length: 3 }, (_, i) => ({ label: `l${3 + i}` }))

    const wrapper = mount(() => <Table columns={columns} data={data}></Table>)
    await nextTick()

    const rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    const cells = rows[0].findAll('.vxp-table__cell')

    expect(cells[0].find('.vxp-table__tree-expand').exists()).toBe(false)
    expect(cells[1].find('.vxp-table__tree-expand').exists()).toBe(true)
    expect(cells[2].find('.vxp-table__tree-expand').exists()).toBe(false)
  })

  it('col-resize', async () => {
    let currentWidth = -1
    const onStart = vi.fn(({ width }) => (currentWidth = width))
    const onMove = vi.fn(({ width }) => (currentWidth = width))
    const onEnd = vi.fn(({ width }) => (currentWidth = width))
    const columns = [
      { name: 'Label', key: 'label' },
      { name: 'Name', key: 'name' }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({
      name: `n${i}`,
      label: `l${i}`
    }))
    const wrapper = mount(() => (
      <Table
        columns={columns}
        data={data}
        col-resizable
        onColResizeStart={onStart}
        onColResizeMove={onMove}
        onColResizeEnd={onEnd}
      ></Table>
    ))
    await nextTick()

    const heads = wrapper.findAll('.vxp-table__head-cell')
    const resizer = wrapper.findAll('.vxp-table__resizer')

    expect(wrapper.classes()).toContain('vxp-table--col-resizable')
    expect(resizer.length).toEqual(1)
    expect(heads[0].attributes('style')).toContain('width: 100px;')

    const elRectMock = vi.spyOn(heads[0].element, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      width: 100,
      height: 0,
      right: 0,
      bottom: 0,
      toJSON: noop
    })

    const downEvent = new CustomEvent('pointerdown') as any
    downEvent.button = 0
    downEvent.clientX = 0
    resizer[0].element.dispatchEvent(downEvent)
    expect(onStart).toHaveBeenCalled()
    expect(currentWidth).toEqual(100)

    await nextTick()
    expect(wrapper.classes()).toContain('vxp-table--col-resizing')

    const moveEvent = new CustomEvent('pointermove') as any
    moveEvent.clientX = 40
    document.dispatchEvent(moveEvent)
    vi.runOnlyPendingTimers()
    expect(onMove).toHaveBeenCalled()
    expect(currentWidth).toEqual(140)

    const upEvent = new CustomEvent('pointerup') as any
    upEvent.clientX = 50
    document.dispatchEvent(upEvent)
    expect(onEnd).toHaveBeenCalled()
    expect(currentWidth).toEqual(150)

    await nextTick()
    expect(wrapper.classes()).not.toContain('vxp-table--col-resizing')

    elRectMock.mockRestore()
  })

  it('cell span', async () => {
    const columns = defineColumns([
      {
        name: 'Name',
        key: 'name',
        cellSpan: ({ index }) => {
          if (index === 3) {
            return { colSpan: 2 }
          }
        }
      },
      {
        name: 'Label',
        key: 'label',
        cellSpan: ({ index }) => {
          if (index === 3) {
            return { colSpan: 2 }
          }
        }
      },
      {
        name: 'Address',
        key: 'address',
        cellSpan: ({ index }) => {
          if (index === 1) {
            return { rowSpan: 2 }
          }
        }
      },
      {
        name: 'Job',
        key: 'job',
        cellSpan: ({ index }) => {
          if (index === 3) {
            return { colSpan: 3, rowSpan: 3 }
          }
        }
      },
      {
        name: 'Value',
        key: 'value',
        cellSpan: ({ index }) => {
          if (index === 0) {
            return { colSpan: 2, rowSpan: 2 }
          }
        }
      }
    ])
    const data = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      name: `n${i}`,
      label: `l${i}`,
      address: `a${i}`,
      job: `j${i}`,
      value: i + 1
    }))
    const wrapper = mount(() => <Table columns={columns} data={data}></Table>)

    await runScrollTimers()

    const rows = wrapper.findAll('.vxp-table__body .vxp-table__row')
    const cells = rows.map(row => row.findAll('.vxp-table__cell'))

    expect(cells[0][0].attributes('colspan')).toBeUndefined()
    expect(cells[0][0].attributes('rowspan')).toBeUndefined()

    expect(cells[3][0].attributes('colspan')).toEqual('2')
    expect(cells[3][1].attributes('colspan')).toEqual('0')
    expect(cells[3][1].attributes('rowspan')).toEqual('0')

    expect(cells[1][2].attributes('rowspan')).toEqual('2')
    expect(cells[2][2].attributes('colspan')).toEqual('0')
    expect(cells[2][2].attributes('rowspan')).toEqual('0')

    expect(cells[3][3].attributes('colspan')).toEqual('2')
    expect(cells[3][3].attributes('rowspan')).toEqual('2')
    expect(cells[3][4].attributes('colspan')).toEqual('0')
    expect(cells[3][4].attributes('rowspan')).toEqual('0')
    expect(cells[4][3].attributes('colspan')).toEqual('0')
    expect(cells[4][3].attributes('rowspan')).toEqual('0')
    expect(cells[4][4].attributes('colspan')).toEqual('0')
    expect(cells[4][4].attributes('rowspan')).toEqual('0')

    expect(cells[0][4].attributes('colspan')).toBeUndefined()
    expect(cells[0][4].attributes('rowspan')).toEqual('2')
  })

  it('head cell span', async () => {
    const columns = defineColumns([
      {
        name: 'Name',
        key: 'name'
      },
      {
        name: 'Label',
        key: 'label',
        headSpan: 3
      },
      {
        name: 'Address',
        key: 'address'
      }
    ])
    const data = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      name: `n${i}`,
      label: `l${i}`,
      address: `a${i}`
    }))
    const wrapper = mount(() => <Table columns={columns} data={data}></Table>)

    await runScrollTimers()

    const heads = wrapper.findAll('.vxp-table__head .vxp-table__head-cell')

    expect(heads[0].attributes('colspan')).toBeUndefined()

    expect(heads[1].attributes('colspan')).toEqual('2')
    expect(heads[2].attributes('colspan')).toEqual('0')
  })

  it('summaries', async () => {
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `${i}`, value: i }))
    const wrapper = mount(() => (
      <Table data={data}>
        <TableColumn id-key={'name'} name={'Name'}>
          {{
            summary: ({ summary }: any) => summary.name
          }}
        </TableColumn>
        <TableColumn id-key={'value'} name={'Value'}></TableColumn>
        <TableSummary id-key={'sum'} name={'Sum'} above>
          {{
            default: ({ meta }: any) => meta.sum
          }}
        </TableSummary>
        <TableSummary id-key={'min'} name={'Min'}>
          {{
            default: ({ meta }: any) => meta.min
          }}
        </TableSummary>
      </Table>
    ))

    await runScrollTimers()

    const aboveFoot = wrapper.find('.vxp-table__foot--above')
    const belowFoot = wrapper.find('.vxp-table__foot--below')

    expect(aboveFoot.exists()).toBe(true)
    expect(aboveFoot.find('.vxp-table__foot-cell').text()).toEqual('Sum')
    expect(aboveFoot.findAll('.vxp-table__foot-cell')[1].text()).toEqual('45')

    expect(belowFoot.exists()).toBe(true)
    expect(belowFoot.find('.vxp-table__foot-cell').text()).toEqual('Min')
    expect(belowFoot.findAll('.vxp-table__foot-cell')[1].text()).toEqual('0')
  })

  it('summary cell span', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name'
      },
      {
        name: 'Label',
        key: 'label'
      },
      {
        name: 'Value',
        key: 'value'
      }
    ]
    const summaries = defineSummaries([
      {
        name: 'Sum',
        key: 'sum',
        above: true,
        cellSpan: ({ index }) => {
          if (index === 1) {
            return { colSpan: 2 }
          }
        }
      },
      {
        name: 'Min',
        key: 'min',
        cellSpan: ({ index }) => {
          if (index === 1) {
            return { colSpan: 3, rowSpan: 3 }
          }
        }
      },
      {
        name: 'Max',
        key: 'max'
      }
    ])
    const data = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      name: `n${i}`,
      label: i,
      value: i + 1
    }))
    const wrapper = mount(() => <Table columns={columns} summaries={summaries} data={data}></Table>)

    await runScrollTimers()

    const rows = wrapper.findAll('.vxp-table__foot .vxp-table__row')
    const cells = rows.map(row => row.findAll('.vxp-table__foot-cell'))

    expect(cells[0][0].attributes('colspan')).toBeUndefined()
    expect(cells[0][1].attributes('rowspan')).toBeUndefined()

    expect(cells[0][1].attributes('colspan')).toEqual('2')
    expect(cells[0][2].attributes('colspan')).toEqual('0')
    expect(cells[0][2].attributes('rowspan')).toEqual('0')

    expect(cells[1][1].attributes('colspan')).toEqual('2')
    expect(cells[1][1].attributes('rowspan')).toEqual('2')
    expect(cells[1][2].attributes('colspan')).toEqual('0')
    expect(cells[1][2].attributes('rowspan')).toEqual('0')
    expect(cells[2][1].attributes('colspan')).toEqual('0')
    expect(cells[2][1].attributes('rowspan')).toEqual('0')
    expect(cells[2][2].attributes('colspan')).toEqual('0')
    expect(cells[2][2].attributes('rowspan')).toEqual('0')
  })

  it('set icons', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name',
        sorter: true,
        filter: {
          able: true,
          options: [{ label: 'Includes A', value: 'A' }],
          method: (value: string, data: any) => data.name.includes(value)
        }
      },
      { type: 'expand' },
      { type: 'drag' }
    ]
    const data = [
      {
        name: 'Angelique',
        children: [{ name: 'Aeris' }],
        treeExpanded: true
      },
      {
        name: 'Elisabeth',
        children: [{ name: 'Sharon' }]
      },
      { name: 'Evie', label: 'Farmer' }
    ]
    const icons = {
      filter: User,
      asc: User,
      desc: User,
      expand: User,
      dragger: User,
      plus: User,
      minus: User
    }
    const wrapper = mount(() => <Table columns={columns} data={data} icons={icons}></Table>)

    await runScrollTimers()

    const headCell = wrapper.find('.vxp-table__head-cell')
    const rows = wrapper.findAll('.vxp-table__body .vxp-table__row')

    expect(headCell.find('.vxp-table__filter-trigger').findComponent(User).exists()).toBe(true)
    expect(headCell.find('.vxp-table__sorter--asc').findComponent(User).exists()).toBe(true)
    expect(headCell.find('.vxp-table__sorter--desc').findComponent(User).exists()).toBe(true)

    expect(rows[0].find('.vxp-table__expand').findComponent(User).exists()).toBe(true)
    expect(rows[1].find('.vxp-table__dragger').findComponent(User).exists()).toBe(true)

    expect(
      rows[0]
        .find('.vxp-table__tree-expand:not(.vxp-table__tree-expand--hidden)')
        .findComponent(User)
        .exists()
    ).toBe(true)
    expect(
      rows[2]
        .find('.vxp-table__tree-expand:not(.vxp-table__tree-expand--hidden)')
        .findComponent(User)
        .exists()
    ).toBe(true)
  })

  it('ellipsis', async () => {
    const columns = [
      {
        name: 'Name',
        key: 'name',
        ellipsis: true
      },
      {
        name: 'Value',
        key: 'value'
      }
    ]
    const data = Array.from({ length: 10 }, (_, i) => ({ name: `${i}`, value: i }))
    const wrapper = mount(Table, {
      props: { columns, data }
    })

    await runScrollTimers()

    const headCells = wrapper.findAll('.vxp-table__head .vxp-table__head-cell')
    const bodyCells = wrapper.findAll('.vxp-table__body .vxp-table__cell')

    expect(headCells[0].find('.vxp-ellipsis').exists()).toBe(true)
    expect(headCells[1].find('.vxp-ellipsis').exists()).toBe(false)
    expect(bodyCells[0].find('.vxp-ellipsis').exists()).toBe(true)
    expect(bodyCells[1].find('.vxp-ellipsis').exists()).toBe(false)

    await wrapper.setProps({ ellipsis: true })

    expect(headCells[0].find('.vxp-ellipsis').exists()).toBe(true)
    expect(headCells[1].find('.vxp-ellipsis').exists()).toBe(true)
    expect(bodyCells[0].find('.vxp-ellipsis').exists()).toBe(true)
    expect(bodyCells[1].find('.vxp-ellipsis').exists()).toBe(true)
  })
})
