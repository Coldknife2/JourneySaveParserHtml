<script setup lang="ts">
const lightBackground = useState("lightBackground");
</script>

<template>
	<div class="dropZoneContainer">
		<div
			class="dropZone"
			@click="clickInput"
			@dragenter.prevent
			@dragover.prevent
			@drop.prevent="dropHandler($event)"
		>
			Click or Drop your Journey Save.bin here
			<input
				ref="input"
				type="file"
				style="display: none;"
				accept=".bin"
				@change="inputHandler()"
			>
		</div>
		<div ref="tooltip" :class="'toolTip cursorPointer ' + lightBackground" @click="tooltipEnabled = !tooltipEnabled">
			Where can I find my Save.bin?
			<span :class="'toolTipContent '+ (tooltipEnabled ? 'reveal' : '')">
				<div>
					C:/Users/*/AppData/Local/Annapurna Interactive/Journey/Steam
					<br>and<br>
					%steamInstallDirectory%/userdata/*/638230/remote
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
			fileReader: new FileReader(),
			tooltipEnabled: false
		};
	},
	mounted() {
		const saveFile8 = getStorage("uint8");
		const saveFile16 = getStorage("uint16");
		const saveFile32 = getStorage("uint32");
		const saveFile64 = getStorage("uint64");
		if (saveFile8 && saveFile16 && saveFile32 && saveFile64) { this.$emit("displayContent"); } else { clearLocalStorage(true); }
		this.fileReader.onload = (callbackEvent) => this.callback(callbackEvent);
	},
	methods: {
		clickInput() {
			this.tooltipEnabled = true;
			(this.$refs.input as HTMLInputElement).click();
		},
		inputHandler() {
			this.fileReader.readAsArrayBuffer(((this.$refs.input as HTMLInputElement).files as FileList)[0]);
		},
		dropHandler(ev: DragEvent) {
			// Moz wiki https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
			this.fileReader.onload = (callbackEvent) => this.callback(callbackEvent);
			ev.preventDefault();
			if (ev.dataTransfer?.items) {
				if (ev.dataTransfer.items[0].kind === "file") {
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
	width: 100vw;
	height: 100vh;
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

.reveal {
	display: block;
}

a,
a:visited {
	color: #cf1515;
	text-decoration: none;
}
</style>
