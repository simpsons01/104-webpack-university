import Vue from "vue"
import App from "./App.vue"
import router from "./router/index"
import store from "./store/index"

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount("#app")

if (module.hot) {
  module.hot.accept('./App.vue', function() {
    console.log("HMR ON")
  })
}
