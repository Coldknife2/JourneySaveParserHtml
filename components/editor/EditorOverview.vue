<script setup lang="ts">
const lightBackground = useLightBackground();

defineProps<{
	callback: () => void
	enable: (i: number) => void
}>();
const lvlNames = ["Level Select", "Robe Select", "Scarf Length Select", "Symbol Select"];
</script>

<template>
	<div class="container">
		<div
			:class="lightBackground + ' block cursorPointer'"
			v-for="(item, i) in lvlNames"
			:key="i"
			@click="() => {enable(i); if (i == 1) callback(); }"
		>
			{{ item }}
		</div>
	</div>
</template>

<style scoped>
.block {
	display: flex;
	flex-direction: column;
	font-size: 5vh;
	height: 4em;
	justify-content: center;
	padding: 2vh;
	text-align: center;
	width: 4em;
}

.container {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	width: 100vw;
}
</style>
