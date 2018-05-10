<template>

  <article>
    <div
      :style="{ backgroundImage: `url(${imageUrl})` }"
      class="list-background-image"
    />
    <div>
      <p class="title">{{ list.label }}</p>
      <div class="content">
        <p>{{ list.description }}</p>
      </div>
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

    .list-background-image {
      background-size: cover;
      background-position-x: center;
      background-position-y: center;
      opacity: 0.5;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
</style>
