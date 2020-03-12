<template>
  <div>
    <div v-for="(item, index) in templates" :key="index" class="bg-light mb-3">
      <!-- card first row -->
      <b-row class="d-flex justify-content-center align-items-center">
        <b-col class="d-flex justify-content-center align-items-center">
          <img :src="item.imageUrl" alt="Kitten" />
        </b-col>
        <b-col class="d-flex justify-content-center align-items-center">
          <span>{{ item.name }} </span>
        </b-col>
      </b-row>
      <!-- card second row -->
      <b-row class="px-2">
        <b-col>
          <b-button variant="snow" pill block>CHOOSE</b-button>
        </b-col>
        <b-col>
          <b-button variant="polite" pill block>DEMO</b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "templates-section",
  data() {
    return {
      templates: [
        {
          id: 1,
          name: "BLANK",
          imageUrl: "https://placekitten.com/100/100"
        },
        {
          id: 2,
          name: "AVATAR",
          imageUrl: "https://placekitten.com/100/100"
        },
        {
          id: 3,
          name: "FULL GALLERY",
          imageUrl: "https://placekitten.com/100/100"
        },
        {
          id: 4,
          name: "BUTTON",
          imageUrl: "https://placekitten.com/100/100"
        }
      ]
    };
  }
};
</script>
<style></style>
