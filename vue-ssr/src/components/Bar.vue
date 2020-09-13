<template>
  <div>
    <div class="bar">
      <p>
        {{ $store.state.name }}
        {{ $store.state.age }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  asyncData(store) {
    // 这个方法是在（后端调用）
    console.log("----------------");
    return store.dispatch("changeAll");
  },
  mounted() {
    this.$store.dispatch("changeAll");
  },
};
</script>
<style >
.bar {
  color: red;
}
</style>