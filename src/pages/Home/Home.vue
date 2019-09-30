<template>
    <section class="home">
        <!-- 首页头部 -->
        <header>
            <HeaderTop></HeaderTop>
        </header>
        <!-- 首页导航 -->
        <nav class="lb">
            <HomeSwiper></HomeSwiper>
        </nav>
        <main class="main">
            <!-- 六宫格 -->
            <div class="nav-jg">
                <van-grid :column-num="5">
                    <van-grid-item v-for="value in 5" :key="value" icon="photo-o" text="文字" />
                </van-grid>
            </div>
            <HomeRecommend></HomeRecommend>
            <HomeFoor></HomeFoor>
        </main>
        <!-- 首页附近商家 -->
        <div></div>
    </section>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop'
    import HomeSwiper from '../../components/Home/HomeSwiper'
    import HomeRecommend from '../../components/Home/HomeRecommend'
    import HomeFoor from '../../components/Home/HomeFoor'
    export default {
        data() {
            return {

            }
        },
        
        components: {
            HeaderTop,
            HomeSwiper,
            HomeRecommend,
            HomeFoor
        }
    }
</script>

<style lang="less">
    .lb {
        
    }
    .main{
        .jg{
            
        }
    }
</style>