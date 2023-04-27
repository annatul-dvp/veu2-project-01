import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      // { productID: 1, amount: 1 },
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
  },
});
