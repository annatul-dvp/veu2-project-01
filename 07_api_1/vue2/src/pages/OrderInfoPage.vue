<template>
<main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{ (this.$store.state.orderInfo.id) ? this.$store.state.orderInfo.id : 1 }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{ (this.$store.state.orderInfo.name) ? this.$store.state.orderInfo.name : 'Имя получателя не указано' }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ this.$store.state.orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{ this.$store.state.orderInfo.phone  }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{ this.$store.state.orderInfo.email  }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <!-- <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="p in this.$store.state.orderInfo.basket.items" :key="p.product.id">
              <h3>{{ p.product.title }}</h3>
              <b>{{ p.product.price*p.quantity | numberFormat }}</b>
              <span>Артикул: {{  p.product.id  }}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{ this.$store.state.orderDeliveryPrice | numberFormat  }}</b></p>
            <p>Итого: <b>{{ this.$store.state.orderInfo.basket.items.length }} </b>
              товара на сумму <b>{{ this.$store.state.orderInfo.totalPrice | numberFormat }}</b></p>
          </div>
        </div> -->

        <OrderCartInfo page-type = "OrderInfoPage" :products = 'products' :total-price = 'totalPrice'
        :order-amount-products = 'orderAmountProducts'
        :orderDeliveryPrice = 'this.$store.state.orderDeliveryPrice' :totalPrice = 'totalPrice'/>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import OrderCartInfo from '@/components/OrderCartInfo.vue';

export default {
  filters: { numberFormat },
  components: { OrderCartInfo },
  created() {
    if (this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id) {
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id);
  },
  computed: {
    ...mapGetters({ products: 'savedOrderDetailProducts', totalPrice: 'savedOrderTotalprice', orderAmountProducts: 'orderAmountProducts' }),
  },
};
</script>
