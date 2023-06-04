<template>
  <main class="content container">
  <div class="content__top content__top--catalog">
    <h1 class="content__title">
      Каталог
    </h1>
    <span class="content__info">
      152 товара
    </span>
  </div>

  <div class="content__catalog">
    <ProductFilter :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
    :category-id.sync="filterCategoryId" :colorId.sync="filterColorId"/>
    <section class="catalog">
      <div v-if="productsLoading">
        <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="150px" height="38px"
        viewBox="0 0 128 32" xml:space="preserve">
          <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
          <circle fill="#000000" cx="0" cy="0" r="11" transform="translate(16 16)">
            <animateTransform attributeName="transform" type="scale" additive="sum"
            values="1;1.42;1;1;1;1;1;1;1;1" dur="1350ms" repeatCount="indefinite"></animateTransform>
          </circle>
          <circle fill="#000000" cx="0" cy="0" r="11" transform="translate(64 16)">
            <animateTransform attributeName="transform" type="scale" additive="sum"
            values="1;1;1;1;1.42;1;1;1;1;1" dur="1350ms" repeatCount="indefinite"></animateTransform>
          </circle>
          <circle fill="#000000" cx="0" cy="0" r="11" transform="translate(112 16)">
            <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;1;1;1;1;1;1.42;1;1"
            dur="1350ms" repeatCount="indefinite"></animateTransform>
          </circle>
        </svg>
      </div>
      <div v-if="productsLoadingFailed">
        При загрузке товаров произошла ошибка.
        <button @click="loadProducts">Попробовать ещё раз</button>
      </div>
      <ProductList :products="products"/>
      <BasePagination v-model='page' :count="countProducts"
      :per-page="productPerPage"/>
    </section>
  </div>
</main>
</template>

<script>
import axios from 'axios';
// import products from '@/data/products';
import ProductList from '@/components/ProductsList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import { API_BASE_URL } from '../config';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      /* '#73B6EA', */

      page: 1,
      productPerPage: 3,

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}/api/products`, {
          params: {
            page: this.page,
            limit: this.productPerPage,
            categoryId: this.filterCategoryId,
            colorId: this.filterColorId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        })
          .then((response) => { this.productsData = response.data; })
          .catch(() => { this.productsLoadingFailed = true; })
          .then(() => { this.productsLoading = false; });
      }, 2000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
