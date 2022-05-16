<script setup lang="ts">
import { writeData, readData } from "@/ts/dataManager";
import { offsets, level_names } from "@/ts/offsets";
import { clamp } from "@/ts/math";
</script>

<template>
	<div class="scarfSelect__container">
		<div>{{ scarfValue }}</div>
		<div class="container">
			<input
				type="range"
				min="0"
				max="30"
				:value="scarfValue"
				class="cursorPointer"
				@input="updateScarf($event)"
			>
		</div>
		<div class="recommendation">
			Recommended scarf length for {{ robeColor }} Robe in {{ level_names[levelValue] }} is {{ recommendation }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			robeColor: readData("uint8", offsets.robe_value) as number > 3 ? "White" : "Red",
			scarfValue: readData("uint8", offsets.scarf_value) as number,
			redScarfRecommendations1: [7, 12, 18, 22, 28, 30], // +1 row; values by nathanj
			redScarfRecommendations2: [7, 11, 17, 22, 28, 30], // +2 row; +6 for white scarf
			recommendation: 0,
			levelValue: 0
		};
	},
	mounted() {
		this.levelValue = clamp(readData("uint8", offsets.level_value) as number-1, 0, 11);
		this.updateRecommendation();
	},
	methods: {
		updateScarf(ev: Event) {
			const value = parseInt((ev.target as HTMLInputElement).value);
			this.scarfValue = value;
			writeData("uint8", offsets.scarf_value, value);
			this.updateRecommendation();
		},
		updateRecommendation() {
			const scarfRule = readData("uint8", offsets.symbol_amount) as number % 2;
			const recommendationsToUse = scarfRule === 0 ? this.redScarfRecommendations1 : this.redScarfRecommendations2;
			const lvl = this.levelValue > recommendationsToUse.length ? recommendationsToUse.length - 1 : this.levelValue;
			const suggestedScarfLength = recommendationsToUse[lvl] + (this.robeColor === "Red" ? 0 : 6);
			this.recommendation = clamp(suggestedScarfLength, 0, 30);
		}
	}
});
</script>

<style scoped>
input {
	-webkit-appearance: none;
	appearance: none;
	background: linear-gradient(to right, #d1160d 10%, #ffe7a4 90%);
	height: 1vh;
	width: 20vw;
}

input::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	background: url('@/images/symbols/0.svg');
	height: 2vw;
	width: 2vw;
}

.scarfSelect__container {
	align-items: center;
	display: flex;
	flex-direction: column;
}

.recommendation {
	display: flex;
	justify-content: center;
	font-size: 4vh;
	padding-top: 1em;
	width: 90vw;
	text-align: center;
}

</style>