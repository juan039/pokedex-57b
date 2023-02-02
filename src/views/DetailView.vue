<template>
  <div class="details">
    <div class="container">
      <button type="button" class="d-block btn btn-primary text" @click="$router.back()">Go Back</button>
    </div>
    <PokeDetail :pokemon="pokemon"/>
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
  methods: {
    fetchPokemon(id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokeResponse => {
          this.pokemon = pokeResponse
        })
    }
  }
}
</script>
