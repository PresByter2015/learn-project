<template>
	<view class="container">
		<view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link>
		<button style="color: #007AFF;">按钮</button>
		<button type="default" @click="handleToDemo">跳转到demo页面</button>
		<navigator url="/pages/demo/demo?name=demo11" hover-class="navigator-hover">demo</navigator>
		<navigator url="/pages/test/test?name=demo11" hover-class="navigator-hover">test</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			handleToDemo() {
				console.log(99999999999)
				uni.navigateTo({
					url: '/pages/demo/demo?id=1&name=uniapp',
					fail: (res) => {
						console.log(res)
					}
				});
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: function(res) {
					console.log(res.model);
					console.log(res.pixelRatio);
					console.log(res.windowWidth);
					console.log(res.windowHeight);
					console.log(res.language);
					console.log(res.version);
					console.log(res.platform);
				}
			});
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
