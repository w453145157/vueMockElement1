<template>
  <div id="app">
    <a-header :seller="seller"></a-header>
    <div class="tab border-bottom">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import aHeader from "com/header/header";
import { urlParse } from "common/js/utils";
const ERR_OK = "OK";
export default {
  name: "app",
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.axios.get("/api/data.json?id=" + this.seller.id).then(res => {
      if (res.statusText === ERR_OK) {
        this.seller = Object.assign({}, this.seller, res.data.seller);
      }
    });
  },
  components: {
    aHeader
  }
};
</script>

<style lang="stylus">
@import '~stylus/mixin.styl';

#app
  .tab
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-1px(rgba(7, 17, 27, 0.1));

    .tab-item
      flex: 1;
      text-align: center;

      & > a
        display: block;
        font-size: 14px;
        color: rgb(77, 85, 93);

        &.active
          color: rgb(240, 20, 20);
</style>
