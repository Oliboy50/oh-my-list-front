<template>
  <div/>
</template>

<script>
  export default {
    layout: 'empty',
    async mounted() {
      await this.$store.dispatch('user/logout');
      this.$router.replace('/login');
    },
  };
</script>
