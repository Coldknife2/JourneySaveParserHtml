<script setup lang="ts">
import { arrow } from "images";
</script>

<template>
	<div>
		<img
			:src="arrowL"
			alt="Previous Item"
			@click="emitArrow('left')"
			@dragstart.prevent
		>
		<slot name="innerEditorContent" />
		<img
			:src="arrowR"
			alt="Next Item"
			@click="emitArrow('right')"
			@dragstart.prevent
		>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	emits: ["leftArrow", "rightArrow"],
	data() {
		return {
			arrowL: arrow[0][0],
			arrowR: arrow[1][0],
		};
	},
	mounted() {
		this.randomArrows();
	},
	methods: {
		randomArrows() {
			const randomIndex = randomInt(0, 3);
			this.arrowL = arrow[0][randomIndex];
			this.arrowR = arrow[1][randomIndex];
		},
		emitArrow(side: string) {
			if (side === "left") {
				this.$emit("leftArrow");
			} else {
				this.$emit("rightArrow");
			}
		}
	}
});
</script>

<style scoped>
img:hover {
	transform: scale(1.15);
	transition: transform 0.2s;
}

img {
	margin: 30px;
	transition: transform 0.2s;
	width: 130px;
	height: 130px;
}

div {
	align-items: center;
	display: flex;
	flex-direction: row;
}
</style>
