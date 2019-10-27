<template>
    <section class="search">
        <!-- 头部 -->
        <header>
            <van-nav-bar title="搜索">
            </van-nav-bar>
        </header>
        <!-- 导航栏 -->
        <main>
            <div class="content">
                <form action="/" @submit.prevent="search">
                    <van-search v-model="keyword" placeholder="请输入搜索关键词" show-action shape="round" @search="search" @clear="clear">
                        <div slot="action" @click="search">搜索</div>
                    </van-search>
                </form>

                <div class="list" v-if="!noSearchShops">
                    <ul class="list_container">
                        <router-link class="list_li" tag="li" :to="{path:'/shop',query:{id:item.id}}" v-for="item in searchShops" :key="item.id">
                            <div class="item_left">
                                <img :src="imgBaseUrl+ item.image_path" class="list_limg">
                            </div>
                            <div class="item_right"> 
                                <div class="item_right_text">
                                    <p><span>{{item.name}}</span></p>
                                    <p>月售{{item.month_sales||item.recent_order_num}}单</p>
                                    <p>{{item.delivery_fee||item.float_minimum_order_amount}}元起送/距离{{item.distance}}</p>
                                </div>
                            </div>
                        </router-link>
                    </ul>
                </div>

                <div class="search_none" v-else>很抱歉！无搜索结果</div>

            </div>
        </main>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    import BScroll from 'better-scroll'

    export default {
        data() {
            return {
                keyword:'',
                imgBaseUrl: 'http://cangdu.org:8001/img/',
                noSearchShops:false,
            }
        },
        mounted() {
            this._ulScroll()
        },
        computed:{
            ...mapState(['searchShops'])
        },
        methods:{
            search(){
                // 得到搜索关键字   JavaScript trim() 方法  去除字符串的头尾空格:
                const keyword = this.keyword.trim();
                this.noSearchShops = false;
                // 进行搜索
                if(keyword){
                    this.$store.dispatch('searchShops',keyword)
                }
            },
            clear(){
                // this.noSearchShops = true;
                this.noSearchShops = false; 
                this.$store.dispatch('clear_search_shops')
                
                // alert('这个按钮是有作用的')
            },
            _ulScroll(){
                new BScroll('.list')
            }
        },
        watch:{
            // searchShops(value){
            //     if(!value.length){
            //         this.noSearchShops = true
            //     }else{ // 有数据
            //         this.noSearchShops = false
            //     }
            // }
        },
    }
</script>

<style scoped lang="less">
    @import '../../assets/css/shop.less';
    .header();

    .search {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .list{
        position: absolute;
        top: 130px;
        bottom: 50px;
        overflow: hidden;
        width: 100%;
        .list_container{
            background-color: #fff;
            .list_li{
                display: flex;
                // justify-content: center;
                padding: 10px;
                border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                .item_left{
                    margin:0 15px 0 -8px;
                    .list_limg{
                        width: 50px;
                        height: 50px;
                        display: block;
                        margin-left: 10px;
                    }
                }
                .item_right{
                    // margin-right: 100px;
                    font-size: 12px;
                    .item_right_text{
                        p{
                            line-height: 12px;
                            margin-bottom: 6px;
                            &:last-child{
                                margin-bottom: 0;
                            }
                        }
                    }
                }
            }
        }
    }
    .search_none{
        margin: 0 auto;
        text-align: center;
        color: #333;
        margin-top: 2px;
        font-size: 14px;
    }
</style>