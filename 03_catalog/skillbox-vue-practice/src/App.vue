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
      <ProductFilter v-model:priceFrom="filterPriceFrom"
      v-model:priceTo="filterPriceTo"
      v-model:categoryId="filterCategoryId"
      v-model:color="filterColor"/>

      <section class="catalog">
        <ProductList :products="products"/>
        <BasePagination v-model:page="page" :count="countProducts"
        :per-page="productPerPage"/>
      </section>

    </div>
  </main>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductsList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColor: '#73B6EA',

      page: 1,
      productPerPage: 3,
    };
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products;

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price > this.filterPriceFrom);
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter((product) => product.categoryId === this.filterCategoryId);
      }

      if (this.filterColor) {
        filteredProducts = filteredProducts.filter((product) => product.colors.includes(this.filterColor));
      }

      return filteredProducts;
    },
    products() {
      const offset = (this.page - 1) * this.productPerPage;
      return this.filteredProducts.slice(offset, offset + this.productPerPage);
    },
    countProducts() {
      return this.filteredProducts.length;
    },
  },
};
</script>
