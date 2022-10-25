<template>
  <div>
    <div class="text-center">You're now logged as</div>
    <div id="username_display" class="display-6">{{ this.email }}</div>
    <button id="sign_out" class="mt-4 btn btn-danger" @click="signOut">
      Logout
    </button>
    <h1 class="text-center">Contact List</h1>
    <br />
    <div class="form-inline">
      Name:
      <input placeholder="Name..." class="form-control" id="inputName" /> Email:
      <input
        placeholder="Email Address..."
        class="form-control"
        id="inputEmail"
      />
      Phone:
      <input
        placeholder="Phone Number..."
        class="form-control"
        id="inputPhone"
      />
      <div id="submitButtons">
        <button type="button" class="btn btn-info" onclick="addNewContact()">
          Submit
        </button>
      </div>
    </div>
    <h3>My Contacts</h3>
    <table id="displayContacts" class="table"></table>
  </div>
</template>

<script>
import {addNewContact, updateNewContact, deleteNewContact, submitNewContact} from "../components/contact";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export default {
  data() {
    return {
      email: auth.currentUser.email,
    };
  },
  methods: {
    signOut() {
      auth
        .signOut()
        .then(() => {
          console.log("Sign Out completed");
          this.$router.push("/");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
