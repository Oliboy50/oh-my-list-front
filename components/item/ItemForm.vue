<template>

  <form
    @submit.prevent="save"
  >

    <form-block
      label="General"
    >
      <b-field
        label="Label"
        label-for="component-item-form_label"
      >
        <b-input
          id="component-item-form_label"
          v-model="label"
          type="text"
          required
        />
      </b-field>

      <b-field
        label="Description"
        label-for="component-item-form_description"
      >
        <b-input
          id="component-item-form_description"
          v-model="description"
          type="textarea"
        />
      </b-field>

      <b-field
        label="Image"
        label-for="component-item-form_image"
      >
        <b-input
          id="component-item-form_image"
          v-model="image"
          type="url"
        />
      </b-field>
    </form-block>

    <form-block
      label="Tags"
    >
      Todo
    </form-block>

    <buttons-group>
      <default-button
        label="Preview"
        @click="isPreviewDisplayed = true"
      />
      <submit-button/>
    </buttons-group>

    <b-modal
      :active.sync="isPreviewDisplayed"
      class="preview"
    >
      <items-table
        :items="[{label, description, image, position: 1}]"
      />
    </b-modal>

  </form>

</template>

<script>
  import ItemsTable from '~/components/item/ItemsTable.vue';

  export default {
    components: {
      ItemsTable,
    },
    props: {
      existingItem: {
        type: Object,
        default: null,
      },
    },
    data () {
      return {
        isPreviewDisplayed: false,
        id: null,
        label: '',
        description: '',
        image: '',
      };
    },
    created() {
      if (this.existingItem) {
        [
          'id',
          'label',
          'description',
          'image',
        ].forEach((key) => {
          if (this.existingItem[key]) {
            this[key] = this.existingItem[key];
          }
        });
      }
    },
    methods: {
      async save () {
        await this.$store.dispatch('item/saveItem', {
          id: this.id,
          data: {
            label: this.label,
            description: this.description,
            image: this.image,
          },
        });
      },
    },
  };
</script>

<style lang="scss" scoped>
  .preview {
    table {
      margin: 0;
    }
  }
</style>

<style lang="scss">
  .preview.modal .modal-content {
    width: 100%;
  }
</style>
