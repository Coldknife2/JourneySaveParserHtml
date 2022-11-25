<script setup lang="ts">
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
						:symbol="0xF101+randomSymbol()"
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
			symbolData: new Array<Array<boolean>>(),
			symbols: [...Array(21).keys()]
		};
	},
	mounted() {
		this.extractSymbolData();
		this.symbols = shuffle(this.symbols);
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
		},
		randomSymbol() {
			if (this.symbols.length > 0) {
				return this.symbols.pop() as number;
			} else {
				return randomInt(0, 20);
			}
		}
	}
});
</script>
