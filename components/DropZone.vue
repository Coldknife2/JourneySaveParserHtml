<script setup lang="ts">
const lightBackground = useLightBackground();
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
export default defineComponent({
	data() {
		return {
			fileReader: new FileReader(),
			tooltipEnabled: false,
			saves: useSaves(),
			displayDropZone: useDisplayDropZone()
		};
	},
	mounted() {
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
			this.saves.u8 = new Uint8Array(buffer);
			this.saves.u32 = new Uint32Array(buffer);
			this.saves.u64 = new BigUint64Array(buffer);
			this.displayDropZone = false;
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
	height: 100vh;
}

.dropZone {
	align-items: center;
	border-radius: 5px;
	border: 4px dashed #ffffff;
	display: flex;
	font-size: var(--font-size--section);
	height: 33%;
	justify-content: center;
	margin-bottom: 10px;
	width: 95%;
}

.toolTip {
	font-size: var(--font-size--subscript);
	margin-top: 20px;
	padding: 5px 10px;
}

.toolTipContent {
	font-size: var(--font-size--subscript);
	width: 40%;
	display: none;
	position: absolute;
	overflow: hidden;
	text-align: center;
	padding-top: 16px;
	margin-left: -20%;
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
