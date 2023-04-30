import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      { productID: 1, amount: 1 },
    ],
  },
  mutations: {
    addProductToCart(state, { productID, amount }) {
      const item = state.cartProducts.find((i) => i.productID === productID);

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productID,
          amount,
        });
      }
    },
    updateCartProductAmount(state, { productID, amount }) {
      const item = state.cartProducts.find((i) => i.productID === productID);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productID) {
      state.cartProducts = state.cartProducts.filter((item) => item.productID !== productID);
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productID),
      }));
    },
    cartTotalprice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
  },
});
