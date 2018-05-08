<template>

  <form
    class="component-login-form"
    @submit.prevent="onSubmit"
  >

    <div class="field">
      <label
        for="component-login-form_email"
        class="label"
      >
        Email
      </label>
      <div class="control">
        <input
          id="component-login-form_email"
          v-model="email"
          type="text"
          class="input"
          required
        >
      </div>
    </div>

    <div class="field">
      <label
        for="component-login-form_password"
        class="label"
      >
        Password
      </label>
      <div class="control">
        <input
          id="component-login-form_password"
          v-model="password"
          type="password"
          class="input"
          required
        >
      </div>
    </div>

    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button
          type="submit"
          class="button is-primary"
        >
          Submit
        </button>
      </div>
    </div>

  </form>

</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: '',
        redirectUrl: '/',
      };
    },
    created () {
      if (this.$route.query.redirectUrl) {
        this.redirectUrl = this.$route.query.redirectUrl;
      }
    },
    methods: {
      async onSubmit () {
        await this.$store.dispatch('user/login', {
          email: this.email,
          password: this.password,
        });
        this.$router.replace({ path: this.redirectUrl });
      },
      onCancel () {
        console.log('canceled');
      },
    },
  };
</script>
