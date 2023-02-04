import { shallowMount } from '@vue/test-utils'
import Component from '@/views/DetailView.vue'
import PokeDetail from '@/components/PokeDetail.vue'

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
const $route = {
  params: {
    id: 150
  }
}

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

const getWrapper = () => {
  return shallowMount(Component, {
    mocks: {
      $route
    }
  })
}

describe('DetailView.vue', () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    fetch.mockClear();
  })

  describe('template', () => {
    it('renders button and child component', () => {
      global.window.localStorage.setItem('pokemon', [pokemon])

      const wrapper = getWrapper()
  
      expect(wrapper.findComponent({ref: 'buttonBack'}).exists()).toBeTruthy()
      expect(wrapper.findComponent(PokeDetail).exists()).toBeTruthy()
    })

    it('render error message', async() => {
      global.window.localStorage.setItem('pokemon', [pokemon])
      const ErroMessage = `Sorry, we are trying to catch 'em all`
      const wrapper = getWrapper()
      await wrapper.setData({ error: ErroMessage })
  
      expect(wrapper.findComponent({ref: 'buttonBack'}).exists()).toBeTruthy()
      expect(wrapper.findComponent(PokeDetail).exists()).toBeFalsy()
      expect(wrapper.findComponent({ref: 'error'}).text()).toBe(ErroMessage)
    })
  })

  describe('methods', () => {
    describe('addToFavorites', () => {
      it('Add Pokemon to favorites', async () => {
        global.window.localStorage.setItem('pokemon', [pokemon])

        const spy = jest.spyOn(global.localStorage, 'setItem')

        const wrapper = getWrapper()
        await wrapper.setData({ pokemon: [pokemon] })
        wrapper.vm.addToFavorites(150)
        expect(spy).toHaveBeenCalled();
        expect(wrapper.vm.pokemon.favorite).toBe(true)

      })
    })
  })
})
