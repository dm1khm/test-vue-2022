import Vue from 'vue'
import Vuex from 'vuex'
import {Product} from "@/types";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: Array<Product>()
  },
  mutations: {
    initialize: (state) => {
      const localStorageData = localStorage.getItem('products');
      if(localStorageData) {
        try {
          const localStorageDataArray: Array<Product> =  JSON.parse(localStorageData);
          if(localStorageDataArray) {
            localStorageDataArray.forEach((item) => {
              const product: Product = {
                name: item.name,
                qty: item.qty,
                price: item.price
              };
              state.products.push(product);
            })
          }
        } catch (e) {
          console.error('Cannot parse localStorage data', e);
        }
      }
    },
    addProduct: (state, product: Product) => {
      state.products.push(product);
    },
    deleteProducts: (state, selectedProducts: Array<number>) => {
      selectedProducts.sort().reverse().forEach(function (indexToRemove) {
        state.products.splice(indexToRemove, 1);
      })
    },
    saveState: (state) => {
      localStorage.setItem('products',JSON.stringify(state.products))
    }
  },
  actions: {
    addProduct: (context, product: Product) => {
      context.commit('addProduct', product);
      context.commit('saveState');
    },
    deleteProducts: (context, selectedProducts: Array<number>) => {
      context.commit('deleteProducts', selectedProducts);
      context.commit('saveState');
    }
  },
})
