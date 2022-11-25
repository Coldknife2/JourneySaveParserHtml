<script setup lang="ts">
initializeSaves();
useHead({
	bodyAttrs: {
		class: setBackground()
	}
});
</script>

<template>
	<NavBar path="/" @preserve-data="false" />
	<!-- <DropZone v-if="displayDropZone" @display-content="displayCompanions" /> -->
	<NuxtPage />
</template>
