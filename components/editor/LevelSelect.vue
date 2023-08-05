<script setup lang="ts">
import { level } from "images";
</script>

<template>
	<div>{{ levelIndex+1 + " - " + levelNames[levelIndex+1] }}</div>
	<EditorLayout @left-arrow="changeLevel(0)" @right-arrow="changeLevel(1)">
		<template #innerEditorContent>
			<img :src="level[levelIndex]"
				alt="The currently selected Level"
				@dragstart.prevent
				loading="lazy"
			>
		</template>
	</EditorLayout>
</template>

<script lang="ts">
export default defineComponent({
	data() {
		return {
			saves: useSaves().value,
			levelIndex: 0
		};
	},
	mounted() {
		this.$watch("saves", () => {
			this.updateLevel();
		}, { deep: true });
		this.updateLevel();
	},
	methods: {
		changeLevel(mode: number) {
			let levelData = readData(this.saves, "u8", offsets.levelValue) as number;
			levelData = mode === 0 ? --levelData : ++levelData;
			levelData = wrap(1, 11, levelData);
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
	margin-bottom: 40px;
}

img {
	border: 4px dashed #ffffff;
	width: 30%;
	min-width: 400px;
}
</style>
