<template>
  <VueLoading :active="isLoading"><div class="loader"></div> </VueLoading>
  <div class="container" data-aos="fade-down">
    <div class="row">
      <ModalComponent
        @emit-modal="getMessageModal"
        :modal-txt="modalTxt"
        :is-admin-delete-order="isDeleteOrder"
        @confirm-delete-order="confirmDeleteOrder(order.id)"
      />

      <div
        class="bg-white rounded-4 p-3 mb-3 shadow-sm"
        @click="emitSideBarStatus"
      >
        <div class="text-end">
          <button
            class="btn btn-outline-danger me-3"
            :class="{ disabled: orders == '' }"
            @click="deleteAllOrders"
          >
            刪除所有訂單
          </button>
        </div>
        <div class="h3 mb-0 text-center">
          <span class="text-secondary fw-bold">－</span>訂單管理<span
            class="text-secondary fw-bold"
            >－</span
          >
        </div>

        <table v-if="orders != ''" class="table mt-4 table-bordered">
          <thead>
            <tr class="text-start">
              <th width="120">訂單建立日期</th>
              <th width="120">訂購人</th>
              <th width="120">訂購項目</th>
              <th width="60">訂單總額</th>
              <th width="80">是否已付款</th>
              <th width="100">訂單資訊</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orders" :key="item.id">
              <td class="text-start">
                {{ new Date().toLocaleDateString(item.create_at) }}
              </td>
              <td class="text-start">
                {{ item.user.name }}
              </td>
              <td class="text-start">
                <span :key="item" v-for="item in item.products"
                  >{{ item.product.title }}
                </span>
              </td>
              <td class="text-end">{{ numberComma(item.total) }}</td>
              <td class="text-center">
                <span v-if="item.is_paid" class="text-success">已付款</span>
                <span v-else class="text-danger fw-bold">未付款</span>
              </td>
              <td class="text-center">
                <button
                  @click="editOrder(item)"
                  type="button"
                  class="btn btn-primary text-white btn-sm"
                >
                  查看更多
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="text-center h2 opacity-25 mt-4">目前尚未有訂單</div>
      </div>

      <div class="d-flex justify-content-center">
        <Pagination :page="pagination" @emit-page="getData" />
      </div>

      <div
        id="orderModal"
        ref="orderModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" :class="{ 'modal-lg': isEditOrder }">
          <div class="modal-content border-0">
            <div class="modal-header bg-primary text-white">
              <h5 v-if="isEditOrder" id="productModalLabel" class="modal-title">
                訂單資訊
              </h5>
              <h5
                v-else-if="isDeleteAllOrders"
                id="productModalLabel"
                class="modal-title"
              >
                系統訊息
              </h5>
              <button
                type="button"
                class="btn-close"
                @click="resetModal()"
              ></button>
            </div>
            <div class="modal-body">
              <div v-if="isEditOrder" class="row row-cols-1 row-cols-lg-2">
                <div>
                  <div class="mb-3">
                    <div class="fs-5">訂單編號：{{ order.id }}</div>
                  </div>
                  <div class="mb-3">
                    <label for="userName" class="form-label">訂購人姓名</label>
                    <input
                      id="userName"
                      type="text"
                      class="form-control"
                      v-model="order.user.name"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="userTel" class="form-label">電話</label>
                    <input
                      id="userTel"
                      type="text"
                      class="form-control"
                      v-model="order.user.tel"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="userAddress" class="form-label">收貨地址</label>
                    <input
                      id="userAddress"
                      type="text"
                      class="form-control"
                      v-model="order.user.address"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="userEmail" class="form-label">電子郵件</label>
                    <input
                      id="userEmail"
                      type="text"
                      class="form-control"
                      v-model="order.user.email"
                    />
                  </div>
                </div>
                <div>
                  <div
                    v-for="(item, key) in order.products"
                    :key="item.product.id"
                    class="mb-3"
                  >
                    <label :for="item.id" class="form-label">訂購產品 </label>

                    <select
                      class="form-select mb-2"
                      :name="item.id"
                      :id="item.id"
                      v-model="order.products[item.id].product_id"
                      :value="item.title"
                    >
                      <option
                        v-for="item in products"
                        :key="item.id"
                        :value="item.id"
                      >
                        {{ item.title }}
                      </option>
                    </select>
                    <label :for="`item.id${key}`" class="form-label"
                      >數量</label
                    >
                    <input
                      type="number"
                      class="form-control"
                      :id="`item.id${key}`"
                      min="1"
                      v-model="item.qty"
                    />
                  </div>

                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="order.is_paid"
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        已完成付款
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="isDeleteAllOrders">
                <p>是否確認刪除所有訂單</p>
              </div>
              <div class="modal-footer">
                <div v-if="isEditOrder">
                  <button
                    @click="deleteOrder(order.id)"
                    type="button"
                    class="btn btn-outline-primary me-2"
                  >
                    刪除訂單
                  </button>
                  <button
                    @click="confirmEdit(order.id)"
                    type="button"
                    class="btn btn-primary text-white"
                  >
                    確認編輯
                  </button>
                </div>
                <div v-else-if="isDeleteAllOrders">
                  <button
                    @click="resetModal"
                    type="button"
                    class="btn btn-outline-primary me-2"
                  >
                    取消
                  </button>
                  <button
                    @click="confirmDeleteAllOrders"
                    type="button"
                    class="btn btn-primary text-white"
                  >
                    確認刪除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/PaginationComponent.vue'
import Modal from 'bootstrap/js/dist/modal.js'
import AdminProductsStore from '../../stores/AdminProductsStore'
import { mapState, mapActions } from 'pinia'
import ModalComponent from '@/components/MessageModal.vue'

export default {
  data() {
    return {
      isLoading: false,
      isEditOrder: false,
      isDeleteAllOrders: false,
      isDeleteOrder: false,
      modalTxt: '',
      orders: '',
      order: {
        create_at: '',
        is_paid: '',
        message: '',
        products: {},
        user: {
          address: '',
          email: '',
          tel: ''
        },
        num: ''
      },
      pagination: {},
      bsModal: null,
      bsMessageModal: null
    }
  },
  components: { Pagination, ModalComponent },

  computed: {
    ...mapState(AdminProductsStore, ['products'])
  },

  emits: ['emitSideBarStatus'],

  mounted() {
    this.getData()
    this.bsModal = new Modal(this.$refs.orderModal, {
      backdrop: true,
      keyboard: true
    })
    this.getAdminProductData()
  },

  methods: {
    getData(num = 1) {
      this.isLoading = true
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      const { VITE_APP_API_URL, VITE_APP_API_PATH } = import.meta.env
      this.$http.defaults.headers.common.Authorization = token

      this.$http
        .get(
          `${VITE_APP_API_URL}/v2/api/${VITE_APP_API_PATH}/admin/orders?page=${num}`
        )
        .then((res) => {
          this.orders = res.data.orders
          this.pagination = res.data.pagination
          this.isLoading = false
        })
    },

    getMessageModal(modal) {
      this.bsMessageModal = modal
    },

    numberComma(num) {
      const comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
      return num.toString().replace(comma, ',')
    },

    editOrder(item) {
      this.isEditOrder = true
      this.order = item
      this.bsModal.show()
    },

    emitSideBarStatus() {
      this.$emit('emitSideBarStatus')
    },

    confirmEdit(id) {
      this.isLoading = true
      this.bsModal.hide()
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      const { VITE_APP_API_URL, VITE_APP_API_PATH } = import.meta.env
      this.$http.defaults.headers.common.Authorization = token

      this.$http
        .put(
          `${VITE_APP_API_URL}/v2/api/${VITE_APP_API_PATH}/admin/order/${id}`,
          { data: this.order }
        )
        .then((res) => {
          this.isLoading = false
          console.log(res)
          this.modalTxt = res.data.message
          this.resetModal()
          this.bsMessageModal.show()
          this.getData()
        })
    },

    resetModal() {
      this.order = {
        create_at: '',
        is_paid: '',
        message: '',
        products: {},
        user: {
          address: '',
          email: '',
          tel: ''
        },
        num: ''
      }
      this.isEditOrder = false
      this.isDeleteAllOrders = false
      this.isDeleteOrder = false
      this.bsModal.hide()
    },

    deleteAllOrders() {
      this.isDeleteAllOrders = true
      this.bsModal.show()
    },

    deleteOrder(id) {
      this.isDeleteOrder = true
      this.modalTxt = id
      this.bsModal.hide()
      this.bsMessageModal.show()
    },

    confirmDeleteOrder(id) {
      this.bsMessageModal.hide()

      this.isLoading = true
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      const { VITE_APP_API_URL, VITE_APP_API_PATH } = import.meta.env
      this.$http.defaults.headers.common.Authorization = token

      this.$http
        .delete(
          `${VITE_APP_API_URL}/v2/api/${VITE_APP_API_PATH}/admin/order/${id}`
        )
        .then((res) => {
          this.isLoading = false
          this.modalTxt = res.data.message
          this.bsMessageModal.show()
          this.resetModal()
          this.getData()
        })
        .catch((err) => {
          console.log(err)
        })
    },

    confirmDeleteAllOrders() {
      this.bsModal.hide()

      this.isLoading = true
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      const { VITE_APP_API_URL, VITE_APP_API_PATH } = import.meta.env
      this.$http.defaults.headers.common.Authorization = token

      this.$http
        .delete(
          `${VITE_APP_API_URL}/v2/api/${VITE_APP_API_PATH}/admin/orders/all`
        )
        .then((res) => {
          this.modalTxt = res.data.message
          this.isLoading = false
          this.modalTxt = res.data.message
          this.bsMessageModal.show()
          this.resetModal()
          this.orders = []
        })
        .catch((err) => {
          console.log(err)
        })
    },

    ...mapActions(AdminProductsStore, ['getAdminProductData'])
  }
}
</script>

<style lang="scss">
body {
  background-color: #d7d7b3;
}
</style>
