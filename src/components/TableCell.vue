<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="todo-content">
    <p class="table_label">{{ label }}</p>
    <p
      class="table_value"
      v-show="isEdit !== `${todo.createdAt}-${name}`"
      @click="handleRef"
    >
      {{ todo[name] }}
    </p>
    <input
      v-show="isEdit === `${todo.createdAt}-${name}`"
      ref="inputRef"
      type="text"
      @blur="handleBlur"
      class="table_value"
      v-model="todo[name]"
    />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, nextTick } from "vue";
const inputRef = ref(null);
const emits = defineEmits(["handleFocus", "handleBlur"]);
defineProps({
  label: String,
  name: String,
  isEdit: String,
  todo: Object,
});

const handleRef = () => {
  emits("handleFocus");
  nextTick(() => inputRef.value.focus());
};

const handleBlur = () => {
  emits("handleBlur");
};
</script>
<style scoped>
.table_value {
  min-height: 50px;
  margin-bottom: 0rem;
  max-width: 200px;
  word-break: break-all;
}
@media only screen and (max-width: 1000px) {
  .app {
    max-width: 90%;
  }
  .table_label {
    min-width: 150px;
  }
}
</style>
