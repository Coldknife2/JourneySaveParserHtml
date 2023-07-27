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
	font-size: var(--font-size--default);
	margin: 10px 0 10px 0;
	align-items: center;
}

.name {
	white-space: nowrap;
}

.value {
	flex-basis: 100%;
	text-align: right;
}
</style>
