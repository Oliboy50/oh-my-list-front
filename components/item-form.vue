<template>

  <form
    class="component-item-form"
    @submit.prevent="onSubmit"
  >

    <div class="field">
      <label
        for="component-item-form_title"
        class="label"
      >
        Title
      </label>
      <div class="control">
        <input
          id="component-item-form_title"
          v-model="item.title"
          type="text"
          class="input"
          required
        >
      </div>
    </div>

    <div class="field">
      <label
        for="component-item-form_description"
        class="label"
      >
        Description
      </label>
      <div class="control">
        <textarea
          id="component-item-form_description"
          v-model="item.description"
          class="textarea"
        />
      </div>
    </div>

    <div class="field">
      <label
        for="component-item-form_image"
        class="label"
      >
        Image
      </label>
      <div class="control">
        <input
          id="component-item-form_image"
          v-model="item.image"
          type="text"
          class="input"
        >
      </div>
    </div>

    <tags-selector
      v-if="itemTagsAreReadyToBeBound"
      v-model="item.tags"
      :all-tags="allTags"
      label-for-id="component-item-form_tags-select"
      class="field"
    />

    <div class="field is-grouped is-grouped-centered">
      <div class="control">
        <button
          type="submit"
          class="button is-primary"
        >
          Submit
        </button>
      </div>
      <div class="control">
        <button
          type="button"
          class="button is-link"
          @click="onCancel"
        >
          Cancel
        </button>
      </div>
    </div>

  </form>

</template>

<script>
  import tagsSelector from '~/components/tags-selector.vue';

  export default {
    components: {
      tagsSelector,
    },
    props: {
      existingItem: {
        type: Object,
        default: null,
      },
      allTags: {
        type: Array,
        default: () => [],
      },
    },
    data () {
      return {
        item: {
          title: '',
          description: '',
          image: '',
          tags: [],
        },
        existingItemHasReplacedComponentItem: false,
      };
    },
    computed: {
      itemTagsAreReadyToBeBound () {
        return (this.existingItem) ? this.existingItemHasReplacedComponentItem : true;
      },
    },
    created () {
      // apply existing item properties
      if (this.existingItem) {
        ['title', 'description', 'image', 'tags'].forEach((key) => {
          if (this.existingItem[key]) {
            this.item[key] = this.existingItem[key];
          }
        });
        this.existingItemHasReplacedComponentItem = true;
      }
    },
    methods: {
      onSubmit () {
        if (this.existingItem) {
//          manager.updateItem(this.existingItem.id, this.item);
        } else {
//          manager.addItem(this.item);
        }
      },
      onCancel () {
        console.log('canceled');
      },
    },
  };
</script>
