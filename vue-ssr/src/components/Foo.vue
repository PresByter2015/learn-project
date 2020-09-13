<template>
<div>
  <div class="foo" @click="handleClick">
    <p>foo</p>
  </div>
</div>
</template>
<script>
export default {
    methods:{
        handleClick(){
            alert(8)
        }
    }
}
</script>
<style >
.foo {
  color: blue;
}
</style>