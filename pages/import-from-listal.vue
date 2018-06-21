<template>

  <div>
    <template v-if="!list">
      <buttons-group>
        <default-button
          label="Extract list data"
          @click="extractListFromHtml"
        />
      </buttons-group>
      <textarea
        v-model="html"
        placeholder="Insert HTML of a list from www.listal.com"
        class="textarea"
      />
    </template>
    <template v-else>
      <buttons-group>
        <default-button
          label="Import"
          @click="importList"
        />
      </buttons-group>
      <items-table :items="items"/>
    </template>
  </div>

</template>

<script>
  import { exportList } from '@oliboy50/listal-exporter';
  import ButtonsGroup from '~/components/ButtonsGroup.vue';
  import DefaultButton from '~/components/buttons/DefaultButton.vue';
  import ItemsTable from '~/components/item/ItemsTable.vue';

  export default {
    middleware: 'require-admin',
    components: {
      ButtonsGroup,
      DefaultButton,
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
