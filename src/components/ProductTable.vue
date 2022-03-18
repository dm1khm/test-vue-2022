<template>
  <div>
    <table class="table">
      <thead>
      <tr>
        <th style="width: 50px"><Checkbox v-if="products.length" :checked="selectedProducts.length === products.length" @change="massSelect($event)"/></th>
        <th>Product Name</th>
        <th>Price</th>
        <th>Qty</th>
        <th>Sum</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, index) in products" :key="index">
        <td><Checkbox @change="changeSelected($event, index)" :checked="selectedProducts.indexOf(index) !== -1" /></td>
        <td>{{product.name}}</td>
        <td>{{product.price}}</td>
        <td>{{product.qty}}</td>
        <td>{{product.price*product.qty}}</td>
      </tr>
      <tr v-if="!products.length">
        <td colspan="5">No products</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {Product} from "@/types";
import Checkbox from "@/components/ui/Checkbox.vue";

@Component({
  components: {Checkbox}
})
export default class ProductTable extends Vue {
  @Prop({default() {return []}}) private selectedProducts!: Array<number>;
  @Prop() private products!: Array<Product>;
  changeSelected($event: boolean, index: number) {
    if(this.$props.selectedProducts.indexOf(index) === -1) {
      if($event) {
        this.$props.selectedProducts.push(index);
      }
    } else {
      if(!$event) {
        this.$props.selectedProducts.splice(this.$props.selectedProducts.indexOf(index), 1)
      }
    }
  }
  massSelect(value:boolean) {
    this.$props.selectedProducts.splice(0);
    if(value) {
      this.$props.products.forEach((product: Product, index: number) => {this.$props.selectedProducts.push(index)});
    }
  }
}
</script>
<style scoped lang="scss">
table{
  width:100%;
  table-layout: fixed;
  overflow-wrap: break-word;
}
</style>
