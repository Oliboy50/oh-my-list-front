<template>

  <article
    :style="{ backgroundImage: `url('${imageUrl}')` }"
  >
    <p class="title">{{ list.label }}</p>
    <div class="content">
      <p>{{ list.description }}</p>
    </div>
  </article>

</template>

<script>
  export default {
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
