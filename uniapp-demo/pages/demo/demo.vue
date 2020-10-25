<template>
	<div @click="test">
		<text>点击页面发送数据</text>
		<text>传过来的参数：name:{{name}}--id:{{id}}</text>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				id: "",
				name: "",
			}
		},
		methods: {
			test(e) {
				uni.$emit('demo-event', {
					value: "数据"
				});
			}
		},
		onReady() {
			uni.$on('demo-event', function(data) {
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.value);
			})
		},
		onLoad(options) {
			console.log(options)
			this.id = options.id
			this.name = options.name
		}
	}
</script>
<style>

</style>
