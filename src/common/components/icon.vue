<template>
  <span class="icon" :class="[clsSize,clsType]"></span>
</template>
<script>
export default {
  name: "icon",
  data() {
    return {
      classMap: ["decrease", "discount", "guarantee", "invoice", "special"]
    };
  },
  // type -- icon类别（减，折，保...）
  // size -- icon大小
  // iconType -- icon的不同主题色
  props: {
    type: Number,
    size: Number,
    iconType: Number
  },
  computed: {
    // 类别+主题
    clsSize() {
      return this.classMap[this.type] + this.iconType;
    },
    // 大小
    clsType() {
      return "icon-" + this.size;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~stylus/mixin';

.icon
  display: inline-block;
  background-repeat: no-repeat;
  vertical-align: top;

  &.icon-1
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px;

  &.icon-2
    width: 16px;
    height: 16px;
    margin-right: 6px;
    background-size: 16px;

  &.decrease1
    bg-img('decrease_1');

  &.decrease2
    bg-img('decrease_2');

  &.decrease3
    bg-img('decrease_3');

  &.decrease4
    bg-img('decrease_4');

  &.discount1
    bg-img('discount_1');

  &.discount2
    bg-img('discount_2');

  &.discount3
    bg-img('discount_3');

  &.discount4
    bg-img('discount_4');

  &.guarantee1
    bg-img('guarantee_1');

  &.guarantee2
    bg-img('guarantee_2');

  &.guarantee3
    bg-img('guarantee_3');

  &.guarantee4
    bg-img('guarantee_4');

  &.invoice1
    bg-img('invoice_1');

  &.invoice2
    bg-img('invoice_2');

  &.invoice3
    bg-img('invoice_3');

  &.invoice4
    bg-img('invoice_4');

  &.special1
    bg-img('special_1');

  &.special2
    bg-img('special_2');

  &.special3
    bg-img('special_3');

  &.special4
    bg-img('special_4');
</style>