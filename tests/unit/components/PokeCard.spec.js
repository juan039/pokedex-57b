import { BIcon } from 'bootstrap-vue'
import { shallowMount } from '@vue/test-utils'
import Component from '@/components/PokeCard.vue'
const mockRouter = {
  push: jest.fn()
}
const pokemon = {
  name: 'mew',
  id: '150',
  types:[
    {
      type: {
      name: 'grass'
      }
    }
  ],
  sprites:{
    front_default: 'imageURL'
  },
  favorite: false
}

const getWrapper = () => {
  return shallowMount(Component,
    {
      components: {
        'b-icon': BIcon
      },
      propsData: {
        pokemon
      },
      mocks: {
        $router: mockRouter
      }
    }
  )
}

describe('PokeCard.vue', () => {
  describe('template', () => {
    it('renders info about pokemon', () => {
      const wrapper = getWrapper()
  
      expect(wrapper.findComponent({ref: 'favIcon'}).exists()).toBeTruthy()
      expect(wrapper.findComponent({ref: 'favIcon'}).attributes().variant).toBe('secondary')
      expect(wrapper.findComponent({ref: 'image'}).attributes().src).toBe('imageURL')
      expect(wrapper.findComponent({ref: 'name'}).text()).toBe('mew')
      expect(wrapper.findComponent({ref: 'type'}).text()).toBe('grass - #150')
    })
    it('renders star with variant as favorite', async() => {
      const wrapper = getWrapper()

      await wrapper.setProps({ pokemon: {...pokemon, favorite:true} })
      expect(wrapper.findComponent({ref: 'favIcon'}).attributes().variant).toBe('warning')
    })
  })

  describe('methods', () => {
    describe('goToDetails', () => {
      it('redirects to pokemon detail page', async ()=> {
        const wrapper = getWrapper()
        wrapper.vm.goToDetails()
        expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
        name: 'details',
        params: { id: '150' }
      });
      })
    })
  })
})
