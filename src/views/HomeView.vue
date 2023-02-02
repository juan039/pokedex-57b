<template>
  <div class="home">
    <div class="container row mx-auto">

      <form class="row g-2" @submit.prevent="searchPokemon">
        <div class="col-7 ">
          <label for="pokeSearch" class="visually-hidden">Search Pokemon</label>
          <input
            type="text"
            class="form-control"
            id="pokeSearch"
            placeholder="Search Pokemon by name or ID"
            v-model="searchTerm">
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-3">Search</button>
        </div>
      </form>
          
      <template v-if="pokemon.length == 0">
        <template v-if="!error">
          <PokeCardEmpty
            v-for="n in 20"
            :key="n"
          />
        </template>
        <h2 v-else>
          {{ error }}
        </h2>
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
    <button v-if="pokemon.length <= 1" type="button" class="btn btn-info" @click="clearResults">Go Back</button>
    <button v-else :disabled="buttonDisabled" type="button" class="btn btn-info" @click="fetchPokemon">Load More</button>
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
      this.offset = this.pokemon.length
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
      buttonDisabled: true,
      searchTerm: '',
      error: ''
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
    },
    searchPokemon () {
      this.pokemon = []
      this.fetchSinglePokemon(`${this.baseURL}${this.searchTerm}`)
        .then(response => {
          this.pokemon = [response]
        }).catch(err => {
          this.error = `Sorry, we are trying to catch 'em all`
          console.error(err)
        })
    },
    clearResults () {
      this.pokemon = []
      this.offset = 0,
      this.fetchPokemon();
    }
  }
}
</script>
