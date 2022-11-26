<script setup lang="ts">
const saves = useSaves().value;
const journeyNumber = readData(saves, "u8", offsets.journeyAmount);
const level = readData(saves, "u8", offsets.levelValue);
const whiteRobeUnlocked = readData(saves, "u8", offsets.uniqueSymbolAmount) >= 21;
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
</script>

<template>
	<StatsSectionItem>
		<template #innerSectionContent>
			<StatsSectionHeading section-heading="Miscellaneous" />
			<StatsValueItem item-name="Chapter Select (CS) unlocked" :item-value="journeyNumber > 0 ? 'Yes' : 'No'" />
			<StatsValueItem item-name="Continue Option" :item-value="level > 0 ? 'Yes' : 'No'" />
			<StatsValueItem item-name="White Robe (WR) unlocked" :item-value="whiteRobeUnlocked ? 'Yes' : 'No'" />
			<StatsValueItem item-name="Last played:" :item-value="lastPlayed" />
		</template>
	</StatsSectionItem>
</template>
