<template>
  <div class="home">
    <div class="container row mx-auto">
          
      <template v-if="localFavorites.length == 0">
        <h1>You do not have any Pokemon as Favorite</h1>
      </template>
      <template v-else>
        <PokeCard 
          v-for="(el, index) in localFavorites"
          :key="index"
          :pokemon="el"
          @addToFavorites="addToFavorites"
        />
      </template>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PokeCard from '@/components/PokeCard.vue'

export default {
  name: 'FavoritesView',
  components: {
    PokeCard,
  },
  created() {
  },
  data () {
    return {
      pokemon: [],
      offset: 0,
      baseURL: "https://pokeapi.co/api/v2/pokemon/",
      limit: 20,
      buttonDisabled: true
    }
  },
  computed: {
    localPokemon () {
      return JSON.parse(localStorage.getItem('pokemon'))
    },
    localFavorites () {
      return JSON.parse(localStorage.getItem('pokemon')).filter(el => el.favorite)
    }
  },
  methods: {
    addToFavorites (id) {
      const copyLocalPokemon = [...this.localPokemon]
      copyLocalPokemon.find((el, index) => {
        if (el.id == id) {
          copyLocalPokemon[index].favorite = !copyLocalPokemon[index].favorite
        }
        return
      })
      localStorage.setItem('pokemon', JSON.stringify(copyLocalPokemon))
    }
  }
}
</script>
