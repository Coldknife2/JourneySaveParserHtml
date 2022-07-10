<script setup lang="ts">
import { setBackground, setIcon } from "@/ts/visualManager";
import { initializeSaves, clearLocalStorage, readData } from "@/ts/dataManager";
import { offsets } from "@/ts/offsets";
</script>

<template>
	<NavBar path="/" @preserve-data="clearData = false;" />
	<DropZone v-if="displayDropZone" @display-content="displayCompanions" />
	<PlayerDisplay v-if="!displayDropZone" :companions="companions" :past-companions="pastCompanions">
		<template #heading>
			<PlayerDisplayHeading player-type="Contributors" />
		</template>
		<template #pastHeading>
			<PlayerDisplayHeading player-type="test" use-past-cmatw />
		</template>
	</PlayerDisplay>
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
			companions: new Array<object>(),
			pastCompanions: new Array<object>()
		};
	},
	mounted() {
		window.onbeforeunload = () => clearLocalStorage(this.clearData);
	},
	methods: {
		displayCompanions() {
			this.displayDropZone = false;
			const companionNumber = readData("uint8", offsets.companionAmount) as number;
			for (let i = 0; i < 8; i++) {
				const tempNameBuffer = readData("uint8", offsets.companionName+offsets.companionOffset*i, 24) as Uint8Array;
				const nameBuffer = tempNameBuffer.subarray(0, tempNameBuffer.indexOf(0x00));
				const name = new TextDecoder().decode(nameBuffer);

				const steamIdV3int32 = readData("uint32", offsets.companionID+offsets.companionOffset*i) as number;
				const steamIdV3 = `[U:1:${steamIdV3int32}]`;
				const safeHtmlSteamIdV3 = encodeURIComponent(steamIdV3);
				const steamLink = "https://steamcommunity.com/profiles/" + safeHtmlSteamIdV3;

				const symbolNumber = readData("uint8", offsets.companionSymbol+offsets.companionSymbolOffset*i) as number;
				const symbol = 0xF101 + symbolNumber;

				const companionData = { l: steamLink, n: name, s: symbol };
				if (steamIdV3int32 !== 0) {
					(i < companionNumber) ? this.companions.push(companionData) : this.pastCompanions.push(companionData);
				} else {
					break;
				}
			}
		}
	}
});
</script>

<style>
@import "@/css/style.css";
</style>
