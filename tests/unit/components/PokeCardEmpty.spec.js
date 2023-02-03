import { shallowMount } from '@vue/test-utils'
import Component from '@/components/PokeCardEmpty.vue'

const getWrapper = () => {
  return shallowMount(Component)
}

describe('PokeCardEmpty.vue', () => {
  describe('template', () => {
    it('renders info placeholder card', () => {
      const wrapper = getWrapper()
  
      expect(wrapper.findComponent({ref: 'image'}).exists()).toBeTruthy()
      expect(wrapper.findComponent({ref: 'title'}).exists()).toBeTruthy()
      expect(wrapper.findComponent({ref: 'detail'}).exists()).toBeTruthy()
    })
  })
})
