<script setup lang="ts">
const saves = useSaves().value;
const journeyNumber = readData(saves, "u8", offsets.journeyAmount).toString();
const companionNumber = readData(saves, "u8", offsets.companionAmountTotal).toString();
const symbolNumber = readData(saves, "u8", offsets.symbolAmount).toString();
</script>

<template>
	<StatsSectionItem>
		<template #innerSectionContent>
			<StatsSectionHeading section-heading="General" />
			<StatsValueItem item-name="Completed Journeys" :item-value="journeyNumber" />
			<StatsValueItem item-name="Total Companions met" :item-value="companionNumber" />
			<StatsValueItem item-name="Total Symbols collected" :item-value="symbolNumber" />
		</template>
	</StatsSectionItem>
</template>
