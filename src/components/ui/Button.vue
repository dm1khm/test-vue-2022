<template>
  <button type="button"
          :class="htmlClass"
          @click="$emit('click', $event)"
          :disabled="disabled">
    <slot/>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop() private msg!: string;
  @Prop({default: false}) private disabled!: boolean;
  @Prop({default: "btn"}) private htmlClass!: string;

}
</script>
