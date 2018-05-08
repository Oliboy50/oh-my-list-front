<template>

  <item-form
    :all-tags="tags"
  />

</template>

<script>
  import itemForm from '~/components/item-form.vue';

  export default {
    components: {
      itemForm,
    },
    props: {
      tags: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>
