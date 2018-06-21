<template>

  <div class="control">
    <button
      type="button"
      class="button"
      v-on="$listeners"
    >
      {{ label }}
    </button>
  </div>

</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        required: true,
      },
    },
  };
</script>
