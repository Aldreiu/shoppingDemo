<template>
    <section class="home">
        <!-- 首页头部 -->
        <header>
            <HeaderTop></HeaderTop>
            <van-nav-bar left-text="地址" :title="address.name">
            </van-nav-bar>
        </header>
        <!-- 首页导航 -->
        <nav class="lb">
            <HomeNavSwiper/>
            <HomeSwiper></HomeSwiper>
        </nav>
        <main class="main">
            <!-- 六宫格 -->
            <!-- <div class="nav-jg">
                <van-grid :column-num="5">
                    <van-grid-item v-for="value in 5" :key="value" icon="photo-o" text="文字" />
                </van-grid>
            </div> -->

            <HomeRecommend></HomeRecommend>
            <ShopList/>
            <HomeFoor></HomeFoor>
        </main>
        <!-- 首页附近商家 -->
        <div></div>
    </section>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import HeaderTop from '../../components/HeaderTop/HeaderTop'
    import HomeSwiper from '../../components/Home/HomeSwiper'
    import HomeRecommend from '../../components/Home/HomeRecommend'
    import HomeFoor from '../../components/Home/HomeFoor'
    import HomeNavSwiper from '../../components/Home/HomeNavSwiper'
    import ShopList from '../../components/Home/ShopList'
    // import Swiper from 'swiper'
    export default {
        data() {
            return {

            }
        },

        components: {
            HeaderTop,
            HomeSwiper,
            HomeRecommend,
            HomeFoor,
            HomeNavSwiper,
            ShopList
        },
        computed: {
            ...mapState(['address'])
        }
    }
</script>

<style lang="less">
    .home{
        height: 1000px;
        .main{
            margin-bottom: 60px;
        }
    }
    .van-nav-bar{
        height: 25px;
        line-height: 25px;
        margin-bottom: 15px;
        .van-nav-bar__title{
            font-size: 12px;
        }
    }
</style>