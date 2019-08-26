<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="minusCount">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>
<script>
export default {
  name: "cartControl",
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart() {
      if (!this.food.count) {
        this.$set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      this.$emit("cartAdd", event.target);
    },
    minusCount() {
      this.food.count--;
    }
  }
};
</script>
<style lang="stylus" scoped>
.cartcontrol
  font-size: 0px;

  >*
    display: inline-block;

  .cart-decrease
    padding: 6px;
    transition: all 0.5s linear;
    transform: translate3d(0, 0, 0);
    opacity: 1;

    .inner
      display: inline-block;
      font-size: 24px;
      line-height: 24px;
      color: rgb(0, 160, 220);
      transition: all 0.5s linear;
      transform: rotate(0);

    &.move-enter, &.move-leave-to
      opacity: 0;
      transform: translate3d(24px, 0, 0);

      .inner
        transition: all 0.5s linear;
        transform: rotate(180deg);

  .cart-count
    font-size: 10px;
    vertical-align: top;
    width: 12px;
    text-align: center;
    padding-top: 6px;
    line-height: 24px;
    color: rgb(147, 153, 159);

  .cart-increase
    padding: 6px;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
</style>