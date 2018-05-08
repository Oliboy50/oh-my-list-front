<template>

  <tag-form
    :all-tags="tags"
  />

</template>

<script>
  import tagForm from '~/components/tag-form.vue';

  export default {
    components: {
      tagForm,
    },
    props: {
      tags: {
        type: Array,
        default: () => [],
      },
    },
  };
</script>
