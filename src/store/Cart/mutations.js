export default {
  handCartData(state, res) {
    state.cartData = res.data.data.carts
  },
  handShake(state) {
    state.isShake = true
    setTimeout(() => {
      state.isShake = false
    }, 200)
  }
}
