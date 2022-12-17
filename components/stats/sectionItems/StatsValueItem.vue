<script setup lang="ts">
interface Props {
	itemName: string
	itemValue: string
	useGlyph?: boolean
}

withDefaults(defineProps<Props>(), {
	useGlyph: false
});
</script>

<template>
	<div class="item">
		<div class="name">
			{{ itemName }}
		</div>
		<div class="value" :style="{ fontFamily: (useGlyph ? 'Glyphs' : 'inherit') }">
			{{ itemValue }}
		</div>
	</div>
</template>

<style scoped>
.item {
	display: flex;
	font-size: 2.7vh;
	margin: .5vh 0 .5vh 0;
	align-items: center;
}

.name {
	white-space: nowrap;
}

.value {
	flex-basis: 100%;
	text-align: right;
	margin-right: 8vw;
}
</style>
