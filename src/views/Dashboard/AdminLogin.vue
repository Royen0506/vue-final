<template>
  <div
    style="
      background-image: url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
      width: 100%;
      height: 100dvh;
      background-position: center center;
      background-size: cover;
    "
  >
    <div class="container">
      <div class="row">
        <form
          id="form"
          class="col-10 col-lg-3 text-start position-absolute top-50 start-50 translate-middle bg-white bg-opacity-75 py-3 rounded-5"
        >
          <div
            class="h1 kalam-bold text-primary text-center d-flex justify-content-center"
          >
            <div class="shake-vertical">C</div>
            <div class="shake-vertical-mid">a</div>
            <div class="shake-vertical-quick">M</div>
            <div class="shake-vertical">P</div>
            <div class="shake-vertical-mid">i</div>
            <div class="shake-vertical-quick">n</div>
            <div class="shake-vertical">g</div>
            <div class="shake-vertical-quick">L</div>
            <div class="shake-vertical">i</div>
            <div class="shake-vertical-mid">F</div>
            <div class="shake-vertical-quick">e</div>
          </div>

          <div class="h5 text-center">管理員登入</div>
          <div class="form mb-3 w-75 text-start mx-auto">
            <label for="username"
              >電子郵件 / <span class="kalam-regular">Email</span></label
            >
            <input
              type="email"
              class="form-control mt-1"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              v-model="username"
            />
          </div>
          <div class="form w-75 text-start mx-auto">
            <label for="password"
              >密碼 / <span class="kalam-regular">Password</span></label
            >
            <input
              type="password"
              class="form-control mt-1"
              id="password"
              placeholder="Password"
              required
              autocomplete
              v-model="password"
            />
          </div>
          <div class="text-center">
            <button
              class="btn btn-primary text-white mt-3"
              type="submit"
              @click.prevent="signIn"
            >
              登入
            </button>
          </div>
          <div class="text-end me-1">
            <router-link to="/">返回前台</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      username: ''
    }
  },

  mounted() {},

  methods: {
    signIn() {
      const obj = {
        username: this.username,
        password: this.password
      }
      const { VITE_APP_API_URL } = import.meta.env
      this.axios
        .post(`${VITE_APP_API_URL}/v2/admin/signin`, obj)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `myToken=${token}; expires=${expired};`
          alert(res.data.message)
          this.$router.push('/dashboard/products')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  }
}
</script>
