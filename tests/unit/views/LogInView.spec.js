import { shallowMount } from '@vue/test-utils'
import Component from '@/views/LogInView.vue'
import LogIn from '@/components/LogIn.vue'

const getWrapper = () => {
  return shallowMount(Component)
}

describe('LogInView.vue', () => {
  describe('template', () => {
    it('renders title and child component', () => {
      const wrapper = getWrapper()
  
      expect(wrapper.findComponent({ref: 'title'}).text()).toMatch('Welcome to your Pokedex')
      expect(wrapper.findComponent(LogIn).exists()).toBeTruthy()
    })
  })
})
