<script setup lang="ts">
import StatsSectionHeading from "./StatsSectionHeading.vue";
import StatsSectionItem from "./StatsSectionItem.vue";
import StatsValueItem from "./StatsValueItem.vue";
import { readData } from "@/ts/dataManager";
import { offsets } from "@/ts/offsets";
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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			journeyNumber: readData("uint8", offsets.journeyAmount) as number,
			level: readData("uint8", offsets.levelValue) as number,
			whiteRobeUnlocked: readData("uint8", offsets.uniqueSymbolAmount) as number >= 21,
			lastPlayed: new Date(
				(readData("uint64", offsets.lastPlayedValue) as number) / 10000 - 11644473600000
			).toLocaleDateString(undefined, {
				day:"2-digit",
				month:"2-digit",
				year: "2-digit",
				hour:"2-digit",
				minute: "2-digit",
				second:"2-digit"
			})
		};
	}
});
</script>
