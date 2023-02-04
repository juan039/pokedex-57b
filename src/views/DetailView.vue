<template>
  <div class="details">
    <div class="container">
      <button ref="buttonBack" type="button" class="d-block btn btn-primary text" @click="$router.back()">Go Back</button>
    </div>
    <PokeDetail
      v-if="!error"
      @addToFavorites="addToFavorites"
      :pokemon="pokemon"/>
    <h2
      v-else
      ref="error">
      {{ error }}
    </h2>
  </div>
</template>

<script>

import PokeDetail from '@/components/PokeDetail.vue'

export default {
  name: 'DetailView',
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
      pokemon: {},
      error: ''
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
        }).catch(err => {
          this.error = `Sorry, we are trying to catch 'em all`
          console.error(err)
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
