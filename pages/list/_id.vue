<template>

  <article>
    <p class="title">{{ list.label }}</p>
    <div class="content">
      <p>{{ list.description }}</p>
    </div>
    <items-table :items="items"/>
  </article>

</template>

<script>
  import ItemsTable from '~/components/item/ItemsTable.vue';

  export default {
    components: {
      ItemsTable,
    },
    async asyncData ({ store, route }) {
      await store.dispatch('list/getList', { id: route.params.id });
      await store.dispatch('list/getList', { id: route.params.id });
      return {
        list: await store.dispatch('list/getList', { id: route.params.id }),
      };
    },
    computed: {
      items () {
        if (!this.list || !this.list.positions.length) {
          return [];
        }

        return this.list.positions.map((position) => {
          const ownerItemUser = (position.item.itemUsers) ? position.item.itemUsers.find(i => i.user === this.list.owner) : null;
          const currentItemUser = (position.item.itemUsers) ? position.item.itemUsers.find(i => i.user === this.$store.state.user.user['@id']) : null;
          return {
            label: position.item.label,
            description: position.description,
            image: position.item.image,
            rating: ownerItemUser ? ownerItemUser.rating : -1,
            position: position.position,
          };
        });
      },
    },
  };
</script>
