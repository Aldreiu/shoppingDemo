<template>
    <div class="goods-tb">
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li class="menu-item" v-for="(good,index) in goods" :key="index"
                        :class="{current:index === currentIndex}" @click="clickMenuItem(index)">
                        <span class="txt">
                            <img class="icon" :src="good.icon" v-if="good.icon">
                            {{good.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul ref="foodsUl">
                    <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
                        <h1 class="title">{{good.name}}</h1>
                        <ul>
                            <!-- <li class="food-item" v-for="(food,index) in good.foods" :key="index" @click="showFood(food)"> -->
                            <li class="food-item" v-for="(food,index) in good.foods" :key="index"
                                @click="toggleShow(food)">
                                <!-- //toggleShow   showFood(food) -->
                                <div class="icon">
                                    <img width="57px" height="57px" :src="food.icon">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}份</span>
                                        <span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <CartControl :food="food"></CartControl>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <ShopCart />
        </div>
        <Food :food="food" ref="food" v-if="isShow" @toshow="toggleShow" />
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import '../../../mock/mockSerer'
    import CartControl from '../../../components/CartControl/CartControl'
    import BScroll from 'better-scroll'
    import Food from '../../../components/Food/Food'
    import ShopCart from '../../../components/ShopCart/ShopCart'
    // current 标识滚动分类到当前   需要计算属性 currentIndex
    //                  scrollY  右侧滑动的坐标                 滑动过程时时改变
    //                  tops 所有右侧分类的  li的top值  数组       列表显示完成后 不在改变每个top分配好
    // 先让列表可以滑动 使用 better-scroll 显示滑动
    export default {
        data() {
            return {
                scrollY: 0,
                tops: [],
                food: {}, // 需要显示的food
                isShow: false
            }
        },
        mounted() {
            // console.log(this)
            this.$store.dispatch('getShopGoods', () => { // 数据更新后执行 nextTick 涉及到 Vue 中 DOM 的异步更新
                this.$nextTick(() => { //列表数据更新显示后执行的
                    this._initScroll();
                    this._initTops();
                })
            })

            // this.$store.dispatch('getShopGoods')
            // this.scroll = new BScroll(this.$refs.menuWrapper, {})  因为数据store是异步获取的 所以需要数据获取 异步进行dom更新
        },
        computed: {
            ...mapState(['goods']),

            // 计算得到当前分类的下标
            currentIndex() {
                // 得到数据
                const {
                    scrollY,
                    tops
                } = this
                const index = tops.findIndex((top, index) => {
                    console.log(top)
                    return scrollY >= top && scrollY < tops[index + 1]
                })
                console.log(index)
                return index
            }
        },
        methods: { // 一般放事件的相关的回调函数     _初始化方法
            mounted() {
                this.$store.dispatch('shoptab', {
                    name: 'a'
                })
            },
            // 初始化滚动条
            _initScroll() {
                // 列表显示之后创建
                new BScroll(this.$refs.menuWrapper, {
                    click: true
                })
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    probeType: 3, // 这个属性可以去better-scroll文档去看 因为惯性滑动不会触发
                    click: true
                })

                // 给右侧列表绑定 scroll 监听
                // 这里的 on是better-scroll的方法   sroll是better-scroll的事件
                this.foodsScroll.on('scroll', ({
                    y
                }) => {
                    this.scrollY = Math.abs(y);
                    // console.log(this.scrollY);
                })
                // 给右侧列表绑定scroll结束的监听
                this.foodsScroll.on('scrollEnd', ({
                    x,
                    y
                }) => {
                    console.log('scrollEnd', x, y)
                    this.scrollY = Math.abs(y)
                })
            },
            // 初始化Tops
            _initTops() {
                // 初始化tops
                const tops = []
                let top = 0;
                tops.push(top)
                // 找到所有分类的li
                const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook');
                Array.prototype.slice.call(lis).forEach(li => {
                    // console.log(li)
                    // console.log(li.clientHeight)
                    // 这里卡很久  这里用到的是 webapi的  client系列
                    top += li.clientHeight
                    // console.log(top)
                    tops.push(top)

                })
                // 更新数据
                this.tops = tops
                // console.log(tops)
            },
            clickMenuItem(index) {
                // console.log(index)
                // 使用右侧滑到对应的位置
                const scrollY = this.tops[index]
                // console.log(scrolly);
                this.scrollY = scrollY
                this.foodsScroll.scrollTo(0, -scrollY, 300)
            },
            // 显示点击的food
            // showFood(food){
            //     // 设置 food
            //     this.food = food
            //     // 显示 food 组件  （在父组件中调用子组件对象的方法）
            //     this.$refs.food.toggleShow()
            // },
            toggleShow(food) {
                this.food = food
                this.isShow = !this.isShow
            }
        },
        components: {
            CartControl,
            Food,
            ShopCart,
        },
        watch: {
            // 'goods'(){

            //     this.$nextTick(() => {  //列表数据更新显示后执行的
            //         this.scroll = new BScroll(this.$refs.menuWrapper, {})
            //         this.scroll = new BScroll(this.$refs.foodsWrapper, {})
            //     })

            // }
        }
    }
    // 这里是给下方css写的  记得把  适应手机的媒体查询写一下  解决 高度的问题 @media only screen and (max-width: 320px)  类似这种
</script>

<style lang="less" scoped>
    @import '../../../assets/css/shop.less';

    * {
        touch-action: pan-y;
    }

    .goods-tb {
        // position: absolute;
        // top: 195px;
        // bottom: 46px;
        // // height: 300px;
        // width: 100%;
        // // max-height: 375px;
        // // min-height: 300px;
        // display: flex;
        // background: #fff;
        // overflow: hidden;
    }

    .goods {
        display: flex;
        position: absolute; // 如果复习的话请看这里使用 是个很好例子
        top: 195px;
        bottom: 46px;
        // max-height: 375px;
        // min-height: 300px;
        width: 100%;
        background-color: #fff;
        overflow: hidden;

        .menu-wrapper {
            flex: 0 0 70px;
            width: 70px;
            background-color: #f3f5f7;

            .menu-item {
                // display: table;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 34px;
                // width: 64px;
                // margin: 0 10px;
                // border-bottom: 1px solid rgb(236, 230, 230);
                box-sizing: border-box;

                &.current {
                    color: #1989fa;
                    background: #fff;
                    position: relative;
                }

                .txt {
                    font-size: 11px;
                    white-space: nowrap;
                    width: 56px;
                    // position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    .bottom-border-1px(rgba(7, 17, 27, 0.1));
                    // margin-top: 8px;

                    .icon {
                        display: inline-block;
                        vertical-align: top;
                        width: 12px;
                        height: 12px;
                        margin-right: 3px;
                        background-size: 12px 12px;
                        background-repeat: no-repeat;
                    }
                }

            }
        }

        .foods-wrapper {
            flex: 1;

            .food-list-hook {
                height: 100%;
            }

            .title {
                height: 26px;
                line-height: 26px;
                background-color: #f3f5f7;
                margin-bottom: 10px;
                color: rgb(147, 153, 159);
                font-size: 12px;
                padding-left: 8px;
                border-left: 2px solid rgb(221, 211, 211);
            }

            .food-item {
                display: flex;
                margin: 18px;
                .bottom-border-1px(rgba(7, 17, 27, 0.1));

                .icon {
                    flex: 0 0 57px;
                }

                .content {
                    flex: 1;

                    .name {
                        font-size: 14px;
                        margin: 2px 0 5px 0;
                        height: 14px;
                        line-height: 14px;
                        color: rgb(10, 10, 10);
                    }

                    .desc,
                    .extra {
                        font-size: 10px;
                        line-height: 10px;
                    }

                    .desc {
                        line-height: 12px;
                        margin-bottom: 5px;
                    }

                    .extra {
                        margin-bottom: 5px;

                        .count {
                            margin-right: 12px;
                        }
                    }

                    .price {
                        font-weight: 700;
                        font-size: 13px;
                        margin-bottom: 12px;

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
                }

                .cartcontrol-wrapper {
                    position: absolute;
                    right: 0;
                    bottom: 1px;
                }
            }
        }
    }
</style>