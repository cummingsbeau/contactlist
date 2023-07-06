<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<script setup>
/* eslint-disable no-useless-escape */
import { ref, onMounted, computed, watch, reactive } from "vue";

import TableCell from "../components/TableCell.vue";

const todos = ref([]);
const name = ref("");
const email = ref("");
const phoneNumber = ref("");
const errorEmail = ref(false);
const errorPhoneNumber = ref(false);
let data = reactive({ isEdit: "" });
const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return a.createdAt - b.createdAt;
  })
);

const handleFocus = (key) => {
  data.isEdit = key;
};

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  {
    deep: true,
  }
);

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
const validatePhone = (phone) => {
  const reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return reg.test(phone);
};

const addTodo = () => {
  if (
    name.value.trim() === "" ||
    email.value.trim() === "" ||
    phoneNumber.value.trim() === ""
  ) {
    return;
  }

  if (!validateEmail(email.value.trim())) {
    errorEmail.value = true;
    return;
  } else {
    errorEmail.value = false;
  }

  if (!validatePhone(phoneNumber.value.trim())) {
    errorPhoneNumber.value = true;
    return;
  } else {
    errorPhoneNumber.value = false;
  }

  todos.value.push({
    name: name.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime(),
  });

  name.value = "";
  email.value = "";
  phoneNumber.value = "";
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});
</script>

<template>
  <main class="app">
    <section class="create-todo">
      <h5>Create A Contact</h5>
      <form id="new-todo-form" class="contact_form" @submit.prevent="addTodo">
        <input
          type="text"
          name="content"
          id="content"
          placeholder="Enter Name"
          required
          v-model="name"
        />
        <div v-if="errorEmail" class="invalid-feedback">
          Email incorrect format, must example@example.com
        </div>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          required
          v-model="email"
          :class="{ error: errorEmail }"
        />
        <div v-if="errorPhoneNumber" class="invalid-feedback">
          Phone number incorrect format, must xxx-xxx-xxxx
        </div>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Enter Phone Number"
          required
          v-model="phoneNumber"
          :class="{ error: errorPhoneNumber }"
        />
        <input type="submit" class="btn" value="Add New Contact" />
      </form>
    </section>

    <section class="todo-list">
      <h5 class="heading">Contact List</h5>
      <div class="list" id="todo-list">
        <div :key="ind" v-for="(todo, ind) in todos_asc" :class="`todo-item`">
          <TableCell
            label="Name"
            @handleFocus="() => handleFocus(`${todo.createdAt}-${'name'}`)"
            @handleBlur="() => handleFocus('')"
            name="name"
            :todo="todo"
            :isEdit="data.isEdit"
          />
          <TableCell
            @handleFocus="() => handleFocus(`${todo.createdAt}-${'email'}`)"
            @handleBlur="() => handleFocus('')"
            label="Email"
            name="email"
            :todo="todo"
            :isEdit="data.isEdit"
          />
          <TableCell
            @handleFocus="
              () => handleFocus(`${todo.createdAt}-${'phoneNumber'}`)
            "
            @handleBlur="() => handleFocus('')"
            label="Phone Number"
            name="phoneNumber"
            :todo="todo"
            :isEdit="data.isEdit"
          />
          <div class="actions">
            <button class="delete" @click="() => removeTodo(todo)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
