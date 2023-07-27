<script setup lang="ts">
const saves = useSaves().value;
const csUnlocked = readData(saves, "u8", offsets.journeyAmount) as number > 0 ? "Yes" : "No";
const continueOption = readData(saves, "u8", offsets.levelValue) as number > 0 ? "Yes" : "No";
const whiteRobeUnlocked = readData(saves, "u8", offsets.uniqueSymbolAmount) as number >= 21 ? "Yes" : "No";
const lastPlayed = new Date(
	(readData(saves, "u64", offsets.lastPlayedValue) as number) / 10000 - 11644473600000
).toLocaleDateString(undefined, {
	day:"2-digit",
	month:"2-digit",
	year: "numeric",
	hour:"2-digit",
	minute: "2-digit",
	second:"2-digit"
});

const names = ["Chapter Select (CS) unlocked", "Continue Option", "White Robe (WR) unlocked", "Last played:"];
const values = [csUnlocked, continueOption, whiteRobeUnlocked, lastPlayed];
</script>

<template>
	<StatsValueItem
		v-for="i in 4"
		:key="i"
		:item-name="names[i-1]"
		:item-value="values[i-1]"
	/>
</template>
