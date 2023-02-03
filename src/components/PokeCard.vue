<template>
  <div class="col-6 col-md-4 col-lg-3 mb-3">
    <div class="card" @click="goToDetails">
      <!-- if it's on favorites use variant warning -->
      <b-icon
        ref="favIcon"
        icon="star-fill"
        font-scale="3"
        class="position-absolute end-0 p-2"
        :variant="isFavorite"
        @click.stop="$emit('addToFavorites', pokemon.id)"
      ></b-icon>
      <img ref="image" :src="URLImage" class="card-img-top">
      <div class="card-body">
        <h5 ref="name" class="card-title text-capitalize">{{pokemon.name}}</h5>
        <h6 ref="type" class="card-subtitle mb-2 text-muted text-capitalize">{{ pokemonType }} - #{{ pokemon.id }}</h6>
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
    },
    isFavorite () {
      return this.pokemon.favorite ? 'warning' : 'secondary'
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
