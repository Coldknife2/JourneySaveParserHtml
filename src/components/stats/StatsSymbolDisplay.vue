<script setup lang="ts">
import StatsSectionHeading from "@/components/stats//StatsSectionHeading.vue";
import StatsItemRow from "@/components/stats/StatsItemRow.vue";
import StatsHoverItem from "@/components/stats/StatsHoverItem.vue";
import StatsSectionItem from "@/components/stats/StatsSectionItem.vue";
import { readData } from "@/ts/dataManager";
import { offsets, levelNames } from "@/ts/offsets";
</script>

<template>
	<StatsSectionItem>
		<template #innerSectionContent>
			<StatsSectionHeading section-heading="Symbols" />
			<StatsItemRow
				v-for="lvl in symbolData.length"
				:key="lvl"
				:row-name="levelNames[lvl-1]"
			>
				<template #rowContent>
					<StatsHoverItem
						v-for="glyph in symbolData[lvl-1].length"
						:key="glyph"
						:unlocked="symbolData[lvl-1][glyph-1]"
						:index="[0, lvl-1, glyph-1]"
					/>
				</template>
			</StatsItemRow>
		</template>
	</StatsSectionItem>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			symbolData: new Array<Array<boolean>>()
		};
	},
	mounted() {
		this.extractSymbolData();
	},
	methods: {
		extractSymbolData() {
			const lengths = [3, 3, 4, 3, 4, 4];
			for (let i=0; i<6; i++) {
				const data = (readData("uint8", offsets.glyphValue+offsets.glyphOffset*i) as number).toString(2);
				const dataSplit = data.split("").map(Number).map(Boolean);
				while (dataSplit.length < lengths[i]) {
					dataSplit.unshift(false);
				}
				this.symbolData.push(dataSplit);
			}
		}
	}
});
</script>
