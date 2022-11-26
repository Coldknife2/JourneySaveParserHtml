<script setup lang="ts">
import { level } from "images";
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
export default defineComponent({
	data() {
		return {
			levelIndex: 0,
			saves: useSaves()
		};
	},
	mounted() {
		this.updateLevel();
	},
	methods: {
		decrementLevel() {
			let levelData = readData(this.saves, "u8", offsets.levelValue) as number - 1;
			levelData = levelData < 1 ? 11 : levelData;
			writeData(this.saves, "u8", offsets.levelValue, levelData);
			this.updateLevel();
		},
		incrementLevel() {
			let levelData = readData(this.saves, "u8", offsets.levelValue) as number + 1;
			levelData = levelData % 12 === 0 ? 1 : levelData;
			writeData(this.saves, "u8", offsets.levelValue, levelData);
			this.updateLevel();
		},
		updateLevel() {
			this.levelIndex = readData(this.saves, "u8", offsets.levelValue) as number - 1;
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
