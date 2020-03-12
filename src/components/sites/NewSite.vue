<template>
  <div>
    <!-- Navigation Area -->
    <nav-bar></nav-bar>
    <!-- Navigation Tools -->
    <nav-tools></nav-tools>
    <!-- Actual Contents -->
    <b-container fluid class="mb-auto">
      <!-- Template section  -->
      <template-section></template-section>
    </b-container>

    <!-- Footer Area (Fixed) -->
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import Nav from "../partials/Nav";
import NavTools from "../partials/NavTools";
import Footer from "../partials/Footer";
import Templates from "./Templates";

export default {
  components: {
    "nav-bar": Nav,
    "footer-bar": Footer,
    "template-section": Templates,
    "nav-tools": NavTools
  }
};
</script>
<style>
#full {
  height: 80vh;
  width: 100vw;
}
</style>
