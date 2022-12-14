<template>
	<div class="container">
		<div>Scarf Length - {{ scarfValue }}</div>
		<div class="scarfContainer">
			<div ref="activeScarf" class="scarf activeScarf" />
			<div ref="inactiveScarf" class="scarf inactiveScarf" />
			<input
				type="range"
				min="0"
				max="30"
				:value="scarfValue"
				class="cursorPointer"
				@input="updateScarf(parseInt(($event.target as HTMLInputElement).value))"
			>
		</div>
		<div class="recommendation">
			Recommended scarf length for {{ robeColor }} Robe in {{ levelNames[levelValue+1] }} is {{ recommendation }}
		</div>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	data() {
		return {
			robeColor: "Red",
			levelValue: 1,
			scarfValue: 0,
			scarfRule: 0,
			redScarfRecommendations1: [7, 12, 18, 22, 28, 30, 30, 30, 12, 30], // +1 row; values by nathanj
			redScarfRecommendations2: [7, 11, 17, 22, 28, 30, 30, 30, 11, 30], // +2 row; +6 for white scarf
			recommendation: 0,
			saves: useSaves()
		};
	},
	mounted() {
		this.robeColor = readData(this.saves, "u8", offsets.robeValue) as number > 3 ? "White" : "Red";
		this.levelValue = clamp(readData(this.saves, "u8", offsets.levelValue) as number-1, 0, 11);
		this.scarfValue = readData(this.saves, "u8", offsets.scarfValue) as number;
		this.scarfRule = readData(this.saves, "u8", offsets.symbolAmount) as number % 2;
		this.adjustScarfColor();
		this.updateRecommendation();
		this.updateScarf(this.scarfValue);
	},
	methods: {
		adjustScarfColor() {
			let toAdd = this.robeColor === "Red" ? "red" : "white";
			(this.$refs.activeScarf as HTMLElement).classList.add(toAdd);
			(this.$refs.inactiveScarf as HTMLElement).classList.add(toAdd);
		},
		updateScarf(val: number) {
			(this.$refs.activeScarf as HTMLElement).style.width = (val / 30 * 100) + "%";
			this.scarfValue = val;
			writeData(this.saves, "u8", offsets.scarfValue, val);
			this.updateRecommendation();
		},
		updateRecommendation() {
			const recommendationsToUse = this.scarfRule === 0 ? this.redScarfRecommendations1 : this.redScarfRecommendations2;
			const lvl = this.levelValue >= recommendationsToUse.length ? recommendationsToUse.length - 1 : this.levelValue;
			const suggestedScarfLength = recommendationsToUse[lvl] + (this.robeColor === "Red" ? 0 : 6);
			this.recommendation = clamp(suggestedScarfLength, 0, 30);
		}
	}
});
</script>

<style scoped>
.container {
	align-items: center;
	display: flex;
	flex-direction: column;
}

.scarfContainer {
	margin-top: 6vh;
	margin-bottom: 3vh;
	width: 60vw;
	height: 94px;
	position: relative;
}

.scarf {
	height: 100%;
	background-repeat: no-repeat;
	background-position: top left;
	background-size: cover;
	position: absolute;
	top: 0px;
	left: 0px;
}

.red {
	background-image: url(images/scarf/red.webp);
}

.white {
	background-image: url(images/scarf/white.webp);
}

.activeScarf {
	z-index: 2;
	width: 0%;
}

.inactiveScarf {
	z-index: 1;
	filter: grayscale();
	width: 100%;
}

input {
	z-index: 4;
	width: 100%;
	height: 100%;
	background-color: transparent;
	position: absolute;
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
}

input::-moz-range-thumb {
	width: 6px;
	height: 120px;
	background-color: white;
}

input::-webkit-slider-thumb {
	width: 6px;
	height: 120px;
	background-color: white;
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
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
