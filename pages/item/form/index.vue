<template>

  <item-form/>

</template>

<script>
  import ItemForm from '~/components/item/ItemForm.vue';

  export default {
    middleware: 'require-admin',
    components: {
      ItemForm,
    },
  };
</script>
