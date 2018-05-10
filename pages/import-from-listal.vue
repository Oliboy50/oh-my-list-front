<template>

  <section class="section">
    <div class="container is-fluid">
      <template v-if="!list">
        <div class="buttons is-centered">
          <button
            type="button"
            class="button"
            @click="extractListFromHtml"
          >
            Extract list data
          </button>
        </div>
        <textarea
          v-model="html"
          placeholder="Insert HTML of a list from www.listal.com"
          class="textarea"
        />
      </template>
      <template v-else>
        <div class="buttons is-centered">
          <button
            type="button"
            class="button"
            @click="importList"
          >
            Import
          </button>
        </div>
        <items-table :items="items"/>
      </template>
    </div>
  </section>

</template>

<script>
  import { exportList } from '@oliboy50/listal-exporter';
  import ItemsTable from '~/components/item/ItemsTable.vue';

  export default {
    middleware: 'require-admin',
    components: {
      ItemsTable,
    },
    data () {
      return {
        html: '',
        list: null,
      };
    },
    computed: {
      info () {
        if (!this.list) {
          return null;
        }

        return {
          label: this.list.title,
          description: this.list.description,
        };
      },
      items () {
        if (!this.list) {
          return [];
        }

        return this.list.items.map((item, i) => ({
          label: item.title,
          description: item.description,
          image: item.image,
          rating: item.rating * 10,
          position: i+1,
        }));
      },
    },
    methods: {
      extractListFromHtml () {
        this.list = exportList(this.html);
        this.html = '';
      },
      async importList () {
        await this.$store.dispatch('list/saveList', {
          data: {
            label: this.info.label,
            description: this.info.description,
            owner: this.$store.state.user.user['@id'],
            positions: this.items.map(({label, description, image, rating, position}) => ({
              position,
              description,
              item: {
                label,
                image,
                itemUsers: [{
                  user: this.$store.state.user.user['@id'],
                  rating,
                }],
              },
            })),
          },
        });
      },
    },
  };
</script>
