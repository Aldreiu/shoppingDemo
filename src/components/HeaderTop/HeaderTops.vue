<template>
    <div>
        <van-nav-bar title="title">123
            <!-- <van-icon name="search" slot="right" /> -->
        </van-nav-bar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
            }
        },
        props: ['title']
    }
</script>

<style lang="less">
    .headerTop {
        display: flex;
        justify-content: center;

        .center {
            .header_title {
                text-align: center;
            }
        }
    }
</style>