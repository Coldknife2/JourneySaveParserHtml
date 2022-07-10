<script setup lang="ts">
import { setBackground, setIcon } from "@/ts/visualManager";
import { initializeSaves, clearLocalStorage } from "@/ts/dataManager";
</script>

<template>
	<NavBar path="editor/" @preserve-data="clearData = false;">
		<template #editorLink>
			<NavBarItem
				link="editor/"
				display-name="Editor"
				path="editor/"
				@dragstart.prevent
			/>
		</template>
	</NavBar>
	<DropZone v-if="displayDropZone" @display-content="displayDropZone = false" />
	<EditorDisplay v-if="!displayDropZone" />
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
