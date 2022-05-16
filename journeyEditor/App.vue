<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import NavBarItem from "@/components/NavBarItem.vue";
import DropZone from "@/components/DropZone.vue";
import EditorDisplay from "@/components/EditorDisplay.vue";
import { setBackground } from "@/ts/visualManager";
import { initializeSaves, clearLocalStorage } from "@/ts/dataManager";
</script>

<template>
	<NavBar path="/journeyParser/" @preserve-data="clearData = false;">
		<template #editorLink>
			<NavBarItem link="/journeyEditor/" display-name="Journey Editor" path="/journeyParser/" />
		</template>
	</NavBar>
	<DropZone v-if="displayDropZone" @display-content="displayDropZone = false" />
	<EditorDisplay v-if="!displayDropZone" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

setBackground();
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
html {
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  /* https://stackoverflow.com/a/4407335 */
  user-select: none;
}
</style>

