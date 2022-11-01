<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<script setup>
import { ref, onMounted, computed, watch, reactive } from "vue";

import TableCell from "../components/TableCell.vue";

const todos = ref([]);

const name = ref("");
const email = ref("");
const phoneNumber = ref("");
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

const addTodo = () => {
  if (
    name.value.trim() === "" ||
    email.value.trim() === "" ||
    phoneNumber.value.trim() === ""
  ) {
    return;
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
      <h5>CREATE A CONTACT</h5>
      <form id="new-todo-form" class="contact_form" @submit.prevent="addTodo">
        <input
          type="text"
          name="content"
          id="content"
          placeholder="Enter Name"
          required
          v-model="name"
        />
        <input
          type="email"
          name="content"
          id="content"
          placeholder="Enter Email"
          required
          v-model="email"
        />
        <input
          type="text"
          name="content"
          id="content"
          placeholder="Enter Phone Number"
          required
          v-model="phoneNumber"
        />
        <input type="submit" value="Add New Contact" />
      </form>
    </section>

    <section class="todo-list">
      <h5 class="heading">CONTACT LIST</h5>
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
<style scoped>
.app {
  max-width: 800px;
  margin: 20px auto;
}
@media only screen and (max-width: 1000px) {
  .app {
    max-width: 90%;
  }
  .list {
    overflow-x: scroll;
    background-color: #fff;
  }
}
.create-todo input[type="text"],
.create-todo input[type="email"] {
  display: block;
  font-size: 1.125rem;
  padding: 1rem 1.5rem;
  color: var(--dark);
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  margin-bottom: 1.5rem;
  width: 100%;
}
.heading {
  margin-top: 40px;
}

.create-todo .options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  margin-bottom: 1.5rem;
}

.create-todo .options label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  cursor: pointer;
}

.contact_form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
}

.create-todo .options label div {
  color: var(--dark);
  font-size: 1.125rem;
  margin-top: 1rem;
}

.create-todo input[type="submit"] {
  display: block;
  width: 100%;
  font-size: 1.125rem;
  padding: 1rem 1.5rem;
  color: #fff;
  background-color: var(--primary);
  border-radius: 0.5rem;
  box-shadow: var(--personal-glow);
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.create-todo input[type="submit"]:hover {
  opacity: 0.75;
}

.todo-list .list {
  margin: 1rem 0;
}

.todo-list .todo-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  margin-bottom: 1rem;
}

.todo-item label {
  display: block;
  margin-right: 1rem;
  cursor: pointer;
}

.todo-item .todo-content {
  flex: 1 1 0%;
}

.todo-item .actions button {
  display: block;
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.todo-item .actions button:hover {
  opacity: 0.75;
}

.todo-item .actions .edit {
  margin-right: 0.5rem;
  background-color: var(--primary);
}

.todo-item .actions .delete {
  background-color: var(--danger);
  margin-top: 1.5rem;
}

.todo-item.done .todo-content input {
  text-decoration: line-through;
  color: var(--grey);
}
</style>
