<template>
	<div class="dropZoneContainer">
		<div
			class="dropZone"
			@dragenter.prevent
			@dragover.prevent
			@drop.prevent="dropHandler($event)"
		>
			Drop your Journey Save.bin here
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { setStorage, getStorage } from "@/ts/dataManager";

export default defineComponent({
	emits: ["displayContent"],
	data() {
		return {
			fileReader: new FileReader()
		};
	},
	mounted() {
		const saveFile8 = getStorage("uint8");
		const saveFile32 = getStorage("uint32");
		if (saveFile8 && saveFile32) { this.$emit("displayContent"); }
	},
	methods: {
		dropHandler(ev: DragEvent) {
			// Moz wiki https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
			this.fileReader.onload = (callbackEvent) => this.callback(callbackEvent);
			ev.preventDefault();
			if (ev.dataTransfer?.items) {
				if (ev.dataTransfer?.items[0].kind === "file") {
					const file = ev.dataTransfer.items[0].getAsFile() as File;
					this.fileReader.readAsArrayBuffer(file);
				}
			} else {
				this.fileReader.readAsArrayBuffer(ev.dataTransfer?.files[0] as File);
			}
		},
		callback(callbackEvent: ProgressEvent) {
			const buffer = (callbackEvent.target as FileReader).result as ArrayBuffer;
			const saveFile8 = new Uint8Array(buffer);
			const saveFile32 = new Uint32Array(buffer);
			setStorage("uint8", saveFile8);
			setStorage("uint32", saveFile32);
			this.$emit("displayContent");
		}
	}
});
</script>

<style scoped>
.dropZoneContainer {
	display: flex;
	justify-content: center;
	width: 100%;
}

.dropZone {
	align-items: center;
	border-radius: 5px;
	border: 4px dashed #ffffff;
	display: flex;
	font-size: 3.5vh;
	height: 33vh;
	justify-content: center;
	margin-bottom: 10px;
	margin-top: 18%;
	width: 95%;
}
</style>