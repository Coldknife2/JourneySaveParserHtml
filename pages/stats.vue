<script setup lang="ts">
import StatsGeneralDisplay from "components/stats/StatsGeneralDisplay.vue";
import StatsJourneyDisplay from "components/stats/StatsJourneyDisplay.vue";
import StatsMiscDisplay from "components/stats/StatsMiscDisplay.vue";
import StatsSymbolDisplay from "components/stats/StatsSymbolDisplay.vue";
import StatsMuralDisplay from "components/stats/StatsMuralDisplay.vue";

const headings = [["General", "Journey", "Miscellaneous"], ["Symbols", "Murals"]];
const components = [[StatsGeneralDisplay, StatsJourneyDisplay, StatsMiscDisplay], [StatsSymbolDisplay, StatsMuralDisplay]];
</script>

<template>
	<div class="wrapper">
		<div class="column" v-for="i in 2" :key="i">
			<div v-for="j in headings[i-1].length" :key="j" :class="headings[i-1][j-1].toLowerCase()">
				<div class="content">
					<div class="heading">{{ headings[i-1][j-1] }}</div>
					<component :is="components[i-1][j-1]"></component>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
@media only screen and (max-width : 1550px)  {
	.wrapper {
		flex-direction: column;
	}
	.symbols,
	.murals {
		margin-left: 3vw;
	}
}

.wrapper {
	display: flex;
}

.column {
	flex: 50%;
}

.general,
.symbols {
	margin-top: 4vh;
}

.general,
.journey,
.miscellaneous {
	height: 30vh;
	margin-left: 3vw;
}

.symbols,
.murals {
	height: 45vh;
}

.content {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.heading {
	font-size: 5vh;
	margin-bottom: 2vh;
}
</style>
