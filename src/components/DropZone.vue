<script setup lang="ts">
import { lightBackground } from "@/ts/visualManager";
import { setStorage, getStorage } from "@/ts/dataManager";
</script>

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
		<div class="toolTip">
			Where can I find my Save.bin?
			<span class="toolTipContent enableSelection">
				<div :class="lightBackground">
					C:/Users/*/AppData/Local/Annapurna Interactive/Journey/Steam
					<br>and<br>
					%steamInstallDirectory%/steamapps/common/638230/remote
					<br>
					See <a href="https://journey.fandom.com/wiki/Guide:_PC_version_-_Companions_Met_Along_the_Way_Problems#Steam_-_SAVE.BIN" target="_blank">here.</a>
				</div>
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
			setStorage("uint8", new Uint8Array(buffer));
			setStorage("uint16", new Uint16Array(buffer));
			setStorage("uint32", new Uint32Array(buffer));
			setStorage("uint64", new BigUint64Array(buffer));
			this.$emit("displayContent");
		}
	}
});
</script>

<style scoped>
.dropZoneContainer {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
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

.toolTip {
	font-size: 2vh;
	margin-top: 1em;
}

.toolTipContent {
	font-size: 2vh;
	width: 40vw;
	display: none;
	position: absolute;
	overflow: hidden;
	text-align: center;
	padding-top: 1rem;
	margin-left: -20vw;
	left: 50%;
}

.toolTip:hover .toolTipContent,
.toolTipContent:hover {
	display: block;
}

a,
a:visited {
	color: #cf1515;
	text-decoration: none;
}
</style>
