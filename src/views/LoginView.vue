<template>
  <div class="container">
    <form @submit.prevent="login">
      <h2 class="mb-3">Login</h2>
      <div class="input">
        <label for="email">Email address</label>
        <input
          class="form-control"
          type="text"
          name="email"
          placeholder="email@address.com"
        />
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input
          class="form-control"
          type="password"
          name="password"
          placeholder="password"
        />
      </div>
      <div class="alternative-option mt-4">
        You don't have an account? <span @click="moveToRegister">Register</span>
      </div>
      <button type="submit" class="btn" id="login_button">Login</button>
      <div
        class="alert alert-warning alert-dismissible fade show mt-5 d-none"
        role="alert"
        id="alert_1"
      >
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import $ from "jquery";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login(submitEvent) {
      const self = this;
      const fd = new FormData(submitEvent.target);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, fd.get("email"), fd.get("password"))
        .then((data) => {
          console.log("data", data);
          self.$router.push("/dashboard");
        })
        .catch((error) => {
          console.log("Error", error.code);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          let alert_1 = $("#alert_1");
          alert_1.removeClass("d-none");
          alert_1.html() == errorMessage;
          console.log(alert_1);
        });
    },
    moveToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
