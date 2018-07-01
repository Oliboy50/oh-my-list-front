<template>

  <form
    @submit.prevent="login"
  >

    <form-block
      label="Sign in"
    >
      <b-field
        label="Email"
        label-for="component-login-form_email"
      >
        <b-input
          id="component-login-form_email"
          v-model="email"
          type="email"
          required
        />
      </b-field>

      <b-field
        label="Password"
        label-for="component-login-form_password"
      >
        <b-input
          id="component-login-form_password"
          v-model="password"
          type="password"
          required
        />
      </b-field>
    </form-block>

    <buttons-group>
      <submit-button/>
    </buttons-group>

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
    fetch ({ store, redirect }) {
      if (store.state.user.user.isUser) {
        redirect('/');
      }
    },
    created () {
      if (this.$route.query.redirectUrl) {
        this.redirectUrl = this.$route.query.redirectUrl;
      }
    },
    methods: {
      async login () {
        await this.$store.dispatch('user/login', {
          email: this.email,
          password: this.password,
        });
        this.$router.replace({ path: this.redirectUrl });
      },
    },
  };
</script>
