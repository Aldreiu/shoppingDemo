<template>
    <!-- <div class="food" v-if="isShow" @click="toggleShow"> -->
    <transition name="fmove">
        <div class="food">
            <div class="food-content">
                <div class="image-header">
                    <!-- <img src="food.image" alt=""> -->
                    <img v-lazy="food.image">
                    <p class="foodpanel-desc">{{food.info}}</p>
                    <div class="back" @click="isShow">
                        <van-icon name="arrow-left" />
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <CartControl :food="food" />
                    </div>
                </div>
            </div>
            <div class="food-cover" @click="isShow"></div>
        </div>
    </transition>
</template>

<script>
    import CartControl from '../../components/CartControl/CartControl'
    export default {
        props: {
            food: Object,

        },

        data() {
            return {
                // isShow: false
            }
        },
        methods: {
            // toggleShow() {
            //     this.isShow = !this.isShow
            // }
            isShow() {
                this.$emit('toshow', this.food)
            }
        },
        components: {
            CartControl,
        }
    }
</script>

<style lang="less" scoped>
    .fmove-enter-active,.fmove-leave-active{
        transition: opacity 0.3s;
    }
    .fmove-enter,.fmove-leave-to{
        opacity: 0;
    }
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 45px;
        z-index: 100;
        width: 100%;
        border-radius: 8px;

        .food-content {
            z-index: 66;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 75%;
            background-color: #fff;
            border-radius: 8px;

            .image-header {
                position: relative;
                width: 100%;
                height: 0;
                padding-top: 100%;

                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }

                .foodpanel-desc {
                    font-size: 12px;
                    padding: 5px 10px 10px;
                    color: #ddd;
                    letter-spacing: 1px;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                }

                .back {
                    position: absolute;
                    top: 10px;
                    left: 0;

                    // font-size: 14px;
                    .van-icon {
                        color: #fff;
                        font-size: 17px;
                        padding-left: 3px;
                    }
                }
            }

            .content {
                position: relative;
                padding: 10px;

                .title {
                    line-height: 14px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(44, 45, 46);
                    margin-bottom: 8px;
                }

                .detail {
                    margin-bottom: 15px;
                    line-height: 10px;
                    font-size: 0;

                    .sell-count,
                    .rating {
                        font-size: 10px;
                    }

                    .sell-count {
                        margin-right: 10px;
                    }
                }

                .price {
                    font-weight: 700;
                    line-height: 24px;

                    .now {
                        margin-right: 8px;
                        font-size: 14px;
                        color: rgb(240, 20, 20);
                    }

                    .old {
                        text-decoration: line-through;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                }

                .cartcontrol-wrapper {
                    position: absolute;
                    bottom: 4px;
                    right: 8px;
                }
            }
        }

        .food-cover {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: -48px;
            background-color: rgba(0, 0, 0, 0.5);
        }
    }
</style>