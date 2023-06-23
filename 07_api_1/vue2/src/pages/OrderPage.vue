<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
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
        Корзина
      </h1>
      <span class="content__info">
        {{ products.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" title="ФИО" :error="formError.name" placeholder="Введите ваше полное имя"/>

            <BaseFormText v-model="formData.address" title="Адрес доставки" :error="formError.address" placeholder="Введите ваш адрес"/>

            <BaseFormText v-model="formData.phone" title="Телефон" type="tel" :error="formError.phone" placeholder="Введите ваш телефон"/>

            <BaseFormText v-model="formData.email" title="Email" type="email" :error="formError.email" placeholder="Введи ваш Email"/>

            <BaseFormTextArea v-model="formData.comment" title="Комментарий к заказу" :error="formError.comment" placeholder="Ваши пожелания"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <!-- <div class="cart__block">
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

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div> -->

        <OrderCartInfo page-type = "OrderPage" :products="products" :order-delivery-price="orderDeliveryPrice"
        :order-amount-products="orderAmountProducts" :total-price="totalPrice"/>

        <div v-if="orderIsLoading">
          <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0"
          width="12px" height="12px" viewBox="0 0 128 128" xml:space="preserve">
            <path fill="#000000" d="M64.4 16a49 49 0 0 0-50 48 51 51 0 0 0 50
            52.2 53 53 0 0 0 54-52c-.7-48-45-55.7-45-55.7s45.3 3.8 49 55.6c.8 32-24.8 59.5-58 60.2-33 .8-61.4-25.7-62-60C1.3 29.8 28.8.6 64.3 0c0
            0 8.5 0 8.7 8.4 0 8-8.6 7.6-8.6 7.6z">
              <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64" dur="1800ms" repeatCount="indefinite">
              </animateTransform>
            </path>
          </svg>
          Оформляем заказ...
        </div>
        <div v-if="orderIsDone">Заказ оформлен</div>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextArea from '@/components/BaseFormTextArea.vue';
// import OrderItem from '@/components/OrderItem.vue';
import OrderCartInfo from '@/components/OrderCartInfo.vue';
import { API_BASE_URL } from '../config';

export default {
  filters: { numberFormat },
  components: {
    BaseFormText,
    BaseFormTextArea,
    OrderCartInfo,
  },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',

      orderIsLoading: false,
      orderIsDone: false,
    };
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      orderDeliveryPrice: 'orderDeliveryPrice',
      orderAmountProducts: 'orderAmountProducts',
      totalPrice: 'orderTotalprice',
    }),
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.orderIsLoading = true;
      this.orderIsDone = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .post(`${API_BASE_URL}/api/orders`, {
            ...this.formData,
          }, {
            params: {
              userAccessKey: this.$store.state.userAccessKey,
            },
          })
          .then((response) => {
            this.$store.commit('resetCart');
            this.$store.commit('updateOrderInfo', response.data);
            this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
          })
          .catch((error) => {
            this.formError = error.response.data.error.request || {};
            this.formErrorMessage = error.response.data.error.message || '';
          })
          .then(() => {
            this.orderIsLoading = false;
            this.orderIsDone = true;
          });
      }, 3000);
    },
  },
};
</script>
