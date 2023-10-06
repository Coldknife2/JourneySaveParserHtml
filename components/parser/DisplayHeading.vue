<script setup lang="ts">
interface Props {
	playerType?: string
	usePastCmatw?: boolean
}

withDefaults(defineProps<Props>(), {
	playerType: "Companions",
	usePastCmatw: false
});
</script>

<template>
	<div :class="{ cmatw: !usePastCmatw, cmatwPast: usePastCmatw }">
		{{ playerType + (usePastCmatw ? " From The Distant Past" : " Met Along The Way") }}
	</div>
</template>

<style scoped>
div {
	font-size: var(--font-size--heading);
	font-weight: normal;
	text-align: left;
}

.cmatw {
	padding: 0 0 70px 10px;
}

.cmatwPast {
	padding: 60px 0 30px 10px;
}
</style>
