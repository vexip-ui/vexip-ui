import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { Upload } from '..'

const sleep = async (ms: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

describe('Upload Drag', () => {
  it('should work with `drag` event ', async () => {
    const wrapper = mount(() => <Upload allow-drag manual></Upload>)

    const triggerItem = wrapper.find('.vxp-upload__control')

    expect(wrapper.getComponent(Upload).vm.isDragOver).toBe(false)

    await triggerItem.trigger('dragover')
    expect(wrapper.getComponent(Upload).vm.isDragOver).toBe(true)

    await triggerItem.trigger('dragleave')
    await sleep(100)
    expect(wrapper.getComponent(Upload).vm.isDragOver).toBe(false)

    await triggerItem.trigger('dragover')
    expect(wrapper.getComponent(Upload).vm.isDragOver).toBe(true)

    await triggerItem.trigger('drop')
    expect(wrapper.getComponent(Upload).vm.isDragOver).toBe(false)
  })
})
