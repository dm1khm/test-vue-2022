<template>
  <div>
    <input
        type="text"
        :class="htmlClass"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('input', $event.target.value)"/>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class TextInput extends Vue {
  @Prop() value!: string;
  @Prop() readonly placeholder!: string;
  @Prop({default: "form-input"}) readonly htmlClass!: string;
}
</script>