<template>
  <div>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div>{{ this.email }}</div>
      <button id="sign_out" class="mt-4 btn btn-danger" @click="signOut">
        Logout
      </button>
    </nav>
  </div>
  <div class="body"></div>
  <div class="navbar">
    <nav class="nav">
      <div class="nav-el" id="name_project">
        <nav class="navbar navbar-default navbar-fixed-top">
          <div class="topnav-right">{{ this.email }}</div>
          <button id="sign_out" class="mt-4 btn btn-danger" @click="signOut">
            Logout
          </button>
        </nav>
      </div>
    </nav>
  </div>
</template>

<script>
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
