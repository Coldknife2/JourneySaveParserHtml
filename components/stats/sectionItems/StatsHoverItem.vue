<script setup lang="ts">
import { locations } from "images";
defineProps({
	unlocked: {
		type: Boolean,
		required: true
	},
	useUp: {
		type: Boolean,
		default: false
	},
	index: {
		type: [Object],
		required: true
	},
	symbol: {
		type: Number,
		required: true
	}
});
</script>

<template>
	<div class="item">
		<div class="imageContainer">
			<div :style="{ opacity: unlocked ? 1 : 0.35 }">
				{{ String.fromCharCode(symbol) }}
			</div>
			<img :class="'imageDisplay ' + (useUp ? 'above' : 'below')"
				:src="locations[index[0]][index[1]][index[2]]"
				loading="lazy"
				alt="In-game position of the symbol."
			/>
		</div>
	</div>
</template>

<style scoped>
.item {
	font-family: Glyphs;
	flex-basis: 25%;
	text-align: left;
}

.imageContainer {
	z-index: 1;
	width: fit-content;
}

.imageDisplay {
	z-index: 2;
	opacity: 0;
	border: 3px solid #ffffff;
	border-radius: 25%;
	height: 15vh;
	width: 15vh;
	display: contents;
	object-fit: contain;
	background-size: 15vh;
	position: absolute;
	overflow: hidden;
	margin-left: -6.3vh;
	transition: opacity 0.3s;
}

.above {
	margin-top: -20vh;
}

.below {
	margin-top: 1vh;
}

.imageContainer:hover .imageDisplay,
.imageDisplay:hover {
	display: block;
	opacity: 1;
}
</style>
