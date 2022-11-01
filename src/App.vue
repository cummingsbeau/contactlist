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

<style>
:root {
  --primary: #ea40a4;
  --business: #3a82ee;
  --personal: var(--primary);
  --light: #eee;
  --grey: #888;
  --dark: #313154;
  --danger: #ff5b57;

  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  --business-glow: 0px 0px 4px rgba(58, 130, 238, 0.75);
  --personal-glow: 0px 0px 4px rgba(234, 64, 164, 0.75);
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid grey;
  padding: 4rem 4rem;
  border-radius: 5px;
  background: white;
  max-width: 500px;
}

.main-heading {
  margin: 20px;
}

body {
  background-image: url("../src/assets/email-pattern.jpeg");
  background-repeat: repeat;
}

span {
  color: blue;
  /* Change this with links color*/
  cursor: pointer;
  text-decoration: underline;
}

span:hover {
  color: #444444;
  /* Change the value to with anchors hover color*/
}

h2.mb-3 {
  text-align: center;
}

.btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 3rem;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  background: #fafafa;
  border-radius: 53px;
  border: 3px solid #1e1b1b;
  color: #1e1b1b;
  font-weight: bold;
  letter-spacing: 1px;
  display: flex;
}
</style>
