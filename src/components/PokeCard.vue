<template>
  <div class="col-6 col-md-4 col-lg-3 mb-3">
    <div class="card" @click="goToDetails">
      <!-- if it's on favorites use variant warning -->
      <b-icon icon="star-fill" font-scale="3" class="position-absolute end-0 p-2" variant="secondary"></b-icon>
      <img :src="URLImage" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title text-capitalize">{{pokemon.name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted text-capitalize">{{ pokemonType }} - #{{ pokemon.id }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokeCard',
  props: {
    pokemon: {
      type: Object
    },
  },
  computed: {
    pokemonType () {
      return this.pokemon?.types[0]?.type?.name
    },
    URLImage () {
      return this.pokemon?.sprites.front_default
    }
  },
  methods: {
    goToDetails () {
      this.$router.push({
        name: 'details',
        params: { id: this.pokemon?.id }
      })
    }
  }
}
</script>
