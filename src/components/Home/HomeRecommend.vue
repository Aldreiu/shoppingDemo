<template>
    <div>
        <!-- Swiper -->
        <div class="swiper-container swiper-hot">
            <div class="title border-bottom">商品推荐</div>
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <img src="" alt="">
                    <p>ads</p>
                    <p>查看详情</p>
                </div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
                <div class="swiper-slide">Slide 4</div>
                <div class="swiper-slide">Slide 5</div>
                <div class="swiper-slide">Slide 6</div>
                <div class="swiper-slide">Slide 7</div>
                <div class="swiper-slide">Slide 8</div>
                <div class="swiper-slide">Slide 9</div>
                <div class="swiper-slide">Slide 10</div>
            </div>
            <!-- Add Pagination -->
            <!-- <div class="swiper-pagination"></div> -->
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    import '../../../node_modules/swiper/css/swiper.min.css'
    export default {
        data() {
            return {

            }
        },
        // 回顾下钩子函数 mounted 在模板渲染成html后调用 通常指页面初始化完成后对 html的dom节点进行一些操作
        mounted() {
            new Swiper('.swiper-hot', {
                slidesPerView: 3,
                spaceBetween: 30,
                // pagination: {
                //     el: '.swiper-pagination',
                //     clickable: true,
                // },
            });
        },
    }
</script>

<style lang="less">
    .swiper-wrapper{
        .swiper-slide:nth-child(1){
            background-color: red;
        }
    }
</style>