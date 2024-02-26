<template>
  <div class="h3 mb-0 text-center">產品管理</div>
  <VueLoading :active="isLoading" />
  <div class="container">
    <div class="row">
      <!-- <ModalComponent
        @emit-modal="getBsModal"
        :modal-txt="modalTxt"
        :is-admin-delete-product="isDeleteAdminProduct"
        :item-id="itemId"
        @emit-get-product="getProductData"
      /> -->
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">類別</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in product" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-end">{{ item.origin_price }}</td>
            <td class="text-end">{{ item.price }}</td>
            <td>
              <span v-if="item.is_enabled == 1" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click.prevent="editProduct(item)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openDeleteModal(item.title, item.id)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- <Pagination :page="pagination" @emit-page="getProductData" /> -->
    </div>
  </div>
</template>

<script>
// import Pagination from '../components/PaginationComponent.vue'
// import ModalComponent from '../components/ModalComponent.vue'

export default {
  data() {
    return {
      product: [],
      pagination: {},
      isLoading: true,
      bsModal: null,
      isDeleteAdminProduct: false,
      modalTxt: '',
      itemId: '',
      tempProduct: '',
      isNew: false
    }
  },

  // components: { Pagination, ModalComponent },

  mounted() {
    this.getProductData()
  },

  methods: {
    getProductData(num = 1) {
      this.isLoading = true
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      const { VITE_APP_API_URL, VITE_APP_API_PATH } = import.meta.env
      this.$http.defaults.headers.common.Authorization = token
      this.$http
        .get(
          `${VITE_APP_API_URL}/v2/api/${VITE_APP_API_PATH}/admin/products?page=${num}`
        )
        .then((res) => {
          this.product = res.data.products
          this.pagination = res.data.pagination
          // this.closeEditComponent()
          this.isLoading = false
        })
    }

    // openDeleteModal(title, id) {
    //   this.isDeleteAdminProduct = true
    //   this.modalTxt = title
    //   this.itemId = id
    //   this.bsModal.show()
    // },

    // getBsModal(modal) {
    //   this.bsModal = modal
    // },

    // addImage() {
    //   this.tempProduct.imagesUrl = []
    //   this.tempProduct.imagesUrl.push('')
    // },

    // editProduct(item) {
    //   this.tempProduct = item
    //   this.isNew = false
    // },

    // closeEditComponent() {
    //   this.tempProduct = ''
    //   this.isNew = false
    // },

    // confirmEdit(item) {
    //   this.isLoading = true
    //   const token = document.cookie.replace(
    //     /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
    //     '$1'
    //   )
    //   const { VITE_APP_API_URL, VITE_APP_API_PATH } = import.meta.env
    //   this.$http.defaults.headers.common.Authorization = token
    //   this.$http
    //     .put(
    //       `${VITE_APP_API_URL}/v2/api/${VITE_APP_API_PATH}/admin/product/${item.id}`,
    //       {
    //         data: item
    //       }
    //     )
    //     .then((res) => {
    //       this.modalTxt = res.data.message
    //       this.closeEditComponent()
    //       this.getProductData(this.pagination.current_page)
    //       this.isLoading = false
    //       this.isDeleteAdminProduct = false
    //       this.bsModal.show()
    //     })
    // },

    // addProduct() {
    //   this.isLoading = true
    //   const token = document.cookie.replace(
    //     /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
    //     '$1'
    //   )
    //   const { VITE_API_URL, VITE_API_PATH } = import.meta.env
    //   this.$http.defaults.headers.common.Authorization = token
    //   this.$http
    //     .post(`${VITE_API_URL}/v2/api/${VITE_API_PATH}/admin/product`, {
    //       data: this.tempProduct
    //     })
    //     .then((res) => {
    //       this.modalTxt = res.data.message
    //       this.closeEditComponent()
    //       this.getProductData(this.pagination.current_page)
    //       this.isLoading = false
    //       this.bsModal.show()
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // }
  }
}
</script>
