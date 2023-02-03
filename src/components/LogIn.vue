<template>
  <form @submit.prevent="submitForm">
    <div class="mb-3">
      <label ref="emailLabel" for="exampleInputEmail1" class="form-label">Email address</label>
      <input
        ref="emailInput"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        v-model="email">
      <div v-if="errors && errors.email" ref="emailError" id="emailHelp" class="form-text text-danger">
        {{errors.email}}  
      </div>
    </div>
    <div class="mb-3">
      <label ref="passwordLabel" for="exampleInputPassword1" class="form-label">Password</label>
      <input ref="passwordInput" type="password" class="form-control" id="exampleInputPassword1" v-model="password">
      <div v-if="errors && errors.password" ref="passwordError" id="passwordHelp" class="form-text text-danger">
        {{errors.password}}  
      </div>
    </div>
    <button ref="submitButton" type="submit" class="btn btn-primary">Submit</button>
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
