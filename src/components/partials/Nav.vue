<template>
  <div>
    <!-- TOP Navigation -->
    <b-navbar type="dark" variant="dark" toggleable="md" class="px-5">
      <!-- Brand Name -->
      <b-navbar-brand
        href="/sites"
        class="d-flex justify-content-center align-items-center"
      >
        <img src="../../assets/house.png" alt="SITES_LOGO" />
        <span class="pl-3">SITES</span>
      </b-navbar-brand>

      <!-- Right side switch (settings) -->
      <b-navbar-nav class="ml-auto" v-show="showSwitchSetting">
        <b-form-checkbox switch size="lg"></b-form-checkbox>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showSwitchSetting: false
    };
  },
  mounted() {
    const currentRoute = this.$route.path;
    if (currentRoute !== "/" && currentRoute !== "/sites") {
      this.showSwitchSetting = true;
      console.log("Ran");
    }
    console.log(currentRoute === "/sites");
  }
};
</script>
<style lang="css"></style>
