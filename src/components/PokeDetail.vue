<template>
  <div class="container">
    <template v-if="!isEmpty">
      <h1 ref="title" class="text-capitalize">{{ pokemon.name }} - #{{ pokemon.id }}</h1>
      <div class="row">
        <div class="col-12 col-md-6 position-relative">
          <b-icon
            ref="favIcon"
            icon="star-fill"
            font-scale="3"
            class="position-absolute p-2"
            :variant="isFavorite"
            @click.stop="$emit('addToFavorites', pokemon.id)"
          ></b-icon>
          <img ref="image" :src="URLImage" class="img-fluid w-100 img-thumbnail" :alt="pokemon.name">
        </div>
        <div class="col-12 col-md-6">
          <div class="card">
            <ul class="list-group list-group-flush">
              <li ref="height" class="list-group-item fw-bold text-primary">Height: <span>{{ height }} cm</span></li>
              <li ref="weight" class="list-group-item fw-bold text-secondary">Weight: <span>{{ weight }} kg</span></li>
            </ul>
          </div>
          <div ref="types" class="text-start mt-2">
            <h2>Type</h2>
            <span
              v-for="(el, index) in pokemon.types"
              :key="`type-${index}`"
              :class="getRandomBadgeColor()"
              class="badge text-capitalize">{{el.type.name}}</span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <h1 class="text-capitalize placeholder-glow">
        <span class="placeholder col-6"></span>
      </h1>
      <div class="row">
        <div class="col-12 col-md-6 placeholder-glow">
          <div class="placeholder col-12" style="height:12rem"></div>
        </div>
        <div class="col-12 col-md-6">
          <div class="card">
            <ul class="list-group list-group-flush">
              <li class="list-group-item fw-bold text-primary placeholder"></li>
              <li class="list-group-item fw-bold text-secondary placeholder"></li>
            </ul>
          </div>
          <div class="text-start mt-2">
            <h2 class="placeholder"></h2>
            <span
              class="badge placeholder text-capitalize"></span>
          </div>
        </div>
      </div>
    </template>   
  </div>
</template>

<script>
export default {
  name: 'PokeDetail',
  props: {
    pokemon: {
      type: Object
    },
  },
  data() {
    return {
      badgeColors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
    }
  },
  computed: {
    pokemonType () {
      return this.pokemon?.types[0]?.type?.name
    },
    URLImage () {
      return this.pokemon?.sprites.front_default
    },
    height () {
      return this.pokemon?.height * 10
    },
    weight () {
      return this.pokemon?.weight / 10
    },
    isEmpty() {
      return Object.keys(this.pokemon).length === 0;
    },
    isFavorite () {
      return this.pokemon.favorite ? 'warning' : 'secondary'
    }
  },
  methods: {
    getRandomBadgeColor () {
     return `text-bg-${this.badgeColors[Math.floor(Math.random()*this.badgeColors.length)]}`;
    }
  }
}
</script>
