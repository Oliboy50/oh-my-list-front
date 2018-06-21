<template>

  <list-form
    :existing-list="existingList"
  />

</template>

<script>
  import ListForm from '~/components/list/ListForm.vue';

  export default {
    middleware: 'require-admin',
    components: {
      ListForm,
    },
    async asyncData ({ route, store }) {
      return {
        existingList: await store.dispatch('list/getList', { id: route.params.id }),
      };
    },
  };
</script>
