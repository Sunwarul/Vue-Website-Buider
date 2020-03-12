<template>
  <b-container fluid>
    <b-row id="top-area" class="pt-2">
      <b-col>
        <img src="../../assets/folder.png" alt="logo " />
        <h1 class="title">foldr.me</h1>
        <p>One page website for creator.</p>
      </b-col>
    </b-row>
    <b-row id="form-area">
      <b-col></b-col>
      <b-col md="8">
        <b-form>
          <input
            class="form-control"
            type="text"
            placeholder="Email"
            required
          /><br />
          <b-button pill variant="polite" block>RECOVER PASSWORD</b-button>
        </b-form>
        <br />
        <p class="text-center"><a href="/login"> Login </a></p>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col></b-col>
      <b-col>
        <p class="text-center">
          <a href="#">TERMS</a> | <a href="#">PRIVACY</a> |
          <a href="#">CONTACT</a>
        </p>
        <p class="text-center">COPYRIGHT 2019@FOLDIR.ME</p>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>
<style scoped>
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
.title {
  font-family: Anton;
}
.form-control {
  border-radius: 25px;
  border-color: rgba(23, 29, 22, 0.8);
}
.form-control:focus {
  border-color: rgba(23, 29, 22, 0.8);

  /* box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset,
    0 0 8px rgba(126, 239, 104, 0.6); */
  box-shadow: 0 1px 1px transparent inset, 0 0 8px transparent !important;
  outline: 0 none;
}
#top-area {
  /* height: 20vh; */
  text-align: center;
  padding: 2vh;
}
#form-area {
  margin-top: 1vh;
  /* margin: 15vh auto; */
}
</style>
