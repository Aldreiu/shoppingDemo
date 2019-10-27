<template>
    <div class="b-shop">
        <div class="shopcart">
            <div class="content">
                <div class="content-left" @click="toggleShow">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{highlight:totalCount}">
                            <van-icon name="shopping-cart" :info="totalCount==0 ? '':totalCount" />
                        </div>
                        <!-- <div class="num">123</div> -->
                    </div>
                    <div class="content-fy">
                        <div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
                        <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
                    </div>
                </div>

                <div class="content-right">
                    <div class="pay" :class="payClass">
                        {{payText}}
                    </div>
                </div>
            </div>
            <transition name="move">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                        <h1 class="title">购物车</h1>
                        <span class="empty" @click="clearCart">清空</span>
                    </div>
                    <div class="list-content">
                        <ul>
                            <li class="food" v-for="(food,index) in cartFoods" :key="index">
                                <span class="name">{{food.name}}12</span>
                                <div class="price"><span>￥{{food.price}}</span></div>
                                <div class="cartcontrol-wrapper">
                                    <CartControl :food="food" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="toggleShow"></div>
        </transition>
    </div>
</template>

<script>
    import {
        mapState,
        mapGetters
    } from 'vuex'
    import CartControl from '../../components/CartControl/CartControl'
    import BScroll from 'better-scroll'
    import { Dialog } from 'vant';
    export default {
        data() {
            return {
                isShow: false,
            }
        },
        computed: {
            ...mapState(['cartFoods', 'info']),
            ...mapGetters(['totalCount', 'totalPrice']),
            payClass() {
                const {
                    totalPrice
                } = this
                const {
                    minPrice
                } = this.info

                return totalPrice >= minPrice ? 'enough' : 'not-enough'
            },
            payText() {
                const {
                    totalPrice
                } = this
                const {
                    minPrice
                } = this.info
                if (totalPrice === 0) {
                    return `￥${minPrice}元起送`
                } else if (totalPrice < minPrice) {
                    return `还差￥${minPrice-totalPrice}元起送`
                } else {
                    return '结算'
                }
            },

            listShow() {
                // 如果总数量为0，直接不显示   在计算属性方便判断
                if (this.totalCount === 0) {
                    return false
                }
                if (this.isShow) {
                    this.$nextTick(() => {
                        // bscroll 是个单例
                        // if (!this.scroll) {
                        //     new BScroll('.list-content', {
                        //         click: true
                        //     })
                        // }else{
                        //     this.scroll.refresh()   // 让滚动条刷新一下：重新统计内容的高度
                        // }
                        // 通过计算属性 先判断是否显示 然后判断 有没有滚动因为 监听到没有都会先添加滚动 然后通过方法进行刷新一次 这样可以让  第一次有刷新   为什么第一次刷新  因为 这里面的显示数据 是动态的 
                        if (this.scroll) {
                            this.scroll.refresh()
                        }
                    })
                }
                return this.isShow
            }
        },
        methods: {
            toggleShow() {
                this.isShow = !this.isShow
            },
            clearCart() {
                Dialog.confirm({
                    title: '提示',
                    message: '确定清空购物车吗?'
                }).then(() => {
                    this.$store.dispatch('clearCart')
                }).catch(() => {
                    // on cancel
                });
            }
        },
        components: {
            CartControl,
        },
        watch: {
            cartFoods: function (newcartfoods) {
                if (newcartfoods.length === 0) {
                    this.isShow = false
                }
                if (!this.scroll) {
                    this.scroll = new BScroll('.list-content', {
                        click: true
                    })
                }
            }
        }
    }
</script>

<style lang="less">
    @import '../../assets/css/shop.less';

    .shopcart {
        position: fixed;
        -webkit-transform: translateZ(0);
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: 46px;

        // background-color: red;
        .content {
            display: flex;
            z-index: 55;
            -webkit-transform: translateZ(0);

            .content-left {
                flex: 1;
                display: flex;
                background: #3f5063;

                .logo-wrapper {
                    display: inline-block;
                    vertical-align: top;
                    position: relative;
                    margin: 0 12px;
                    padding: 6px;
                    top: -10px;
                    width: 48px;
                    height: 48px;
                    box-sizing: border-box;
                    border-radius: 50%;
                    background-color: #3f5063;

                    .logo {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;
                        background-color: #6d6d72;

                        &.highlight {
                            background-color: #1989fa;
                        }

                        .van-icon {
                            // position: absolute;
                            font-size: 24px;
                            color: #fff;
                        }
                    }

                }

                .content-fy {
                    .price {
                        // display: inline-block;
                        margin-top: 5px;
                        line-height: 24px;
                        padding-right: 12px;
                        vertical-align: top;
                        box-sizing: border-box;
                        font-weight: 700;
                        font-size: 16px;
                        color: #fff;
                    }

                    .desc {
                        font-size: 10px;
                        white-space: nowrap;
                        margin-top: 2px;
                        color: #c8ccd1;
                    }
                }
            }

            .content-right {
                flex: 0 0 105px;

                .pay {
                    // display: inline-block;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    font-weight: 700;
                    font-size: 12px;
                    color: #fff;

                    // background-color: red;
                    &.not-enough {
                        background-color: #373a3d;
                    }

                    &.enough {
                        background-color: #1989fa;
                        // color: #fff;
                    }
                }

            }
        }

        .shopcart-list {
            position: absolute;
            top: 0;
            left: 0;
            // background-color: red;
            z-index: -1;
            width: 100%;
            transform: translateY(-100%); // 向上移动整个高的距离

            &.move-enter-active,
            &.move-leave-active {
                transition: transform .3s;
            }

            &.move-enter,
            &.move-leave-to {
                transform: translateY(0);
            }

            .list-header {
                height: 30px;
                line-height: 30px;
                background: #f3f5f7;
                padding: 0 18px;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);

                .title {
                    float: left;
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }

                .empty {
                    float: right;
                    font-size: 14px;
                    color: rgb(0, 160, 220);
                }
            }

            .list-content {
                padding: 0 18px;
                max-height: 217px;
                overflow: hidden;
                background-color: #fff;

                .food {
                    position: relative;
                    padding: 12px 0;
                    box-sizing: border-box;
                    .bottom-border-1px(rgba(7, 17, 27, 0.1));

                    .name {
                        line-height: 24px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    .price {
                        position: absolute;
                        right: 90px;
                        bottom: 12px;
                        line-height: 24px;
                        font-weight: 700;
                        color: rgb(240, 20, 20);
                    }

                    .cartcontrol-wrapper {
                        position: absolute;
                        right: 0;
                        bottom: 6px;
                    }
                }
            }
        }
    }

    .list-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(7, 17, 27, 0.6);
        z-index: 40;
        opacity: 1;
        backdrop-filter: blur(10px);

        &.fade-enter-active,
        &.fade-leave-active {
            transition: all 0.5s;
        }

        &.fade-enter,
        &.fade-leave-to {
            opacity: 0;
            background: rgba(7, 17, 27, 0);
        }
    }
</style>