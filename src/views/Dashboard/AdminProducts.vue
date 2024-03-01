<template>
  <VueLoading :active="isLoading"><div class="loader"></div> </VueLoading>
  <div class="container" data-aos="fade-down">
    <div class="row">
      <ModalComponent
        @emit-modal="getBsModal"
        :modal-txt="modalTxt"
        :is-admin-delete-product="isDeleteAdminProduct"
        :item-id="itemId"
        @emit-get-product="getProductData"
      />

      <div
        class="bg-white rounded-4 p-3 mb-3 shadow-sm"
        @click="emitSideBarStatus"
      >
        <div class="text-end">
          <button
            @click="
              ;(isNew = true), (tempProduct = {}), this.bsProductModal.show()
            "
            class="btn btn-primary text-white me-3"
          >
            新增產品
          </button>
        </div>
        <div class="h3 mb-0 text-center">
          <span class="text-secondary fw-bold">－</span>產品管理<span
            class="text-secondary fw-bold"
            >－</span
          >
        </div>

        <table class="table mt-4 table-bordered">
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
            <tr v-for="item in products" :key="item.id">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td class="text-end">{{ numberComma(item.origin_price) }}</td>
              <td class="text-end">{{ numberComma(item.price) }}</td>
              <td>
                <span v-if="item.is_enabled == 1" class="text-success"
                  >啟用</span
                >
                <span v-else>未啟用</span>
              </td>
              <td class="text-center">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-primary text-white btn-sm"
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
      </div>

      <div class="d-flex justify-content-center">
        <Pagination :page="pagination" @emit-page="getProductData" />
      </div>

      <div
        id="productModal"
        ref="productModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl">
          <div class="modal-content border-0">
            <div class="modal-header bg-primary text-white">
              <h5 id="productModalLabel" class="modal-title">
                <span v-if="isNew">新增產品</span>
                <span v-else>編輯產品</span>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">主要圖片</label>
                    <input
                      id="imageUrl"
                      type="text"
                      class="form-control mb-2"
                      v-model="tempProduct.imageUrl"
                      placeholder="請輸入圖片連結"
                    />
                    <img
                      style="width: 400px"
                      class="img-fluid object-fit-cover"
                      :src="tempProduct.imageUrl"
                    />
                  </div>
                  <h3 class="mb-3">多圖新增</h3>
                  <div v-if="tempProduct.imagesUrl">
                    <div
                      v-for="(url, key) in tempProduct.imagesUrl"
                      :key="url"
                      class="mb-1"
                    >
                      <div class="mb-3">
                        <label :for="key" class="form-label">圖片網址</label>
                        <input
                          :id="key"
                          type="text"
                          v-model="tempProduct.imagesUrl[key]"
                          class="form-control"
                          placeholder="請輸入圖片連結"
                        />
                      </div>
                      <img
                        style="width: 300px"
                        class="img-fluid object-fit-cover"
                        :src="url"
                      />
                    </div>
                    <div
                      v-if="
                        !tempProduct.imagesUrl.length ||
                        tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                      "
                    >
                      <button
                        class="btn btn-outline-primary btn-sm d-block w-100"
                        @click="tempProduct.imagesUrl.push('')"
                      >
                        新增圖片
                      </button>
                    </div>
                    <div v-else>
                      <button
                        class="btn btn-outline-danger btn-sm d-block w-100"
                        @click="tempProduct.imagesUrl.pop()"
                      >
                        刪除圖片
                      </button>
                    </div>
                  </div>
                  <div v-else>
                    <button
                      class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="addImage"
                    >
                      新增圖片
                    </button>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <input
                      id="title"
                      type="text"
                      v-model="tempProduct.title"
                      class="form-control"
                      placeholder="請輸入標題"
                    />
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">分類</label>
                      <input
                        id="category"
                        type="text"
                        v-model="tempProduct.category"
                        class="form-control"
                        placeholder="請輸入分類"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="unit" class="form-label">單位</label>
                      <input
                        id="unit"
                        type="text"
                        v-model="tempProduct.unit"
                        class="form-control"
                        placeholder="請輸入單位"
                      />
                    </div>
                  </div>

                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label">原價</label>
                      <input
                        id="origin_price"
                        type="number"
                        min="0"
                        class="form-control"
                        placeholder="請輸入原價"
                        v-model.number="tempProduct.origin_price"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">售價</label>
                      <input
                        id="price"
                        type="number"
                        min="0"
                        class="form-control"
                        v-model.number="tempProduct.price"
                        placeholder="請輸入售價"
                      />
                    </div>
                  </div>
                  <hr />

                  <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea
                      id="description"
                      type="text"
                      class="form-control"
                      placeholder="請輸入產品描述"
                      v-model="tempProduct.description"
                    >
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea
                      id="content"
                      type="text"
                      class="form-control"
                      placeholder="請輸入說明內容"
                      v-model="tempProduct.content"
                    >
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        id="is_enabled"
                        v-model="tempProduct.is_enabled"
                        true-value="1"
                        false-value="0"
                        class="form-check-input"
                        type="checkbox"
                      />
                      <label class="form-check-label" for="is_enabled"
                        >是否啟用</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-dark"
                data-bs-dismiss="modal"
                @click="clearTempData"
              >
                取消
              </button>
              <button
                v-if="isNew"
                type="button"
                class="btn btn-primary text-white"
                @click="addProduct"
              >
                確認新增
              </button>
              <button
                v-else
                type="button"
                class="btn btn-primary text-white"
                @click="confirmEdit(tempProduct)"
              >
                確認編輯
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/PaginationComponent.vue'
import ModalComponent from '@/components/MessageModal.vue'
import Modal from 'bootstrap/js/dist/modal.js'

export default {
  data() {
    return {
      products: [],
      pagination: {},
      isLoading: true,
      bsModal: null,
      isDeleteAdminProduct: false,
      modalTxt: '',
      itemId: '',
      tempProduct: '',
      isNew: false,
      bsProductModal: null
    }
  },

  components: { Pagination, ModalComponent },

  mounted() {
    this.getProductData()
    this.bsProductModal = new Modal(this.$refs.productModal, {
      backdrop: true,
      keyboard: true
    })
  },

  emits: ['emitSideBarStatus'],

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
          this.products = res.data.products
          this.pagination = res.data.pagination
          this.closeEditComponent()
          this.isLoading = false
        })
    },

    openDeleteModal(title, id) {
      this.isDeleteAdminProduct = true
      this.modalTxt = title
      this.itemId = id
      this.bsModal.show()
    },

    getBsModal(modal) {
      this.bsModal = modal
    },

    addImage() {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    },

    editProduct(item) {
      this.tempProduct = item
      this.isNew = false
      this.bsProductModal.show()
    },

    closeEditComponent() {
      this.tempProduct = ''
      this.isNew = false
      this.bsProductModal.hide()
    },

    confirmEdit(item) {
      this.isLoading = true
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      const { VITE_APP_API_URL, VITE_APP_API_PATH } = import.meta.env
      this.$http.defaults.headers.common.Authorization = token
      this.$http
        .put(
          `${VITE_APP_API_URL}/v2/api/${VITE_APP_API_PATH}/admin/product/${item.id}`,
          {
            data: item
          }
        )
        .then((res) => {
          this.modalTxt = res.data.message
          this.bsProductModal.hide()
          this.getProductData(this.pagination.current_page)
          this.isLoading = false
          this.isDeleteAdminProduct = false
          this.bsModal.show()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    addProduct() {
      this.isLoading = true
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      const { VITE_APP_API_URL, VITE_APP_API_PATH } = import.meta.env
      this.$http.defaults.headers.common.Authorization = token
      this.$http
        .post(`${VITE_APP_API_URL}/v2/api/${VITE_APP_API_PATH}/admin/product`, {
          data: this.tempProduct
        })
        .then((res) => {
          this.modalTxt = res.data.message
          this.getProductData(this.pagination.current_page)
          this.isLoading = false
          this.bsProductModal.hide()
          this.bsModal.show()
        })
        .catch((err) => {
          this.modalTxt = err.response.data.message
          this.bsProductModal.hide()
          this.isLoading = false
          this.bsModal.show()
          this.isDeleteAdminProduct = false
          this.getProductData(this.pagination.current_page)
        })
    },

    emitSideBarStatus() {
      this.$emit('emitSideBarStatus')
    },

    numberComma(num) {
      const comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
      return num.toString().replace(comma, ',')
    }
  }
}
</script>

<style lang="scss">
body {
  background-color: #d7d7b3;
}
</style>
