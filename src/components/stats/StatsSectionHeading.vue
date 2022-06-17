<script setup lang="ts">
defineProps({
	sectionHeading: {
		type: String,
		required: true
	}
});
</script>

<template>
	<div class="heading">
		{{ sectionHeading }}
	</div>
</template>

<style scoped>
.heading {
	font-size: 5vh;
	margin-bottom: 2vh;
}
</style>
