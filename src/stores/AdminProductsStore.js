import { defineStore } from 'pinia'
import axios from 'axios'
export default defineStore('AdminProductsStore', {
  state: () => ({
    products: []
  }),

  actions: {
    getAdminProductData() {
      this.isLoading = true
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      const { VITE_APP_API_URL, VITE_APP_API_PATH } = import.meta.env
      axios.defaults.headers.common.Authorization = token
      axios
        .get(
          `${VITE_APP_API_URL}/v2/api/${VITE_APP_API_PATH}/admin/products/all`
        )
        .then((res) => {
          this.products = res.data.products
          this.isLoading = false
        })
    }
  }
})
