<template>
  <div class="calculator">
    <h2>Vue Invoice Calc</h2>
    <div class="calc-actions">
      <div class="row jc-sb">
        <div class="form-group" :class="{ 'form-group-error': $v.newProductName.$error }">
          <TextInput v-model="newProductName" :placeholder="'Product Name'"/>
          <div class="hint" v-if="$v.newProductName.$error">Field is required</div>
        </div>
        <div class="form-group" :class="{ 'form-group-error': $v.newProductPrice.$error }">
          <DecimalInput v-model="newProductPrice" :placeholder="'Price'"/>
          <div class="hint" v-if="$v.newProductPrice.$error">Field is required</div>
        </div>
        <div class="form-group" :class="{ 'form-group-error': $v.newProductQty.$error }">
          <DecimalInput v-model="newProductQty" :placeholder="'Qty'"/>
          <div class="hint" v-if="$v.newProductQty.$error">Field is required</div>
        </div>
        <Button @click="addProduct">Add product</Button>
      </div>
    </div>

    <div class="row jc-sa">
      <ProductTable :products="products" :selectedProducts="selectedProducts"/>
    </div>
    <div class="calc-actions">
      <div class="row ai-c jc-sb">
        <Button @click="deleteSelected" :disabled="!selectedProducts.length">Delete</Button>
        <span>Total {{total}}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import TextInput from "@/components/ui/TextInput.vue";
import Button from "@/components/ui/Button.vue";
import {Product} from "@/types";
import {validationMixin} from 'vuelidate'
import {required, numeric} from 'vuelidate/lib/validators'
import ProductTable from "@/components/ProductTable.vue";
import DecimalInput from "@/components/ui/DecimalInput.vue";
import store from '@/store';

@Component({
  components: {
    ProductTable,
    TextInput,
    DecimalInput,
    Button
  },
  mixins: [validationMixin],
  validations: {
    newProductName: {required},
    newProductQty: {required, numeric},
    newProductPrice: {required, numeric},
  }
})
export default class Calculator extends Vue {
  data() {
    let products: Product[] = [];
    return {
      newProductName: '',
      newProductQty: null,
      newProductPrice: null,
      products,
      selectedProducts: [],
    }
  }
  mounted() {
    this.loadProducts();
  }
  loadProducts() {
    this.$data.products = store.state.products;
  }
  get total() {
    let total = 0;
    this.$data.products.forEach((product: Product) => total += product?.price*product?.qty);
    return total;
  }
  addProduct() {
    this.$v.$touch();
    if(!this.$v.$invalid) {
      let product: Product = {
        name: this.$data.newProductName,
        qty: this.$data.newProductQty,
        price: this.$data.newProductPrice
      };
      store.dispatch('addProduct', product)
      this.cleanInputs();
    }
  }
  deleteSelected() {
    store.dispatch('deleteProducts', this.$data.selectedProducts);
    this.$data.selectedProducts.splice(0);
  }
  cleanInputs() {
    this.$data.newProductName = '';
    this.$data.newProductQty = null;
    this.$data.newProductPrice = null;
    this.$v.$reset();
  }
}
</script>

<style scoped lang="scss">
.calculator {
  width: 1024px;
}
.calc-actions {
  padding: 16px 16px;
  background-color: #eee;
}
</style>
