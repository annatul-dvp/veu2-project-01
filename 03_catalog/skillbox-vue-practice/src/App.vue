<template>
  <section class="catalog">
    <ProductList :products="products"/>
    <BasePagination v-model:page="page" :count="countProducts"
    :per-page="productPerPage"/>
  </section>
</template>

<script>
import products from './data/products';
import ProductList from './components/ProductsList.vue';
import BasePagination from './components/BasePagination.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination },
  data() {
    return {
      page: 1,
      productPerPage: 3,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productPerPage;
      return products.slice(offset, offset + this.productPerPage);
    },
    countProducts() {
      return products.length;
    },
  },
  // methods: {
  //   setPage(page) {
  //     console.log(page);
  //     this.page = page;
  //   },
  // },
};
</script>
