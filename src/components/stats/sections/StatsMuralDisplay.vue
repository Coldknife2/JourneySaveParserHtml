<script setup lang="ts">
import { readData } from "@/ts/dataManager";
import { offsets, levelNames } from "@/ts/offsets";
</script>

<template>
	<StatsSectionItem>
		<template #innerSectionContent>
			<StatsSectionHeading section-heading="Murals" />
			<StatsItemRow
				v-for="lvl in muralData.length"
				:key="lvl"
				:row-name="levelNames[lvl-1]"
			>
				<template #rowContent>
					<StatsHoverItem
						v-for="mural in muralData[lvl-1].length"
						:key="mural"
						:unlocked="muralData[lvl-1][mural-1]"
						:index="[1, lvl-1, mural-1]"
						:use-up="true"
						:symbol="0xF116"
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
			muralData: new Array<Array<boolean>>()
		};
	},
	mounted() {
		this.extractMuralData();
	},
	methods: {
		extractMuralData() {
			const lengths = [1, 1, 2, 2, 1, 1, 2];
			const murals = (readData("uint8", offsets.muralValue) as number).toString(2).padStart(8, "0");
			const muralsSnow = (readData("uint8", offsets.muralValueSnow) as number).toString(2).padStart(2, "0");
			const allMurals = (muralsSnow + murals).split("").map(Number).map(Boolean).reverse();
			let index = 0;
			for (let i=0; i<7; i++) {
				this.muralData.push(allMurals.slice(index, index+lengths[i]));
				index += lengths[i];
			}
		}
	}
});
</script>
