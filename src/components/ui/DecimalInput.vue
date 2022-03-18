<template>
  <div>
    <input
        type="text"
        :class="htmlClass"
        :placeholder="placeholder"
        v-model="displayValue"
        @blur="isInputActive = false"
        @focus="isInputActive = true"
    />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class DecimalInput extends Vue {
  @Prop() value!: string;
  @Prop() readonly placeholder!: string;
  @Prop({default: "form-input"}) readonly htmlClass!: string;
  data() {
    return {
      isInputActive:false
    }
  }
  get displayValue(): string {
    if (this.$data.isInputActive) {
      return this.value;
    }
    if(parseFloat(this.value)) {
      return parseFloat(this.value).toString();
    }
    return '';
  }
  set displayValue(newValue: string) {
    if(parseFloat(newValue)) {
      this.$emit('input', Math.abs(parseFloat(newValue)).toString());
    } else {
      this.$emit('input', '');
    }
  }
}
</script>
