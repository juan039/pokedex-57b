import { shallowMount } from '@vue/test-utils'
import Component from '@/components/LogIn.vue'

const getWrapper = () => {
  return shallowMount(Component)
}

const emailLabel = 'Email address'
const passwordLabel = 'Password'

describe('LogIn.vue', () => {
  describe('template', () => {
    it('renders labels', () => {
      const wrapper = getWrapper()
  
      expect(wrapper.findComponent({ref: 'emailLabel'}).text()).toMatch(emailLabel)
      expect(wrapper.findComponent({ref: 'passwordLabel'}).text()).toMatch(passwordLabel)
    })
  })
})
