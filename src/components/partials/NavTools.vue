<template>
  <div>
    <!-- Back Button and Title -->
    <b-row class="bg-light mb-2 d-flex justify-content-start align-items-center" style="font-size: 1em">
      <!-- Back Icon col-->
      <b-col class="col-sm-1 col-md-2">
        <b-button block variant="tranparent" @click="$router.go(-1)">
          <i class="fas fa-angle-left" style="font-size: 1.5rem"></i>
        </b-button>
      </b-col>
      <!-- Select template text col -->
      <b-col class="col-sm-11 col-md-10 text-sm-start text-md-center">
        SELECT TEMPLATE
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {};
</script>
<style scoped></style>
