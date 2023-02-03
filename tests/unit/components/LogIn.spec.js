import { shallowMount } from '@vue/test-utils'
import Component from '@/components/LogIn.vue'
const mockRouter = {
  push: jest.fn()
}
const getWrapper = () => {
  return shallowMount(Component,
    {
      mocks: {
        $router: mockRouter
      }
    }
  )
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

    it('renders inputs', () => {
      const wrapper = getWrapper()
  
      expect(wrapper.findComponent({ref: 'emailInput'}).exists()).toBe(true)
      expect(wrapper.findComponent({ref: 'passwordInput'}).exists()).toBe(true)
    })

    it('renders Submit button', () => {
      const wrapper = getWrapper()
  
      expect(wrapper.findComponent({ref: 'submitButton'}).exists()).toBe(true)      
    })
  })

  describe('methods', () => {
    describe('validateForm', () => {
      it('No email nor password', ()=> {
        const wrapper = getWrapper()
        wrapper.vm.validateForm()
        expect(wrapper.vm.errors.email).toBe('Email is required')
        expect(wrapper.vm.errors.password).toBe('Password is required')
      })

      it('Invalid email', async()=> {
        const wrapper = getWrapper()

        await wrapper.setData({ email: 'bar' })
        wrapper.vm.validateForm()
        expect(wrapper.vm.errors.email).toBe('Invalid email')
      })

      it('Valid email and password', async()=> {
        const wrapper = getWrapper()

        await wrapper.setData({ email: 'bar@mail.com', password: '12345' })
        wrapper.vm.validateForm()
        expect(wrapper.vm.errors).toBeNull()
      })
    })
    describe('submitForm', ()=> {
      const mockMethod = jest.spyOn(Component.methods, 'validateForm')
      const localStorageMock = (function () {
        let store = {};
      
        return {
          setItem(key, value) {
            store[key] = value;
          }
        };
      })();
      
      Object.defineProperty(window, "localStorage", { value: localStorageMock });
      it('call validateForm', ()=> {
        const wrapper = getWrapper()
        wrapper.vm.submitForm()
        expect(mockMethod).toHaveBeenCalled();
      })
      it('have errors then break the operation', async ()=> {
        const wrapper = getWrapper()
        const spy = jest.spyOn(global.localStorage, 'setItem')

        await wrapper.setData({ errors: {email:'bar'} })
        
        wrapper.vm.submitForm()
        expect(mockMethod).toHaveBeenCalled();
        expect(spy).not.toHaveBeenCalled();
      })
      it('sets token on LocalStorage and redirect to home', async ()=> {
        const wrapper = getWrapper()
        const spy = jest.spyOn(global.localStorage, 'setItem')
        await wrapper.setData({ email: 'bar@mail.com', password: '12345' })
        wrapper.vm.submitForm()
        expect(mockMethod).toHaveBeenCalled();
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ path: "/" });
      })
    })
  })
})
