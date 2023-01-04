<template>
  <MainPage />
</template>

<script>
import MainPage from "./components/MainPage.vue";

export default {
  name: "App",
  components: {
    MainPage,
  },
};
</script>

<style>
@import "@/assets/css/reset.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  background-color: #2c3e50;
  padding: 0;
  margin: 0;
}
</style>
