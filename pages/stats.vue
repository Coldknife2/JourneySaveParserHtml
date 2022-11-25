<script setup lang="ts">
</script>

<template>
	<DropZone v-if="displayDropZone" @display-content="displayDropZone = false" />
	<StatsDisplay v-if="!displayDropZone" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
