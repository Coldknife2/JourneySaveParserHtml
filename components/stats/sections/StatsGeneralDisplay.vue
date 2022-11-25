<script setup lang="ts">

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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			journeyNumber: (readData("uint8", offsets.journeyAmount) as number).toString(),
			companionNumber: (readData("uint8", offsets.companionAmountTotal) as number).toString(),
			symbolNumber: (readData("uint8", offsets.symbolAmount) as number).toString(),
		};
	}
});
</script>
