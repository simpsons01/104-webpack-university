import Vue from "vue"
import VueRouter from "vue-router"
import Index from "views/Index.vue"
import About from "views/About.vue"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Index",
      component: Index
    },
    {
      path: "/about",
      name: "About",
      component: About
    }
  ]
})

export default router
