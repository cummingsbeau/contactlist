<template>
  <div class="body"></div>
  <div class="navbar">
    <nav class="nav">
      <div class="nav-el" id="name_project">
        <h4 class="main-heading">Address Book</h4>
        <div class="topnav-right">{{ this.email }}</div>
      </div>
    </nav>
  </div>

  <router-view id="content" />
</template>
