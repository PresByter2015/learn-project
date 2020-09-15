<template>
<div>
  <div class="foo" @click="handleClick">
    <p>foo-3333</p>
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