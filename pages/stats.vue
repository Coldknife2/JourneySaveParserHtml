<script setup lang="ts">
import StatsGeneralDisplay from "components/stats/GeneralDisplay.vue";
import StatsJourneyDisplay from "components/stats/JourneyDisplay.vue";
import StatsMiscDisplay from "components/stats/MiscDisplay.vue";
import StatsSymbolDisplay from "components/stats/SymbolDisplay.vue";
import StatsMuralDisplay from "components/stats/MuralDisplay.vue";

const headings = ["General", "Journey", "Miscellaneous", "Symbols", "Murals"];
const components = [StatsGeneralDisplay, StatsJourneyDisplay, StatsMiscDisplay, StatsSymbolDisplay, StatsMuralDisplay];
</script>

<template>
	<div class="wrapper">
		<div v-for="i in headings.length" :key="i" :class="headings[i-1].toLowerCase()">
			<div class="content">
				<div class="heading">{{ headings[i-1] }}</div>
				<component :is="components[i-1]"></component>
			</div>
		</div>
	</div>
</template>

<style scoped>
.wrapper {
	display: flex;
	flex-direction: column;
}

.murals {
	margin-bottom: 50px;
}

.general,
.journey,
.miscellaneous,
.symbols,
.murals {
	margin-top: 50px;
	margin-left: 40px;
	margin-right: 40px;
}

.content {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.heading {
	font-size: var(--font-size--heading);
	margin-bottom: 30px;
}
</style>
