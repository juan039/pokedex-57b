<template>
  <div class="col-6 col-md-4 col-lg-3 mb-3">
    <div class="card" aria-hidden="true">
      <svg ref="image" class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96"></rect></svg>
      <div class="card-body">
        <h5 ref="title" class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p ref="detail" class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokeCardEmpty'
}
</script>
