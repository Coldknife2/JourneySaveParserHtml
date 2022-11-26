<script setup lang="ts">
const saves = useSaves().value;
const level = readData(saves, "u8", offsets.levelValue) as number;
const companionNumber = readData(saves, "u8", offsets.companionAmount).toString();
const scarfValue = readData(saves, "u8", offsets.scarfValue).toString();
const symbolValue = readData(saves, "u8", offsets.symbolValue)as number;
const robeData = readData(saves, "u8", offsets.robeValue) as number;
const robeColor = robeData > 3 ? "White" : "Red";
const robeTier = (robeData > 3 ? robeData - 2 : robeData + 1).toString();
</script>

<template>
	<StatsSectionItem>
		<template #innerSectionContent>
			<StatsSectionHeading section-heading="Journey" />
			<StatsValueItem item-name="Current Level" :item-value="levelNames[level]" />
			<StatsValueItem item-name="Companions met (this Journey)" :item-value="companionNumber" />
			<StatsValueItem item-name="Scarf length" :item-value="scarfValue" />
			<StatsValueItem item-name="Symbol" :item-value="String.fromCharCode(0xF101 + symbolValue)" :use-glyph="true" />
			<StatsValueItem item-name="Robe Tier" :item-value="robeTier" />
			<StatsValueItem item-name="Robe Color" :item-value="robeColor" />
		</template>
	</StatsSectionItem>
</template>
