<script setup lang="ts">
import { Curtains } from "vue-curtains";
</script>

<template>
	<Curtains
		class="canvasWrapper"
		:params="curtainsParams"
		@context-lost="onContextLost"
		@error="onError"
	>
		<slot name="content" />
	</Curtains>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			curtainsParams: {
				production: !(process.env.NODE_ENV === "development"),
				watchScroll: false,
				premultipliedAlpha: true,
				failIfMajorPerformanceCaveat: true
			}
		};
	},
	methods: {
		onContextLost(curtain: typeof Curtains) {
			curtain.restoreContext();
		},
		onError() {
			document.body.classList.add("no-curtains");
		}
	}
});
</script>

<style>
.canvasWrapper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
}
</style>
