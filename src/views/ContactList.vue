<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<script setup>
/* eslint-disable no-useless-escape */
import { ref, onMounted, computed, watch, reactive } from "vue";

import TableCell from "../components/TableCell.vue";

const contact = ref([]);
const name = ref("");
const email = ref("");
const phoneNumber = ref("");
const errorEmail = ref(false);
const errorPhoneNumber = ref(false);
let data = reactive({ isEdit: "" });
const contact_asc = computed(() =>
  contact.value.sort((a, b) => {
    return a.createdAt - b.createdAt;
  })
);

const handleFocus = (key) => {
  data.isEdit = key;
};

watch(
  contact,
  (newVal) => {
    localStorage.setItem("contact", JSON.stringify(newVal));
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

const addContact = () => {
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

  contact.value.push({
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

const removecontact = (contact) => {
  contact.value = contact.value.filter((t) => t !== contact);
};

onMounted(() => {
  contact.value = JSON.parse(localStorage.getItem("contact")) || [];
});
</script>

<template>
  <main class="app">
    <section class="create-contact">
      <h3>Create A Contact</h3>
      <form
        id="new-contact-form"
        class="contact_form"
        @submit.prevent="addContact"
      >
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
          <strong
            >Invaild Phone Number: Please enter a vaild phone number in the
            format: xxx-xxx-xxxx</strong
          >
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

    <section class="contact-list">
      <h3 class="heading">Contact List</h3>
      <div class="list" id="contact-list">
        <div
          :key="ind"
          v-for="(contact, ind) in contact_asc"
          :class="`contact-item`"
        >
          <TableCell
            label="Name"
            @handleFocus="() => handleFocus(`${contact.createdAt}-${'name'}`)"
            @handleBlur="() => handleFocus('')"
            name="name"
            :contact="contact"
            :isEdit="data.isEdit"
          />
          <TableCell
            @handleFocus="() => handleFocus(`${contact.createdAt}-${'email'}`)"
            @handleBlur="() => handleFocus('')"
            label="Email"
            name="email"
            :contact="contact"
            :isEdit="data.isEdit"
          />
          <TableCell
            @handleFocus="
              () => handleFocus(`${contact.createdAt}-${'phoneNumber'}`)
            "
            @handleBlur="() => handleFocus('')"
            label="Phone Number"
            name="phoneNumber"
            :contact="contact"
            :isEdit="data.isEdit"
          />
          <div class="actions">
            <button class="delete" @click="() => removecontact(contact)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
