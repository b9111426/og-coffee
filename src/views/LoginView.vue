<template>
  <div class="container">
    <div
      class="vh-100 d-flex flex-column align-items-center justify-content-center"
    >
      <div class="row justify-content-center">
        <h1 class="h2 mb-3 font-weight-normal">會員登入</h1>
        <div class="col-8">
          <form id="form" class="form-signin" @submit.prevent="login">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="username"
                placeholder="name@example.com"
                v-model="user.username"
                required
                autofocus
              />
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input
                :type="isEyeShow ? 'password' : 'type'"
                class="form-control position-relative"
                id="password"
                placeholder="Password"
                v-model="user.password"
                required
              />
              <span
                class="eyeIcon position-absolute top-0 end-0 mt-2 me-3"
                @click="switchIcon"
              >
                <i v-show="!isEyeShow" class="bi bi-eye text-primary fs-4"></i>
                <i
                  v-show="isEyeShow"
                  class="bi bi-eye-slash text-primary fs-4"
                ></i>
              </span>

              <label for="password">Password</label>
            </div>

            <div class="form-check my-3 d-flex justify-content-start">
              <input
                class="form-check-input me-2"
                type="checkbox"
                id="loginChecked"
                @input="saveCode"
                :checked="isSave"
              />
              <label class="form-check-label" for="loginChecked">
                記住我
              </label>
            </div>
            <p
              class="mt-3 h6 text-start text-danger"
              @click="handPassShow"
              style="cursor: pointer"
            >
              帳密
              <i v-show="isPassShow" class="bi bi-eye"></i>
              <i v-show="!isPassShow" class="bi bi-eye-slash"></i>
            </p>
            <p v-if="isPassShow" class="text-start">
              帳號:b9111426@gmail.com <br />
              密碼:123456
            </p>
            <button
              class="btn btn-lg btn-primary w-100 mt-3"
              type="submit"
              @click="signIn"
            >
              登入
            </button>
          </form>
        </div>
        <p class="mt-3 mb-3 text-muted">&copy; 2022 - OG Coffee</p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiSignInRequest } from '@/api'
import _ from 'lodash'

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      isPassShow: false,
      isSave: true,
      isEyeShow: true
    }
  },
  methods: {
    signIn: _.debounce(async function () {
      if (this.user.username === '' || this.user.password === '') {
        this.$store.dispatch('fireToast', { title: '請先填入資料' })
        return
      }
      try {
        const res = await apiSignInRequest(this.user)
        const { token, expired } = res.data
        document.cookie = `ogCoffeeToken=${token}; expires=${new Date(expired)}`
        this.$store.dispatch('fireToast', { res, title: '登入成功' })
        this.$router.push(this.toPage)
      } catch (err) {
        this.$store.dispatch('fireToast', { res: err.response })
      }
    }, 500),
    handPassShow() {
      this.isPassShow = !this.isPassShow
    },
    saveCode() {
      this.isSave = !this.isSave
      localStorage.setItem('isSave', JSON.stringify(this.isSave))
      if (this.isSave) {
        localStorage.setItem('OGCoffeeUser', JSON.stringify(this.user))
      } else {
        this.user = {
          username: '',
          password: ''
        }
        localStorage.setItem('OGCoffeeUser', JSON.stringify(this.user))
      }
    },
    switchIcon() {
      this.isEyeShow = !this.isEyeShow
    }
  },
  watch: {
    user: {
      handler() {
        if (this.isSave) {
          localStorage.setItem('OGCoffeeUser', JSON.stringify(this.user))
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$store.dispatch('handLoading', false)
    this.isSave = JSON.parse(localStorage.getItem('isSave'))
    const userInfo = JSON.parse(localStorage.getItem('OGCoffeeUser'))
    if (userInfo === null) {
      return
    } else {
      this.user = JSON.parse(localStorage.getItem('OGCoffeeUser'))
    }
  },
  created() {
    this.$store.dispatch('handLoading', true)
  },
  computed: {
    toPage() {
      return this.$store.getters['toPage']
    }
  }
}
</script>

<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.eyeIcon {
  cursor: pointer;
}
</style>
