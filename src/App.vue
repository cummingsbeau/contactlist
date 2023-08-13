<template>
  <div class="body"></div>
  <div>
    <nav class="nav justify-content-between align-items-center">
      <div class="nav-el" id="name_project">
        <h4 class="main-heading">Contact List</h4>
      </div>
      <div v-if="isLogged">
        <button class="btn btn-warning" style="margin: 5px" @click="logout">
          <span class="glyphicon glyphicon-log-out"></span> Log out
        </button>
      </div>
    </nav>
  </div>

  <router-view id="content" />
</template>
<script>
import { getAuth } from "firebase/auth";

export default {
  name: "App",
  computed: {
    isLogged() {
      return this.$store.state.isLogged;
    },
  },
  methods: {
    logout() {
      const store = this.$store;
      const router = this.$router;

      const auth = getAuth();
      auth
        .signOut()
        .then(function () {
          store.commit("afterLogout");
          router.push("/");
        })
        .catch(function () {
          router.push("/");
        });
    },
  },
};
</script>
