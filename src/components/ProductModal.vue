<template>
  <div
    id="productModal"
    ref="modal"
    class="modal scale-in-center"
    tabindex="-1"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h5 class="modal-title text-white">
            {{ product.title }}
          </h5>
          <button
            type="button"
            class="btn-close bg-gray me-1"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container mt-3">
            <div class="row row-cols-lg-2 row-cols-1">
              <div class="col">
                <div class="row mb-2">
                  <div class="col">
                    <img
                      v-if="isShow"
                      ref="pic1"
                      class="img-fluid img-thumbnail"
                      v-src="[product.imageUrl]"
                      alt=""
                    />
                  </div>
                </div>
                <div class="row g-3">
                  <div
                    v-for="(i, idx) in product.imageUrl.splice(1)"
                    :key="i + idx"
                    class="col-4"
                    @click="changPic($event)"
                  >
                    <img
                      class="subImg img-fluid img-thumbnail"
                      :src="i"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div class="col mt-4 mt-lg-0">
                <h3 class="text-start text-break">{{ product.title }}</h3>
                <h4 class="text-start text-break mb-lg-5 mb-3">
                  {{ product.subtitle }}
                </h4>
                <p class="text-start mb-lg-5 mb-3">{{ product.description }}</p>
                <div v-if="isShow">
                  <!--價錢數量-->

                  <div class="col-12 d-flex align-items-center mb-3">
                    <p class="text-center fs-5 me-auto">
                      單位({{ unitAry[0] }})
                    </p>

                    <p class="ms-auto text-break fs-4">
                      <span
                        class="text-decoration-line-through text-danger text-break me-2"
                        v-if="product.origin_price !== product.price"
                      >
                        NT${{ product.origin_price }}
                      </span>

                      NT${{ product.price }}
                    </p>
                  </div>
                  <div class="col-12 mb-4">
                    <div
                      v-if="isShow"
                      class="input-group input-group-sm flex-nowrap"
                    >
                      <AddMinBtn
                        :val="qty"
                        @add="add"
                        @min="min"
                        @push-val="pushVal"
                      ></AddMinBtn>
                    </div>
                  </div>

                  <div class="d-flex">
                    <div class="col pe-1">
                      <button
                        v-if="isShow"
                        type="button"
                        class="btn btn-primary w-100 position-relative"
                        @click="addToCart"
                      >
                        <div
                          v-if="isLoading"
                          class="position-absolute top-50 end-0 translate-middle"
                        >
                          <img
                            class="loading"
                            src="@/assets/images/load.gif"
                            alt=""
                          />
                        </div>
                        加入購物車
                      </button>
                    </div>
                    <div class="col ps-1">
                      <button
                        v-if="isShow"
                        type="button"
                        class="btn btn-success w-100"
                        @click="addToCart('goCart')"
                      >
                        立即購買
                      </button>
                    </div>
                  </div>
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
import modalMixin from '@/mixins/modalMixin'
import AddMinBtn from '@/components/AddMinBtn.vue'
import _ from 'lodash'

export default {
  mixins: [modalMixin],
  components: {
    AddMinBtn
  },
  data() {
    return {
      product: {
        imageUrl: []
      },
      isShow: false,
      isLoading: false,
      unitAry: [],
      cartQty: null,
      qty: 1
    }
  },
  methods: {
    add() {
      this.qty++
      if (this.qty > 999) {
        this.qty = 999
      }
    },
    min() {
      this.qty--
      if (this.qty <= 1) {
        this.qty = 1
      }
    },
    pushVal(val) {
      this.qty = val
    },
    addToCart: _.debounce(async function (string) {
      const limit = 999 - this.cartQty
      if (limit === 0) {
        this.$store.dispatch('fireToast', {
          title: '商品數量已達上限',
          style: 'danger'
        })
        return
      }
      this.isLoading = true
      const data = {
        product_id: this.product.id,
        qty: this.qty
      }
      try {
        const res = await this.$store.dispatch('Cart/addCart', data)
        const title = res.data.data.product.title
        this.$store.dispatch('Cart/getCart')
        this.$store.dispatch('fireToast', {
          title: `「${title}」已加入購物車`,
          style: 'success'
        })
        this.$store.dispatch('Cart/setShake')
        this.isLoading = false
        this.hideModal()
        if (string === 'goCart') {
          this.$router.push({ path: '/cart' })
        }
      } catch (err) {
        throw new Error(err)
      }
    }, 500),
    async getProduct(id) {
      try {
        const res = await this.$store.dispatch('Products/getSingleProduct', id)
        this.product = res.data.product
        this.unitAry = this.product.unit.split('、')
        this.isShow = true
      } catch (err) {
        throw new Error(err)
      }
    },
    changPic(e) {
      let url2 = e.target.getAttribute('src')
      let url1 = this.$refs.pic1.getAttribute('src')
      e.target.setAttribute('src', url1)
      this.$refs.pic1.setAttribute('src', url2)
    },
    async getCart() {
      try {
        const res = await this.$store.dispatch('Cart/getCart')
        const { id } = this.$route.params
        const ary = res.data.data.carts
        const [selected] = ary.filter((i) => {
          return i.product.id === id
        })
        this.cartQty = selected?.qty || 0
      } catch (err) {
        throw new Error(err)
      }
    }
  },
  mounted() {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/stylesheets/mixin';
.subImg {
  cursor: pointer;
}
.modal-body {
  @include pad() {
    max-height: 350px;
    overflow: auto;
  }
}
</style>
