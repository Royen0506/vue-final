<template>
  <vue-loading :active="isLoading" />
  <h1>This is About page.</h1>
  <RouterLink to="/">Home</RouterLink> |
  <RouterLink to="/about">About</RouterLink>
</template>

<script>
export default {
  data() {
    return {
      isLoading: true
    }
  },

  mounted() {
    this.$http.get('https://randomuser.me/api/').then((res) => {
      console.log(res)
      this.isLoading = false
    })
  },

  methods: {}
}
</script>

<style scoped></style>
