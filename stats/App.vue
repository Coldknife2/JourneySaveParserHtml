<script setup lang="ts">
import { setBackground, setIcon } from "@/ts/visualManager";
import { initializeSaves, clearLocalStorage } from "@/ts/dataManager";
</script>

<template>
	<NavBar path="stats/" @preserve-data="clearData = false;" />
	<DropZone v-if="displayDropZone" @display-content="displayDropZone = false" />
	<StatsDisplay v-if="!displayDropZone" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

setBackground();
setIcon();
initializeSaves();
export default defineComponent({
	data() {
		return {
			clearData: true,
			displayDropZone: true,
		};
	},
	mounted() {
		window.onbeforeunload = () => clearLocalStorage(this.clearData);
	}
});
</script>

<style>
@import "@/css/style.css";
</style>
