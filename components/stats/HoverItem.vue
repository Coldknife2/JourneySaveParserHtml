<script setup lang="ts">
defineProps<{
	unlocked: boolean
	src: string
	symbol: number
}>();
</script>

<template>
	<div class="item">
		<div class="imageContainer">
			<div :style="unlocked ? 'opacity: 1' : 'opacity: .35'">
				{{ String.fromCharCode(symbol) }}
			</div>
			<img class="imageDisplay"
				:src="src"
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
	height: 200px;
	width: 200px;
	display: contents;
	object-fit: contain;
	background-size: 200px;
	position: absolute;
	overflow: hidden;
	margin-top: -280px;
	margin-left: -83px;
	transition: opacity 0.3s;
}

.imageContainer:hover .imageDisplay,
.imageDisplay:hover {
	display: block;
	opacity: 1;
}
</style>
