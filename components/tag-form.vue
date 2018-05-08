<template>

  <form
    class="component-tag-form"
    @submit.prevent="onSubmit"
  >

    <div class="field">
      <label
        for="component-tag-form_type"
        class="label"
      >
        Type (select existing or create a new tag type)
      </label>
      <div class="field has-addons">
        <div class="control has-icons-left">
          <span class="select">
            <select
              id="component-tag-form_type"
              v-model="existingTagType"
              :disabled="newTagType"
              :required="!newTagType"
              class="is-uppercase"
            >
              <option :value="null">
                <template v-if="newTagType">New type "{{ newTagType }}"</template>
              </option>
              <option
                v-for="tagType in existingTagTypes"
                :key="tagType"
                :value="tagType"
              >
                {{ tagType }}
              </option>
            </select>
          </span>
          <div class="icon is-small is-left">
            <i class="fa fa-folder"/>
          </div>
        </div>
        <div class="control is-expanded">
          <input
            v-model="newTagType"
            :required="!existingTagType"
            type="text"
            class="input"
          >
        </div>
      </div>
    </div>

    <div class="field">
      <label
        for="component-tag-form_label"
        class="label"
      >
        Label
      </label>
      <div class="control">
        <input
          id="component-tag-form_label"
          v-model="tag.label"
          type="text"
          class="input"
          required
        >
      </div>
    </div>

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
  export default {
    props: {
      existingTag: {
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
        tag: {
          type: '',
          label: '',
        },
        existingTagType: null,
        newTagType: null,
      };
    },
    computed: {
      existingTagTypes () {
        return this.allTags.map(tag => tag.type);
      },
      selectedTagType: {
        get () {
          return (this.existingTagType) ? this.existingTagType : this.newTagType;
        },
        set (value) {
          this.tag.type = value;

          if (this.existingTagTypes.includes(value)) {
            this.existingTagType = value;
            this.newTagType = null;
          } else {
            this.existingTagType = null;
            this.newTagType = value;
          }
        },
      },
    },
    watch: {
      newTagType (value) {
        if (value) {
          this.existingTagType = null;
        }
      },
    },
    created () {
      // apply existing tag properties
      if (this.existingTag) {
        ['label'].forEach((key) => {
          if (this.existingTag[key]) {
            this.tag[key] = this.existingTag[key];
          }
        });
        if (this.existingTag.type) {
          this.selectedTagType = this.existingTag.type;
        }
      }
    },
    methods: {
      onSubmit () {
        if (this.allTags.map(tag => tag.label).includes(this.tag.label)) {
          alert('Tag label already exists... Submit canceled.');
          return;
        }

        // Set tag.type
        this.selectedTagType = this.selectedTagType;

        if (this.existingTag) {
//          manager.updateTag(this.existingTag.id, this.tag);
        } else {
//          manager.addTag(this.tag);
        }
      },
      onCancel () {
        console.log('canceled');
      },
    },
  };
</script>
