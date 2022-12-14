<script setup lang="ts">
import { robe } from "images";
const lightBackground = useLightBackground();
</script>

<template>
	<EditorLayout @left-arrow="changeRobe(0)" @right-arrow="changeRobe(1)">
		<template #innerEditorContent>
			<CurtainsRobeClothAnim v-if="checkCurtain()" :robe-data="robeData" />
			<img
				v-else
				:src="robeDisplay"
				alt="The currently selected Robe"
				@dragstart.prevent
			>
		</template>
	</EditorLayout>
	<div :class="lightBackground + ' cursorPointer'" @click="changeRobe(2)">
		Toggle Color
	</div>
</template>

<script lang="ts">
export default defineComponent({
	data() {
		return {
			robeDisplay: robe[0][0],
			robeData: 0,
			saves: useSaves()
		};
	},
	mounted() {
		this.updateRobe();
	},
	methods: {
		changeRobe(mode: number) {
			let robeData = readData(this.saves, "u8", offsets.robeValue) as number;
			if (mode !== 2) {
				let newRobeData = mode === 0 ? robeData-1 : robeData+1;
				robeData = robeData > 3 ? wrap(4, 6, newRobeData) : wrap(0, 3, newRobeData);
			} else {
				robeData = robeData ? robeData > 3 ? robeData - 3 : robeData + 3 : 4;
			}
			writeData(this.saves, "u8", offsets.robeValue, robeData);
			this.updateRobe();
		},
		updateRobe() {
			const robeData = readData(this.saves, "u8", offsets.robeValue) as number;
			const color = robeData > 3 ? 1 : 0;
			const tier = robeData > 3 ? robeData - 4 : robeData;
			this.robeDisplay = robe[color][tier];
			this.robeData = robeData;
		},
		checkCurtain() {
			return !document.body.classList.contains("no-curtains");
		}
	}
});
</script>

<style scoped>
div {
	margin-top: 2vh;
	display: flex;
	justify-content: center;
}
img {
	width: 20vh;
	height: 40vh;
}
</style>
