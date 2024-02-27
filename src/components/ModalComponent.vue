<template>
  <div class="modal" tabindex="-1" ref="Modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fw-bold text-danger justify-content-center">
            系統訊息
          </h5>
          <button
            type="button"
            class="btn-close ms-0"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p v-if="!isAdminDeleteProduct" class="mb-0">{{ modalTxt }}</p>
          <p v-else class="mb-0">
            確認是否將
            <span class="fw-bold">{{ modalTxt }}</span> 從產品列中移除
          </p>
        </div>
        <div class="modal-footer">
          <button
            v-if="!isAdminDeleteProduct"
            data-bs-dismiss="modal"
            type="button"
            class="btn btn-primary"
          >
            確認
          </button>
          <button
            @click.prevent="deleteProduct"
            v-else
            type="button"
            class="btn btn-outline-primary"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal.js'
export default {
  data() {
    return {
      modal: null
    }
  },

  props: ['modalTxt', 'isAdminDeleteProduct', 'itemId'],

  mounted() {
    this.modal = new Modal(this.$refs.Modal, {
      keyboard: false,
      backdrop: 'static'
    })

    this.$emit('emit-modal', this.modal)
  },

  methods: {
    deleteProduct() {
      const { VITE_APP_API_URL, VITE_APP_API_PATH } = import.meta.env
      this.$http
        .delete(
          `${VITE_APP_API_URL}/v2/api/${VITE_APP_API_PATH}/admin/product/${this.itemId}`
        )
        .then((res) => {
          this.emitGetProduct()
          this.modal.hide()
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },

    emitGetProduct() {
      this.$emit('emit-get-product')
    }
  }
}
</script>
