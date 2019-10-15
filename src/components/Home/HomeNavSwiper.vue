<template>
    <div class="msite_nav">
        <div class="swiper-container swiper-n" v-if="categorys.length">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
                    <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
                        <div class="food_container">
                            <img :src="baseImageUrl+category.image_url" alt="">
                        </div>
                        <span>{{category.title}}</span>
                    </a>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <!-- <div class="swiper-pagination swiper-pn"></div> -->
        
        
        </div>
        <img src="./images/msite_back.svg" v-else>
    </div>
</template>

<script>
    import Swiper from 'swiper'
    // import '../../../node_modules/swiper/css/swiper.min.css'
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                baseImageUrl: 'https://fuss10.elemecdn.com'
            }
        },
        // 回顾下钩子函数 mounted 在模板渲染成html后调用 通常指页面初始化完成后对 html的dom节点进行一些操作
        mounted() {
            // 这里一个坑 要想使这里轮播有效 因为异步请求列表显示 这里的轮播效果不是在列表创建之后  需要列表数据显示之后
            // new Swiper('.swiper-n', {
            //     loop: true, // 循环模式选项
            //     autoplay: true,
            //     // 如果需要分页器
            //     // pagination: {
            //     //     el: '.swiper-pn',
            //     // },
            // })
        },
        computed: {
            ...mapState(['categorys']),   // 简化了 this.store.state.categorys
            //根据categorys一维数组生成一个二维数组
            //小数组中的元素个数最大是8
            categorysArr() {
                const {
                    categorys
                } = this
                // 准备一个空的2纬数组
                const arr = []
                // 准备一个小数组  最大长度是8
                let minArr = []
                // 遍历categorys
                categorys.forEach(c => {
                    //如果当前小数组已经满了，创建一个新的
                    if (minArr.length === 8) {
                        minArr = []
                    }
                    //如果minArr是空的，将小数组保存到大数组中
                    if (minArr.length === 0) {
                        arr.push(minArr)
                    }
                    // 将当前分类保存到小数组中
                    minArr.push(c)

                })
                return arr
            }
        },
        watch: {
                categorys(value) { // categorys数组中有数据了 在异步更新界面之前
                    // 使用setTimeout可以实现效果 但不是太好
                    // setTimeout(() => {
                    //     new Swiper('.swiper-n', {
                    //         loop: true, // 循环模式选项
                    //         autoplay: true,
                    //     })
                    // }, 100);
                    // 使用下面方法  不需要再去考虑等待的时间问题
                    // 界面更新就立即创建Swiper对象
                    this.$nextTick(() => { //一旦完成界面更新，立即调用
                        // 创建一个Swiper实例对象  来实现轮播    这里U币需要
                        new Swiper('.swiper-n', {
                            loop: true, // 循环模式选项
                        })
                    })
                }
            },
    }
</script>

<style lang="less">
    .msite_nav {
        .swiper-container {
            height: 120px;

            .swiper-wrapper {
                width: 100%;
                height: 100%;

                .swiper-slide {
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    flex-wrap: wrap;

                    .link_to_food {
                        width: 25%;

                        .food_container {
                            display: block;
                            width: 100%;
                            text-align: center;
                            padding-bottom: 5px;

                            img {
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                            }
                        }

                        span {
                            display: block;
                            width: 100%;
                            text-align: center;
                            font-size: 12px;
                            color: #666;
                        }
                    }
                }
            }
        }
    }
</style>