<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  beforeCreate() {
    console.log("import 儿子-----beforeCreate");
  },
  created() {
    console.log("import 儿子-----created");
  },
  beforeMount() {
    console.log("import 儿子-----beforeMount");
  },
  mounted() {
    console.log("import 儿子-----mounted");
  },
  beforeUpdate() {
    console.log("import 儿子-----beforeUpdate");
  },
  updated() {
    console.log("import 儿子-----updated");
  },
  activated() {
    console.log("import 儿子-----activated");
  },
  deactivated() {
    console.log("import 儿子-----deactivated");
  },
  beforeDestroy() {
    console.log("import 儿子-----beforeDestroy");
  },
  destroyed() {
    console.log("import 儿子-----destroyed");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
