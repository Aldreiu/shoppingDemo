<template>
    <div class="alert_container">
        <section class="tip_text_container">
            <div class="tip_icon">
                <span><van-icon name="warning-o" /></span>
            </div>
            <p class="tip_text">{{alertText}}</p>
            <div class="confrim" @click="closeTip">确认</div>
        </section>
    </div>
</template>

<script>
export default {
    props:{
        alertText:String
    },
    methods:{
        closeTip(){
            // 分发自定义事件
            this.$emit('closeTip')
        }
    }
}
</script>

<style lang="less" scoped>
    @keyframes tipMove {
        0%  {transform: scale(1)}
        35% {transform: scale(.8)}
        70% {transform: scale(1.1)}
        100% {transform: scale(1)}
    }

    .alert_container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        background: rgba(0, 0, 0, 0.4);
        .tip_text_container{
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -60px;
            margin-left: -100px;
            width: 60%;
            animation: tipMove .4s;
            background-color: rgba(255, 255, 255, 1);
            border: 1px;
            padding-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border-radius: 5px;
            .tip_icon{
                .van-icon{
                    font-size: 30px;
                    color: red;
                }
            }
            .tip_text{
                font-size: 14px;
                color: #333;
                line-height: 20px;
                text-align: center;
                margin-top: 10px;
                padding: 0 5px;
            }
            .confrim{
                font-size: 18px;
                font-weight: bold;
                margin-top: 10px;
                // margin-bottom: 0px;
                background-color: #1989fa;
                width: 100%;
                text-align: center;
                line-height: 35px;
                border: 1px;
                color: #fff;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        }
    }
</style>