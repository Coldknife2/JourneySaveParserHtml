<script setup lang="ts">
import StatsSectionHeading from "./StatsSectionHeading.vue";
import StatsSectionItem from "./StatsSectionItem.vue";
import StatsValueItem from "./StatsValueItem.vue";
import { readData } from "@/ts/dataManager";
import { offsets, levelNames } from "@/ts/offsets";
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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			level: readData("uint8", offsets.levelValue) as number,
			companionNumber: (readData("uint8", offsets.companionAmount) as number).toString(),
			scarfValue: (readData("uint8", offsets.scarfValue) as number).toString(),
			symbolValue: readData("uint8", offsets.symbolValue) as number,
			robeTier: "",
			robeColor: ""
		};
	},
	mounted() {
		const robeData = readData("uint8", offsets.robeValue) as number;
		this.robeColor = robeData > 3 ? "White" : "Red";
		this.robeTier = (robeData > 3 ? robeData - 2 : robeData + 1).toString();
	}
});
</script>
