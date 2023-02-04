import { shallowMount } from '@vue/test-utils'
import Component from '@/views/FavoritesView.vue'
import PokeCard from '@/components/PokeCard.vue'

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
  favorite: true
}

const getWrapper = () => {
  return shallowMount(Component)
}

const localStorageMock = (function() {
  var store = {
    pokemon: '[]'
  };
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = JSON.stringify(value);
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    }
  };
})();
describe('FavoritesView.vue', () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });
  
  describe('template', () => {
    it('renders Empty message when no pokemon stored in LocalStorage as Favorite', () => {
      const wrapper = getWrapper()
  
      expect(wrapper.findComponent({ref: 'empty'}).text()).toMatch('You do not have any Pokemon as Favorite')
    })

    it('renders pokecard for each pokemon marked as favorite', () => {
      global.window.localStorage.setItem('pokemon', [pokemon])
      const wrapper = getWrapper()
      expect(wrapper.findComponent(PokeCard).exists()).toBeTruthy()
      expect(wrapper.findAllComponents(PokeCard).length).toBe(1)
    })
  })

  describe('mehtods', () => {
    describe('addToFavorites', () => {
      it('Filter Pokemon data', async () => {
        global.window.localStorage.setItem('pokemon', [pokemon])
        const spy = jest.spyOn(global.localStorage, 'setItem')

        const wrapper = getWrapper()
        wrapper.vm.addToFavorites(150)
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.localPokemon[0].favorite).toBe(false)
      })
    })
  })
})
