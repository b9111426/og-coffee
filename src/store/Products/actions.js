import {
  apiFrontProduct,
  apiSingleProduct,
  apiAllFrontProduct,
  apiProductPage,
  apiDelProduct,
  apiUpLoad,
  apiModifyProduct,
  apiAddProduct,
  apiAllProduct,
  apiFrontCategory
} from '@/api'

export default {
  setSortState({ commit }, boolean) {
    commit('handSortState', boolean)
  },
  switchSort({ commit }, boolean) {
    commit('handSwitchSort', boolean)
  },
  setSearchPagination({ commit }, page) {
    commit('handSearchPagination', page)
  },
  searchSubCategory({ commit }, str) {
    commit('handSubCategory', str)
  },
  searchProduct({ commit }, str) {
    commit('handSearchProduct', str)
  },
  setLoading({ commit }, boolean) {
    commit('handLoading', boolean)
  },
  setTempProduct({ commit }, category) {
    commit('handTempProduct', category)
  },
  setFirstCategory({ commit }, str) {
    commit('handFirstCategory', str)
  },
  async getFrontProducts({ commit }, data) {
    let { category, page } = data
    let res = null
    if (category === undefined) {
      res = await apiFrontProduct(page)
    } else {
      res = await apiFrontCategory(page, category)
    }

    commit('handFrontProducts', res)
  },
  async getFrontAllProduct({ commit }) {
    const res = await apiAllFrontProduct()
    commit('handFrontAllProduct', res)
  },
  async getSingleProduct(context, id) {
    const res = await apiSingleProduct(id)
    return res
  },

  //admin
  async getProducts({ commit }, page) {
    const res = await apiProductPage(page)
    commit('handProducts', res)
  },
  async getAllProducts({ commit }) {
    const res = await apiAllProduct()
    commit('handAllProducts', res)
  },

  async delProduct(context, id) {
    const res = await apiDelProduct(id)
    return res
  },
  async upLoadFile(context, formData) {
    const res = await apiUpLoad(formData)
    return res
  },

  async modifyProduct(context, data) {
    const { id, product } = data
    const res = await apiModifyProduct(id, product)
    return res
  },
  async addProduct(context, product) {
    const res = await apiAddProduct(product)
    return res
  }
}
