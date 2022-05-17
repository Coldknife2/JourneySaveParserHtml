<script setup lang="ts">
defineProps({
	playerType: {
		type: String,
		default: "Companions"
	},
	usePastCmatw: {
		type: Boolean,
		default: false
	}
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