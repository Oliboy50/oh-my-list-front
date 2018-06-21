<template>

  <list-form/>

</template>

<script>
  import ListForm from '~/components/list/ListForm.vue';

  export default {
    middleware: 'require-admin',
    components: {
      ListForm,
    },
  };
</script>
