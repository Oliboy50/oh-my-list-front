<template>

  <item-form
    :existing-item="existingItem"
  />

</template>

<script>
  import ItemForm from '~/components/item/ItemForm.vue';

  export default {
    middleware: 'require-admin',
    components: {
      ItemForm,
    },
    async asyncData ({ route, store }) {
      return {
        existingItem: await store.dispatch('item/getItem', { id: route.params.id }),
      };
    },
  };
</script>
