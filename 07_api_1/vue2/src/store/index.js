import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '../config';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderDeliveryPrice: 0,
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productID, amount }) {
      const item = state.cartProducts.find((i) => i.productID === productID);

      if (item) {
        item.amount = amount;
      }
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productID: item.product.id,
        amount: item.quantity,
      }));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const { product } = state.cartProductsData.find((p) => p.product.id === item.productID);
        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
    },
    cartTotalprice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    orderTotalprice(state, getters) {
      if (getters.cartDetailProducts.length === 0) {
        return 0;
      }
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0) + state.orderDeliveryPrice;
    },
    savedOrderTotalprice(state, getters) {
      if (getters.savedOrderDetailProducts.length === 0) {
        return 0;
      }
      return getters.savedOrderDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0) + state.orderDeliveryPrice;
    },
    orderDeliveryPrice(state) {
      return state.orderDeliveryPrice;
    },
    orderAmountProducts(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => item.amount + acc, 0);
    },
    savedOrderDetailProducts(state) {
      if (!state.orderInfo) {
        return [];
      }
      return state.orderInfo.basket.items.map((item) => ({
        product: {
          productID: item.product.id,
          image: item.product.image.file.url,
          price: item.product.price,
          title: item.product.title,
        },
        amount: item.quantity,
      }));
    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
      return axios
        .get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateOrderInfo', response.data);
        });
    },
    loadCart(context) {
      return axios
        .get(`${API_BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    addProductToCart(context, { productID, amount }) {
      return (new Promise((resolve) => { setTimeout(resolve, 2000); }))
        .then(() => axios
          .post(`${API_BASE_URL}/api/baskets/products`, {
            productId: productID,
            quantity: amount,
          }, {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          })
          .then((response) => {
            context.commit('updateCartProductsData', response.data.items);
            context.commit('syncCartProducts');
          }));
    },
    updateCartProductAmount(context, { productID, amount }) {
      context.commit('updateCartProductAmount', { productID, amount });

      if (amount < 1) {
        return undefined;
      }

      return axios
        .put(`${API_BASE_URL}/api/baskets/products`, {
          productId: productID,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteCartProduct(context, { productID }) {
      return axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        data: {
          productId: productID,
        },
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        // eslint-disable-next-line no-shadow
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
  },
});
