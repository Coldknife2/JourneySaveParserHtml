<script setup lang="ts">
import { randomRange } from "@/ts/math";
import { locations } from "@/images";
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
	text: {
		type: [Object],
		default() {
			return [0, 0];
		}
	}
});
</script>

<template>
	<div class="item">
		<div class="imageContainer">
			<div :style="{ opacity: unlocked ? 1 : 0.35 }">
				{{ String.fromCharCode(0xF101 + (!text[0] ? randomRange(0, 20) : text[1])) }}
			</div>
			<div ref="img" :class="'imageDisplay ' + (useUp ? 'above' : 'below')" :style="{ backgroundImage: `url(${locations[index[0]][index[1]][index[2]]})` }" />
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
	border-radius: 50%;
	height: 15vh;
	width: 15vh;
	display: contents;
	position: absolute;
	overflow: hidden;
	margin-left: -6.3vh;
	transition: opacity 0.5s;
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
