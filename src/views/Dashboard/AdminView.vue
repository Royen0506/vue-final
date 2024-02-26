<template>
  <div class="container-fluid p-0">
    <div class="d-flex">
      <aside
        v-if="isShowSideBar"
        data-aos="fade-right"
        style="height: 100dvh; width: 33dvh"
        class="bg-primary d-flex flex-column align-items-center px-0 pb-3 fixed-top"
      >
        <button
          @click="isShowSideBar = false"
          class="btn btn-primary text-white align-self-end rounded-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
            />
          </svg>
        </button>
        <div class="h3 text-white kalam-bold">CaMPiNg LiFe</div>
        <router-link
          to="/dashboard/products"
          class="my-2 link-underline link-underline-opacity-0 px-4 router-active"
          >產品管理</router-link
        >
        <router-link
          to="/dashboard/orders"
          class="my-2 link-underline link-underline-opacity-0 px-4 router-active"
          >訂單管理</router-link
        >
        <router-link
          to="/dashboard/coupons"
          class="my-2 link-underline link-underline-opacity-0 px-4 router-active"
          >優惠卷管理</router-link
        >
        <router-link
          to="/dashboard/news"
          class="my-2 link-underline link-underline-opacity-0 px-4 router-active"
          >最新消息管理</router-link
        >
        <a
          class="link-underline link-underline-opacity-0 px-4 mt-auto router-active"
          >登出</a
        >
      </aside>
      <div class="fixed-top" v-else>
        <button
          class="btn btn-primary text-white rounded-bottom-3 rounded-top-0 rounded-start-0"
          @click="isShowSideBar = true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
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
      <div class="mt-4 w-100">
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
  }
}
</script>

<style lang="scss">
.aside {
  transition: all 0.3s ease-in-out;
}
</style>
