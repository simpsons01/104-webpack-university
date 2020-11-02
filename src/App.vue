<template>
  <div id="app">
    <router-link to="/about">about</router-link>
    <router-view></router-view>
    <img src="~assets/webpack.png" />
    <img :src="imgSrc" />
    swefwefe
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgSrc: ""
    }
  },
  async mounted() {
    const { default: webpackPng } = await import("assets/webpack.png")
    this.imgSrc = webpackPng
  }
}
</script>
