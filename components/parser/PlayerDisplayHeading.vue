<script setup lang="ts">
interface Props {
	playerType: string
	usePastCmatw: boolean
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
	font-size: 5vh;
	font-weight: normal;
	text-align: left;
}

.cmatw {
	padding: 0 0 6vh 10px;
}

.cmatwPast {
	padding: 5vh 0 2vh 10px;
}
</style>
