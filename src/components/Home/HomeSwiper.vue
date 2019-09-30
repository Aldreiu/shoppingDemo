<template>
    <div>
        <div class="swiper-container swiper-l">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">Slide 1</div>
                    <div class="swiper-slide">Slide 2</div>
                    <div class="swiper-slide">Slide 3</div>
                </div>
                <!-- 如果需要分页器 -->
                <div class="swiper-pagination swiper-p1"></div>
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
            new Swiper('.swiper-l', {
                loop: true, // 循环模式选项
                autoplay: true,
                // 如果需要分页器
                pagination: {
                    el: '.swiper-p1',
                },
            })
        },
    }
</script>

<style lang="less">
    .swiper-container {
            height: 120px;
        }
</style>