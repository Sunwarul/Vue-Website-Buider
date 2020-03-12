<template>
  <div class="d-flex flex-column justify-content-between">
    <nav-bar></nav-bar>
    <b-container fluid class="mb-auto">
      <!-- Nes site button -->
      <b-row class="px-2">
        <b-col>
          <b-button pill variant="polite" href="/sites/create" class="px-5"
            >NEW SITE</b-button
          >
        </b-col>
      </b-row>

      <!-- TODO:: Connect with REST -->

      <!-- Existing sites (Iterable) -->
      <b-row v-for="site in sites" :key="site.id">
        <div class="card img-thumbnail" style="width: 95vw; margin: 0 auto;">
          <b-row class="px-3">
            <b-col
              class="p-1 d-flex flex-column justify-content-center align-items-center"
            >
              <h4>{{ site.name }}</h4>
              <p>{{ site.url }}</p>
            </b-col>
            <b-col
              class="p-1 d-flex flex-column justify-content-center align-items-center"
            >
              <img :src="site.thumbnail" :alt="site.thumbnail_alt" />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-button
                :href="`/sites/${site.id}/edit`"
                variant="snow"
                pill
                block
                >Edit</b-button
              >
            </b-col>
            <b-col>
              <b-button variant="snow" pill block @click.prevent="confirmDelete"
                >Delete</b-button
              >
            </b-col>
          </b-row>
        </div>
      </b-row>
      <!-- Existing site end -->
    </b-container>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
import Nav from "../partials/Nav";
import Footer from "../partials/Footer";
export default {
  components: {
    "nav-bar": Nav,
    "footer-bar": Footer
  },
  data() {
    return {
      // TODO:: Connect with REST by Axios here
      sites: [
        {
          id: 1,
          name: "Personal Blog",
          thumbnail: "https://placekitten.com/150/150",
          thumbnail_alt: "Personal Blog",
          url: "avatar.foldr.me",
          user: "avatar"
        },

        {
          id: 2,
          name: "Image Collections Website",
          thumbnail: "https://placekitten.com/150/150",
          thumbnail_alt: "Personal Blog",
          url: "avatar.foldr.me",
          user: "avatar"
        },
        {
          id: 3,
          name: "Portfolio Page",
          thumbnail: "https://placekitten.com/150/150",
          thumbnail_alt: "Personal Blog",
          url: "avatar.foldr.me",
          user: "avatar"
        },
        {
          id: 4,
          name: "Online Resume",
          thumbnail: "https://placekitten.com/150/150",
          thumbnail_alt: "Personal Blog",
          url: "avatar.foldr.me",
          user: "avatar"
        },
        {
          id: 5,
          name: "Project Shocasing",
          thumbnail: "https://placekitten.com/150/150",
          thumbnail_alt: "Personal Blog",
          url: "avatar.foldr.me",
          user: "avatar"
        }
      ]
    };
  },
  methods: {
    confirmDelete() {
      this.$swal({
        title: "Are you sure?",
        text: "Your site will be deleted and can't be recoverd.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete it!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showCloseButton: true,
      }).then(result => {
        if (result.value) {
          this.$swal("Deleted", "You successfully deleted the site.", 'success');
        }
      });
    }
  }
};
</script>
<style></style>
