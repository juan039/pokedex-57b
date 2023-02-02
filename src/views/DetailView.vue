<template>
  <div class="details">
    <div class="container">
      <button type="button" class="d-block btn btn-primary text" @click="$router.back()">Go Back</button>
    </div>
    <PokeDetail 
      @addToFavorites="addToFavorites"
      :pokemon="pokemon"/>
  </div>
</template>

<script>
// @ is an alias to /src
import PokeDetail from '@/components/PokeDetail.vue'

export default {
  name: 'HomeView',
  components: {
    PokeDetail
  },
  created() {
    this.fetchPokemon(this.$route.params.id)
    this.$watch(
      () => this.$route.params,
      async(toParams) => {
        // react to route changes...
        
        await this.fetchPokemon(toParams.id)
      }
    )
  },
  data () {
    return {
      pokemon: {}
    }
  },
  computed: {
    localPokemon () {
      return JSON.parse(localStorage.getItem('pokemon')).find(el => el.id == this.$route.params.id)
    },
    isFavorite () {
      return this.localPokemon.favorite
    }
  },
  methods: {
    fetchPokemon(id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokeResponse => {
          this.pokemon = {...pokeResponse, favorite:this.isFavorite}
        })
    },
    addToFavorites (id) {
      const pokeLocal = JSON.parse(localStorage.getItem('pokemon'))
      pokeLocal.find((el, index) => {
        if (el.id == id) {
          const isFav = !pokeLocal[index].favorite
          pokeLocal[index].favorite = isFav
          this.pokemon = {...this.pokemon, favorite: isFav}
        }
        return
      })
      localStorage.setItem('pokemon', JSON.stringify(pokeLocal))
    }
  }
}
</script>
