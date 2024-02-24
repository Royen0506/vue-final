<template>
  <div class="container-fluid ps-0">
    <div class="row">
      <aside
        data-aos="fade-right"
        style="height: 100vh"
        class="col-4 col-lg-2 bg-dark d-flex flex-column align-items-center px-0 py-3"
      >
        <div class="h3 text-white">這是標題</div>
        <router-link
          to="/dashboard/products"
          class="my-2 text-white link-underline link-underline-opacity-0"
          >產品管理</router-link
        >
        <router-link
          to="/dashboard/orders"
          class="my-2 text-white link-underline link-underline-opacity-0"
          >訂單管理</router-link
        >
        <router-link
          to="/dashboard/coupons"
          class="my-2 text-white link-underline link-underline-opacity-0"
          >優惠卷管理</router-link
        >
        <router-link
          to="/dashboard/news"
          class="my-2 text-white link-underline link-underline-opacity-0"
          >最新消息管理</router-link
        >
        <a class="text-white link-underline link-underline-opacity-0 mt-auto"
          >登出</a
        >
      </aside>
      <div class="col-8 col-lg-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowSideBar: true
    }
  },

  mounted() {},

  methods: {}
}
</script>

<style lang="scss">
.aside {
  transition: all 0.3s ease-in-out;
}
</style>
