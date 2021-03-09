<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Button type="primary" @click="goto">跳转</Button>
    <Alert type="success">父组件</Alert>
    <HelloWorld msg="Welcome to Your HelloWorld" />
    <Box msg="Welcome to Your Box" />
    <Box  msg="Welcome to 测试盒子">
      <p style="color:red">我是描述</p>
    </Box>
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
    Button,
    Box: () => import("@/components/Box.vue"),
    HelloWorld,
  },
  methods: {
    goto() {
      this.$router.push("/about");
    }
  },
  beforeCreate() {
    console.log("父亲-----beforeCreate");
  },
  created() {
    console.log("父亲-----created");
  },
  beforeMount() {
    console.log("父亲-----beforeMount");
  },
  mounted() {
    console.log("父亲-----mounted");
  },
  beforeUpdate() {
    console.log("父亲-----beforeUpdate");
  },
  updated() {
    console.log("父亲-----updated");
  },
  activated() {
    console.log("父亲-----activated");
  },
  deactivated() {
    console.log("父亲-----deactivated");
  },
  beforeDestroy() {
    console.log("父亲-----beforeDestroy");
  },
  destroyed() {
    console.log("父亲-----destroyed");
  }
};
</script>
