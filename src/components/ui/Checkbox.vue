<template>
  <label>
    <label class="wrapper flex items-center">
      <input class="checkbox" type="checkbox" :checked="isChecked" @change="updateInput"/>
      <span class="checkmark"></span>
      {{label}}
    </label>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Checkbox extends Vue {
  @Prop() private label!: string;
  @Prop() private checked!: boolean;
  get isChecked() {
    return this.$props.checked;
  }
  updateInput(event: Event) {
    this.$emit('change', (event.target as HTMLInputElement).checked)
  }
}
</script>
<style scoped lang="scss">
.wrapper {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: -8px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-size: 16px;
}
.wrapper input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 21px;
  width: 21px;
  border-radius: 2px;
  background-color: #fff;
  border: 1px solid #ccc;
}
.wrapper:hover input ~ .checkmark {
  background-color: #fff;
  transition: background-color .3s linear;
}
.wrapper input:checked ~ .checkmark {
  background-color: #0d6efd;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.wrapper input:checked ~ .checkmark:after {
  display: block;
}
.wrapper .checkmark:after {
  left: 7px;
  top: 0px;
  width: 7px;
  height: 15px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
