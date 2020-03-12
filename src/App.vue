<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Anton&display=swap");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* height: 100vh; */
  /* width: 100vw; */
  overflow-x: hidden;
  /* overflow-y: visible; */
}
.rounded-btn {
  border-radius: 25px;
  background-color: #e7b68e !important;
  border-color: black !important;
  color: black;
}
.rounded-btn:focus {
  outline: none;
  box-shadow: 0 1px 1px transparent inset, 0 0 8px transparent !important;
  color: black !important;
}
.btn-polite {
  background-color: #e7b68e !important;
  border: 1px solid black !important;
}
.btn-snow {
  background-color: white;
  border: 1px solid black !important;
}
a {
  text-decoration: none;
}
/* 
body::-webkit-scrollbar {
  width: 1em;
}

body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

body::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
} */
</style>
