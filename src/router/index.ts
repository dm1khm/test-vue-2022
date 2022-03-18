import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Calculator from "@/pages/Calculator.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'calculator',
    component: Calculator
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
