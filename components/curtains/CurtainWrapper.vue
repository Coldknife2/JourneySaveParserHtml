<script setup lang="ts">
import { Curtains } from "vue-curtains";
</script>

<template>
	<Curtains
		class="canvasWrapper"
		:params="curtainsParams"
		@context-lost="onContextLost"
		@error="onError"
		@success="bufferCurtain"
	>
		<slot name="content" :render-callback="callback" />
	</Curtains>
</template>

<script lang="ts">
export default defineComponent({
	data() {
		return {
			curtainsParams: {
				production: !(process.env.NODE_ENV === "development"),
				watchScroll: false,
				premultipliedAlpha: true,
				failIfMajorPerformanceCaveat: true
			},
			curtain: Curtains,
			drawing: false
		};
	},
	methods: {
		bufferCurtain(curtain: typeof Curtains) {
			this.curtain = curtain;
			curtain.disableDrawing();
		},
		onContextLost(curtain: typeof Curtains) {
			curtain.restoreContext();
		},
		onError() {
			document.body.classList.add("no-curtains");
		},
		callback() {
			this.drawing = !this.drawing;
			if (this.drawing) {
				this.curtain.enableDrawing();
			} else {
				this.curtain.disableDrawing();
			}
		}
	}
});
</script>

<style>
.canvasWrapper {
  position: fixed;
  top: 20vh;
  left: 30vw;
  width: 40vw;
  height: 60vh;
  pointer-events: none;
}
</style>
