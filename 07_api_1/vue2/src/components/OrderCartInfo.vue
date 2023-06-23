<template>
  <div class="cart__block">
    <ul class="cart__orders">
      <OrderItem v-for="item in products" :key="item.productID" :item="item"/>
    </ul>

    <div class="cart__total">
      <p>Доставка:
        <b v-if="orderAmountProducts !== 0">{{ orderDeliveryPrice | numberFormat }}</b>
        <b v-else>{{ 0 | numberFormat }}</b>
      </p>
      <p>Итого: <b>{{ orderAmountProducts }}</b> товара на сумму <b>{{ totalPrice | numberFormat }}</b></p>
    </div>
    <button v-if="pageType === 'OrderPage'" class="cart__button button button--primery" type="submit">
      Оформить заказ
    </button>
  </div>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import OrderItem from '@/components/OrderItem.vue';

export default {
  filters: { numberFormat },
  props: ['pageType', 'products', 'orderAmountProducts', 'orderDeliveryPrice', 'totalPrice'],
  components: { OrderItem },
};
</script>
