<template>

  <tag-form
    :existing-tag="existingTag"
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
    async asyncData ({ route }) {
      return {
//        existingTag: await manager.getTag(route.params.id),
      };
    },
  };
</script>
