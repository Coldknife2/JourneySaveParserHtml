<script setup lang="ts">
const lightBackground = useLightBackground();
const theme = useTheme();

function setBackground() {
	if (Math.random() > (1 - squarePolynomial(new Date().getHours(), -0.00694444, 0.1666666))) {
		lightBackground.value += " hovLight";
		theme.value.isLight = true;
		return "light";
	} else {
		theme.value.isLight = false;
		return "dark";
	}
}

function routeToTitle(route: string) {
	switch(route) {
		case "/":
			return "Journey Parser";
		case "/stats/":
			return "Journey Statistics";
		case "/editor/":
			return "Journey Editor";
		case "/about/":
			return "About";
		case "/help/":
			return "Finding your Save.bin";
	}
}

useHead({
	bodyAttrs: {
		class: setBackground()
	}
});
</script>

<template>
	<Title>{{ routeToTitle($route.path) }}</Title>
	<NavBar />
	<div v-if="displayDropZone && !['/about/', '/help/'].includes($route.path)" class="dropZoneContainer">
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
		<NuxtLink to="/help/" :class="'help-link ' + lightBackground">I need help finding my Save.bin!</NuxtLink>
	</div>
	<div
		v-else
		class="hidden-dropZone"
		@drop.prevent="dropHandler($event)"
		@dragenter.prevent
		@dragover.prevent
	>
		<NuxtPage />
	</div>
</template>

<script lang="ts">
export default defineComponent({
	data() {
		return {
			saves: useSaves(),
			displayDropZone: useDisplayDropZone(),
			fileReader: new FileReader(),
			tooltipEnabled: false
		};
	},
	mounted() {
		this.fileReader.onload = (callbackEvent) => this.callback(callbackEvent);
	},
	methods: {
		clickInput() {
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
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	border-radius: 5px;
	border: 4px dashed #ffffff;
	font-size: var(--font-size--section);
	margin-bottom: 10px;
	width: 95%;
	height: 33%;
}

.help-link {
	font-size: var(--font-size--subscript);
	text-align: center;
	margin-top: 20px;
	padding: 5px 10px;
}

a,
a:visited {
	color: var(--color-text);
	text-decoration: none;
}

.hidden-dropZone {
	z-index: 999;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>
