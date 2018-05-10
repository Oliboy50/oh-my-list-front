<template>

  <table
    class="table is-narrow is-fullwidth"
  >
    <tbody>
      <tr
        v-for="item in items"
        :key="item.label"
      >
        <td><img :src="item.image"></td>
        <td>{{ item.position }}. <b>{{ item.label }}</b></td>
        <td class="content">{{ item.description }}</td>
        <td>{{ item.rating > -1 ? item.rating : '?' }}/100</td>
      </tr>
    </tbody>
  </table>

</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true,
      },
    },
  };
</script>
