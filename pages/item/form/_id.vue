<template>

  <item-form
    :existing-item="existingItem"
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
//    async asyncData ({ route }) {
//      return {
//        existingItem: await manager.getItem(route.params.id),
//      };
//    },
  };
</script>
