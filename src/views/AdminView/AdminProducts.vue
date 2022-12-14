<template>
  <div class="container py-3">
    <h2>產品列表</h2>
    <div class="row mt-4">
      <div
        class="col-12 d-flex align-items-center justify-content-between mb-2 mb-lg-0"
      >
        <div class="bg-white p-2 rounded text-dark">
          <strong> 產品總數: {{ allProduct.length }} </strong>
        </div>
        <div v-if="isLoading" class="me-3 ms-auto">
          <img class="loading" src="@/assets/images/load.gif" alt="" />
        </div>
        <button class="btn btn-primary" type="button" @click="openModal(true)">
          建立新的產品
        </button>
      </div>
      <div class="col-12">
        <div class="card overflow-auto flex-nowrap mt-2 px-3">
          <table class="table mt-4 table-hover">
            <thead>
              <tr class="table-light">
                <th width="120" class="text-nowrap pe-lg-3 pe-1">分類</th>
                <th width="150" class="text-center text-nowrap px-5">預覽</th>
                <th class="text-center text-nowrap px-3">產品名稱</th>
                <th
                  width="120"
                  class="text-end text-nowrap d-none d-lg-table-cell ps-5"
                >
                  原價
                </th>
                <th
                  width="120"
                  class="text-center text-lg-end text-nowrap pe-lg-2 px-3"
                >
                  售價
                </th>
                <th
                  width="145"
                  class="text-center d-none d-lg-table-cell text-nowrap px-3"
                >
                  是否啟用
                </th>
                <th width="160" class="text-center text-nowrap">編輯</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in products"
                :key="item.id"
                class="align-middle"
                :class="{ 'text-secondary': !item.is_enabled }"
              >
                <td class="text-nowrap">{{ item.category }}</td>
                <td class="text-center">
                  <div class="position-relative d-inline-block overflow-hidden">
                    <div
                      v-if="item.is_soldOut"
                      class="position-absolute sellOutTag bg-danger"
                    ></div>
                    <img
                      class="pre-pic img-thumbnail"
                      v-src="
                        item.imageUrl === undefined ? '' : item.imageUrl[0]
                      "
                      alt="縮圖"
                    />
                  </div>
                </td>
                <td class="text-break text-break">{{ item.title }}</td>
                <td class="text-end d-none d-lg-table-cell text-break">
                  {{ item.origin_price }}
                </td>
                <td class="text-lg-end text-center text-break">
                  {{ item.price }}
                </td>
                <td class="d-none d-lg-table-cell">
                  <div class="ps-4">
                    <div class="form-check d-flex justify-content-start">
                      <input
                        class="form-check-input me-2"
                        type="checkbox"
                        :id="`productSwitch${item.id}`"
                        v-model="item.is_enabled"
                        @change="updateProduct({ product: item, isNew: false })"
                      />
                      <label
                        class="form-check-label"
                        :for="`productSwitch${item.id}`"
                      >
                        <span
                          v-if="item.is_enabled"
                          class="text-primary text-nowrap"
                          >啟用</span
                        >
                        <span v-else class="text-gray-dark text-nowrap"
                          >未啟用</span
                        >
                      </label>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-primary btn-sm"
                      @click="openModal(false, item)"
                    >
                      <span class="d-lg-block d-none text-nowrap">編輯</span>
                      <i class="bi bi-pencil-square d-lg-none"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="openDelModal(item)"
                    >
                      <span class="d-lg-block d-none text-nowrap">刪除</span>
                      <i class="bi bi-x-lg d-lg-none"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-if="products.length === 0" class="text-center">
              <td colspan="7" class="fs-3 text-gray py-4">產品列表已空</td>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- 分頁 -->
  <Pagination
    class="mt-3 pb-5"
    :pages="pagination"
    @emit-pages="getProducts"
  ></Pagination>

  <!-- 刪除產品 -->
  <DelModal
    :item="tempProduct"
    :title="title"
    ref="delModal"
    @del-item="delProduct"
  ></DelModal>

  <!-- 新增、編輯產品 -->
  <ProductModifyModal
    @update-product="updateProduct"
    :product="tempProduct"
    :isNew="isNew"
    ref="productModal"
  ></ProductModifyModal>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import DelModal from '@/components/DelModal.vue'
import ProductModifyModal from '@/components/ProductModifyModal.vue'
import _ from 'lodash'

export default {
  data() {
    return {
      isNew: false,
      tempProduct: {
        imagesUrl: []
      },
      currentPage: 1,
      isLoading: false,
      title: '產品'
    }
  },
  components: {
    Pagination,
    DelModal,
    ProductModifyModal
  },
  methods: {
    openDelModal(item) {
      this.tempProduct = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.openModal()
    },
    openModal(isNew, product) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = { ...product }
        this.isNew = false
      }
      const productComponent = this.$refs.productModal
      productComponent.openModal()
    },
    async getProducts(page = 1) {
      try {
        await this.$store.dispatch('Products/getProducts', page)
        this.$store.dispatch('handLoading', false)
      } catch (err) {
        this.$store.dispatch('handLoading', false)
        throw new Error(err)
      }
    },
    async getAllProducts() {
      try {
        await this.$store.dispatch('Products/getAllProducts')
      } catch (err) {
        throw new Error(err)
      }
    },
    updateProduct: _.debounce(async function ({ product, isNew }) {
      this.isLoading = true
      const productModal = this.$refs.productModal
      try {
        let res = null
        if (!isNew) {
          const data = { id: product.id, product }
          res = await this.$store.dispatch('Products/modifyProduct', data)
        } else {
          res = await this.$store.dispatch('Products/addProduct', product)
        }

        productModal.hideModal()
        this.getAllProducts()
        this.$store.dispatch('fireToast', { res })
        this.getProducts(this.currentPage)
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        this.$store.dispatch('fireToast', { res: err.response })
      }
    }, 1000),
    delProduct: _.debounce(async function (title) {
      try {
        this.isLoading = true
        await this.$store.dispatch('Products/delProduct', this.tempProduct.id)
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.$store.dispatch('fireToast', {
          title: `「${title}」產品已刪除`,
          style: 'success'
        })
        this.getProducts(this.currentPage)
        this.getAllProducts()
        this.isLoading = false
      } catch (err) {
        this.$store.dispatch('fireToast', { res: err.response })
      }
    }, 500)
  },
  created() {
    this.getProducts()
    this.getAllProducts()
    this.$store.dispatch('handLoading', true)
  },
  computed: {
    products() {
      return this.$store.getters['Products/productsData']
    },
    pagination() {
      return this.$store.getters['Products/productsPage']
    },
    allProduct() {
      return this.$store.getters['Products/allProductsData']
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/stylesheets/mixin';
.pre-pic {
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center center;
  @include pad() {
    width: 60px;
    height: 60px;
  }
}
.sellOutTag {
  width: 120px;
  height: 25px;
  top: 10%;
  right: 10%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
  transform: rotateZ(-45deg);
  &::after {
    content: '售完';
    color: #fff;
    letter-spacing: 0.3rem;
  }
}
</style>
