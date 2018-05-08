<template>

  <section class="section">
    <div class="container is-fluid">

      <div class="tile is-ancestor">
        <div
          v-for="list in lists"
          :key="list.id"
          class="tile is-parent"
        >
          <article class="tile is-child box">
            <p class="title">{{ list.label }}</p>
            <div class="content">
              <p>{{ list.description }}</p>
            </div>
          </article>
        </div>
      </div>

    </div>
  </section>

</template>

<script>
  import list from '~/components/list.vue';

  export default {
    components: {
      list,
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
