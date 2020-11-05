<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  beforeCreate() {
    console.log("儿子-----beforeCreate");
  },
  created() {
    console.log("儿子-----created");
  },
  beforeMount() {
    console.log("儿子-----beforeMount");
  },
  mounted() {
    console.log("儿子-----mounted");
  },
  beforeUpdate() {
    console.log("儿子-----beforeUpdate");
  },
  updated() {
    console.log("儿子-----updated");
  },
  activated() {
    console.log("儿子-----activated");
  },
  deactivated() {
    console.log("儿子-----deactivated");
  },
  beforeDestroy() {
    console.log("儿子-----beforeDestroy");
  },
  destroyed() {
    console.log("儿子-----destroyed");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
