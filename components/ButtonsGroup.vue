<template>

  <div class="buttons-group field is-grouped is-grouped-centered">
    <slot />
  </div>

</template>

<style lang="scss">
  .buttons-group + .buttons-group,
  .buttons-group + .form-block {
    margin-top: 2rem;
  }
</style>
