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
			curtainsAvailable: useCurtainsAvailable(),
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
			this.curtainsAvailable = false;
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
	left: 30%;
	width: 40%;
	height: 60vh;
	pointer-events: none;
}
</style>
