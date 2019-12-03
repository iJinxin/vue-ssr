<template>
  <div class="home">
    <div>this is home page</div>
    <div><a @click="navigator">navigator to about page</a></div>
  </div>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {}
  },
  methods: {
    navigator() {
      this.$router.push('/about')
    }
  }
}
</script>