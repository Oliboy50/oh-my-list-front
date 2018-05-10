<template>

  <section class="section">
    <div class="container is-fluid">

      <div class="tile is-ancestor">
        <div
          v-for="list in lists"
          :key="list.id"
          class="tile is-parent"
        >
          <app-list
            :list="list"
            class="tile is-child box"
          />
        </div>
      </div>

    </div>
  </section>

</template>

<script>
  import AppList from '~/components/lists/list.vue';

  export default {
    components: {
      AppList,
    },
    data () {
      return {
        lists: [],
      };
    },
    async asyncData ({ store }) {
      return {
        lists: await store.dispatch('list/getLists'),
      };
    },
  };
</script>
