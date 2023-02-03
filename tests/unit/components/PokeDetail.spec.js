import { BIcon } from 'bootstrap-vue'
import { shallowMount } from '@vue/test-utils'
import Component from '@/components/PokeDetail.vue'

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
  favorite: false,
  height: 10,
  weight: 10
}

const getWrapper = () => {
  return shallowMount(Component,
    {
      components: {
        'b-icon': BIcon
      },
      propsData: {
        pokemon
      }
    }
  )
}

describe('PokeDetail.vue', () => {
  describe('template', () => {
    it('renders info about pokemon', () => {
      const wrapper = getWrapper()
  
      expect(wrapper.findComponent({ref: 'favIcon'}).exists()).toBeTruthy()
      expect(wrapper.findComponent({ref: 'favIcon'}).attributes().variant).toBe('secondary')
      expect(wrapper.findComponent({ref: 'image'}).attributes().src).toBe('imageURL')
      expect(wrapper.findComponent({ref: 'title'}).text()).toBe('mew - #150')
      expect(wrapper.findComponent({ref: 'height'}).text()).toBe('Height: 100 cm')
      expect(wrapper.findComponent({ref: 'weight'}).text()).toBe('Weight: 1 kg')
      expect(wrapper.findComponent({ref: 'types'}).text()).toContain('grass')
    })
  })

  describe('methods', () => {
    describe('getRandomBadgeColor', () => {
      it('returns class for the type badges that belongs to badgeColors', async ()=> {
        const wrapper = getWrapper()
        const classBadge = wrapper.vm.getRandomBadgeColor()
        
        expect(wrapper.vm.badgeColors).toEqual(expect.arrayContaining(
          [classBadge.split('-')[2]]
        ))
      })
    })
  })
})
