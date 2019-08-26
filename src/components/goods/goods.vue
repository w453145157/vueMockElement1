<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li
          v-for="(item,index) of goods"
          :key="index"
          class="menu-item"
          :class="{'current': currentIdx === index}"
          @click="selectMenu(index)"
        >
          <span class="text border-1px">
            <icon class="icon-menu" v-show="item.type>0" :type="item.type" :iconType="3" :size="1"></icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item, index) of goods" :key="index" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li
              @click="selectFood(food)"
              v-for="(food, index) of item.foods"
              :key="index"
              class="food-item"
            >
              <div class="icon">
                <img :src="food.icon" width="57" height="57" alt />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control @cartAdd="addCart" :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart
      :select-foods="selectFoods"
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      ref="shopCart"
    ></shop-cart>
    <food ref="food" @add="addCart" :food="selectedFood"></food>
  </div>
</template>
<script>
const ERR_OK = "OK";
import Icon from "common/components/icon";
import BScroll from "better-scroll";
import shopCart from "com/shopcart/shopcart";
import cartControl from "com/cartcontrol/cartcontrol";
import food from "com/food/food";
export default {
  name: "aGoods",
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    Icon,
    shopCart,
    cartControl,
    food
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    };
  },
  created() {
    this.axios.get("/api/data.json").then(res => {
      if (res.statusText === ERR_OK) {
        this.goods = res.data.goods;
        this.$nextTick(() => {
          this._initScroll();
          this._cacluteHeight();
        });
      }
    });
  },
  computed: {
    currentIdx() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _cacluteHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      [].forEach.call(foodList, v => {
        height += v.clientHeight;
        this.listHeight.push(height);
      });
    },
    selectMenu(idx) {
      // if (event._constructed) {
      //   return;
      // }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName(
        "food-list-hook"
      );
      let el = foodList[idx];
      this.foodScroll.scrollToElement(el, 300);
    },
    addCart(target) {
      // 第一次添加某商品时，异步执行第二个动画（优化）
      this.$nextTick(() => {
        this.$refs.shopCart.drop(target);
      });
    },
    selectFood(food) {
      this.selectedFood = food;
      this.$refs.food.show();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~stylus/mixin';

h1
  margin: 0;

.menu-wrapper >>> .icon-menu
  margin-right: 2px;

.goods
  position: absolute;
  top: 174px;
  width: 100%;
  bottom: 46px;
  display: flex;
  overflow: hidden;

  .menu-wrapper
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item
      display: table;
      height: 54px;
      width: 56px;
      line-height: 14px;
      padding: 0 12px;

      &.current
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;
        color: #000;

        .text
          border-none();

      .text
        font-size: 12px;
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        border-1px(rgba(7, 17, 27, 0.1));

  .foods-wrapper
    flex: 1;

    .title
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;

    .food-item
      display: flex;
      margin: 18px;
      border-1px(rgba(7, 17, 27, 0.1));
      padding-bottom: 18px;

      &:last-child
        border-none();
        margin-bottom: 0;

      .icon
        flex: 0 0 57px;
        margin-right: 10px;

      .content
        flex: 1;

        .name
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);

        .desc, .extra
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);

        .desc
          margin-bottom: 8px;
          line-height: 12px;

        .extra
          .count
            margin-right: 12px;

        .price
          font-weight: 700;
          line-height: 24px;

          .now
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);

          .old
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);

        .cartcontrol-wrapper
          position: absolute;
          right: 0;
          bottom: 12px;
</style>