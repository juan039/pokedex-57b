<template>
  <div class="home">
    <div class="container row mx-auto">
          
      <template v-if="pokemon.length == 0">
        <PokeCardEmpty
          v-for="n in 20"
          :key="n"
        />
      </template>
      <template v-else>
        <PokeCard 
          v-for="(el, index) in pokemon"
          :key="index"
          :pokemon="el"
          @addToFavorites="addToFavorites"
        />
      </template>

    </div>
    <button :disabled="buttonDisabled" type="button" class="btn btn-info" @click="fetchPokemon">Load More</button>
  </div>
</template>

<script>
// @ is an alias to /src
import PokeCard from '@/components/PokeCard.vue'
import PokeCardEmpty from '@/components/PokeCardEmpty.vue'

export default {
  name: 'HomeView',
  components: {
    PokeCard,
    PokeCardEmpty
  },
  created() {
    if (this.localPokemon?.length > 0) {
      this.pokemon = [...this.localPokemon]
      this.buttonDisabled = false
    } else {
      this.fetchPokemon()
    }
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
    }
  },
  methods: {
    fetchPokemon() {
      this.buttonDisabled = true
      fetch(`${this.baseURL}?offset=${this.offset}]&limit=${this.limit}`)
        .then(response => response.json())
        .then(data => {
          Promise.all(
            data.results.map(el => this.fetchSinglePokemon(el.url))
          ).then(responses => {
            responses.forEach(el => {
              this.pokemon.push(this.filterData(el))
            })
            localStorage.setItem('pokemon', JSON.stringify(this.pokemon))
          })
          
          this.offset += this.limit
        }).finally(() => {
            console.log('termino')
            this.buttonDisabled = false
          })
    },
    fetchSinglePokemon (url) {
      return fetch(url).then(resp => resp.json())
    },
    filterData (pokemon) {
      return {
        name: pokemon.name,
        id: pokemon.id,
        types: pokemon.types,
        sprites: {
          front_default: pokemon.sprites.front_default
        },
        favorite: false
      }
    },
    addToFavorites (id) {
      this.pokemon.find((el, index) => {
        if (el.id == id) {
          this.pokemon[index].favorite = !this.pokemon[index].favorite
        }
        return
      })
      localStorage.setItem('pokemon', JSON.stringify(this.pokemon))
    }
  }
}
</script>
