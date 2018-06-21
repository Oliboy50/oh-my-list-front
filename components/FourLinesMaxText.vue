<template functional>

  <p v-bind="data.attrs">
    <slot/>
  </p>

</template>

<style lang="scss" scoped>
  $number-of-lines: 4;
  $line-height: 1.5rem;
  $text-height: $line-height * $number-of-lines;

  p {
    overflow: hidden;
    height: $text-height;

    // use -webkit-line-clamp if possible
    @supports (-webkit-line-clamp: $number-of-lines) {
      & {
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: $number-of-lines;
        -webkit-box-orient: vertical;
      }
    }
  }

</style>
