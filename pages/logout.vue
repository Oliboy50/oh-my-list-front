<template>
  <div/>
</template>

<script>
  export default {
    async mounted() {
      await this.$store.dispatch('user/logout');
      this.$router.replace('/login');
    },
  };
</script>
