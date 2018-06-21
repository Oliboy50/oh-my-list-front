<template>

  <article
    :style="{ backgroundImage: `url('${imageUrl}')` }"
    class="box"
    @click="$router.push({ name: 'list-id', params: {id: list.id} })"
  >
    <h2 class="title has-text-centered">{{ list.label }}</h2>
    <div class="content has-text-justified">
      <four-lines-max-text>{{ list.description }}</four-lines-max-text>
    </div>
  </article>

</template>

<script>
  import FourLinesMaxText from '~/components/FourLinesMaxText.vue';

  export default {
    components: {
      FourLinesMaxText,
    },
    props: {
      list: {
        type: Object,
        required: true,
      },
    },
    computed: {
      imageUrl () {
        if (!this.list.positions.length || !this.list.positions[0].item || !this.list.positions[0].item.image) {
          return '';
        }

        return this.list.positions[0].item.image;
      },
    },
  };
</script>

<style lang="scss" scoped>
  article {
    position: relative;
    background-size: 0 0;
    transform: translateZ(0); // fixes Chrome bug - it needs a redraw to paint the background
    transition: box-shadow .15s;

    &:hover {
      cursor: pointer;
      box-shadow: -2px 2px 4px rgba(20, 20, 20, .2), 0 0 5px 2px rgba(10, 10, 10, .1);
    }

    &::after {
      content: "";
      background-image: inherit;
      background-size: cover;
      background-position-x: center;
      background-position-y: center;
      opacity: .25;
      border-radius: 5px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
    }
  }
</style>
