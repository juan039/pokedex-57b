import { shallowMount } from '@vue/test-utils'
import Component from '@/views/HomeView.vue'
import PokeCard from '@/components/PokeCard.vue'
import PokeCardEmpty from '@/components/PokeCardEmpty.vue'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  })
);

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
  return shallowMount(Component)
}

describe('HomeView.vue', () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  describe('template', () => {
    it('renders search form', () => {
      const wrapper = getWrapper()
  
      expect(wrapper.findComponent({ref: 'searchForm'}).exists()).toBeTruthy()
    })

    it('renders 20 PokeCardEmpty', ()=> {
      const wrapper = getWrapper()

      expect(wrapper.findComponent(PokeCardEmpty).exists()).toBeTruthy()
      expect(wrapper.findAllComponents(PokeCardEmpty).length).toBe(20)
    })

    it('renders Pokemon card', async()=> {
      const wrapper = getWrapper()

      await wrapper.setData({ pokemon: [pokemon] })
      expect(wrapper.findComponent(PokeCard).exists()).toBeTruthy()
      expect(wrapper.findAllComponents(PokeCard).length).toBe(1)
    })
  })

  describe('methods', () => {
    describe('fetchSinglePokemon', () => {
      it('call fetch', () => {
        const wrapper = getWrapper()
        wrapper.vm.fetchSinglePokemon()
        expect(fetch).toBeCalled()
      })
    })

    describe('searchPokemon', () => {
      it('call fetchSinglePokemon', async () => {
        const mockMethod = jest.spyOn(Component.methods, 'fetchSinglePokemon')
        const wrapper = getWrapper()

        await wrapper.vm.searchPokemon()

        expect(mockMethod).toBeCalled()
      })
    })
  })
})
