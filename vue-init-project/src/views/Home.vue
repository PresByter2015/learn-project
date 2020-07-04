<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Button type="primary" @click="goto">跳转</Button>
    <Alert type="success">A success prompt</Alert>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { Button, Alert } from "view-design";
export default {
  name: "Home",
  components: {
    Alert,
    HelloWorld,
    Button
  },
  methods: {
    goto() {
      this.$router.push("/about");
    }
  }
};
</script>
