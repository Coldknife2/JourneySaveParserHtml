<script setup lang="ts">
import { robe } from "images";
const lightBackground = useLightBackground();
</script>

<template>
	<EditorLayout @left-arrow="changeRobe(0)" @right-arrow="changeRobe(1)">
		<template #innerEditorContent>
			<CurtainsRobeClothAnim v-if="curtainsAvailable" :robe-data="robeData" />
			<img
				v-else
				:src="robeDisplay"
				alt="The currently selected Robe"
				@dragstart.prevent
			>
		</template>
	</EditorLayout>
	<div class="button-container">
		<div :class="lightBackground + ' cursorPointer button'" @click="changeRobe(2)">
			Toggle Color
		</div>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	data() {
		return {
			saves: useSaves(),
			curtainsAvailable: useCurtainsAvailable(),
			robeDisplay: robe[0][0],
			robeData: 0
		};
	},
	mounted() {
		this.$watch("saves", () => this.updateRobe(), { deep: true });
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
		}
	}
});
</script>

<style scoped>
div {
	margin-top: 30px;
	display: flex;
	justify-content: center;
}

img {
	width: 270px;
	height: 540px;
}

.button-container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.button {
	padding: 5px 10px;
}

</style>
