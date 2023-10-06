<script setup lang="ts">
defineProps<{
	rowName: string
}>();
</script>

<template>
	<div class="item">
		<div class="name">
			{{ rowName }}
		</div>
		<div class="content">
			<slot name="rowContent" />
		</div>
	</div>
</template>

<style scoped>
.item {
	display: flex;
	font-size: var(--font-size--default);
	margin: 10px 0 10px 0;
}

.name {
	flex-basis: 40%;
	white-space: nowrap;
}

.content {
	display: flex;
	flex-basis: 60%;
	justify-content: left;
}
</style>
