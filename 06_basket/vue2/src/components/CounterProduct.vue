<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click.prevent="decreaseProductAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <label>
      <input type="text" v-model.number="currentProductAmount" @change.prevent="changeProductAmount">
    </label>

    <button type="button" aria-label="Добавить один товар" @click.prevent="increaseProductAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>

export default {
  props: ['productAmount'],
  data() {
    return {
      currentProductAmount: 1,
    };
  },
  watch: {
    productAmount(value) {
      this.currentProductAmount = value;
    },
  },
  methods: {
    increaseProductAmount() {
      this.$emit('update:productAmount', this.currentProductAmount += 1);
    },
    decreaseProductAmount() {
      this.$emit('update:productAmount', this.currentProductAmount -= 1);
    },
    changeProductAmount() {
      this.$emit('update:productAmount', this.currentProductAmount);
    },
  },

};
</script>
