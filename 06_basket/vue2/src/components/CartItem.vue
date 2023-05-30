<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120"
      alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>

    <CounterProduct :product-amount.sync="amount"  :page-type.sync="pageType"> </CounterProduct>

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }}
    </b>

    <button class="product__del button-del" type="button"
    aria-label="Удалить товар из корзины" @click.prevent="deleteProductFromCart">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapMutations } from 'vuex';
import CounterProduct from '@/components/CounterProduct.vue';

export default {
  filters: { numberFormat },
  data() {
    return {
      pageType: 'cartItem',
    };
  },
  props: ['item'],
  components: { CounterProduct },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productID: this.item.productID, amount: value });
      },
    },
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
    deleteProductFromCart() {
      this.$store.dispatch('deleteCartProduct', { productID: this.item.productID });
    },
  },
};
</script>
