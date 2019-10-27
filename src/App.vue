<template>
  <div id="app">
    <router-view/>
    <FooterAldreiu v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import FooterAldreiu from './components/FooterAldreiu/FooterAldreiu'


export default {
    mounted() {
      // this.$store.dispatch('getAddress')  写一个映射函数
      this.getAddress()
      // this.$store.dispatch('getFoodCategorys')
      this.getFoodCategorys()
      // this.$store.dispatch('getShops')
      this.getShops()
      // 获取用户信息
      this.getUserInfo()
    },
    methods:{
      ...mapActions(['getAddress','getFoodCategorys','getShops','getUserInfo'])
    },
    components:{
      FooterAldreiu
    }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
