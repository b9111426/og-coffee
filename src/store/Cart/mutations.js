export default {
  handCartData(state, res) {
    state.cartData = res.data.data.carts
    state.final_total = res.data.data.final_total
  },
  handShake(state) {
    state.isShake = true
    setTimeout(() => {
      state.isShake = false
    }, 200)
  }
}
