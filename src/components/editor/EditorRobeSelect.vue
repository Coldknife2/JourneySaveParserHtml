<script setup lang="ts">
import EditorLayout from "@/components/editor/EditorLayout.vue";
import { lightBackground } from "@/ts/visualManager";
import { writeData, readData } from "@/ts/dataManager";
import { offsets } from "@/ts/offsets";
import { clamp } from "@/ts/math";
import { robe } from "@/images";
</script>

<template>
	<EditorLayout @left-arrow="decrementRobe" @right-arrow="incrementRobe">
		<template #innerEditorContent>
			<img :src="robeDisplay" alt="The currently selected Robe" @dragstart.prevent>
		</template>
	</EditorLayout>
	<div :class="lightBackground + ' cursorPointer'" @click="toggleColor">
		Toggle Color
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			robeDisplay: robe[0][0]
		};
	},
	mounted() {
		this.updateRobe();
	},
	methods: {
		decrementRobe() {
			const robeData = readData("uint8", offsets.robeValue) as number;
			const newTier = robeData > 3 ? robeData - 1 < 4 ? 6 : clamp(robeData - 1, 4, 6) : robeData - 1 < 0 ? 3 : clamp(robeData - 1, 0, 3);
			writeData("uint8", offsets.robeValue, newTier);
			this.updateRobe();
		},
		incrementRobe() {
			const robeData = readData("uint8", offsets.robeValue) as number;
			const newTier = robeData > 3 ? clamp(clamp(robeData + 1, 4, 7) % 7, 4, 6) : clamp(robeData + 1, 0, 4) % 4;
			writeData("uint8", offsets.robeValue, newTier);
			this.updateRobe();
		},
		toggleColor() {
			const robeData = readData("uint8", offsets.robeValue) as number;
			const newColor = robeData ? robeData > 3 ? robeData - 3 : robeData + 3 : 4;
			writeData("uint8", offsets.robeValue, newColor);
			this.updateRobe();
		},
		updateRobe() {
			const robeData = readData("uint8", offsets.robeValue) as number;
			const color = robeData > 3 ? 1 : 0;
			const tier = robeData > 3 ? robeData - 4 : robeData;
			this.robeDisplay = robe[color][tier];
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
</style>
