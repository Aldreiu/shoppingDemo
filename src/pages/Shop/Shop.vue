<template>
    <div class="bscroll">
        <ShopHeader></ShopHeader>
        <!-- <div class="tab">
            <div class="tab-item">
                <router-link to="/shop/goods" >点餐</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/shop/info" >评价</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/shop/ratings" >商家</router-link>
            </div>
        </div> -->
        <!--   下面路由的  replace 的作用是  router.replace(location)   导航后不会留下history记录，即使点击返回按钮 也不回回到这个页面   这里的作用是 为了 不让上面的的 shopheader 的返回按钮 不造成影响-->
        <div class="tab-content">
            <!-- <van-tabs v-model="activeName">
            <van-tab title="点餐" to="/shop/goods" replace></van-tab>
            <van-tab title="评价" to="/shop/ratings" replace></van-tab>
            <van-tab title="商家" to="/shop/info" replace></van-tab>
        </van-tabs> -->
            <ShopTab v-show="$route.meta.showTab" />
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import ShopHeader from '../../components/ShopHeader/ShopHeader'
    import ShopTab from '../../components/ShopTab/ShopTab'
    export default {
        data() {
            return {
                activeName: 0,
            }
        },
        mounted() {
            this.$store.dispatch('getShopInfo')
        },
        components: {
            ShopHeader,
            ShopTab,
        }
    }
</script>

<style lang="less">
    .tab-content {
        //  position: relative;
    }
</style>


// 这是自己写的写法没用组件 如果想实现下划线是有动画的 可以通过 flex 布置4个 div 最后一个div通过绝对定位脱离flex 然他定位到某个div的下方
// .tab{
// height: 40px;
// line-height: 40px;
// display: flex;
// justify-content: space-around;
// .tab-item{
// font-size: 14px;
// a{
// display: block;
// position: relative;
// color: #000;
// &.is-active{
// color: #1989fa;
// &::after{
// content: '';
// position: absolute;
// left: 50%;
// bottom: 1px;
// width: 35px;
// height: 2px;
// transform: translateX(-50%);
// background: #1989fa;

// }
// }
// }
// }
// }