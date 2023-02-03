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

    describe('filterData', () => {
      it('Filter Pokemon data', () => {
        const pokemonMoreData = {
          ...pokemon,
          a: 3,
          b: 5,
          game: 'pokemon yellow'
        }
        const wrapper = getWrapper()
        const pokemonFiltered = wrapper.vm.filterData(pokemonMoreData)
        expect(pokemonFiltered).toEqual(pokemon)
      })
    })

    describe('addToFavorites', () => {
      it('Filter Pokemon data', async () => {

        const wrapper = getWrapper()
        await wrapper.setData({ pokemon: [pokemon] })
        wrapper.vm.addToFavorites(150)
        expect(wrapper.vm.pokemon[0].favorite).toBe(true)
      })
    })

    describe('clearResults', () => {
      it('Resets pokemon and offset', async () => {
        const mockMethod = jest.spyOn(Component.methods, 'fetchPokemon')
        const wrapper = getWrapper()
        await wrapper.setData({ offset: 20 })
        await wrapper.vm.clearResults()

        expect(mockMethod).toBeCalled()
        expect(wrapper.vm.offset).toBe(0)
      })
    })
  })
})
