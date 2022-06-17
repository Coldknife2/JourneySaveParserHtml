<script setup lang="ts">
import EditorLayout from "./EditorLayout.vue";
import { writeData, readData } from "@/ts/dataManager";
import { offsets, levelNames } from "@/ts/offsets";
import { level } from "@/images";
</script>

<template>
	<div>{{ levelIndex+1 + " - " + levelNames[levelIndex+1] }}</div>
	<EditorLayout @left-arrow="decrementLevel" @right-arrow="incrementLevel">
		<template #innerEditorContent>
			<img :src="level[levelIndex]" alt="The currently selected Level" @dragstart.prevent>
		</template>
	</EditorLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			levelIndex: 0
		};
	},
	mounted() {
		this.updateLevel();
	},
	methods: {
		decrementLevel() {
			let levelData = readData("uint8", offsets.levelValue) as number - 1;
			levelData = levelData < 1 ? 11 : levelData;
			writeData("uint8", offsets.levelValue, levelData);
			this.updateLevel();
		},
		incrementLevel() {
			let levelData = readData("uint8", offsets.levelValue) as number + 1;
			levelData = levelData % 12 === 0 ? 1 : levelData;
			writeData("uint8", offsets.levelValue, levelData);
			this.updateLevel();
		},
		updateLevel() {
			this.levelIndex = readData("uint8", offsets.levelValue) as number - 1;
		}
	}
});
</script>

<style scoped>
div {
	display: flex;
	justify-content: center;
	margin-bottom: 2vh;
}

img {
	border: 4px dashed #ffffff;
	width: 30vw;
}
</style>
