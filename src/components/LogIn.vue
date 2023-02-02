<template>
  <form @submit.prevent="submitForm">
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="email">
      <div id="emailHelp" class="form-text text-danger" v-if="errors && errors.email">
        {{errors.email}}  
      </div>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
      <div id="passwordHelp" class="form-text text-danger" v-if="errors && errors.password">
        {{errors.password}}  
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
export default {
  name: 'LogIn',
  data () {
    return {
      email: '',
      password: '',
      errors: null
    }
  },
  methods: {
    validateForm () {
      const errors = {};
      if (!this.email) {
        errors.email = 'Email is required';
      } else if (!/^[^@]+@\w+(\.\w+)+\w$/.test(this.email)) {
        errors.email = 'Invalid email';
      }

      if (!this.password) {
        errors.password = 'Password is required';
      }

      if (Object.keys(errors).length > 0) {
        this.errors = errors;
        return;
      } else {
        this.errors = null;
      }
    },
    submitForm () {
      this.validateForm()
      if (this.errors) return

      localStorage.setItem('token', '12345')
      this.$router.push({ path: "/" })
    }
  }
}
</script>
