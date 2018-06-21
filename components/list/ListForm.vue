<template>

  <form
    @submit.prevent="save"
  >

    <form-block
      label="General"
    >
      <b-field
        label="Label"
        label-for="component-list-form_label"
      >
        <b-input
          id="component-list-form_label"
          v-model="label"
          type="text"
          required
        />
      </b-field>

      <b-field
        label="Description"
        label-for="component-list-form_description"
      >
        <b-input
          id="component-list-form_description"
          v-model="description"
          type="textarea"
        />
      </b-field>
    </form-block>

    <form-block
      label="Items"
    >
      Todo
    </form-block>

    <buttons-group>
      <submit-button/>
    </buttons-group>

  </form>

</template>

<script>
  import FormBlock from '~/components/FormBlock.vue';
  import ButtonsGroup from '~/components/ButtonsGroup.vue';
  import SubmitButton from '~/components/buttons/SubmitButton.vue';

  export default {
    components: {
      FormBlock,
      ButtonsGroup,
      SubmitButton,
    },
    props: {
      existingList: {
        type: Object,
        default: null,
      },
    },
    data () {
      return {
        label: '',
        description: '',
      };
    },
    created() {
      if (this.existingList) {
        [
          'label',
          'description',
        ].forEach((key) => {
          if (this.existingList[key]) {
            this[key] = this.existingList[key];
          }
        });
      }
    },
    methods: {
      async save () {
        await this.$store.dispatch('list/saveList', {
          data: {
            label: this.label,
            description: this.description,
            owner: this.$store.state.user.user['@id'],
//            positions: this.items.map(({label, description, image, rating, position}) => ({
//              position,
//              description,
//              item: {
//                label,
//                image,
//                itemUsers: [{
//                  user: this.$store.state.user.user['@id'],
//                  rating,
//                }],
//              },
//            })),
          },
        });
      },
    },
  };
</script>
