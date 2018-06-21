<template>

  <div>
    <div
      v-for="(listsChunk, index) in listsChunks"
      :key="index"
      class="tile is-ancestor"
    >
      <div
        v-for="list in listsChunk"
        :key="list.id"
        class="tile is-parent"
      >
        <list-preview
          :list="list"
          class="tile is-child"
        />
      </div>
    </div>
  </div>

</template>

<script>
  import ListPreview from '~/components/list/ListPreview.vue';

  export default {
    middleware: 'require-user',
    components: {
      ListPreview,
    },
    computed: {
      listsChunks() {
        let chunkedLists = [];

        for (let i = 0; i < this.lists.length; i += 3) {
          chunkedLists.push(this.lists.slice(i, i + 3));
        }

        return chunkedLists;
      },
    },
    async asyncData ({ store }) {
      return {
        lists: await store.dispatch('list/getLists'),
      };
    },
  };
</script>
