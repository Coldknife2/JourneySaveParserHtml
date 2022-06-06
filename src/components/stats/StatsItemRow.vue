<script setup lang="ts">
defineProps({
	rowName: {
		type: String,
		required: true
	},
	useSpaceAround: {
		type: Boolean,
		default: false
	}
});
</script>

<template>
	<div class="item">
		<div class="name">
			{{ rowName }}
		</div>
		<div :class="'content ' + (useSpaceAround ? 'around' : 'between') ">
			<slot name="rowContent" />
		</div>
	</div>
</template>

<style scoped>
.item {
	display: flex;
	font-size: 2.7vh;
	margin: .8vh 0 .8vh 0;
}

.name {
	flex-basis: 40%;
	white-space: nowrap;
}

.content {
	display: flex;
	flex-basis: 60%;
}

.around {
	justify-content: space-around;
}

.between {
	justify-content: space-between;
}
</style>
