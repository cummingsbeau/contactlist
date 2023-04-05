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
  nextTick(() => inputRef.value().focus());
};

const handleBlur = () => {
  emits("handleBlur");
};
/* import { ref, defineProps, defineEmits, nextTick } from "vue";
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
}; */
</script>
