import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { Upload } from '..'

const getMockFile = (element: Element, files: File[]): void => {
  Object.defineProperty(element, 'files', {
    get() {
      return files
    }
  })
}

describe('Upload', () => {
  it('should render', async () => {
    const wrapper = mount(() => <Upload></Upload>)
    expect(wrapper.find('.vxp-upload').exists()).toBe(true)
  })
  it('should work with `file list`', async () => {
    const fileList = [
      {
        id: 1,
        name: 'file1.txt'
      }
    ]
    const wrapper = mount(() => <Upload file-list={fileList}></Upload>)
    expect(wrapper.find('.vxp-upload__files').exists()).toBe(true)
  })

  it('should work with `multiple` prop ', async () => {
    const wrapper = mount(() => <Upload multiple></Upload>)
    expect(wrapper.find('input').attributes('multiple')).toBe('')
  })

  it('should work with `tip` prop ', async () => {
    const tipText = 'test tip'
    const wrapper = mount(() => <Upload tip={tipText}></Upload>)
    expect(wrapper.find('.vxp-upload__tip').text()).toBe(tipText)
  })
  //   it('should work with `list-type` prop ', async () => {
  //     const listType = 'name'

  //     const wrapper = mount(() => <Upload list-type={listType} manual></Upload>)
  //     const input = wrapper.find('input')
  //     const fileList = [new File(['index'], 'file.txt')]

  //     getMockFile(input.element, fileList)
  //     await input.trigger('change')
  //     expect(wrapper.findAll('.vxp-upload__file--name').length).toBe(1)
  //   })
  it('should work with `block` prop ', async () => {
    const wrapper = mount(() => <Upload block></Upload>)
    expect(wrapper.find('.vxp-upload--block').exists()).toBe(true)
  })
//   it('should work with `accept` prop ', async () => {
//     const wrapper = mount(() => <Upload accept></Upload>)
//     expect(wrapper.find('input').attributes('accept')).toBe('')
//   })
})
