<template>
	<div class="content">
		<slot name="innerSectionContent" />
	</div>
</template>

<style scoped>
.content {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
