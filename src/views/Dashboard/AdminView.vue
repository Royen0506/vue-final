<template>
  <div class="container-fluid p-0">
    <div class="d-flex">
      <aside
        v-if="isShowSideBar"
        data-aos="fade-right"
        style="height: 100dvh; width: 30dvh"
        class="bg-primary d-flex flex-column align-items-center px-0 pb-3"
      >
        <button
          @click="isShowSideBar = false"
          class="btn btn-primary text-white align-self-end"
        >
          X
        </button>
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
      <div v-else>
        <button
          class="btn btn-primary text-white rounded-bottom-4 rounded-top-0 rounded-start-0"
          @click="isShowSideBar = true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </button>
      </div>
      <div class="w-100 position-relative mt-4">
        <router-view
          class="position-absolute top-0 start-50 translate-middle-x"
        ></router-view>
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
