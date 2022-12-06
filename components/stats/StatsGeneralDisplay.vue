<script setup lang="ts">
const saves = useSaves().value;
const journeyNumber = readData(saves, "u8", offsets.journeyAmount).toString();
const companionNumber = readData(saves, "u8", offsets.companionAmountTotal).toString();
const symbolNumber = readData(saves, "u8", offsets.symbolAmount).toString();

const names = ["Completed Journeys", "Total Companions met", "Total Symbols collected"];
const values = [journeyNumber, companionNumber, symbolNumber];
</script>

<template>
	<StatsValueItem
		v-for="i in 3"
		:key="i"
		:item-name="names[i-1]"
		:item-value="values[i-1]"
	/>
</template>
