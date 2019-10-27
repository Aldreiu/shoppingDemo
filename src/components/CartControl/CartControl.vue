<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="iconfont icon-remove_circle_outline" v-if="food.count"><van-icon class="icon-iosminusoutline" class-prefix="my-icon" name="extra" @click.stop="updateFoodCount(false)" /></div>
        </transition>
        <div class="cart-count" v-if="food.count">{{food.count}}</div>
        <div class="iconfont icon-add_circle"><van-icon class="icon-jiahao2fill" class-prefix="my-icon" name="extra" @click.stop="updateFoodCount(true)" /></div>
    </div>
</template>

<script>
    export default {
        props:{
            food: Object
        },
        methods:{
            updateFoodCount(isAdd){
                this.$store.dispatch('updateFoodCount',{isAdd, food:this.food})
            }
        }
    }
</script>

<style lang="less" scoped>
    .cartcontrol {
        font-size: 0;

        .icon-remove_circle_outline {
            display: inline-block;
            padding: 6px;
            line-height: 22px;
            font-size: 22px;
            color: #1989fa;
            &.move-enter-active,&.move-leave-active{
                transition: all 0.3s;
            }
            &.move-enter,&.move-leave-to{
                opacity: 0;
                transform: translateX(15px) rotate(180deg);
            }
        }

        .cart-count {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            padding-top: 6px;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            color: rgb(147, 153, 159);
        }

        .icon-add_circle {
            display: inline-block;
            line-height: 22px;
            font-size: 22px;
            color: #1989fa;
            padding: 6px;
        }
    }
</style>