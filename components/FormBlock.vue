<template>

  <div class="form-block">
    <div
      v-if="label"
      class="has-text-centered"
    >
      <h2 class="title">{{ label }}</h2>
    </div>

    <slot />
  </div>

</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: '',
      },
    },
  };
</script>

<style lang="scss">
  .form-block + .form-block,
  .form-block + .buttons-group {
    margin-top: 2rem;
  }
</style>
