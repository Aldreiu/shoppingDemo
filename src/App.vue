<template>
  <div id="app">
    <router-view/>
    <FooterAldreiu v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import FooterAldreiu from './components/FooterAldreiu/FooterAldreiu'

export default {
    components:{
      FooterAldreiu
    }
}
</script>

<style lang="scss">
#app {
  
}
</style>
