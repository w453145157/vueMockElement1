<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select
        :select-type="selectType"
        :only-content="onlyContent"
        :ratings="ratings"
        @selectTypeChange="changeSelect"
        @toggleContent="toggleContent"
      ></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li
            v-show="needShow(rating.rateType, rating.text)"
            v-for="(rating, index) of ratings"
            class="rating-item border-1px"
            :key="index"
          >
            <div class="avatar">
              <img class="avatar-img" width="28" height="28" :src="rating.avatar" alt />
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                <p class="text">{{rating.text}}</p>
                <div class="recommend" v-show="rating.recommend &&rating.recommend.length">
                  <span class="icon-thumb_up"></span>
                  <span class="item" v-for="(item, index) of rating.recommend" :key="index">{{item}}</span>
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import star from "com/star/star";
import split from "com/split/split";
import ratingSelect from "com/ratingSelect/ratingSelect";
import { formatDate } from "common/js/date";
// const POSITIVE = 0;
// const NEGATIVE = 1;
const ALL = 2;
const STATUSOK = "OK";
export default {
  name: "aRatings",
  components: {
    star,
    split,
    ratingSelect
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true
    };
  },
  created() {
    this.getData();
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    async getData() {
      try {
        let res = await this.axios.get("/api/data.json");
        if (res && res.statusText === STATUSOK) {
          this.ratings = res.data.ratings;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      } catch (ex) {
        throw new Error(ex);
      }
    },
    changeSelect(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggleContent(bool) {
      this.onlyContent = bool;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return this.selectType === type;
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~stylus/mixin';

.ratings
  position: absolute;
  top: 174px;
  bottom: 0;
  width: 100%;
  left: 0;
  overflow: hidden;

  .overview
    display: flex;
    padding: 18px 0;

    .overview-left
      flex: 0 0 137px;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;
      padding: 6px 0;

      @media only screen and (max-width: 320px)
        flex: 0 0 115px;
        width: 115px;

      .score
        font-size: 24px;
        line-height: 28px;
        color: rgb(255, 153, 0);
        margin-bottom: 6px;

      .title
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        margin-bottom: 8px;

      .rank
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);

    .overview-right
      flex: 1;
      padding: 6px 0 6px 24px;

      @media only screen and (max-width: 320px)
        padding-left: 6px;

      .score-wrapper
        margin-bottom: 8px;
        font-size: 0;

        >*
          display: inline-block;
          vertical-align: top;

        .title
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 18px;

        .star
          margin: 0 12px;

        .score
          font-size: 12px;
          color: rgb(255, 153, 0);
          line-height: 18px;

      .delivery-wrapper
        font-size: 0px;

        .title
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);

        .delivery
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);

  .rating-wrapper
    padding: 0 18px;

    .rating-item
      display: flex;
      padding: 18px 0;
      border-1px(rgba(7, 17, 27, 0.1));

      .avatar
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;

        img
          border-radius: 50%;

      .content
        position: relative;
        flex: 1;

        .name
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);

        .star-wrapper
          margin-bottom: 6px;
          font-size: 0px;

          .star
            display: inline-block;
            margin-right: 6px;
            vertical-align: top;

          .delivery
            display: inline-block;
            vertical-align: top;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);

        .text
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
          margin-bottom: 8px;

        .recommend
          line-height: 16px;
          font-size: 0px;

          .icon-thumb_up, .item
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;

          .icon-thumb_up
            color: rgb(0, 160, 220);

          .item
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: rgb(147, 153, 159);

        .time
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
</style>