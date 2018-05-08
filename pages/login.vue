<template>

  <section class="section">
    <div class="container is-fluid">

      <login-form />

    </div>
  </section>

</template>

<script>
  import LoginForm from '~/components/login-form.vue';

  export default {
    components: {
      LoginForm,
    },
  };
</script>
